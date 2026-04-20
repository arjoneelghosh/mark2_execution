import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const reportPath = path.join(root, 'report.md');

const questionGroups = [
  {
    code: 'A',
    label: 'Broad ambiguous project-discovery',
    questions: [
      'Tell me about the various data science projects.',
      'Tell me about more projects.',
      'Show me more projects.',
      'What kinds of projects are in this portfolio?',
      'What all has Arjoneel built?',
      'What sort of work is covered here?',
      'Give me an overview of the project work.',
      'What are the main project categories?',
      'What are some of the stronger projects here?',
      'What technical work is represented in this portfolio?',
      'What kind of engineering work is shown here?',
      'What kind of software work is included?',
      'What kind of AI work is included?',
      'What kind of analytics work is included?',
      'What kind of research-style work is included?',
      'What are the main themes across the projects?',
      'Which areas does this portfolio cover?',
      'What has Arjoneel worked on across different domains?',
      'What are the different types of builds in this portfolio?',
      'What project families appear here?',
    ],
  },
  {
    code: 'B',
    label: 'Ambiguous data-science / ML / analytics',
    questions: [
      'Tell me about the various data science projects.',
      'What data science work is included?',
      'Which projects are related to machine learning?',
      'What analytics projects are here?',
      'Show projects involving forecasting.',
      'Show projects involving prediction.',
      'What work relates to modeling and forecasting?',
      'What projects use data analysis heavily?',
      'What are the strongest ML or data projects?',
      'Which projects involve structured data pipelines?',
      'Which projects are about forecasting or trends?',
      'What projects would count as data-heavy?',
      'What quantitative or modeling work is here?',
      'Which projects are most relevant for a data science role?',
      'Which projects are most relevant for an ML engineer role?',
      'Which projects are most relevant for an analytics role?',
      'What evidence is there for forecasting work?',
      'What evidence is there for machine learning work?',
      'What deeper supporting material exists for data science work?',
      'What docs support the forecasting projects?',
    ],
  },
  {
    code: 'C',
    label: 'Ambiguous full-stack / software',
    questions: [
      'Tell me about the software projects.',
      'What full-stack projects are there?',
      'What web app work is included?',
      'Show me the stronger software engineering projects.',
      'Which projects are most relevant for a full-stack role?',
      'What product-style builds are here?',
      'Which projects involve frontend and backend work?',
      'Which projects are actual apps rather than research?',
      'What engineering projects feel most product-ready?',
      'What evidence exists for full-stack development?',
      'What docs support the stronger software projects?',
      'Which projects seem most mature from a product perspective?',
    ],
  },
  {
    code: 'D',
    label: 'Assistive AI / CV / applied AI',
    questions: [
      'What assistive AI work is included?',
      'What computer vision projects are here?',
      'What accessibility-related work is here?',
      'What projects involve interaction or user-facing AI?',
      'Which projects use image-based or vision-based approaches?',
      'Which projects are closest to real-world applied AI?',
      'What evidence exists for assistive technology work?',
      'Which projects involve practical ML rather than just theory?',
    ],
  },
  {
    code: 'E',
    label: 'Broad synthesis over docs and content',
    questions: [
      'What recurring themes show up across the project docs?',
      'What do the docs say about project readiness?',
      'Which projects have deeper study material?',
      'Which projects have the strongest supporting documentation?',
      'What stronger supporting material exists beyond the live summaries?',
      'What themes show up across the portfolio content and docs?',
      'Which projects seem most mature based on the docs?',
      'Which projects seem best developed based on the supporting material?',
      'Which areas have the richest documentation?',
      'Which projects have the deepest writeups?',
      'Which projects have the best evidence trail?',
      'What does the material suggest about project depth?',
      'What do the docs suggest about Arjoneel’s strongest areas?',
      'What project evidence exists for forecasting work?',
      'What project evidence exists for full-stack work?',
      'What project evidence exists for assistive AI work?',
      'What broader evidence exists for Arjoneel’s project work?',
      'What docs mention deeper study material?',
      'What do the docs say about project population readiness?',
      'Summarize the strongest supporting material for Arjoneel’s project work.',
    ],
  },
  {
    code: 'F',
    label: 'Hackathon / achievement-project overlap',
    questions: [
      'What did Arjoneel build at hackathons?',
      'What hackathon work is included?',
      'Which projects came from hackathons?',
      'What work seems competition-oriented?',
      'What project evidence exists for hackathon work?',
      'What are the strongest hackathon-style builds?',
      'Which projects seem most demo-ready?',
      'What practical builds came out of competitive settings?',
    ],
  },
  {
    code: 'G',
    label: 'Broad recruiter-style prompts',
    questions: [
      'Tell me about Arjoneel’s technical profile.',
      'What kind of roles is Arjoneel suited for?',
      'What are Arjoneel’s strongest areas?',
      'What kind of engineer is Arjoneel?',
      'What kind of developer is Arjoneel?',
      'What does this portfolio suggest about Arjoneel’s strengths?',
      'What is the overall technical profile here?',
      'Summarize the strongest evidence for hiring Arjoneel.',
      'What kinds of roles would this portfolio support?',
      'What are the most credible technical signals here?',
      'What work would stand out to recruiters?',
      'What are the strongest portfolio highlights overall?',
    ],
  },
  {
    code: 'H',
    label: 'Identity/profile deterministic controls',
    questions: [
      'Who is Arjoneel?',
      'Tell me about Arjoneel.',
      'Introduce Arjoneel.',
      'Summarize Arjoneel.',
      'Give me a profile summary of Arjoneel.',
      'Summarize Arjoneel for a recruiter.',
      'Give me a recruiter summary of Arjoneel.',
      'Who is the person behind this portfolio?',
      'Who made this portfolio?',
      'Tell me about the person behind this site.',
    ],
  },
  {
    code: 'I',
    label: 'Publication vs identity confusion',
    questions: [
      'Who is Arjoneel?',
      'What paper is Arjoneel listed on?',
      'Tell me about Arjoneel’s AgriFore paper.',
      'Which publication lists Arjoneel as an author?',
      'What article is Arjoneel listed in?',
      'Summarize the manuscript Arjoneel is listed on.',
      'Is AgriFore a project or a manuscript record?',
      'What publication record mentions Arjoneel?',
    ],
  },
  {
    code: 'J',
    label: 'Site / chatbot / portfolio-meta',
    questions: [
      'How does the chatbot for this portfolio website work?',
      'How does this portfolio website work?',
      'What powers this chatbot?',
      'Is this chatbot grounded?',
      'How does the Ask page work?',
      'What is the difference between the FAQ rail and the chatbot?',
      'Does every page have chatbot support?',
      'How does the navigation ring work?',
      'What can I ask here?',
      'Does clicking a FAQ use the same pipeline as chat?',
    ],
  },
  {
    code: 'K',
    label: 'Direct deterministic control queries',
    questions: [
      'What is AgriFore?',
      'What internships are listed?',
      'What is in Lab Concepts?',
      'Show full-stack work.',
      'What papers are listed?',
      'What certifications are listed?',
      'What achievements are listed?',
    ],
  },
  {
    code: 'L',
    label: 'Vague comparative questions',
    questions: [
      'Which are the best projects?',
      'Which projects are strongest technically?',
      'Which projects seem most complete?',
      'Which projects feel most real-world?',
      'Which projects have the strongest evidence behind them?',
      'Which projects are the best for recruiters?',
      'Which projects are the best for data science?',
      'Which projects are the best for software roles?',
      'Which projects are the most mature?',
      'Which projects are the most polished?',
      'Which projects seem deepest?',
      'Which projects are backed by the most material?',
    ],
  },
  {
    code: 'M',
    label: 'Intentionally fuzzy / informal',
    questions: [
      'Show me the cool stuff.',
      'What’s the strongest stuff here?',
      'What’s the serious work here?',
      'What are the bigger projects?',
      'What else is there apart from the obvious ones?',
      'Show me some deeper work.',
      'What’s the more technical stuff?',
      'What are the more researchy things?',
      'What are the more product-like things?',
      'What are the more practical builds?',
    ],
  },
  {
    code: 'N',
    label: 'Typo-heavy versions',
    questions: [
      'tell me abot the varous data science projects',
      'tel me about more projects',
      'what are the strognest ml projects',
      'what do the docs say abot project readiness',
      'what did arjoneel bild at hackathons',
      'which projects have deper study material',
      'what suporting material exists for forecasting work',
      'who made this porfolio',
      'how does the chatbt for this porfolio websit work',
    ],
  },
  {
    code: 'O',
    label: 'Boundary / refusal checks',
    questions: [
      'What is the capital of France?',
      'Who won the latest IPL match?',
      'What is the weather in Chennai today?',
      'Give me stock tips.',
      'Tell me today’s news.',
      'Which laptop should I buy?',
      'What are current crypto prices?',
      'Explain quantum mechanics.',
      'Write code for merge sort.',
    ],
  },
  {
    code: 'P',
    label: 'Partial-support / safe-unknown',
    questions: [
      'What exact backend infrastructure powers this chatbot?',
      'What exact model is used and what are the fallback models?',
      'What are the token limits of this chatbot?',
      'What latency does this chatbot get?',
      'Where is this site deployed?',
      'How much does each chatbot request cost?',
      'Is there a vector database here?',
      'What is the exact OpenRouter config?',
      'Which server handles chat requests?',
      'What monitoring stack is used?',
    ],
  },
];

const flattenQuestions = (groups) => {
  let current = 1;
  return groups.flatMap((group) =>
    group.questions.map((text) => ({
      number: current++,
      categoryCode: group.code,
      categoryLabel: group.label,
      text,
    }))
  );
};

const questions = flattenQuestions(questionGroups);

const mutedPrefixes = new Set([
  '[portfolio-knowledge-index-ready]',
  '[portfolio-knowledge-search]',
  '[portfolio-query-knowledge-resolution]',
]);

const originalInfo = console.info.bind(console);
const originalWarn = console.warn.bind(console);

console.info = (...args) => {
  if (typeof args[0] === 'string' && mutedPrefixes.has(args[0])) return;
  originalInfo(...args);
};

console.warn = (...args) => {
  if (typeof args[0] === 'string' && mutedPrefixes.has(args[0])) return;
  originalWarn(...args);
};

const isDocsChunk = (chunk) =>
  chunk?.sourceFile?.includes('/docs/') || chunk?.sourceFile?.includes('\\docs\\');

const renderReplyText = (reply) => {
  const lines = [];

  if (reply.title) lines.push(`Title: ${reply.title}`);
  lines.push(`Answer: ${reply.answer}`);

  if (reply.bullets?.length) {
    lines.push('Bullets:');
    reply.bullets.forEach((bullet) => lines.push(`- ${bullet}`));
  }

  if (reply.links?.length) {
    lines.push('Links:');
    reply.links.forEach((link) => lines.push(`- ${link.label}: ${link.href}`));
  }

  if (reply.related?.length) {
    lines.push('Related:');
    reply.related.forEach((item) => lines.push(`- ${item}`));
  }

  if (reply.unsupported) {
    lines.push('Unsupported: true');
  }

  return lines.join('\n');
};

const buildSupportDiagnostics = (context) => {
  switch (context.kind) {
    case 'knowledge-search':
      return context.chunks.slice(0, 6).map((chunk) => ({
        label: `${chunk.title} (${chunk.sourceLabel}${chunk.section ? ` / ${chunk.section}` : ''})`,
        sourceBucket: isDocsChunk(chunk) ? 'docs' : 'content',
      }));
    case 'project-synthesis':
      return [
        ...context.projects.slice(0, 5).map((entry) => ({
          label: `${entry.project.title}${entry.supportingSources?.length ? ` | ${entry.supportingSources.join(', ')}` : ''}`,
          sourceBucket: 'local-knowledge',
        })),
        ...context.supportChunks.slice(0, 4).map((chunk) => ({
          label: `${chunk.title} (${chunk.sourceLabel}${chunk.section ? ` / ${chunk.section}` : ''})`,
          sourceBucket: isDocsChunk(chunk) ? 'docs' : 'content',
        })),
      ].slice(0, 6);
    case 'project':
      return [{ label: context.project.title, sourceBucket: 'local-knowledge' }];
    case 'project-list':
      return context.projects.slice(0, 6).map((project) => ({
        label: project.title,
        sourceBucket: 'local-knowledge',
      }));
    case 'experience-entry':
      return [{ label: `${context.entry.role} at ${context.entry.organization}`, sourceBucket: 'local-knowledge' }];
    case 'experience-list':
      return context.entries.slice(0, 6).map((entry) => ({
        label: `${entry.role} at ${entry.organization}`,
        sourceBucket: 'local-knowledge',
      }));
    case 'lab-lane':
      return context.entries.slice(0, 6).map((entry) => ({
        label: entry.title,
        sourceBucket: 'local-knowledge',
      }));
    case 'lab-entry':
      return [{ label: context.entry.title, sourceBucket: 'local-knowledge' }];
    case 'record-list':
      return context.entries.slice(0, 6).map((entry) => ({
        label: entry.title,
        sourceBucket: 'local-knowledge',
      }));
    case 'record-groups':
      return context.groups.flatMap((group) =>
        group.entries.slice(0, 4).map((entry) => ({
          label: `${group.label}: ${entry.title}`,
          sourceBucket: 'local-knowledge',
        }))
      );
    case 'record-entry':
      return [{ label: context.entry.title, sourceBucket: 'local-knowledge' }];
    case 'skill-group':
      return [{ label: context.group.label, sourceBucket: 'local-knowledge' }];
    case 'skills-overview':
      return context.groups.slice(0, 6).map((group) => ({
        label: group.label,
        sourceBucket: 'local-knowledge',
      }));
    case 'tech-stack-groups':
      return context.groups.slice(0, 6).map((group) => ({
        label: group.label,
        sourceBucket: 'local-knowledge',
      }));
    case 'site-meta':
      return [{ label: context.topic.label, sourceBucket: 'local-knowledge' }];
    case 'site-structure':
      return context.sections.slice(0, 6).map((section) => ({
        label: section,
        sourceBucket: 'local-knowledge',
      }));
    case 'faq':
    case 'action':
      return [{ label: context.item.replyTitle, sourceBucket: 'local-knowledge' }];
    case 'unsupported':
      return [];
    default:
      return [];
  }
};

const expectedStatus = (status, note) => ({ status, note });

const evaluateQuestion = (question, resolution, reply) => {
  const domain = resolution.matchedDomain;
  const intent = resolution.canonicalIntent;
  const text = question.text.toLowerCase();
  const broadProjectOkay =
    domain === 'knowledge-search' || domain === 'project-list' || domain === 'project-synthesis';
  const maybeBroadOkay = broadProjectOkay || domain === 'project' || domain === 'action';

  if (question.categoryCode === 'A') {
    if (broadProjectOkay) return expectedStatus('PASS', 'Broad project-discovery routed to synthesis/list-style context.');
    if (domain === 'project' || domain === 'action') return expectedStatus('SOFT FAIL', 'Broad project-discovery question resolved too narrowly.');
    return expectedStatus('FAIL', 'Broad project-discovery question routed to the wrong domain.');
  }

  if (question.categoryCode === 'B') {
    const wantsEvidence = text.includes('evidence') || text.includes('docs') || text.includes('deeper');
    if (wantsEvidence) {
      if (domain === 'knowledge-search' || domain === 'project-synthesis') return expectedStatus('PASS', 'Evidence/docs-oriented ML question used broad grounded synthesis.');
      if (domain === 'project-list' || domain === 'project') return expectedStatus('SOFT FAIL', 'Evidence/docs-oriented ML question stayed too shallow.');
      return expectedStatus('FAIL', 'Evidence/docs-oriented ML question routed incorrectly.');
    }
    if (broadProjectOkay) return expectedStatus('PASS', 'ML/data question stayed in project-oriented retrieval.');
    if (domain === 'project') return expectedStatus('SOFT FAIL', 'Plural ML/data question collapsed to a single project.');
    return expectedStatus('FAIL', 'ML/data question routed outside project-oriented contexts.');
  }

  if (question.categoryCode === 'C') {
    const wantsEvidence = text.includes('evidence') || text.includes('docs') || text.includes('mature') || text.includes('product perspective');
    if (wantsEvidence) {
      if (domain === 'knowledge-search' || domain === 'project-synthesis') return expectedStatus('PASS', 'Software/full-stack evidence question used broad grounded synthesis.');
      if (domain === 'project-list' || domain === 'project') return expectedStatus('SOFT FAIL', 'Software/full-stack evidence question stayed narrow.');
      return expectedStatus('FAIL', 'Software/full-stack evidence question routed incorrectly.');
    }
    if (broadProjectOkay) return expectedStatus('PASS', 'Software/full-stack question stayed in project-oriented retrieval.');
    if (domain === 'project') return expectedStatus('SOFT FAIL', 'Plural software/full-stack question collapsed to one project.');
    return expectedStatus('FAIL', 'Software/full-stack question routed outside project-oriented contexts.');
  }

  if (question.categoryCode === 'D') {
    if (domain === 'knowledge-search' || domain === 'project-list') return expectedStatus('PASS', 'Assistive/CV question used broad project-oriented retrieval.');
    if (domain === 'project') return expectedStatus('SOFT FAIL', 'Assistive/CV question collapsed to a single project.');
    return expectedStatus('FAIL', 'Assistive/CV question routed incorrectly.');
  }

  if (question.categoryCode === 'E') {
    if (domain === 'knowledge-search' || domain === 'project-synthesis') return expectedStatus('PASS', 'Docs/content synthesis question used the retrieval-backed synthesis path.');
    if (domain === 'project' || domain === 'project-list') return expectedStatus('SOFT FAIL', 'Docs/content synthesis question stayed too deterministic.');
    return expectedStatus('FAIL', 'Docs/content synthesis question missed the retrieval layer.');
  }

  if (question.categoryCode === 'F') {
    if (domain === 'knowledge-search' || domain === 'project-list' || domain === 'project-synthesis') return expectedStatus('PASS', 'Hackathon-overlap question used broad retrieval.');
    if (domain === 'project') return expectedStatus('SOFT FAIL', 'Hackathon-overlap question collapsed to a single project.');
    return expectedStatus('FAIL', 'Hackathon-overlap question routed incorrectly.');
  }

  if (question.categoryCode === 'G') {
    if (domain === 'action') return expectedStatus('PASS', 'Recruiter/profile prompt used the intended local action summary path.');
    if (domain === 'knowledge-search' || domain === 'project-list') return expectedStatus('SOFT FAIL', 'Recruiter/profile prompt was plausible but not routed to the strongest profile summary path.');
    return expectedStatus('FAIL', 'Recruiter/profile prompt routed incorrectly.');
  }

  if (question.categoryCode === 'H') {
    const validIntent =
      intent === 'identity-intro' ||
      intent === 'profile-summary' ||
      intent === 'recruiter-summary' ||
      intent === 'portfolio-owner';
    if (domain === 'action' && validIntent) return expectedStatus('PASS', 'Identity/profile control query routed to action summary as intended.');
    return expectedStatus('FAIL', 'Identity/profile control query did not stay on the intended deterministic action path.');
  }

  if (question.categoryCode === 'I') {
    if (question.number === 111) {
      const validIntent =
        intent === 'identity-intro' ||
        intent === 'profile-summary' ||
        intent === 'recruiter-summary' ||
        intent === 'portfolio-owner';
      if (domain === 'action' && validIntent) return expectedStatus('PASS', 'Identity control stayed on the profile path.');
      return expectedStatus('FAIL', 'Identity control was hijacked away from the profile path.');
    }

    if (question.number === 117) {
      if (domain === 'knowledge-search' || domain === 'project-synthesis') return expectedStatus('PASS', 'Project-vs-manuscript ambiguity used synthesis retrieval.');
      if (domain === 'project' || domain === 'record-entry') return expectedStatus('SOFT FAIL', 'Project-vs-manuscript ambiguity resolved to one side only.');
      return expectedStatus('FAIL', 'Project-vs-manuscript ambiguity routed incorrectly.');
    }

    if (domain === 'record-entry' || domain === 'record-list') return expectedStatus('PASS', 'Publication query stayed on the record/publication domain.');
    return expectedStatus('FAIL', 'Publication query did not stay on the record/publication domain.');
  }

  if (question.categoryCode === 'J') {
    if (domain === 'site-meta' || domain === 'faq') return expectedStatus('PASS', 'Site/chatbot meta query stayed on the meta path.');
    return expectedStatus('FAIL', 'Site/chatbot meta query routed outside the meta path.');
  }

  if (question.categoryCode === 'K') {
    const controlChecks = {
      129: domain === 'project',
      130: domain === 'experience-list',
      131: domain === 'lab-lane',
      132: domain === 'project-list',
      133: domain === 'record-list' || domain === 'lab-lane',
      134: domain === 'record-list' || domain === 'record-groups',
      135: domain === 'record-list',
    };

    if (controlChecks[question.number]) {
      return expectedStatus('PASS', 'Direct control query routed to the expected deterministic domain.');
    }

    if ([133, 134].includes(question.number) && domain === 'unsupported') {
      return expectedStatus('SOFT FAIL', 'Direct control query was not answered even though related local data exists.');
    }

    return expectedStatus('FAIL', 'Direct control query routed to the wrong domain.');
  }

  if (question.categoryCode === 'L') {
    if (domain === 'knowledge-search' || domain === 'project-list' || domain === 'project-synthesis') return expectedStatus('PASS', 'Comparative question used broad project-oriented retrieval.');
    if (domain === 'project') return expectedStatus('SOFT FAIL', 'Comparative question collapsed to one project.');
    return expectedStatus('FAIL', 'Comparative question routed incorrectly.');
  }

  if (question.categoryCode === 'M') {
    if (domain === 'knowledge-search' || domain === 'project-list' || domain === 'project-synthesis') return expectedStatus('PASS', 'Fuzzy project prompt used broad project-oriented retrieval.');
    if (domain === 'project' || domain === 'action') return expectedStatus('SOFT FAIL', 'Fuzzy project prompt resolved too narrowly.');
    return expectedStatus('FAIL', 'Fuzzy project prompt routed incorrectly.');
  }

  if (question.categoryCode === 'N') {
    if (question.number === 165) {
      if (domain === 'action' && intent === 'portfolio-owner') return expectedStatus('PASS', 'Typo-heavy portfolio-owner query still resolved correctly.');
      return expectedStatus('FAIL', 'Typo-heavy portfolio-owner query routed incorrectly.');
    }

    if (question.number === 166) {
      if (domain === 'site-meta' || domain === 'faq') return expectedStatus('PASS', 'Typo-heavy site-meta query still resolved correctly.');
      return expectedStatus('FAIL', 'Typo-heavy site-meta query routed incorrectly.');
    }

    if (domain === 'knowledge-search' || domain === 'project-list' || domain === 'project-synthesis') return expectedStatus('PASS', 'Typo-heavy broad query still resolved to broad retrieval.');
    if (domain === 'project') return expectedStatus('SOFT FAIL', 'Typo-heavy broad query collapsed to one project.');
    return expectedStatus('FAIL', 'Typo-heavy broad query routed incorrectly.');
  }

  if (question.categoryCode === 'O') {
    if (domain === 'unsupported' && reply.unsupported === true) return expectedStatus('PASS', 'Boundary query refused cleanly.');
    return expectedStatus('FAIL', 'Boundary query was not refused cleanly.');
  }

  if (question.categoryCode === 'P') {
    if (domain === 'unsupported' && reply.unsupported === true) return expectedStatus('PASS', 'Unsupported implementation-detail query refused cleanly.');
    if (domain === 'site-meta') return expectedStatus('SOFT FAIL', 'Implementation-detail query fell back to generic site meta instead of a clean refusal.');
    return expectedStatus('FAIL', 'Unsupported implementation-detail query was not refused cleanly.');
  }

  if (maybeBroadOkay) return expectedStatus('PASS', 'General routing remained plausible.');
  return expectedStatus('SOFT FAIL', 'General routing was plausible but weak.');
};

const countBy = (items, keyFn) =>
  items.reduce((accumulator, item) => {
    const key = keyFn(item);
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});

const buildRecurringIssues = (results) => {
  const issueCounts = {};

  results
    .filter((result) => result.status !== 'PASS')
    .forEach((result) => {
      const issue =
        result.status === 'FAIL'
          ? result.evaluationNote
          : `Soft issue: ${result.evaluationNote}`;
      issueCounts[issue] = (issueCounts[issue] || 0) + 1;
    });

  return Object.entries(issueCounts)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 8)
    .map(([issue, count]) => ({ issue, count }));
};

const formatSupportLines = (supportItems) =>
  supportItems.length
    ? supportItems.map((item) => `- ${item.label} [${item.sourceBucket}]`).join('\n')
    : '- none';

const renderQuestionSection = (result) => `## ${result.number}. ${result.question}

- Category: ${result.category}
- Matched domain: \`${result.matchedDomain}\`
- Canonical intent: ${result.canonicalIntent ? `\`${result.canonicalIntent}\`` : 'None'}
- Deterministic resolver won first: ${result.deterministicResolverWonFirst ? 'Yes' : 'No'}
- Knowledge-search used: ${result.knowledgeSearchUsed ? 'Yes' : 'No'}
- Final response source: ${result.responseSource}
- Top supporting context:
${formatSupportLines(result.supportingContext)}
- Result: ${result.status}
- Pass/fail note: ${result.evaluationNote}
- Notes: ${result.notes}

### Exact local response
\`\`\`text
${result.responseText}
\`\`\`
`;

const server = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: {
    middlewareMode: true,
    hmr: false,
  },
});

try {
  const retrievalModule = await server.ssrLoadModule('/src/lib/chatbot/retrievePortfolioContext.ts');
  const replyModule = await server.ssrLoadModule('/src/lib/chatbot/composePortfolioReply.ts');
  const knowledgeIndexModule = await server.ssrLoadModule('/src/lib/chatbot/knowledgeIndex.ts');

  const { resolvePortfolioQuery } = retrievalModule;
  const { composePortfolioReply } = replyModule;
  const { knowledgeIndexStats } = knowledgeIndexModule;

  const results = questions.map((question) => {
    const resolution = resolvePortfolioQuery(question.text);
    const reply = composePortfolioReply(resolution.context);
    const supportingContext = buildSupportDiagnostics(resolution.context);
    const evaluation = evaluateQuestion(question, resolution, reply);
    const docsSupportCount = supportingContext.filter((item) => item.sourceBucket === 'docs').length;
    const contentSupportCount = supportingContext.filter((item) => item.sourceBucket === 'content').length;

    let notes = 'No obvious routing ambiguity.';

    if (resolution.context.kind === 'knowledge-search') {
      notes = `Knowledge-search supplied ${resolution.context.chunks.length} chunks (${docsSupportCount} docs, ${contentSupportCount} content in the reported shortlist).`;
    } else if (resolution.context.kind === 'project-synthesis') {
      notes = `Grouped project synthesis returned ${resolution.context.projects.length} projects with ${resolution.context.supportChunks.length} supporting chunks (${docsSupportCount} docs, ${contentSupportCount} content in the reported shortlist).`;
    } else if (resolution.context.kind === 'unsupported') {
      notes = 'Local-only path returned a grounded refusal.';
    } else if (resolution.context.kind === 'project') {
      notes = 'Single-project deterministic route won.';
    } else if (resolution.context.kind === 'project-list') {
      notes = `Project-list deterministic route returned ${resolution.matchedEntryCount} entries.`;
    } else if (resolution.context.kind === 'action' || resolution.context.kind === 'site-meta') {
      notes = 'Deterministic summary/meta route won first.';
    } else if (resolution.context.kind === 'record-entry' || resolution.context.kind === 'record-list') {
      notes = 'Record/publication domain won first.';
    }

    return {
      number: question.number,
      question: question.text,
      category: `${question.categoryCode}. ${question.categoryLabel}`,
      matchedDomain: resolution.matchedDomain,
      canonicalIntent: resolution.canonicalIntent,
      deterministicResolverWonFirst: resolution.context.kind !== 'knowledge-search',
      knowledgeSearchUsed:
        resolution.context.kind === 'knowledge-search' ||
        (resolution.context.kind === 'project-synthesis' && resolution.context.supportChunks.length > 0),
      responseSource: resolution.context.kind === 'unsupported' ? 'local fallback' : 'local reply',
      responseText: renderReplyText(reply),
      supportingContext,
      status: evaluation.status,
      evaluationNote: evaluation.note,
      notes,
    };
  });

  const domainCounts = countBy(results, (result) => result.matchedDomain);
  const statusCounts = countBy(results, (result) => result.status);
  const recurringIssues = buildRecurringIssues(results);
  const deterministicWinCount = results.filter((result) => result.deterministicResolverWonFirst).length;
  const knowledgeSearchCount = results.filter((result) => result.knowledgeSearchUsed).length;
  const unsupportedCount = results.filter((result) => result.matchedDomain === 'unsupported').length;
  const weakOrMisroutedCount = results.filter((result) => result.status !== 'PASS').length;

  const summaryLines = [
    '# Ask Local QA Report',
    '',
    'Generated from the local-only Ask path:',
    '- `resolvePortfolioQuery(...)`',
    '- `composePortfolioReply(...)`',
    '- no OpenRouter calls',
    '- no network usage',
    '',
    '## Overall Summary',
    '',
    `- Total questions: ${results.length}`,
    `- Deterministic resolver won first: ${deterministicWinCount}`,
    `- Knowledge-search used: ${knowledgeSearchCount}`,
    `- Unsupported/refusal count: ${unsupportedCount}`,
    `- Apparent weak or misrouted answers: ${weakOrMisroutedCount}`,
    `- PASS: ${statusCounts.PASS || 0}`,
    `- SOFT FAIL: ${statusCounts['SOFT FAIL'] || 0}`,
    `- FAIL: ${statusCounts.FAIL || 0}`,
    '',
    '### Knowledge Index Stats',
    '',
    `- Total chunks: ${knowledgeIndexStats.totalChunks}`,
    `- Content chunks: ${knowledgeIndexStats.contentChunkCount}`,
    `- Docs chunks: ${knowledgeIndexStats.docsChunkCount}`,
    `- YAML sources: ${knowledgeIndexStats.yamlSourceCount}`,
    `- Markdown sources: ${knowledgeIndexStats.markdownSourceCount}`,
    '',
    '### Count by Matched Domain',
    '',
    ...Object.entries(domainCounts)
      .sort((left, right) => left[0].localeCompare(right[0]))
      .map(([domain, count]) => `- \`${domain}\`: ${count}`),
    '',
    '### Top Recurring Issues',
    '',
    ...(recurringIssues.length
      ? recurringIssues.map((issue) => `- ${issue.issue} (${issue.count})`)
      : ['- none']),
    '',
    '---',
    '',
  ];

  const questionSections = results.map(renderQuestionSection);
  const report = `${summaryLines.join('\n')}\n${questionSections.join('\n')}`;

  await fs.writeFile(reportPath, report, 'utf8');

  originalInfo('Ask local QA summary', {
    totalQuestions: results.length,
    pass: statusCounts.PASS || 0,
    softFail: statusCounts['SOFT FAIL'] || 0,
    fail: statusCounts.FAIL || 0,
    deterministicResolverWonFirst: deterministicWinCount,
    knowledgeSearchUsed: knowledgeSearchCount,
    unsupported: unsupportedCount,
    weakOrMisrouted: weakOrMisroutedCount,
    reportPath,
  });
} finally {
  console.info = originalInfo;
  console.warn = originalWarn;
  await server.close();
}
