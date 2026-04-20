import type { PortfolioMatchContext, PortfolioChatReply } from './chatTypes';

const toTitleCase = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const toSafeLink = (label: string, href: unknown) =>
  typeof href === 'string' && href.trim().length > 0 ? [{ label, href }] : undefined;

const getProjectBuckets = (project: { category: string; workBuckets?: string[] }) =>
  Array.isArray(project.workBuckets) && project.workBuckets.length > 0
    ? project.workBuckets
    : [project.category];

const getProjectDisciplineTags = (project: { disciplineTags?: string[] }) =>
  Array.isArray(project.disciplineTags) ? project.disciplineTags : [];

const getEducationScoreLabel = (entry: {
  score?: { label: 'CGPA' | 'Percentage'; value: string };
}) => (entry.score ? `${entry.score.label}: ${entry.score.value}` : null);

const formatEducationBullet = (entry: {
  institution: string;
  period: string;
  qualification: string;
  score?: { label: 'CGPA' | 'Percentage'; value: string };
}) => {
  const parts = [entry.institution, entry.period, entry.qualification];
  const scoreLabel = getEducationScoreLabel(entry);

  if (scoreLabel) {
    parts.push(scoreLabel);
  }

  return parts.join(' | ');
};

const inferKnowledgeTitle = (query: string) => {
  const normalized = query.toLowerCase();

  if (normalized.includes('hackathon')) return 'Hackathon Work Evidence';
  if (normalized.includes('readiness')) return 'Project Readiness Evidence';
  if (normalized.includes('study material') || normalized.includes('deep')) return 'Deeper Study Material';
  if (normalized.includes('theme')) return 'Recurring Portfolio Themes';
  if (normalized.includes('forecast')) return 'Forecasting Evidence';
  if (normalized.includes('full stack') || normalized.includes('full-stack')) return 'Full Stack Evidence';
  if (normalized.includes('assistive')) return 'Assistive AI Evidence';
  return 'Supporting Portfolio Evidence';
};

const inferKnowledgeAnswer = (query: string) => {
  const normalized = query.toLowerCase();

  if (normalized.includes('readiness')) {
    return 'These are the strongest local readiness-oriented chunks I found in the bundled portfolio content corpus.';
  }

  if (normalized.includes('theme')) {
    return 'These are the strongest local chunks I found for recurring themes across the broader portfolio content corpus.';
  }

  if (normalized.includes('evidence') || normalized.includes('supporting')) {
    return 'These are the strongest local supporting chunks I found for that question.';
  }

  return 'I found these relevant local knowledge chunks in the bundled portfolio content corpus.';
};

const inferProjectSynthesisTitle = (
  context: Extract<PortfolioMatchContext, { kind: 'project-synthesis' }>
) => {
  if (context.presentation === 'themes') {
    return 'Recurring Portfolio Themes';
  }

  if (context.mode === 'comparative') {
    switch (context.theme) {
      case 'data-science':
        return 'Best-Fit Projects for Data Science';
      case 'software':
      case 'full-stack':
      case 'product':
        return 'Best-Fit Projects for Software Roles';
      case 'recruiter':
        return 'Best Recruiter-Facing Projects';
      case 'maturity':
        return 'Most Mature Project Signals';
      case 'deep-work':
        return 'Deepest Project Work';
      default:
        return 'Strongest Project Picks';
    }
  }

  if (context.mode === 'evidence') {
    switch (context.theme) {
      case 'forecasting':
        return 'Forecasting Evidence';
      case 'full-stack':
      case 'software':
        return 'Full-Stack Evidence';
      case 'assistive-ai':
        return 'Assistive AI Evidence';
      case 'deep-work':
        return 'Deeper Study Material';
      default:
        return 'Supporting Project Evidence';
    }
  }

  if (context.mode === 'fuzzy') {
    switch (context.theme) {
      case 'product':
        return 'More Product-Like Builds';
      case 'practical':
        return 'More Practical Builds';
      case 'research':
        return 'More Research-Oriented Work';
      case 'technical':
        return 'More Technical Work';
      case 'secondary':
        return 'More Projects Beyond the Obvious Picks';
      case 'deep-work':
        return 'Deeper Work';
      default:
        return 'Grouped Project Highlights';
    }
  }

  switch (context.theme) {
    case 'data-science':
      return 'Data Science and ML Projects';
    case 'forecasting':
      return 'Forecasting-Focused Projects';
    case 'software':
    case 'full-stack':
      return 'Software and Full-Stack Projects';
    case 'ai':
      return 'AI-Focused Projects';
    case 'analytics':
      return 'Analytics-Focused Projects';
    case 'research':
      return 'Research-Style Technical Work';
    default:
      return 'Portfolio Projects';
  }
};

const inferProjectSynthesisAnswer = (
  context: Extract<PortfolioMatchContext, { kind: 'project-synthesis' }>
) => {
  const supportNote =
    context.supportChunks.length > 0
      ? ' I also used the stronger local supporting material behind the visible project summaries where it helped.'
      : '';

  if (context.presentation === 'themes') {
    return `These are the clearest recurring themes I can support from the local project and docs material.${supportNote}`;
  }

  if (context.mode === 'comparative') {
    return `These are the strongest grounded picks for that comparison based on the local project set, visible project metadata, and supporting material depth.${supportNote}`;
  }

  if (context.mode === 'evidence') {
    return `These are the strongest grounded project signals I can support locally for that question.${supportNote}`;
  }

  if (context.mode === 'fuzzy') {
    return `Here is the closest grounded grouped summary I can give for that prompt without guessing beyond the local portfolio material.${supportNote}`;
  }

  return `Here is a grouped grounded summary of the relevant project work in this portfolio.${supportNote}`;
};

export function composePortfolioReply(context: PortfolioMatchContext): PortfolioChatReply {
  switch (context.kind) {
    case 'faq':
    case 'action':
      return {
        title: context.item.replyTitle,
        answer: context.item.replySummary,
        bullets: context.item.replyBullets,
      };

    case 'project':
      if (context.request === 'tech-stack') {
        return {
          title: `${context.project.title} Tech Stack`,
          answer: `${context.project.title} is grounded in the following technologies and workflow-defining tools from the local portfolio knowledge base.`,
          bullets: context.project.techStack,
          links: Object.entries(context.project.links as Record<string, string>)
            .filter(([, href]) => typeof href === 'string' && href.length > 0)
            .map(([label, href]) => ({
              label: label === 'live' ? 'Live Demo' : label === 'github' ? 'GitHub' : toTitleCase(label),
              href,
            })),
          related: ['Projects', 'Lab'],
        };
      }

      return {
        title: context.project.title,
        answer: context.project.summary,
        bullets: [
          `Project buckets: ${getProjectBuckets(context.project).join(', ')}`,
          ...(getProjectDisciplineTags(context.project).length > 0
            ? [`Discipline tags: ${getProjectDisciplineTags(context.project).join(', ')}`]
            : []),
          `Status: ${context.project.status}`,
          `Subcategories: ${context.project.subcategories.join(', ')}`,
          `Tech stack: ${context.project.techStack.slice(0, 5).join(', ')}`,
        ],
        links: Object.entries(context.project.links as Record<string, string>)
          .filter(([, href]) => typeof href === 'string' && href.length > 0)
          .map(([label, href]) => ({
            label: label === 'live' ? 'Live Demo' : label === 'github' ? 'GitHub' : toTitleCase(label),
            href,
          })),
        related: ['Projects', 'Lab'],
      };

    case 'project-list':
      return {
        title:
          context.scope === 'featured'
            ? 'Featured Projects'
            : context.scope === 'ml'
              ? 'DS/ML Projects'
              : context.scope === 'full-stack'
                ? 'Full Stack Projects'
                : 'Archive Projects',
        answer:
          context.scope === 'ml'
            ? 'These are the current DS/ML projects in the local portfolio knowledge base. Older ML/Data wording still maps to this same taxonomy.'
            : context.scope === 'full-stack'
              ? 'These are the current full-stack projects surfaced in the local portfolio knowledge base.'
              : context.scope === 'archive'
                ? 'These are the archive-facing projects currently listed in Work.'
                : 'These are the current featured project entries.',
        bullets: context.projects.map(
          (project) => `${project.title} (${project.status}) - ${project.summary}`
        ),
        related: ['Projects'],
      };

    case 'project-synthesis':
      return {
        title: inferProjectSynthesisTitle(context),
        answer: inferProjectSynthesisAnswer(context),
        bullets:
          context.presentation === 'themes' && context.themeHighlights?.length
            ? context.themeHighlights.map(
                (highlight) =>
                  `${highlight.label} - ${highlight.summary}${
                    highlight.examples.length ? ` Examples: ${highlight.examples.join(', ')}.` : ''
                  }`
              )
            : context.projects.map(({ project, reason }) => `${project.title} - ${reason}`),
        related: ['Projects', 'Lab', 'Profile'],
      };

    case 'experience-entry':
      return {
        title: `${context.entry.role} at ${context.entry.organization}`,
        answer: context.entry.summary,
        bullets: [
          `Period: ${context.entry.period}`,
          ...(context.entry.location ? [`Location: ${context.entry.location}`] : []),
          ...context.entry.bullets,
          `Skills and technologies: ${context.entry.tech.join(', ')}`,
        ],
        links: context.entry.certificateLink
          ? [{ label: context.entry.certificateLabel || 'Open Certificate', href: context.entry.certificateLink }]
          : undefined,
        related: ['Experience'],
      };

    case 'experience-list':
      return {
        title: context.scope === 'internships' ? 'Internships' : 'Leadership',
        answer:
          context.scope === 'internships'
            ? 'These are the internship records currently listed in the portfolio.'
            : 'These are the current leadership records listed in the portfolio.',
        bullets: context.entries.map(
          (entry) => `${entry.role} at ${entry.organization} (${entry.period})`
        ),
        related: ['Experience'],
      };

    case 'lab-lane':
      return {
        title:
          context.lane === 'papers'
            ? 'Lab Papers'
            : context.lane === 'concepts'
              ? 'Lab Concepts'
              : 'Lab Working Prototypes',
        answer:
          context.lane === 'papers'
            ? 'These are the paper-level records currently listed in Lab.'
            : context.lane === 'concepts'
              ? 'These are the current concept entries in Lab.'
              : 'These are the current working prototypes in Lab.',
        bullets: context.entries.map((entry) => `${entry.title} - ${entry.summary}`),
        related: ['Lab'],
      };

    case 'lab-overview':
      return {
        title: 'Lab Section',
        answer: context.answer,
        bullets: context.lanes.map((lane) => `${lane.label}: ${lane.count} entries`),
        related: ['Lab', 'Projects'],
      };

    case 'lab-entry':
      return {
        title: context.entry.title,
        answer: context.entry.summary,
        bullets: [
          ...(context.entry.meta ? [context.entry.meta] : []),
          ...context.entry.detail,
        ],
        links: toSafeLink(context.entry.linkLabel || 'Open', context.entry.link),
        related: ['Lab'],
      };

    case 'record-list':
      return {
        title:
          context.scope === 'global-certifications'
            ? 'Global Certifications'
            : context.scope === 'certificates'
              ? 'Certificates'
              : context.scope === 'certifications'
            ? 'Certifications'
            : context.scope === 'achievements'
              ? 'Achievements'
              : 'Publications',
        answer:
          context.scope === 'global-certifications'
            ? 'These are the global certifications currently highlighted in the profile.'
            : context.scope === 'certificates'
              ? 'These are the remaining certificate-backed records currently grouped under Certificates in the profile.'
              : context.scope === 'certifications'
            ? 'These are the certifications currently listed in the portfolio records.'
            : context.scope === 'achievements'
              ? 'These are the achievement records currently listed in the portfolio.'
              : 'These are the publication or manuscript records currently listed in the portfolio.',
        bullets: context.entries.map((entry) => `${entry.title} | ${entry.issuer} | ${entry.date}`),
        related: ['Profile', 'Lab'],
      };

    case 'record-groups':
      return {
        title: 'Certifications and Certificates',
        answer: 'The profile separates global certifications from the broader certificates bucket.',
        bullets: context.groups.flatMap((group) => [
          `${group.label}:`,
          ...group.entries.map((entry) => `${entry.title} | ${entry.issuer} | ${entry.date}`),
        ]),
        related: ['Profile'],
      };

    case 'record-entry':
      return {
        title: context.entry.title,
        answer: context.entry.note,
        bullets: [`Issuer: ${context.entry.issuer}`, `Date: ${context.entry.date}`, `Type: ${context.entry.type}`],
        links: toSafeLink('Open Record', context.entry.link),
        related: ['Profile', 'Lab'],
      };

    case 'education': {
      const primaryEducation = context.entries[0];
      const currentEducation = context.entries.find(
        (entry) => entry.score?.kind === 'cgpa'
      );

      return {
        title: 'Education',
        answer: currentEducation
          ? `${currentEducation.institution} is the current higher-education record in the portfolio, and the local education data also includes the published Class XII and Class X school records.`
          : primaryEducation?.summary ||
            'This is the published education information currently available in the local portfolio knowledge base.',
        bullets: context.entries.map(formatEducationBullet),
        related: ['Profile'],
      };
    }

    case 'skill-group':
      return {
        title: context.group.label,
        answer: context.group.description || 'This skill group is part of the current profile knowledge base.',
        bullets: context.group.skills.map((skill: { name: string; emphasis?: string }) =>
          skill.emphasis ? `${skill.name} (${skill.emphasis})` : skill.name
        ),
        related: ['Profile'],
      };

    case 'skills-overview':
      return {
        title: 'Skill Groups',
        answer: 'These are the main skill groups currently represented in the portfolio profile.',
        bullets: context.groups.map((group) => group.label),
        related: ['Profile'],
      };

    case 'tech-stack-groups':
      return {
        title: 'Tech Stack Summary',
        answer: 'The portfolio tech stack is best understood through these grouped skill areas rather than one flat tool list.',
        bullets: context.groups.map((group) => `${group.label}: ${group.values.join(', ')}`),
        related: ['Profile'],
      };

    case 'contact-links':
      return {
        title: 'Contact and Public Links',
        answer: 'These are the direct contact and profile destinations currently published in the portfolio.',
        bullets: context.links.map((link) => link.label),
        links: context.links
          .filter((link) => typeof link.link === 'string' && link.link.length > 0)
          .map((link) => ({ label: link.label, href: link.link })),
        related: ['Connect'],
      };

    case 'site-structure':
      return {
        title: 'Portfolio Structure',
        answer: 'The portfolio is organized into these main sections and current visible surfaces.',
        bullets: context.sections,
        related: ['Projects', 'Profile', 'Experience', 'Lab', 'Connect', 'Ask'],
      };

    case 'site-meta':
      return {
        title: context.topic.label,
        answer: context.topic.summary,
        bullets: context.topic.bullets,
        related: context.topic.related,
      };

    case 'knowledge-search':
      return {
        title: inferKnowledgeTitle(context.query),
        answer: inferKnowledgeAnswer(context.query),
        bullets: context.chunks.map((chunk) => {
          const sourceParts = [chunk.sourceLabel, chunk.section].filter(Boolean).join(' / ');
          return `${chunk.title} (${sourceParts}) - ${chunk.excerpt}`;
        }),
        related: ['Projects', 'Lab', 'Profile'],
      };

    case 'unsupported':
      return {
        title: context.title || 'Grounded Portfolio Assistant',
        answer:
          context.summary ||
          'I can only answer from the local portfolio knowledge currently loaded into this site. That means I will not invent missing facts, external background, metrics, or unsupported project details.',
        bullets:
          context.bullets ||
          ['Try asking about projects, internships, Lab content, records, skills, or navigation.'],
        related: context.related || context.suggestions,
        unsupported: true,
      };
  }
}
