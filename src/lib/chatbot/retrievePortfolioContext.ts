import { chatbotKnowledge } from '../../data/chatbotKnowledge';
import type {
  PortfolioMatchContext,
  ProjectSynthesisEntry,
  ProjectSynthesisTheme,
  SiteMetaEntry,
  TechStackGroupSummary,
} from './chatTypes';
import { getKnowledgeQueryProfile, searchKnowledgeChunks } from './knowledgeIndex';

const DEBUG_RETRIEVAL =
  import.meta.env.DEV || import.meta.env.VITE_PORTFOLIO_RETRIEVAL_DEBUG === 'true';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeCompact = (value: string) => normalize(value).replace(/\s+/g, '');

const tokenize = (value: string) => normalize(value).split(' ').filter(Boolean);

const editDistance = (left: string, right: string) => {
  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[left.length][right.length];
};

const includesAny = (query: string, phrases: string[]) =>
  phrases.some((phrase) => query.includes(normalize(phrase)));

const hasApproximateToken = (queryTokens: string[], target: string, maxDistance = 2) =>
  queryTokens.some((token) => token.length >= 4 && editDistance(token, target) <= maxDistance);

const hasTokenFamily = (queryTokens: string[], targets: string[], maxDistance = 1) =>
  targets.some((target) => {
    const normalizedTarget = normalize(target);
    return (
      queryTokens.includes(normalizedTarget) ||
      hasApproximateToken(queryTokens, normalizedTarget, maxDistance)
    );
  });

const scoreTextMatch = (query: string, values: string[]) => {
  const normalizedQuery = normalize(query);
  const queryTokens = tokenize(query);
  let score = 0;

  values
    .filter(Boolean)
    .map((value) => normalize(value))
    .forEach((value) => {
      if (!value) return;
      if (normalizedQuery === value) score += 12;
      if (normalizedQuery.includes(value)) score += 8;
      if (value.includes(normalizedQuery) && normalizedQuery.length >= 4) score += 6;

      const valueTokens = value.split(' ');
      queryTokens.forEach((token) => {
        if (token.length >= 3 && valueTokens.includes(token)) score += 1;
        if (
          token.length >= 4 &&
          valueTokens.some((valueToken) => editDistance(token, valueToken) <= 1)
        ) {
          score += 1.5;
        }
      });
    });

  return score;
};

const getTechStackGroups = (): TechStackGroupSummary[] =>
  chatbotKnowledge.profile.skillGroups.map((group) => ({
    label: group.label,
    values: group.skills.map((skill) =>
      skill.emphasis ? `${skill.name} (${skill.emphasis})` : skill.name
    ),
  }));

const findBestProject = (query: string) => {
  const scored = chatbotKnowledge.projects
    .map((project) => ({
      project,
      score: scoreTextMatch(query, [
        project.title,
        project.shortTitle,
        project.slug,
        project.category,
        ...getProjectWorkBuckets(project),
        ...getProjectDisciplineTags(project),
        ...project.subcategories,
        ...project.tags,
        ...project.techStack,
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.project;
};

const findExplicitProjectMention = (query: string) => {
  const normalizedQuery = normalize(query);

  return [...chatbotKnowledge.projects]
    .sort((left, right) => right.title.length - left.title.length)
    .find((project) =>
      [project.title, project.shortTitle, project.slug].some((value) => normalizedQuery.includes(normalize(value)))
    );
};

const findBestExperience = (query: string) => {
  const entries = [
    ...chatbotKnowledge.experience.internships,
    ...chatbotKnowledge.experience.leadership,
    ...chatbotKnowledge.experience.research,
  ];

  const scored = entries
    .map((entry) => ({
      entry,
      score: scoreTextMatch(query, [
        entry.organization,
        entry.role,
        entry.type,
        entry.period,
        ...(entry.tech || []),
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.entry;
};

const findBestLabEntry = (query: string) => {
  const entries = [
    ...chatbotKnowledge.lab.papers,
    ...chatbotKnowledge.lab.concepts,
    ...chatbotKnowledge.lab.workingPrototypes,
  ];

  const scored = entries
    .map((entry) => ({
      entry,
      score: scoreTextMatch(query, [
        entry.title,
        entry.summary,
        entry.meta || '',
        ...(entry.tags || []),
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.entry;
};

const findBestRecord = (query: string) => {
  const entries = [
    ...chatbotKnowledge.records.certifications,
    ...chatbotKnowledge.records.achievements,
    ...chatbotKnowledge.records.publications,
  ];

  const scored = entries
    .map((entry) => ({
      entry,
      score: scoreTextMatch(query, [entry.title, entry.issuer, entry.type, entry.date, entry.note]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.entry;
};

const findBestPublication = (query: string) => {
  const scored = chatbotKnowledge.records.publications
    .map((entry) => ({
      entry,
      score: scoreTextMatch(query, [entry.title, entry.issuer, entry.note]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.entry;
};

const findBestSkillGroup = (query: string) => {
  const scored = chatbotKnowledge.profile.skillGroups
    .map((group) => ({
      group,
      score: scoreTextMatch(query, [
        group.label,
        group.description || '',
        ...group.skills.map((skill) => skill.name),
      ]),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored[0]?.group;
};

const navigationFaq = {
  label: chatbotKnowledge.ask.faqQuestions[0]?.label || 'Navigation ring',
  replyTitle: chatbotKnowledge.ask.faqReplies['navigation-ring'].title,
  replySummary: chatbotKnowledge.ask.faqReplies['navigation-ring'].summary,
  replyBullets: chatbotKnowledge.ask.faqReplies['navigation-ring'].bullets,
};

const actionReplyById = (id: 'best-ml' | 'recruiter-summary' | 'full-stack' | 'guide') => {
  const question = chatbotKnowledge.ask.actionQuestions.find((item) => item.id === id);
  const reply = chatbotKnowledge.ask.actionReplies[id];

  return {
    label: question?.label || reply.title,
    replyTitle: reply.title,
    replySummary: reply.summary,
    replyBullets: reply.bullets,
  };
};

const identityReplyByMode = (
  mode: 'general' | 'owner' | 'work' | 'classification' | 'location'
) => {
  const recruiterReply = chatbotKnowledge.ask.actionReplies['recruiter-summary'];
  const topProjects = chatbotKnowledge.projects
    .filter((project) => project.featured && !project.archive)
    .slice(0, 3)
    .map((project) => project.title)
    .join(', ');
  const internships = chatbotKnowledge.experience.internships
    .slice(0, 2)
    .map((entry) => `${entry.role} at ${entry.organization}`)
    .join(', ');
  const education = chatbotKnowledge.profile.education?.[0];
  const educationScore = education?.score
    ? `${education.score.label} ${education.score.value}`
    : null;
  const educationBullet = education
    ? `Academic background: ${education.qualification} at ${education.institution} (${education.period}${educationScore ? `, ${educationScore}` : ''}).`
    : null;
  const internshipLocations = Array.from(
    new Set(
      chatbotKnowledge.experience.internships
        .map((entry) => entry.location)
        .filter((location): location is string => typeof location === 'string' && location.length > 0)
    )
  );
  const campusLocations = Array.from(
    new Set(
      chatbotKnowledge.experience.leadership
        .map((entry) => entry.location)
        .filter((location): location is string => typeof location === 'string' && location.length > 0)
    )
  );

  if (mode === 'owner') {
    return {
      label: 'Portfolio Owner',
      replyTitle: 'Portfolio Owner',
      replySummary: `${chatbotKnowledge.site.ownerName} is the person behind this portfolio. ${chatbotKnowledge.site.shortBio}`,
      replyBullets: [
        `Current profile: ${chatbotKnowledge.site.headline}.`,
        `The portfolio highlights work such as ${topProjects}.`,
        ...(educationBullet ? [educationBullet] : []),
        `Supporting experience includes ${internships}.`,
      ],
    };
  }

  if (mode === 'classification') {
    return {
      label: 'Technical Classification',
      replyTitle: 'Technical Classification',
      replySummary:
        `${chatbotKnowledge.site.ownerName} is best classified as an ML-focused engineer who also ships full-stack product surfaces, rather than as a pure single-track software-only or research-only profile.`,
      replyBullets: [
        'Primary emphasis: forecasting systems, applied machine learning, analytics workflows, and computer vision-led assistive AI.',
        ...(educationBullet ? [educationBullet] : []),
        `Product delivery evidence: ${topProjects}.`,
        `Supporting experience includes ${internships}, which makes the profile more blended than a pure research-only track.`,
      ],
    };
  }

  if (mode === 'location') {
    return {
      label: 'Location Context',
      replyTitle: 'Location Context',
      replySummary:
        'The portfolio does not publish a single personal base location for Arjoneel. The strongest location-linked context it does publish is current study at SRM Institute of Science and Technology and internship experience in Noida, India.',
      replyBullets: [
        ...(education
          ? [
              `Current education anchor: ${education.institution} (${education.period}) for ${education.qualification}.`,
            ]
          : []),
        ...(internshipLocations.length > 0
          ? [`Published internship locations: ${internshipLocations.join(', ')}.`]
          : []),
        ...(campusLocations.length > 0
          ? [`Campus-linked leadership records: ${campusLocations.join(', ')}.`]
          : []),
      ],
    };
  }

  if (mode === 'work') {
    return {
      label: 'Profile and Work Summary',
      replyTitle: 'Profile Summary',
      replySummary: `${chatbotKnowledge.site.ownerName} is positioned as a ${chatbotKnowledge.site.headline.toLowerCase()} whose work centers on forecasting systems, assistive computer vision, and product-oriented technical delivery.`,
      replyBullets: [
        recruiterReply.bullets[0],
        ...(educationBullet ? [educationBullet] : []),
        `Supporting experience includes ${internships}.`,
        'The broader profile combines projects, internship evidence, grouped skills, and Lab work.',
      ],
    };
  }

  return {
    label: 'Profile Summary',
    replyTitle: 'Profile Summary',
    replySummary: `${chatbotKnowledge.site.ownerName} is the person behind this portfolio. ${chatbotKnowledge.site.shortBio}`,
    replyBullets: [
      `Current profile: ${chatbotKnowledge.site.headline}.`,
      recruiterReply.bullets[0],
      ...(educationBullet ? [educationBullet] : []),
      `Supporting experience includes ${internships}.`,
    ],
  };
};

const includesProfileFocus = (query: string) =>
  includesAny(query, [
    'profile focus',
    'what does the profile focus on',
    'current profile focus',
    'what does arjoneel focus on',
    'what is the profile focus',
    'what does the profile emphasize',
    'what is arjoneel focused on',
  ]);

const referencesEducationQuery = (query: string, queryTokens: string[]) => {
  // Exact single-word matches
  if (
    query === 'education' ||
    query === 'college' ||
    query === 'degree' ||
    query === 'cgpa' ||
    query === 'academics'
  ) {
    return true;
  }

  // Curated multi-word phrases
  if (
    includesAny(query, [
      'educational background',
      'academic background',
      'what is arjoneel s education',
      'what degree is arjoneel pursuing',
      'where does arjoneel study',
      'what is arjoneel s cgpa',
      'tell me about arjoneel s academics',
      'what is arjoneel studying',
      'what did arjoneel study',
      'what did arjoneel study in school',
      'what are arjoneel s class x and xii marks',
      'what are arjoneel s class xii marks',
      'what are arjoneel s class x marks',
      'arjoneel s cgpa',
      'arjoneel cgpa',
      'where does arjoneel go to college',
      'what university does arjoneel attend',
      'what is arjoneel s degree',
    ])
  ) {
    return true;
  }

  const mentionsOwner =
    hasTokenFamily(queryTokens, ['arjoneel'], 2) || hasTokenFamily(queryTokens, ['ghosh'], 1);
  const mentionsSchoolScoreCue =
    includesAny(query, ['class x', 'class xii', 'class 10', 'class 12']) ||
    hasTokenFamily(queryTokens, ['school', 'marks', 'percentage'], 1);

  if (mentionsOwner && mentionsSchoolScoreCue) {
    return true;
  }

  // Token-family match: education vocabulary — does NOT require name mention.
  // Allows up to 6 tokens to handle queries like "what is arjoneel's educational background".
  if (
    queryTokens.length <= 6 &&
    hasTokenFamily(
      queryTokens,
      [
        'education',
        'educational',
        'academic',
        'academics',
        'cgpa',
        'college',
        'degree',
        'university',
        'studied',
        'study',
        'studying',
        'institute',
        'gpa',
      ],
      2
    )
  ) {
    return true;
  }

  return false;
};

const referencesProfileLocationQuery = (query: string, queryTokens: string[]) => {
  const mentionsOwner =
    hasTokenFamily(queryTokens, ['arjoneel'], 2) || hasTokenFamily(queryTokens, ['ghosh'], 1);
  const mentionsLocationCue =
    includesAny(query, [
      'where is arjoneel based out of',
      'where is arjoneel based',
      'where is arjoneel located',
      'where is arjoneel from',
    ]) ||
    ((query.includes('where') || query.includes('location')) &&
      (query.includes('based') || query.includes('located') || query.includes('from')) &&
      mentionsOwner);

  return mentionsLocationCue;
};

const referencesIdentityProfile = (query: string, queryTokens: string[]) => {
  const mentionsOwner =
    hasTokenFamily(queryTokens, ['arjoneel'], 2) ||
    hasTokenFamily(queryTokens, ['ghosh'], 1) ||
    includesAny(query, ['person behind this portfolio', 'who made this portfolio']);
  const mentionsPublicationCue =
    hasTokenFamily(
      queryTokens,
      ['paper', 'publication', 'manuscript', 'record', 'ieee', 'author', 'published', 'article'],
      2
    ) || includesAny(query, ['listed on']);
  const mentionsIdentityCue =
    hasTokenFamily(queryTokens, ['who', 'introduce', 'summary', 'summarize', 'summarise', 'tell', 'about'], 2) ||
    includesAny(query, [
      'tell me about',
      'profile summary',
      'what kind of engineer',
      'what kind of developer',
      'background',
      'who is the person behind this portfolio',
      'who made this portfolio',
    ]);
  const mentionsWorkCue =
    hasTokenFamily(queryTokens, ['engineer', 'developer', 'background', 'work'], 1) ||
    includesAny(query, ['kind of engineer', 'kind of developer', 'about arjoneel s work', 'ml or software']);
  const mentionsClassificationCue =
    hasTokenFamily(queryTokens, ['classify', 'categorize', 'categorise'], 2) ||
    includesAny(query, ['ml or software', 'classify it clearly', 'categorize arjoneel technically']);

  return {
    mentionsOwner,
    mentionsIdentityCue: mentionsIdentityCue && !mentionsPublicationCue,
    mentionsWorkCue,
    mentionsClassificationCue,
    mentionsPublicationCue,
  };
};

const referencesPublicationAuthorQuery = (query: string, queryTokens: string[]) => {
  const mentionsOwner =
    hasTokenFamily(queryTokens, ['arjoneel'], 2) || hasTokenFamily(queryTokens, ['ghosh'], 1);
  const mentionsPublicationCue =
    hasTokenFamily(
      queryTokens,
      ['paper', 'publication', 'manuscript', 'record', 'ieee', 'author', 'published', 'article'],
      2
    ) ||
    includesAny(query, ['listed on', 'paper is arjoneel listed on']);

  return mentionsOwner && mentionsPublicationCue;
};

const includesSiteStructure = (query: string) =>
  includesAny(query, [
    'portfolio organized',
    'guide me through this portfolio',
    'how is the portfolio organized',
    'what sections are on the site',
    'what sections are on the portfolio',
    'what pages are on the site',
    'what pages are in the portfolio',
    'what sections are on this site',
    'what sections are on this portfolio',
    'what sections are on the website',
    'what pages are on the website',
    'what sections does the site have',
    'what sections does this portfolio have',
  ]);

const siteMetaById = chatbotKnowledge.siteMeta;

const getSiteMeta = (key: keyof typeof chatbotKnowledge.siteMeta): SiteMetaEntry =>
  siteMetaById[key];

const includesChatbotMeta = (query: string) =>
  includesAny(query, [
    'how does the chatbot for this portfolio website work',
    'how does the chatbot of the portfolio website work',
    'how does this chatbot work',
    'what powers this chatbot',
    'is this chatbot grounded',
    'does this chatbot use local knowledge',
    'how does the ask page work',
    'how does the ask section work',
    'difference between the faq rail and the chatbot',
    'difference between the faq panel and the chatbot',
    'does every page have chatbot support',
    'how does this portfolio website work',
    'what can i ask here',
    'does clicking a faq use the same pipeline as chat',
  ]);

const referencesChatbotMeta = (query: string, queryTokens: string[]) => {
  const mentionsChatbot =
    hasTokenFamily(queryTokens, ['chatbot', 'assistant'], 2) ||
    (hasTokenFamily(queryTokens, ['chat']) && hasTokenFamily(queryTokens, ['bot']));
  const mentionsSite =
    query.includes('website') || query.includes('site') || query.includes('portfolio');
  const mentionsAsk = hasTokenFamily(queryTokens, ['ask'], 1);
  const mentionsHow =
    hasTokenFamily(queryTokens, ['how', 'works', 'workflow'], 1) ||
    includesAny(query, ['how does', 'how do', 'how is']);
  const mentionsGrounding = hasTokenFamily(queryTokens, ['grounded', 'local', 'knowledge'], 2);
  const mentionsFaq = hasTokenFamily(queryTokens, ['faq', 'rail', 'panel'], 1);
  const mentionsNavigation = hasTokenFamily(queryTokens, ['navigation', 'navigate', 'ring'], 2);
  const mentionsPower = hasTokenFamily(queryTokens, ['power', 'powers', 'powered'], 2);
  const mentionsScope =
    includesAny(query, ['every page', 'all pages']) ||
    (hasTokenFamily(queryTokens, ['every', 'all'], 1) &&
      hasTokenFamily(queryTokens, ['page', 'pages'], 1));

  return {
    mentionsChatbot,
    mentionsSite,
    mentionsAsk,
    mentionsHow,
    mentionsGrounding,
    mentionsFaq,
    mentionsNavigation,
    mentionsPower,
    mentionsScope,
  };
};

export type CanonicalIntent =
  | 'project-overview'
  | 'broad-project-discovery'
  | 'comparative-projects'
  | 'fuzzy-project-discovery'
  | 'project-evidence'
  | 'education'
  | 'profile-location'
  | 'profile-classification'
  | 'profile-summary'
  | 'identity-intro'
  | 'portfolio-owner'
  | 'best-ml'
  | 'recruiter-summary'
  | 'full-stack'
  | 'guide'
  | 'agrifore'
  | 'lab-concepts'
  | 'internships'
  | 'navigation-ring'
  | 'tech-stack-summary'
  | 'lab-overview'
  | 'how-chatbot-works'
  | 'how-ask-page-works'
  | 'portfolio-structure'
  | 'website-navigation'
  | 'faq-vs-chat'
  | 'chatbot-scope'
  | 'chatbot-grounding'
  | 'chatbot-powering'
  | 'global-certifications'
  | 'certificates'
  | 'all-certifications'
  | null;

export interface PortfolioQueryResolution {
  normalizedQuery: string;
  canonicalIntent: CanonicalIntent;
  matchedDomain: PortfolioMatchContext['kind'];
  matchedEntryCount: number;
  context: PortfolioMatchContext;
}

type KnowledgeSearchContext = Extract<PortfolioMatchContext, { kind: 'knowledge-search' }>;
type ProjectSynthesisContext = Extract<PortfolioMatchContext, { kind: 'project-synthesis' }>;
type UnsupportedContext = Extract<PortfolioMatchContext, { kind: 'unsupported' }>;

const logKnowledgeResolution = ({
  query,
  canonicalIntent,
  context,
  stage,
}: {
  query: string;
  canonicalIntent: CanonicalIntent;
  context: KnowledgeSearchContext;
  stage: 'broad-synthesis' | 'fallback';
}) => {
  if (!DEBUG_RETRIEVAL) return;

  const docsCount = context.chunks.filter(
    (chunk) => chunk.sourceFile.includes('/docs/') || chunk.sourceFile.includes('\\docs\\')
  ).length;

  console.info('[portfolio-query-knowledge-resolution]', {
    query,
    canonicalIntent,
    deterministicResolverWonFirst: false,
    knowledgeRetrievalUsed: true,
    stage,
    resultSourceCounts: {
      docs: docsCount,
      content: context.chunks.length - docsCount,
    },
    topRetrievedChunks: context.chunks.map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
      sourceFile: chunk.sourceLabel,
      section: chunk.section,
      sourceBucket:
        chunk.sourceFile.includes('/docs/') || chunk.sourceFile.includes('\\docs\\')
          ? 'docs'
          : 'content',
    })),
  });
};

const PARTIAL_SUPPORT_RELATED = [
  'How does the chatbot for this portfolio website work?',
  'Is this chatbot grounded?',
  'Does every page have chatbot support?',
];

const getProjectWorkBuckets = (project: (typeof chatbotKnowledge.projects)[number]) =>
  Array.isArray(project.workBuckets) && project.workBuckets.length > 0
    ? project.workBuckets
    : [project.category];

const projectHasWorkBucket = (
  project: (typeof chatbotKnowledge.projects)[number],
  bucket: 'DS/ML' | 'Full Stack' | 'Research'
) => getProjectWorkBuckets(project).includes(bucket);

const getProjectDisciplineTags = (project: (typeof chatbotKnowledge.projects)[number]) =>
  Array.isArray(project.disciplineTags) ? project.disciplineTags : [];

const projectFingerprint = (project: (typeof chatbotKnowledge.projects)[number]) =>
  normalize(
    [
      project.title,
      project.shortTitle,
      project.slug,
      project.category,
      ...getProjectWorkBuckets(project),
      ...getProjectDisciplineTags(project),
      project.summary,
      project.previewSummary,
      project.overview,
      ...project.subcategories,
      ...project.tags,
      ...project.techStack,
      ...project.roleHints.map((hint) => `${hint.audience} ${hint.note}`),
    ].join(' ')
  );

const referencesComparativeProjects = (query: string, queryTokens: string[]) =>
  includesAny(query, [
    'which are the best projects',
    'which projects are strongest technically',
    'which projects seem most complete',
    'which projects feel most real-world',
    'which projects have the strongest evidence behind them',
    'which projects are the best for recruiters',
    'which projects are the best for data science',
    'which projects are the best for software roles',
    'which projects are the most mature',
    'which projects are the most polished',
    'which projects seem deepest',
    'which projects are backed by the most material',
    'which projects have deeper study material',
    'which projects have the strongest supporting documentation',
    'which projects seem best developed based on the supporting material',
    'which projects seem most mature from a product perspective',
    'which projects are most relevant for a data science role',
    'which projects are most relevant for an ml engineer role',
    'which projects are most relevant for an analytics role',
    'which projects are most relevant for a full stack role',
    'which projects are closest to real world applied ai',
    'which projects use image based or vision based approaches',
    'which projects involve practical ml rather than just theory',
  ]) ||
  ((referencesProjectsHint(query, queryTokens) ||
    hasTokenFamily(queryTokens, ['builds', 'build', 'work'], 2)) &&
    (query.includes('best') ||
      query.includes('strongest') ||
      query.includes('most ') ||
      query.includes('relevant') ||
      query.includes('deepest') ||
      query.includes('polished') ||
      query.includes('complete') ||
      query.includes('mature') ||
      query.includes('real world') ||
      query.includes('real-world') ||
      query.includes('evidence behind') ||
      query.includes('backed by') ||
      query.includes('best for')));

const referencesFuzzyProjectDiscovery = (query: string, queryTokens: string[]) =>
  includesAny(query, [
    'show me the cool stuff',
    'what s the strongest stuff here',
    'what s the serious work here',
    'what are the bigger projects',
    'what else is there apart from the obvious ones',
    'show me some deeper work',
    'what s the more technical stuff',
    'what are the more researchy things',
    'what are the more product like things',
    'what are the more practical builds',
  ]) ||
  ((hasTokenFamily(queryTokens, ['cool', 'serious', 'bigger', 'deeper', 'technical', 'researchy', 'product', 'practical'], 2) ||
    includesAny(query, ['apart from the obvious', 'strongest stuff'])) &&
    (referencesProjectsHint(query, queryTokens) ||
      hasTokenFamily(queryTokens, ['stuff', 'things', 'builds', 'work'], 2)));

const referencesBroadProjectDiscovery = (query: string, queryTokens: string[]) =>
  includesAny(query, [
    'tell me about the various data science projects',
    'tell me about more projects',
    'show me more projects',
    'what kinds of projects are in this portfolio',
    'what all has arjoneel built',
    'what sort of work is covered here',
    'give me an overview of the project work',
    'what are the main project categories',
    'what are some of the stronger projects here',
    'what technical work is represented in this portfolio',
    'what kind of engineering work is shown here',
    'what kind of software work is included',
    'what kind of ai work is included',
    'what kind of analytics work is included',
    'what kind of research style work is included',
    'what are the main themes across the projects',
    'which areas does this portfolio cover',
    'what has arjoneel worked on across different domains',
    'what are the different types of builds in this portfolio',
    'what project families appear here',
    'what data science work is included',
    'what data science projects are here',
    'what ml projects are here',
    'which projects are related to machine learning',
    'what analytics projects are here',
    'show projects involving forecasting',
    'which projects are forecasting focused',
    'which projects are forecasting-focused',
    'show projects involving prediction',
    'what work relates to modeling and forecasting',
    'what projects use data analysis heavily',
    'what projects would count as data heavy',
    'what quantitative or modeling work is here',
    'tell me about the software projects',
    'what full stack projects are there',
    'what web app work is included',
    'show me the stronger software engineering projects',
    'what product style builds are here',
    'which projects involve frontend and backend work',
    'which projects are actual apps rather than research',
    'what assistive ai work is included',
    'what computer vision projects are here',
    'what accessibility related work is here',
    'what projects involve interaction or user facing ai',
  ]) ||
  ((referencesProjectsHint(query, queryTokens) ||
    hasTokenFamily(queryTokens, ['build', 'built', 'builds', 'work', 'portfolio'], 2)) &&
    (hasTokenFamily(
      queryTokens,
      ['various', 'more', 'kinds', 'sort', 'overview', 'main', 'different', 'areas', 'domains', 'families'],
      2
    ) ||
      includesAny(query, ['kind of ai work', 'kind of software work', 'what all has arjoneel built'])));

const referencesDsMlBucketTerms = (query: string, queryTokens: string[]) =>
  includesAny(query, ['data science', 'machine learning', 'ds/ml', 'ml/data', 'analytics']) ||
  queryTokens.includes('ds') ||
  queryTokens.includes('ml');

const inferDsMlProjectListLabel = (query: string, queryTokens: string[]) => {
  if (
    includesAny(query, ['which projects are both ml and data science', 'ds/ml', 'ml/data']) ||
    (queryTokens.includes('ds') && queryTokens.includes('ml'))
  ) {
    return 'DS/ML Projects';
  }

  if (query.includes('analytics')) {
    return 'Analytics Projects';
  }

  if (query.includes('machine learning') || queryTokens.includes('ml')) {
    return 'Machine Learning Projects';
  }

  if (query.includes('data science') || queryTokens.includes('ds')) {
    return 'Data Science Projects';
  }

  return 'DS/ML Projects';
};

const buildDsMlProjectListContext = (query: string, queryTokens: string[]): PortfolioMatchContext => {
  const title = inferDsMlProjectListLabel(query, queryTokens);
  const answer =
    title === 'Data Science Projects'
      ? 'These are the current data science-oriented projects in the local portfolio knowledge base. DS/ML and older ML/Data wording still map to this same taxonomy.'
      : title === 'Machine Learning Projects'
        ? 'These are the current machine learning-oriented projects in the local portfolio knowledge base. DS/ML and older ML/Data wording still map to this same taxonomy.'
        : title === 'Analytics Projects'
          ? 'These are the current analytics-oriented projects in the local portfolio knowledge base. They are grouped through the same DS/ML bucket used elsewhere in the portfolio.'
          : 'These are the current DS/ML projects in the local portfolio knowledge base. Older ML/Data wording still maps to this same taxonomy.';

  return {
    kind: 'project-list',
    scope: 'ml',
    title,
    answer,
    related: ['Projects', 'DS/ML', 'Full Stack'],
    projects: chatbotKnowledge.projects.filter(
      (project) => projectHasWorkBucket(project, 'DS/ML') && !project.archive
    ),
  };
};

const referencesDsMlBucketQuery = (query: string, queryTokens: string[]) =>
  includesAny(query, [
    'ds projects',
    'data science projects',
    'ml projects',
    'machine learning projects',
    'ds/ml projects',
    'ml/data projects',
    'analytics projects',
    'all ds projects',
    'all data science projects',
    'all ml projects',
    'all machine learning projects',
    'all ds/ml projects',
    'show ds/ml work',
    'show ml/data work',
    'show all ds projects',
    'what ds/ml projects are here',
    'what data science projects are here',
    'what ml projects are here',
    'what machine learning projects are here',
    'what analytics projects are here',
    'which projects are both ml and data science',
    'what projects belong in ds/ml',
    'what projects belong in ml/data',
  ]) ||
  (referencesDsMlBucketTerms(query, queryTokens) &&
    referencesProjectsHint(query, queryTokens) &&
    (query.includes('here') ||
      query.includes('belong') ||
      query.includes('show') ||
      query.includes('which') ||
      query.includes('what') ||
      query.includes('all')));

const referencesProjectOverviewQuery = (query: string, queryTokens: string[]) => {
  const compactQuery = normalizeCompact(query);
  const genericProjectForms = [
    'project',
    'projects',
    'showprojects',
    'allprojects',
    'projectoverview',
    'portfolioprojects',
    'showallprojects',
    'projectsoverview',
    'tellmeabouttheprojects',
    'whatprojectsarehere',
  ];

  if (findExplicitProjectMention(query)) return false;
  if (referencesDsMlBucketQuery(query, queryTokens)) return false;

  if (
    includesAny(query, [
      'show ds/ml work',
      'show ml/data work',
      'show full-stack work',
      'full stack projects',
      'featured projects',
      'archive projects',
    ])
  ) {
    return false;
  }

  // Compact-form exact match — handles spacing variants like "proje cts" → "projects"
  if (genericProjectForms.some((value) => compactQuery === value)) return true;

  // Typo/spacing tolerance: >= 5 chars, edit distance <= 3 (catches projcts, projecst, etc.)
  if (compactQuery.length >= 5 && editDistance(compactQuery, 'projects') <= 3) return true;

  // Short query with a fuzzy project token (e.g. "my projects", "all projects")
  if (hasApproximateToken(queryTokens, 'projects', 2) && queryTokens.length <= 2) return true;

  return false;
};

const inferProjectSynthesisTheme = (
  query: string,
  queryTokens: string[],
  mode: ProjectSynthesisContext['mode']
): ProjectSynthesisTheme => {
  if (includesAny(query, ['ds/ml', 'ml/data'])) {
    return 'data-science';
  }

  if (hasTokenFamily(queryTokens, ['hackathon', 'hackathons', 'competition', 'competitive', 'demo-ready'], 2)) {
    return 'hackathon';
  }

  if (
    hasTokenFamily(queryTokens, ['assistive', 'accessibility', 'vision', 'image', 'computer'], 1) ||
    includesAny(query, [
      'assistive ai',
      'computer vision',
      'real world applied ai',
      'signchat',
      'flightfinder',
      'blind',
      'deaf',
      'asl',
    ])
  ) {
    return 'assistive-ai';
  }

  if (
    hasTokenFamily(
      queryTokens,
      ['forecasting', 'forecast', 'prediction', 'modeling', 'quantitative', 'trend', 'trends'],
      2
    ) ||
    includesAny(query, ['forecasting work', 'forecasting projects', 'forecasting focused', 'forecasting-focused'])
  ) {
    return 'forecasting';
  }

  if (
    hasTokenFamily(queryTokens, ['data', 'science', 'ml', 'analytics', 'pipeline', 'pipelines'], 2) ||
    includesAny(query, ['machine learning', 'data-heavy', 'structured data'])
  ) {
    return query.includes('analytics') ? 'analytics' : 'data-science';
  }

  if (
    hasTokenFamily(queryTokens, ['software', 'full', 'stack', 'frontend', 'backend', 'web', 'app'], 2) ||
    includesAny(query, ['full-stack', 'product style', 'product perspective'])
  ) {
    if (includesAny(query, ['product style', 'product-like'])) return 'product';
    return query.includes('full stack') || query.includes('full-stack') ? 'full-stack' : 'software';
  }

  if (hasTokenFamily(queryTokens, ['research', 'researchy', 'theory', 'paper'], 2)) {
    return 'research';
  }

  if (hasTokenFamily(queryTokens, ['recruiter', 'recruiters', 'hiring', 'roles'], 2)) {
    return 'recruiter';
  }

  if (hasTokenFamily(queryTokens, ['mature', 'complete', 'complete', 'polished', 'real-world'], 2)) {
    return 'maturity';
  }

  if (
    hasTokenFamily(queryTokens, ['deep', 'deeper', 'deepest', 'study', 'material', 'readiness'], 2) ||
    includesAny(query, ['supporting material', 'supporting documentation', 'evidence trail'])
  ) {
    return 'deep-work';
  }

  if (mode === 'fuzzy' && includesAny(query, ['apart from the obvious', 'more projects', 'what else is there'])) {
    return 'secondary';
  }

  if (hasTokenFamily(queryTokens, ['practical', 'practical builds'], 2)) return 'practical';
  if (hasTokenFamily(queryTokens, ['technical', 'serious', 'strongest'], 2)) return 'technical';
  if (hasTokenFamily(queryTokens, ['ai'], 1)) return 'ai';

  return 'overview';
};

const buildProjectSupportMap = (chunks: KnowledgeSearchContext['chunks']) => {
  const supportMap = new Map<
    string,
    { total: number; docs: number; content: number; sources: string[] }
  >();

  chunks.forEach((chunk) => {
    const fingerprint = normalize(
      [chunk.title, chunk.section, chunk.entity, chunk.content, chunk.sourceLabel].filter(Boolean).join(' ')
    );

    chatbotKnowledge.projects.forEach((project) => {
      const matchScore = scoreTextMatch(fingerprint, [project.title, project.shortTitle, project.slug]);
      if (matchScore < 10) return;

      const existing = supportMap.get(project.id) || {
        total: 0,
        docs: 0,
        content: 0,
        sources: [],
      };
      const sourceLabel = [chunk.sourceLabel, chunk.section].filter(Boolean).join(' / ');
      existing.total += 1;
      if (chunk.sourceFile.includes('/docs/') || chunk.sourceFile.includes('\\docs\\')) {
        existing.docs += 1;
      } else {
        existing.content += 1;
      }
      if (!existing.sources.includes(sourceLabel)) {
        existing.sources.push(sourceLabel);
      }
      supportMap.set(project.id, existing);
    });
  });

  return supportMap;
};

const scoreProjectForSynthesis = ({
  project,
  theme,
  mode,
  support,
}: {
  project: (typeof chatbotKnowledge.projects)[number];
  theme: ProjectSynthesisTheme;
  mode: ProjectSynthesisContext['mode'];
  support?: { total: number; docs: number; content: number };
}) => {
  const fingerprint = projectFingerprint(project);
  const supportTotal = support?.total || 0;
  const supportDocs = support?.docs || 0;
  let score = 40 - project.priority;

  if (project.featured) score += 10;
  if (project.status === 'Completed') score += 9;
  if (!project.archive) score += 5;
  if (project.links?.live) score += 4;
  if (supportTotal > 0) score += supportTotal * 6 + supportDocs * 3;

  switch (theme) {
    case 'data-science':
      if (projectHasWorkBucket(project, 'DS/ML')) score += 22;
      if (
        includesAny(fingerprint, [
          'forecast',
          'data utility',
          'recommendation',
          'dashboard analytics',
          'structured flight retrieval',
          'conversational search',
        ])
      ) {
        score += 10;
      }
      break;
    case 'forecasting':
      if (includesAny(fingerprint, ['forecast', 'trend', 'market intelligence', 'prophet', 'arima', 'xgboost'])) {
        score += 28;
      } else {
        score -= 22;
      }
      if (includesAny(fingerprint, ['prediction output', 'dashboard analytics', 'time series'])) score += 8;
      break;
    case 'analytics':
      if (projectHasWorkBucket(project, 'DS/ML')) score += 18;
      if (includesAny(fingerprint, ['analytics', 'dashboard', 'data utility', 'trend'])) score += 12;
      if (includesAny(fingerprint, ['recommendation', 'ranked suggestions', 'watched history'])) score += 8;
      if (includesAny(fingerprint, ['assistive', 'computer vision', 'signchat', 'blind', 'deaf'])) score -= 10;
      break;
    case 'software':
    case 'full-stack':
      if (projectHasWorkBucket(project, 'Full Stack')) score += 22;
      if (includesAny(fingerprint, ['react', 'fastapi', 'router', 'product', 'workflow'])) score += 10;
      break;
    case 'product':
      if (projectHasWorkBucket(project, 'Full Stack')) score += 18;
      if (includesAny(fingerprint, ['product system', 'catalog ui', 'fintech product', 'guided product', 'workflow'])) score += 14;
      break;
    case 'assistive-ai':
      if (includesAny(fingerprint, ['assistive', 'accessibility', 'signchat', 'flightfinder', 'computer vision', 'blind', 'deaf', 'mute'])) score += 24;
      break;
    case 'research':
      if (projectHasWorkBucket(project, 'DS/ML')) score += 14;
      if (includesAny(fingerprint, ['experiment', 'forecasting', 'computer vision', 'analytical'])) score += 10;
      break;
    case 'recruiter':
      if (project.featured) score += 12;
      if (project.status === 'Completed') score += 8;
      if (project.roleHints.some((hint) => hint.audience === 'recruiter')) score += 10;
      break;
    case 'maturity':
      if (project.status === 'Completed') score += 16;
      if (project.links?.live) score += 8;
      break;
    case 'technical':
      if (projectHasWorkBucket(project, 'DS/ML')) score += 12;
      if (includesAny(fingerprint, ['duckdb', 'xgboost', 'mediapipe', 'tensorflow', 'quota', 'forecast'])) score += 14;
      break;
    case 'deep-work':
      if (projectHasWorkBucket(project, 'DS/ML')) score += 10;
      if (supportTotal > 0) score += 12;
      break;
    case 'hackathon':
      if (supportTotal > 0) score += 14;
      if (includesAny(fingerprint, ['loanone', 'signchat', 'prototype'])) score += 8;
      break;
    case 'practical':
      if (project.status === 'Completed') score += 12;
      if (includesAny(fingerprint, ['utility', 'workflow', 'dashboard', 'catalog'])) score += 10;
      break;
    case 'secondary':
      if (!project.featured || project.archive) score += 14;
      if (project.featured) score -= 8;
      break;
    case 'ai':
      if (projectHasWorkBucket(project, 'DS/ML')) score += 16;
      if (includesAny(fingerprint, ['computer vision', 'forecast', 'machine learning', 'recommendation'])) score += 12;
      if (includesAny(fingerprint, ['flightfinder ai'])) score += 8;
      break;
    default:
      if (projectHasWorkBucket(project, 'DS/ML')) score += 8;
      if (project.featured) score += 6;
      break;
  }

  if (mode === 'comparative' && supportTotal > 0) score += 8;
  if (mode === 'evidence' && supportTotal === 0) score -= 12;
  if (mode === 'fuzzy' && theme === 'secondary' && project.archive) score += 8;

  return score;
};

const buildProjectReason = ({
  project,
  theme,
  mode,
  support,
}: {
  project: (typeof chatbotKnowledge.projects)[number];
  theme: ProjectSynthesisTheme;
  mode: ProjectSynthesisContext['mode'];
  support?: { total: number; docs: number; content: number; sources: string[] };
}) => {
  const whyItFits: string[] = [];
  const fingerprint = projectFingerprint(project);

  if (theme === 'forecasting') whyItFits.push('forecasting, trend analysis, and model-backed decision support');
  if (theme === 'data-science') {
    if (project.slug === 'flightfinder-ai') {
      whyItFits.push('AI-assisted interpretation layered over structured flight retrieval and accessibility-aware interaction');
    } else if (includesAny(fingerprint, ['forecast', 'xgboost', 'prophet', 'arima'])) {
      whyItFits.push('clear DS/ML workflow with forecasting or model-backed analytical delivery');
    } else if (includesAny(fingerprint, ['computer vision', 'mediapipe', 'tensorflow'])) {
      whyItFits.push('clear DS/ML workflow with computer-vision inference and model-backed interaction');
    } else {
      whyItFits.push('clear DS/ML workflow with modeling or analytical delivery');
    }
  }
  if (theme === 'analytics') {
    if (includesAny(fingerprint, ['dashboard', 'analytics', 'trend', 'cluster'])) {
      whyItFits.push('analytics dashboards, trend views, and structured-data decision support');
    } else if (includesAny(fingerprint, ['utility', 'sampler', 'csv', 'quota', 'yaml'])) {
      whyItFits.push('structured-data preparation and repeatable analysis workflow');
    } else {
      whyItFits.push('analytics and structured-data workflow');
    }
  }
  if (theme === 'software' || theme === 'full-stack') {
    if (
      projectHasWorkBucket(project, 'Full Stack') ||
      includesAny(fingerprint, ['react', 'router', 'fastapi', 'next.js', 'catalog', 'loan', 'travel assistant'])
    ) {
      if (project.slug === 'flightfinder-ai') {
        whyItFits.push('role-aware product workflow with chat, voice, sign, and backend-connected flight search');
      } else {
        whyItFits.push('end-to-end product workflow with UI and backend integration');
      }
    } else if (includesAny(fingerprint, ['dashboard', 'analytics', 'prediction output', 'guided interface'])) {
      whyItFits.push('productized technical system with a real interface over the underlying workflow');
    } else {
      whyItFits.push('software-facing implementation with a clearer workflow surface than a raw analysis artifact');
    }
  }
  if (theme === 'assistive-ai') {
    if (includesAny(fingerprint, ['computer vision', 'signchat', 'blind', 'deaf', 'mute'])) {
      whyItFits.push('user-facing assistive AI with a computer-vision interaction loop');
    } else {
      whyItFits.push('applied AI with a clearly user-facing interaction surface');
    }
  }
  if (theme === 'ai') {
    if (includesAny(fingerprint, ['computer vision', 'signchat'])) {
      whyItFits.push('applied AI with computer-vision or interaction-heavy behavior');
    } else {
      whyItFits.push('applied ML/AI workflow with a concrete product surface');
    }
  }
  if (theme === 'research') whyItFits.push('research-style technical work with study or experimentation depth');
  if (theme === 'product') whyItFits.push('more product-oriented implementation');
  if (theme === 'technical') whyItFits.push('strong technical depth in workflow, stack, or modeling choices');
  if (theme === 'practical') whyItFits.push('practical build with a usable workflow rather than a thin concept');
  if (theme === 'maturity' && project.status === 'Completed') whyItFits.push('completed status');
  if (theme === 'recruiter' && project.featured) whyItFits.push('featured portfolio signal');
  if (theme === 'secondary' && (!project.featured || project.archive)) whyItFits.push('less obvious than the main featured picks');
  if (support && support.total > 0 && (mode === 'evidence' || mode === 'comparative' || theme === 'deep-work' || theme === 'hackathon')) {
    whyItFits.push(
      support.docs > 0
        ? 'backed by deeper local docs and supporting material'
        : 'backed by supporting local content'
    );
  }

  const baseSummary = project.previewSummary || project.summary;
  return whyItFits.length > 0
    ? `${baseSummary} Why it fits here: ${whyItFits.slice(0, 2).join(', ')}.`
    : baseSummary;
};

const wantsThemeSummary = (query: string, queryTokens: string[]) =>
  hasTokenFamily(queryTokens, ['theme', 'themes', 'pattern', 'patterns', 'recurring'], 2) ||
  includesAny(query, [
    'recurring themes',
    'themes show up',
    'patterns appear',
    'recurring patterns',
    'themes across the portfolio content and docs',
  ]);

const dedupeExamples = (values: string[]) => Array.from(new Set(values)).slice(0, 3);

const buildThemeHighlights = ({
  projects,
  supportChunks,
}: {
  projects: ProjectSynthesisEntry[];
  supportChunks: KnowledgeSearchContext['chunks'];
}) => {
  const hasDocsSupport = supportChunks.some(
    (chunk) => chunk.sourceFile.includes('/docs/') || chunk.sourceFile.includes('\\docs\\')
  );
  const forecastingExamples = dedupeExamples(
    projects
      .filter(({ project }) =>
        includesAny(projectFingerprint(project), ['forecast', 'trend', 'agrifore', 'prophet', 'arima'])
      )
      .map(({ project }) => project.title)
  );
  const productExamples = dedupeExamples(
    projects
      .filter(({ project }) => project.category === 'Full Stack' || includesAny(projectFingerprint(project), ['workflow', 'catalog', 'guided', 'dashboard']))
      .map(({ project }) => project.title)
  );
  const assistiveExamples = dedupeExamples(
    projects
      .filter(({ project }) =>
        includesAny(projectFingerprint(project), ['assistive', 'computer vision', 'signchat', 'flightfinder'])
      )
      .map(({ project }) => project.title)
  );
  const toolingExamples = dedupeExamples(
    projects
      .filter(({ project }) =>
        includesAny(projectFingerprint(project), ['utility', 'sampler', 'yaml', 'repeatable', 'workflow'])
      )
      .map(({ project }) => project.title)
  );

  return [
    forecastingExamples.length > 0
      ? {
          label: 'Forecasting and decision support',
          summary:
            'Several stronger projects focus on prediction, trend analysis, and turning modeled output into usable decisions.',
          examples: forecastingExamples,
        }
      : null,
    productExamples.length > 0
      ? {
          label: 'Productized technical delivery',
          summary:
            'The portfolio repeatedly wraps technical systems in guided interfaces, workflow state, or business-facing product surfaces.',
          examples: productExamples,
        }
      : null,
    assistiveExamples.length > 0
      ? {
          label: 'Applied AI with human-facing interaction',
          summary:
            'A recurring pattern is AI or CV work that directly changes how a user interacts with the system, not just how a model scores data.',
          examples: assistiveExamples,
        }
      : null,
    toolingExamples.length > 0
      ? {
          label: 'Reusable tooling and workflow reliability',
          summary:
            'There is also a repeated emphasis on utilities and repeatable workflows that make technical work easier to run or reuse.',
          examples: toolingExamples,
        }
      : null,
    hasDocsSupport
      ? {
          label: 'Deeper supporting material around stronger projects',
          summary:
            'The stronger project set is backed by deeper study, readiness, or support material rather than only a live-summary layer.',
          examples: dedupeExamples(projects.map(({ project }) => project.title)),
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);
};

const buildProjectSynthesisContext = ({
  rawQuery,
  mode,
  forceProjectPresentation = false,
}: {
  rawQuery: string;
  mode: ProjectSynthesisContext['mode'];
  forceProjectPresentation?: boolean;
}): ProjectSynthesisContext | null => {
  const query = normalize(rawQuery);
  const queryTokens = tokenize(rawQuery);
  const theme = inferProjectSynthesisTheme(query, queryTokens, mode);
  const supportResults = searchKnowledgeChunks(rawQuery, mode === 'evidence' ? 8 : 6);
  const supportChunks = supportResults.map((result) => result.chunk);
  const supportMap = buildProjectSupportMap(supportChunks);
  const limit = mode === 'comparative' ? 4 : 5;
  const minimumSelectionCount = theme === 'forecasting' ? 2 : 3;

  const rankedProjects = chatbotKnowledge.projects
    .map((project) => {
      const support = supportMap.get(project.id);
      const score = scoreProjectForSynthesis({ project, theme, mode, support });
      return {
        project,
        support,
        score,
      };
    })
    .sort((left, right) => right.score - left.score);

  const minimumScore =
    mode === 'evidence'
      ? 46
      : theme === 'forecasting'
        ? 52
        : mode === 'comparative'
          ? 40
          : mode === 'fuzzy'
            ? 34
            : 30;

  const selectedProjects = rankedProjects
    .filter((entry, index) => entry.score >= minimumScore || index < minimumSelectionCount)
    .slice(0, limit)
    .map<ProjectSynthesisEntry>((entry) => ({
      project: entry.project,
      reason: buildProjectReason({
        project: entry.project,
        theme,
        mode,
        support: entry.support,
      }),
      supportCount: entry.support?.total || 0,
      supportingSources: entry.support?.sources.slice(0, 3) || [],
    }));

  if (selectedProjects.length === 0) {
    return null;
  }

  const presentation =
    forceProjectPresentation || !wantsThemeSummary(query, queryTokens) ? 'projects' : 'themes';
  const themeHighlights =
    presentation === 'themes'
      ? buildThemeHighlights({
          projects: selectedProjects,
          supportChunks,
        })
      : undefined;

  return {
    kind: 'project-synthesis',
    query: rawQuery,
    mode,
    theme,
    projects: selectedProjects,
    supportChunks: supportChunks.slice(0, 6),
    presentation,
    themeHighlights,
  };
};

const buildPartialSupportContext = (
  query: string,
  _queryTokens: string[]
): UnsupportedContext | null => {
  const mentionsChatSystem =
    query.includes('chatbot') ||
    query.includes('assistant') ||
    query.includes('ask page') ||
    query.includes('openrouter') ||
    query.includes('model') ||
    query.includes('fallback') ||
    query.includes('chat requests') ||
    query.includes('this site');
  const asksExactModelConfig =
    includesAny(query, [
      'exact model',
      'fallback models',
      'exact openrouter config',
      'openrouter config',
      'model is used',
    ]) ||
    ((query.includes('model') || query.includes('fallback')) &&
      (query.includes('exact') || query.includes('config') || query.includes('used')) &&
      mentionsChatSystem);
  const asksInfra =
    includesAny(query, [
      'backend infrastructure',
      'backend infra',
      'which server handles chat requests',
      'server handles chat requests',
      'monitoring stack',
      'vector database',
      'where is this site deployed',
      'site deployed',
    ]) ||
    ((query.includes('server') || query.includes('monitoring')) && mentionsChatSystem);
  const asksLimitsOrCost =
    includesAny(query, ['token limits', 'latency', 'request cost', 'each chatbot request cost']) ||
    ((query.includes('token') || query.includes('latency') || query.includes('cost')) && mentionsChatSystem);

  if (!asksExactModelConfig && !asksInfra && !asksLimitsOrCost) {
    return null;
  }

  if (asksExactModelConfig) {
    return {
      kind: 'unsupported',
      title: 'Grounded Portfolio Assistant',
      summary:
        'The current Ask product is a local-only portfolio assistant. The local knowledge supports the high-level behavior that Ask uses local intent routing, local retrieval, and bundled knowledge-search, but it does not publish any exact model or runtime configuration details.',
      bullets: [
        'Supported detail: Ask runs as a grounded local assistant over the portfolio corpus loaded into this site.',
        'Unsupported detail: exact model identifiers, fallback chains, and external runtime config values are not part of the current local Ask architecture.',
      ],
      related: PARTIAL_SUPPORT_RELATED,
      suggestions: PARTIAL_SUPPORT_RELATED,
    };
  }

  if (asksInfra) {
    return {
      kind: 'unsupported',
      title: 'Grounded Portfolio Assistant',
      summary:
        'I can explain the Ask workflow at a high level, but the exact backend, deployment, server, monitoring, or database setup is not available in the local portfolio knowledge loaded into this site.',
      bullets: [
        'Supported detail: Ask is the dedicated chatbot page and it runs on local intent routing plus bundled portfolio knowledge-search when needed.',
        'Unsupported detail: exact deployment target, server ownership, monitoring stack, and any vector-database usage are not exposed here.',
      ],
      related: PARTIAL_SUPPORT_RELATED,
      suggestions: PARTIAL_SUPPORT_RELATED,
    };
  }

  return {
    kind: 'unsupported',
    title: 'Grounded Portfolio Assistant',
    summary:
      'The local portfolio knowledge does not expose token limits, latency, or per-request cost for this assistant. I can only confirm the grounded high-level Ask behavior that is represented in the site knowledge.',
    bullets: [
      'Supported detail: the assistant is grounded in local portfolio knowledge and stays inside the bundled corpus when context is insufficient.',
      'Unsupported detail: exact token budgets, latency, and cost figures are not available in the local knowledge layer.',
    ],
    related: PARTIAL_SUPPORT_RELATED,
    suggestions: PARTIAL_SUPPORT_RELATED,
  };
};

const detectCanonicalIntent = (query: string, queryTokens: string[]): CanonicalIntent => {
  const metaRefs = referencesChatbotMeta(query, queryTokens);
  const identityRefs = referencesIdentityProfile(query, queryTokens);
  const knowledgeRefs = referencesKnowledgeSynthesis(query, queryTokens);

  if (
    includesAny(query, ['who made this portfolio', 'who is the person behind this portfolio']) ||
    (hasTokenFamily(queryTokens, ['who', 'made'], 1) && hasTokenFamily(queryTokens, ['portfolio'], 2)) ||
    (identityRefs.mentionsOwner && includesAny(query, ['made this portfolio', 'person behind this portfolio']))
  ) {
    return 'portfolio-owner';
  }

  if (
    includesAny(query, ['summarize arjoneel for a recruiter', 'summarize for recruiter']) ||
    (query.includes('recruiter') && query.includes('summarize'))
  ) {
    return 'recruiter-summary';
  }

  if (referencesProfileLocationQuery(query, queryTokens)) {
    return 'profile-location';
  }

  if (
    includesAny(query, [
      'classify arjoneel as ml or software dev',
      'categorize arjoneel technically',
      'is arjoneel more ml or more software',
      'what kind of engineer is arjoneel classify it clearly',
    ]) ||
    (identityRefs.mentionsOwner && identityRefs.mentionsClassificationCue)
  ) {
    return 'profile-classification';
  }

  if (
    referencesComparativeProjects(query, queryTokens) &&
    !metaRefs.mentionsChatbot &&
    !metaRefs.mentionsAsk &&
    !metaRefs.mentionsNavigation &&
    !(metaRefs.mentionsSite && metaRefs.mentionsHow)
  ) {
    return 'comparative-projects';
  }

  if (referencesDsMlBucketQuery(query, queryTokens)) {
    return 'best-ml';
  }

  if (
    referencesProjectOverviewQuery(query, queryTokens) ||
    // Belt-and-suspenders: bare project/projects tokens never misroute to experience
    query === 'project' ||
    query === 'projects' ||
    (queryTokens.length === 1 && hasApproximateToken(queryTokens, 'projects', 2)) ||
    (queryTokens.length === 2 &&
      hasApproximateToken(queryTokens, 'projects', 2) &&
      !findExplicitProjectMention(query))
  ) {
    return 'project-overview';
  }

  if (referencesEducationQuery(query, queryTokens)) {
    return 'education';
  }

  if (
    referencesKnowledgeSynthesis(query, queryTokens) &&
    !referencesDsMlBucketQuery(query, queryTokens) &&
    !metaRefs.mentionsChatbot &&
    !metaRefs.mentionsAsk &&
    !(metaRefs.mentionsSite && metaRefs.mentionsHow)
  ) {
    return 'project-evidence';
  }

  if (
    referencesFuzzyProjectDiscovery(query, queryTokens) &&
    !metaRefs.mentionsChatbot &&
    !(metaRefs.mentionsSite && metaRefs.mentionsHow)
  ) {
    return 'fuzzy-project-discovery';
  }

  if (
    referencesBroadProjectDiscovery(query, queryTokens) &&
    !metaRefs.mentionsChatbot &&
    !(metaRefs.mentionsSite && metaRefs.mentionsHow)
  ) {
    return 'broad-project-discovery';
  }

  if (
    includesAny(query, [
      'summarize arjoneel',
      'summarise arjoneel',
      'give me a profile summary of arjoneel',
      'what kind of engineer is arjoneel',
      'what kind of developer is arjoneel',
      'what is arjoneel s background',
    ]) ||
    query === 'profile' ||
    (identityRefs.mentionsOwner && identityRefs.mentionsWorkCue && !knowledgeRefs)
  ) {
    return 'profile-summary';
  }

  if (
    includesAny(query, ['introduce arjoneel', 'tell me about arjoneel', 'who is arjoneel']) ||
    (identityRefs.mentionsOwner &&
      identityRefs.mentionsIdentityCue &&
      !knowledgeRefs &&
      !identityRefs.mentionsWorkCue)
  ) {
    return 'identity-intro';
  }

  if (
    includesAny(query, ['what global certifications are listed', 'global certifications', 'servicenow certifications']) ||
    ((query.includes('global') || query.includes('servicenow')) && query.includes('certification'))
  ) {
    return 'global-certifications';
  }

  if (
    includesAny(query, ['what certificates are listed', 'certificates listed']) ||
    (query.includes('certificate') && !query.includes('global') && !query.includes('certification'))
  ) {
    return 'certificates';
  }

  if (
    includesAny(query, ['what certifications does arjoneel have', 'what certifications are listed', 'does the portfolio include servicenow certifications']) ||
    (query.includes('certification') && !query.includes('global'))
  ) {
    return 'all-certifications';
  }

  if (
    includesAny(query, ['what powers this chatbot', 'what powers the chatbot']) ||
    ((query.includes('power') || query.includes('powered')) && query.includes('chatbot')) ||
    (metaRefs.mentionsPower && metaRefs.mentionsChatbot)
  ) {
    return 'chatbot-powering';
  }

  if (
    includesAny(query, ['is this chatbot grounded', 'does this chatbot use local knowledge']) ||
    (query.includes('chatbot') && (query.includes('grounded') || query.includes('local knowledge'))) ||
    (metaRefs.mentionsChatbot && metaRefs.mentionsGrounding)
  ) {
    return 'chatbot-grounding';
  }

  if (
    includesAny(query, ['difference between the faq rail and the chatbot', 'difference between the faq panel and the chatbot']) ||
    ((query.includes('faq') || query.includes('rail') || query.includes('panel')) && query.includes('chat')) ||
    (metaRefs.mentionsFaq && metaRefs.mentionsChatbot)
  ) {
    return 'faq-vs-chat';
  }

  if (
    includesAny(query, ['does every page have chatbot support', 'does every page have chatbot capability']) ||
    ((query.includes('every page') || query.includes('all pages')) && query.includes('chatbot')) ||
    (metaRefs.mentionsScope && metaRefs.mentionsChatbot)
  ) {
    return 'chatbot-scope';
  }

  if (
    includesAny(query, ['how does the ask page work', 'how does the ask section work']) ||
    (query.includes('ask') && (query.includes('page') || query.includes('section')) && query.includes('work')) ||
    (metaRefs.mentionsAsk && metaRefs.mentionsHow)
  ) {
    return 'how-ask-page-works';
  }

  if (
    includesAny(query, ['how does the chatbot for this portfolio website work', 'how does the chatbot of the portfolio website work', 'how does this chatbot work', 'what can i ask here', 'does clicking a faq use the same pipeline as chat']) ||
    ((query.includes('chatbot') || query.includes('assistant')) && query.includes('work')) ||
    (metaRefs.mentionsChatbot && metaRefs.mentionsHow)
  ) {
    return 'how-chatbot-works';
  }

  if (
    includesAny(query, ['how does this portfolio website work', 'what is this portfolio website structure']) ||
    ((query.includes('website') || query.includes('site') || query.includes('portfolio')) && query.includes('work')) ||
    (metaRefs.mentionsSite && metaRefs.mentionsHow)
  ) {
    return 'portfolio-structure';
  }

  if (
    includesAny(query, ['how do i use the navigation ring', 'navigation ring']) &&
    !query.includes('work')
  ) {
    return 'navigation-ring';
  }

  if (
    includesAny(query, ['how do i navigate this site', 'how does the portfolio navigation work', 'how does the navigation work', 'how does the navigation ring work']) ||
    (query.includes('ring') && (query.includes('navigate') || query.includes('navigation'))) ||
    (query.includes('navigation') && (query.includes('site') || query.includes('portfolio') || query.includes('work'))) ||
    (metaRefs.mentionsNavigation && (metaRefs.mentionsHow || metaRefs.mentionsSite))
  ) {
    return 'website-navigation';
  }

  if (
    includesAny(query, [
      'best ml',
      'strongest ml',
      'machine learning projects',
      'tell me about the ml projects',
    ]) ||
    referencesDsMlBucketQuery(query, queryTokens) ||
    includesAny(query, ['ds/ml work', 'ml/data work']) ||
    ((query.includes('ml') || query.includes('data science') || query.includes('ds/ml') || query.includes('ml/data')) &&
      (referencesProjectsHint(query, queryTokens) || query.includes('strongest') || query.includes('best')))
  ) {
    return 'best-ml';
  }

  if (
    includesAny(query, ['show full-stack work', 'tell me about the full stack projects', 'explain full stack work']) ||
    ((query.includes('full stack') || query.includes('full-stack')) && referencesProjectsHint(query, queryTokens))
  ) {
    return 'full-stack';
  }

  if (includesAny(query, ['guide me through this portfolio', 'how is the portfolio organized'])) {
    return 'guide';
  }

  if (includesAny(query, ['what is agrifore', 'tell me about agrifore', 'tell me abt agrifore']) || query.includes('agrifore')) {
    return 'agrifore';
  }

  if (
    includesAny(query, ['what is in lab concepts', 'what is lab concepts about']) ||
    (query.includes('lab') && query.includes('concept'))
  ) {
    return 'lab-concepts';
  }

  if (includesAny(query, ['what internships are listed', 'internships listed', 'what internships'])) {
    return 'internships';
  }

  if (
    includesAny(query, ['summarize tech stack', 'summarise tech stak', 'tech stack summary', 'summarize the tech stack']) ||
    ((query.includes('stack') || query.includes('stak')) && query.includes('summar'))
  ) {
    return 'tech-stack-summary';
  }

  if (
    includesAny(query, ['what is the point of the lab section', 'what is the point of this lab']) ||
    (query.includes('lab') && (query.includes('point') || query.includes('purpose')))
  ) {
    return 'lab-overview';
  }

  return null;
};

const getMatchedEntryCount = (context: PortfolioMatchContext) => {
  switch (context.kind) {
    case 'project-list':
      return context.projects.length;
    case 'project-synthesis':
      return context.projects.length;
    case 'experience-list':
      return context.entries.length;
    case 'lab-lane':
      return context.entries.length;
    case 'record-list':
      return context.entries.length;
    case 'record-groups':
      return context.groups.reduce((count, group) => count + group.entries.length, 0);
    case 'education':
      return context.entries.length;
    case 'skills-overview':
      return context.groups.length;
    case 'tech-stack-groups':
      return context.groups.length;
    case 'site-structure':
      return context.sections.length;
    case 'knowledge-search':
      return context.chunks.length;
    case 'lab-overview':
      return context.lanes.length;
    case 'unsupported':
      return 0;
    default:
      return 1;
  }
};

function referencesProjectsHint(query: string, queryTokens: string[]) {
  return (
    query.includes('project') ||
    query.includes('work') ||
    query.includes('portfolio') ||
    hasApproximateToken(queryTokens, 'projects', 2)
  );
}

function referencesKnowledgeSynthesis(query: string, queryTokens: string[]) {
  const wantsEvidence =
    hasTokenFamily(queryTokens, ['evidence', 'supporting'], 2) ||
    includesAny(query, ['supporting material', 'supporting evidence', 'project evidence']);
  const wantsThemes =
    hasTokenFamily(queryTokens, ['theme', 'themes', 'recurring'], 2) ||
    includesAny(query, ['recurring themes', 'across the project docs']);
  const wantsReadiness =
    hasTokenFamily(queryTokens, ['readiness', 'ready'], 2) ||
    includesAny(query, ['docs say about project readiness']);
  const wantsHackathons = hasTokenFamily(queryTokens, ['hackathon', 'hackathons'], 2);
  const wantsStudyMaterial =
    includesAny(query, ['deeper study material', 'study material', 'deep study']) ||
    (hasTokenFamily(queryTokens, ['study'], 1) && hasTokenFamily(queryTokens, ['deep', 'deeper'], 2));
  const wantsDocs =
    hasTokenFamily(queryTokens, ['docs', 'documentation'], 2) ||
    includesAny(query, ['project docs', 'what do the docs say', 'strongest supporting material']);

  return wantsEvidence || wantsThemes || wantsReadiness || wantsHackathons || wantsStudyMaterial || wantsDocs;
}

function buildKnowledgeContext(
  rawQuery: string,
  mode: 'broad-synthesis' | 'fallback'
): KnowledgeSearchContext | null {
  const results = searchKnowledgeChunks(rawQuery, mode === 'broad-synthesis' ? 6 : 5);
  if (results.length === 0) return null;

  const bestResult = results[0];
  const minimumScore = mode === 'broad-synthesis' ? 72 : 88;
  const maximumFuseScore = mode === 'broad-synthesis' ? 0.62 : 0.48;

  if (
    bestResult.score < minimumScore &&
    bestResult.fuseScore !== null &&
    bestResult.fuseScore > maximumFuseScore
  ) {
    return null;
  }

  return {
    kind: 'knowledge-search',
    query: rawQuery,
    mode,
    chunks: results.map((result) => result.chunk),
  };
}

export function resolvePortfolioQuery(rawQuery: string): PortfolioQueryResolution {
  const query = normalize(rawQuery);
  const queryTokens = tokenize(rawQuery);
  const referencesProjects = referencesProjectsHint(query, queryTokens);
  const referencesKnowledge = referencesKnowledgeSynthesis(query, queryTokens);
  const canonicalIntent = detectCanonicalIntent(query, queryTokens);
  const metaRefs = referencesChatbotMeta(query, queryTokens);
  const identityRefs = referencesIdentityProfile(query, queryTokens);
  const isProjectSynthesisIntent =
    canonicalIntent === 'project-overview' ||
    canonicalIntent === 'broad-project-discovery' ||
    canonicalIntent === 'comparative-projects' ||
    canonicalIntent === 'fuzzy-project-discovery' ||
    canonicalIntent === 'project-evidence';
  let context: PortfolioMatchContext;

  if (!query) {
    context = {
      kind: 'unsupported',
      suggestions: [
        'What is AgriFore?',
        'What internships are listed?',
        'What is in Lab Concepts?',
      ],
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 0,
      context,
    };
  }

  const partialSupportContext = buildPartialSupportContext(query, queryTokens);
  if (partialSupportContext) {
    context = partialSupportContext;
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 0,
      context,
    };
  }

  if (referencesPublicationAuthorQuery(query, queryTokens)) {
    const publication = findBestPublication(query);
    if (publication) {
      context = { kind: 'record-entry', entry: publication };
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: 1,
        context,
      };
    }
  }

  if (canonicalIntent === 'portfolio-owner') {
    context = { kind: 'action', item: identityReplyByMode('owner') };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (canonicalIntent === 'profile-classification') {
    context = { kind: 'action', item: identityReplyByMode('classification') };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (canonicalIntent === 'profile-location') {
    context = { kind: 'action', item: identityReplyByMode('location') };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (canonicalIntent === 'identity-intro') {
    context = {
      kind: 'action',
      item: identityReplyByMode(identityRefs.mentionsWorkCue ? 'work' : 'general'),
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (canonicalIntent === 'profile-summary') {
    context = { kind: 'action', item: identityReplyByMode('work') };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (canonicalIntent === 'education') {
    context = { kind: 'education', entries: chatbotKnowledge.profile.education };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (canonicalIntent === 'global-certifications') {
    context = {
      kind: 'record-list',
      scope: 'global-certifications',
      entries: chatbotKnowledge.records.globalCertifications,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (canonicalIntent === 'certificates') {
    context = {
      kind: 'record-list',
      scope: 'certificates',
      entries: chatbotKnowledge.records.certificates,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (canonicalIntent === 'all-certifications') {
    context = {
      kind: 'record-groups',
      groups: [
        { label: 'Global Certifications', entries: chatbotKnowledge.records.globalCertifications },
        { label: 'Certificates', entries: chatbotKnowledge.records.certificates },
      ],
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: getMatchedEntryCount(context),
      context,
    };
  }

  if (
    !isProjectSynthesisIntent &&
    (
      canonicalIntent === 'how-chatbot-works' ||
      canonicalIntent === 'chatbot-powering' ||
      canonicalIntent === 'chatbot-grounding' ||
      canonicalIntent === 'how-ask-page-works' ||
      canonicalIntent === 'faq-vs-chat' ||
      canonicalIntent === 'chatbot-scope' ||
      canonicalIntent === 'portfolio-structure' ||
      canonicalIntent === 'website-navigation' ||
      includesChatbotMeta(query) ||
      (metaRefs.mentionsChatbot &&
        (metaRefs.mentionsHow || metaRefs.mentionsGrounding || metaRefs.mentionsPower)) ||
      (metaRefs.mentionsFaq && metaRefs.mentionsChatbot) ||
      (metaRefs.mentionsScope && metaRefs.mentionsChatbot) ||
      (metaRefs.mentionsNavigation && (metaRefs.mentionsHow || metaRefs.mentionsSite))
    )
  ) {
    const topicMap: Partial<
      Record<Exclude<CanonicalIntent, null>, keyof typeof chatbotKnowledge.siteMeta>
    > = {
      'how-chatbot-works': 'chatbotBehavior',
      'how-ask-page-works': 'askPageWorkflow',
      'portfolio-structure': 'portfolioStructure',
      'website-navigation': 'navigationSystem',
      'faq-vs-chat': 'faqVsChat',
      'chatbot-scope': 'chatbotScope',
      'chatbot-grounding': 'chatbotGrounding',
      'chatbot-powering': 'chatbotPowering',
    };

    const topicKey =
      canonicalIntent && topicMap[canonicalIntent]
        ? topicMap[canonicalIntent]
        : query.includes('same pipeline') || (query.includes('faq') && query.includes('chat'))
          ? 'faqVsChat'
          : query.includes('what can i ask')
            ? 'chatbotBehavior'
            : query.includes('faq') || query.includes('rail')
          ? 'faqVsChat'
          : query.includes('grounded') || query.includes('local knowledge')
            ? 'chatbotGrounding'
            : query.includes('every page')
              ? 'chatbotScope'
              : query.includes('ask')
                ? 'askPageWorkflow'
                : query.includes('navigate') || query.includes('ring')
                  ? 'navigationSystem'
                  : query.includes('power') || query.includes('powered')
                    ? 'chatbotPowering'
                    : query.includes('website') || query.includes('site') || query.includes('portfolio')
                      ? 'portfolioStructure'
                      : 'chatbotBehavior';

    context = { kind: 'site-meta', topic: getSiteMeta(topicKey) };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (
    includesAny(query, [
      'accuracy',
      'precision',
      'recall',
      'f1',
      'rmse',
      'mae',
      'mape',
      'auc',
      'roc',
      'benchmark',
      'target companies',
      'companies is he targeting',
      'company is he targeting',
    ])
  ) {
    context = {
      kind: 'unsupported',
      suggestions: [
        'What is AgriFore?',
        'What is the tech stack of FlightFinder AI?',
        'What internships are listed?',
      ],
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 0,
      context,
    };
  }

  if (canonicalIntent === 'navigation-ring') {
    context = { kind: 'faq', item: navigationFaq };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (canonicalIntent === 'recruiter-summary') {
    context = { kind: 'action', item: actionReplyById('recruiter-summary') };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (includesProfileFocus(query)) {
    context = { kind: 'skills-overview', groups: chatbotKnowledge.profile.skillGroups };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.groups.length,
      context,
    };
  }

  if (
    canonicalIntent === 'tech-stack-summary' ||
    query.includes('tech stack') ||
    query.includes('technologies') ||
    (query.includes('summarize') && query.includes('stack'))
  ) {
    if (
      canonicalIntent === 'tech-stack-summary' ||
      includesAny(query, ['what is the tech stack'])
    ) {
      context = { kind: 'tech-stack-groups', groups: getTechStackGroups() };
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: context.groups.length,
        context,
      };
    }

    const project = findBestProject(query);
    if (project) {
      context = { kind: 'project', project, request: 'tech-stack' };
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: 1,
        context,
      };
    }

    context = { kind: 'tech-stack-groups', groups: getTechStackGroups() };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.groups.length,
      context,
    };
  }

  if (
    canonicalIntent === 'project-overview' ||
    canonicalIntent === 'broad-project-discovery' ||
    canonicalIntent === 'comparative-projects' ||
    canonicalIntent === 'fuzzy-project-discovery' ||
    canonicalIntent === 'project-evidence'
  ) {
    const mode =
      canonicalIntent === 'comparative-projects'
        ? 'comparative'
        : canonicalIntent === 'fuzzy-project-discovery'
          ? 'fuzzy'
          : canonicalIntent === 'project-evidence'
            ? 'evidence'
            : 'discovery';
    const synthesisContext = buildProjectSynthesisContext({
      rawQuery,
      mode,
      forceProjectPresentation: canonicalIntent === 'project-overview',
    });

    if (synthesisContext) {
      context = synthesisContext;
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: synthesisContext.projects.length,
        context,
      };
    }
  }

  if (referencesKnowledge && canonicalIntent !== 'best-ml') {
    const knowledgeContext = buildKnowledgeContext(rawQuery, 'broad-synthesis');
    if (knowledgeContext) {
      logKnowledgeResolution({
        query: rawQuery,
        canonicalIntent,
        context: knowledgeContext,
        stage: 'broad-synthesis',
      });
      context = knowledgeContext;
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: knowledgeContext.chunks.length,
        context,
      };
    }
  }

  const explicitlyMentionedProject = findExplicitProjectMention(rawQuery);
  if (
    explicitlyMentionedProject &&
    includesAny(query, [
      'ds/ml',
      'ml/data',
      'data science',
      'machine learning',
      'full stack',
      'full-stack',
      'forecasting focused',
      'forecasting-focused',
      'both ml and data science',
    ])
  ) {
    context = {
      kind: 'project',
      project: explicitlyMentionedProject,
      request: 'overview',
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  if (
    canonicalIntent === 'best-ml' ||
    includesAny(query, [
      'all ds projects',
      'all data science projects',
      'best ml',
      'all ml projects',
      'strongest ml',
      'all machine learning projects',
      'all ds/ml projects',
      'machine learning projects',
      'show ds/ml work',
      'show ml/data work',
      'show all ds projects',
      'what ds/ml projects are here',
      'what data science projects are here',
      'what ml projects are here',
      'what machine learning projects are here',
      'which projects are both ml and data science',
      'what projects belong in ds/ml',
      'what analytics projects are here',
    ]) ||
    (referencesDsMlBucketTerms(query, queryTokens) &&
      (query.includes('best') || query.includes('strongest') || referencesProjects))
  ) {
    context = buildDsMlProjectListContext(query, queryTokens);
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: getMatchedEntryCount(context),
      context,
    };
  }

  if (
    canonicalIntent === 'full-stack' ||
    includesAny(query, ['full stack work', 'show full-stack work', 'full stack projects']) ||
    ((query.includes('full stack') || query.includes('full-stack')) && (referencesProjects || query.includes('work')))
  ) {
    context = {
      kind: 'project-list',
      scope: 'full-stack',
      projects: chatbotKnowledge.projects.filter(
        (project) => projectHasWorkBucket(project, 'Full Stack') && !project.archive
      ),
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.projects.length,
      context,
    };
  }

  if (includesAny(query, ['featured projects', 'featured work'])) {
    context = {
      kind: 'project-list',
      scope: 'featured',
      projects: chatbotKnowledge.projects.filter((project) => project.featured),
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.projects.length,
      context,
    };
  }

  if (query.includes('archive')) {
    context = {
      kind: 'project-list',
      scope: 'archive',
      projects: chatbotKnowledge.projects.filter((project) => project.archive),
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.projects.length,
      context,
    };
  }

  if (
    canonicalIntent === 'lab-overview' ||
    query.includes('lab') &&
    (query.includes('point') || query.includes('purpose') || query.includes('what is lab') || query.includes('lab section'))
  ) {
    context = {
      kind: 'lab-overview',
      answer:
        'The Lab section is the portfolio space for paper-backed work, future-facing concepts, and working prototypes that do not fit the main Projects shelf in the same way.',
      lanes: [
        { label: 'Papers', count: chatbotKnowledge.lab.papers.length },
        { label: 'Concepts', count: chatbotKnowledge.lab.concepts.length },
        { label: 'Working Prototypes', count: chatbotKnowledge.lab.workingPrototypes.length },
      ],
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.lanes.length,
      context,
    };
  }

  if (canonicalIntent === 'guide' || includesSiteStructure(query) || (query.includes('portfolio') && query.includes('organized'))) {
    context = { kind: 'site-structure', sections: chatbotKnowledge.site.sections };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.sections.length,
      context,
    };
  }

  if (canonicalIntent === 'lab-concepts' || includesAny(query, ['lab concepts', 'in lab concepts']) || (query.includes('lab') && query.includes('concept'))) {
    context = { kind: 'lab-lane', lane: 'concepts', entries: chatbotKnowledge.lab.concepts };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (includesAny(query, ['lab papers', 'paper in lab']) || (query.includes('lab') && query.includes('paper'))) {
    context = { kind: 'lab-lane', lane: 'papers', entries: chatbotKnowledge.lab.papers };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (
    includesAny(query, ['working prototypes', 'lab prototypes']) ||
    (query.includes('lab') && query.includes('prototype'))
  ) {
    context = {
      kind: 'lab-lane',
      lane: 'working-prototypes',
      entries: chatbotKnowledge.lab.workingPrototypes,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (canonicalIntent === 'internships' || query.includes('internship')) {
    context = {
      kind: 'experience-list',
      scope: 'internships',
      entries: chatbotKnowledge.experience.internships,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (query.includes('leadership')) {
    context = {
      kind: 'experience-list',
      scope: 'leadership',
      entries: chatbotKnowledge.experience.leadership,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (query.includes('certification') || query.includes('certificate')) {
    context = {
      kind: 'record-list',
      scope: 'certifications',
      entries: chatbotKnowledge.records.certifications,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (query.includes('achievement')) {
    context = {
      kind: 'record-list',
      scope: 'achievements',
      entries: chatbotKnowledge.records.achievements,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (
    (query.includes('agrifore') && (query.includes('manuscript') || query.includes('ieee'))) ||
    query.includes('publication') ||
    query.includes('manuscript')
  ) {
    const publication = findBestPublication(query);
    if (publication) {
      context = { kind: 'record-entry', entry: publication };
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: 1,
        context,
      };
    }

    context = {
      kind: 'record-list',
      scope: 'publications',
      entries: chatbotKnowledge.records.publications,
    };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.entries.length,
      context,
    };
  }

  if (query.includes('contact') || query.includes('email') || query.includes('linkedin') || query.includes('github')) {
    context = { kind: 'contact-links', links: chatbotKnowledge.profile.contactLinks };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.links.length,
      context,
    };
  }

  if (query.includes('skills')) {
    const group = findBestSkillGroup(query);
    if (group) {
      context = { kind: 'skill-group', group };
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: 1,
        context,
      };
    }
    context = { kind: 'skills-overview', groups: chatbotKnowledge.profile.skillGroups };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: context.groups.length,
      context,
    };
  }

  const project = findBestProject(query);
  if (project) {
    context = { kind: 'project', project, request: 'overview' };
    return {
      normalizedQuery: query,
      canonicalIntent: canonicalIntent || (project.slug === 'agrifore' ? 'agrifore' : null),
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  // Guard: project-overview signals must never misroute to experience entries.
  // This prevents bare "projects" from matching "Project Intern" at Sopra Steria.
  if (!referencesProjectOverviewQuery(query, queryTokens) && query !== 'project' && query !== 'projects') {
    const experience = findBestExperience(query);
    if (experience) {
      context = { kind: 'experience-entry', entry: experience };
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: 1,
        context,
      };
    }
  }

  const labEntry = findBestLabEntry(query);
  if (labEntry) {
    context = { kind: 'lab-entry', entry: labEntry };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  const record = findBestRecord(query);
  if (record) {
    context = { kind: 'record-entry', entry: record };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  const skillGroup = findBestSkillGroup(query);
  if (skillGroup) {
    context = { kind: 'skill-group', group: skillGroup };
    return {
      normalizedQuery: query,
      canonicalIntent,
      matchedDomain: context.kind,
      matchedEntryCount: 1,
      context,
    };
  }

  const fallbackKnowledgeProfile = getKnowledgeQueryProfile(rawQuery);
  if (
    fallbackKnowledgeProfile.wantsBroadSynthesis ||
    fallbackKnowledgeProfile.wantsDocs ||
    (fallbackKnowledgeProfile.wantsForecasting && referencesProjects)
  ) {
    const fallbackKnowledgeContext = buildKnowledgeContext(rawQuery, 'fallback');
    if (fallbackKnowledgeContext) {
      logKnowledgeResolution({
        query: rawQuery,
        canonicalIntent,
        context: fallbackKnowledgeContext,
        stage: 'fallback',
      });
      context = fallbackKnowledgeContext;
      return {
        normalizedQuery: query,
        canonicalIntent,
        matchedDomain: context.kind,
        matchedEntryCount: fallbackKnowledgeContext.chunks.length,
        context,
      };
    }
  }

  context = {
    kind: 'unsupported',
    suggestions: [
      'Show DS/ML work',
      'Summarize tech stack',
      'What is in Lab Concepts?',
      'What internships are listed?',
    ],
  };

  return {
    normalizedQuery: query,
    canonicalIntent,
    matchedDomain: context.kind,
    matchedEntryCount: 0,
    context,
  };
}

export function retrievePortfolioContext(rawQuery: string): PortfolioMatchContext {
  return resolvePortfolioQuery(rawQuery).context;
}
