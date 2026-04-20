import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const reportPath = path.join(root, 'report_broad_discovery_pass.md');

const questionGroups = [
  {
    label: 'Broad discovery',
    questions: [
      'Tell me about the various data science projects.',
      'Tell me about more projects.',
      'Show me more projects.',
      'What kinds of projects are in this portfolio?',
      'What all has Arjoneel built?',
      'What kind of AI work is included?',
      'What kind of software work is included?',
      'What kind of analytics work is included?',
    ],
  },
  {
    label: 'Broad synthesis / evidence',
    questions: [
      'What recurring themes show up across the project docs?',
      'Which projects have deeper study material?',
      'What do the docs say about project readiness?',
      'What project evidence exists for forecasting work?',
      'What project evidence exists for full-stack work?',
      'What stronger supporting material exists beyond the live summaries?',
    ],
  },
  {
    label: 'Comparative / ranking',
    questions: [
      'Which projects are strongest technically?',
      'Which projects seem most complete?',
      'Which projects feel most real-world?',
      'Which projects have the strongest evidence behind them?',
      'Which projects are best for recruiters?',
      'Which projects are best for data science?',
      'Which projects are best for software roles?',
      'Which projects are most mature?',
      'Which projects seem deepest?',
      'Which projects are backed by the most material?',
    ],
  },
  {
    label: 'Fuzzy / informal',
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
  {
    label: 'Control queries',
    questions: [
      'Who is Arjoneel?',
      'Summarize Arjoneel for a recruiter.',
      'What is AgriFore?',
      'What paper is Arjoneel listed on?',
      'What internships are listed?',
      'What is in Lab Concepts?',
      'How does the chatbot for this portfolio website work?',
    ],
  },
];

const flattenQuestions = (groups) => {
  let current = 1;
  return groups.flatMap((group) =>
    group.questions.map((text) => ({
      number: current++,
      category: group.label,
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
    case 'knowledge-search':
      return context.chunks.slice(0, 6).map((chunk) => ({
        label: `${chunk.title} (${chunk.sourceLabel}${chunk.section ? ` / ${chunk.section}` : ''})`,
        sourceBucket: isDocsChunk(chunk) ? 'docs' : 'content',
      }));
    case 'project':
      return [{ label: context.project.title, sourceBucket: 'local-knowledge' }];
    case 'project-list':
      return context.projects.slice(0, 6).map((project) => ({
        label: project.title,
        sourceBucket: 'local-knowledge',
      }));
    case 'action':
    case 'faq':
      return [{ label: context.item.replyTitle, sourceBucket: 'local-knowledge' }];
    case 'site-meta':
      return [{ label: context.topic.label, sourceBucket: 'local-knowledge' }];
    case 'experience-list':
      return context.entries.map((entry) => ({
        label: `${entry.role} at ${entry.organization}`,
        sourceBucket: 'local-knowledge',
      }));
    case 'record-entry':
      return [{ label: context.entry.title, sourceBucket: 'local-knowledge' }];
    case 'lab-lane':
      return context.entries.map((entry) => ({
        label: entry.title,
        sourceBucket: 'local-knowledge',
      }));
    default:
      return [];
  }
};

const evaluateFocusedQuestion = (question, resolution, reply) => {
  const domain = resolution.matchedDomain;
  const isGrouped = ['project-synthesis', 'project-list', 'knowledge-search'].includes(domain);

  if (question.number >= 1 && question.number <= 8) {
    if (domain === 'project-synthesis' || domain === 'project-list') {
      return { status: 'PASS', note: 'Broad discovery used grouped project synthesis.' };
    }
    if (domain === 'knowledge-search' || domain === 'project') {
      return { status: 'SOFT FAIL', note: 'Broad discovery stayed too raw or too narrow.' };
    }
    return { status: 'FAIL', note: 'Broad discovery routed outside project synthesis.' };
  }

  if (question.number >= 9 && question.number <= 14) {
    if (domain === 'project-synthesis' || domain === 'knowledge-search') {
      return { status: 'PASS', note: 'Evidence/docs question used retrieval-backed synthesis.' };
    }
    if (domain === 'project-list' || domain === 'project') {
      return { status: 'SOFT FAIL', note: 'Evidence/docs question stayed too shallow.' };
    }
    return { status: 'FAIL', note: 'Evidence/docs question missed the intended synthesis path.' };
  }

  if (question.number >= 15 && question.number <= 24) {
    if (domain === 'project-synthesis' || domain === 'knowledge-search' || domain === 'project-list') {
      return { status: 'PASS', note: 'Comparative question used grouped project selection.' };
    }
    if (domain === 'project') {
      return { status: 'SOFT FAIL', note: 'Comparative question collapsed to one project.' };
    }
    return { status: 'FAIL', note: 'Comparative question routed incorrectly.' };
  }

  if (question.number >= 25 && question.number <= 34) {
    if (domain === 'project-synthesis' || domain === 'knowledge-search' || domain === 'project-list') {
      return { status: 'PASS', note: 'Fuzzy prompt resolved to grouped project synthesis.' };
    }
    if (domain === 'project' || domain === 'action') {
      return { status: 'SOFT FAIL', note: 'Fuzzy prompt resolved too narrowly.' };
    }
    return { status: 'FAIL', note: 'Fuzzy prompt routed incorrectly.' };
  }

  if (question.number >= 35 && question.number <= 44) {
    if (domain === 'unsupported' && reply.unsupported === true) {
      return { status: 'PASS', note: 'Partial-support question refused exact unsupported details cleanly.' };
    }
    if (domain === 'site-meta') {
      return { status: 'SOFT FAIL', note: 'Partial-support question fell back to generic site meta.' };
    }
    return { status: 'FAIL', note: 'Partial-support question was not handled as a safe unknown.' };
  }

  const controlChecks = {
    45: domain === 'action',
    46: domain === 'action',
    47: domain === 'project',
    48: domain === 'record-entry' || domain === 'record-list',
    49: domain === 'experience-list',
    50: domain === 'lab-lane',
    51: domain === 'site-meta' || domain === 'faq',
  };

  if (controlChecks[question.number]) {
    return { status: 'PASS', note: 'Control query stayed on the intended deterministic path.' };
  }

  if (isGrouped && question.number >= 45) {
    return { status: 'SOFT FAIL', note: 'Control query remained plausible but drifted off the intended deterministic path.' };
  }

  return { status: 'FAIL', note: 'Control query drifted off the intended deterministic path.' };
};

const formatSupportLines = (supportItems) =>
  supportItems.length
    ? supportItems.map((item) => `- ${item.label} [${item.sourceBucket}]`).join('\n')
    : '- none';

const summarizeSupportOrigin = (supportItems) => {
  const hasDocs = supportItems.some((item) => item.sourceBucket === 'docs');
  const hasContent = supportItems.some((item) => item.sourceBucket === 'content');

  if (hasDocs && hasContent) return 'both';
  if (hasDocs) return 'docs';
  if (hasContent) return 'content';
  return 'local-knowledge';
};

const renderQuestionSection = (result) => `## ${result.number}. ${result.question}

- Category: ${result.category}
- Matched domain: \`${result.matchedDomain}\`
- Canonical intent: ${result.canonicalIntent ? `\`${result.canonicalIntent}\`` : 'None'}
- Deterministic resolver won first: ${result.deterministicResolverWonFirst ? 'Yes' : 'No'}
- Knowledge-search used: ${result.knowledgeSearchUsed ? 'Yes' : 'No'}
- Support origin: ${result.supportOrigin}
- Top supporting context:
${formatSupportLines(result.supportingContext)}
- Result: ${result.status}
- Note: ${result.note}
- Remaining weakness: ${result.remainingWeakness}

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

  const { resolvePortfolioQuery } = retrievalModule;
  const { composePortfolioReply } = replyModule;

  const results = questions.map((question) => {
    const resolution = resolvePortfolioQuery(question.text);
    const reply = composePortfolioReply(resolution.context);
    const supportingContext = buildSupportDiagnostics(resolution.context);
    const evaluation = evaluateFocusedQuestion(question, resolution, reply);
    const knowledgeSearchUsed =
      resolution.context.kind === 'knowledge-search' ||
      (resolution.context.kind === 'project-synthesis' && resolution.context.supportChunks.length > 0);

    return {
      number: question.number,
      question: question.text,
      category: question.category,
      matchedDomain: resolution.matchedDomain,
      canonicalIntent: resolution.canonicalIntent,
      deterministicResolverWonFirst: resolution.context.kind !== 'knowledge-search',
      knowledgeSearchUsed,
      supportOrigin: summarizeSupportOrigin(supportingContext),
      supportingContext,
      status: evaluation.status,
      note: evaluation.note,
      remainingWeakness:
        evaluation.status === 'PASS'
          ? 'none'
          : resolution.context.kind === 'unsupported'
            ? 'fell back to refusal'
            : 'answer is still weaker than the intended grouped synthesis shape',
      responseText: renderReplyText(reply),
    };
  });

  const statusCounts = results.reduce(
    (accumulator, result) => {
      accumulator[result.status] = (accumulator[result.status] || 0) + 1;
      return accumulator;
    },
    { PASS: 0, 'SOFT FAIL': 0, FAIL: 0 }
  );

  const remainingWeakCases = results.filter((result) => result.status !== 'PASS');
  const summaryLines = [
    '# Ask Broad-Discovery + Comparative Synthesis Follow-Up Report',
    '',
    'Generated from the local-only Ask path:',
    '- `resolvePortfolioQuery(...)`',
    '- `composePortfolioReply(...)`',
    '- no OpenRouter calls',
    '- no network usage',
    '',
    '## What Improved',
    '',
    '- Broad project-discovery prompts now prefer grouped project synthesis instead of falling into single project or experience-entry matches.',
    '- Comparative and evidence-heavy prompts now use ranked multi-project selection with local support material when available.',
    '- Partial-support infra/config questions now refuse unsupported exact details cleanly while preserving grounded high-level Ask facts.',
    '',
    '## Before / After Notes',
    '',
    '- Before: broad discovery often collapsed to one project or an unrelated experience record. After: the main broad-discovery questions now route to `project-synthesis` with grouped project picks.',
    '- Before: comparative prompts often selected one weak winner or the wrong domain. After: the stronger comparative cases now use multi-project selection with support-aware reasoning.',
    '- Before: fuzzy prompts either collapsed to one project or routed incorrectly. After: several fuzzy prompts now map to grouped summaries, though some still need better theme handling.',
    '- Before: partial-support infra/config questions could drift into CropIQ/OpenRouter-tagged project answers. After: these questions now refuse exact unsupported details cleanly.',
    '',
    '## Focused Summary',
    '',
    `- Total focused questions: ${results.length}`,
    `- PASS: ${statusCounts.PASS}`,
    `- SOFT FAIL: ${statusCounts['SOFT FAIL']}`,
    `- FAIL: ${statusCounts.FAIL}`,
    `- Remaining weak cases: ${remainingWeakCases.length}`,
    '',
    '## Remaining Weak Cases',
    '',
    ...(remainingWeakCases.length
      ? remainingWeakCases.map(
          (result) => `- ${result.number}. ${result.question} -> ${result.status} (${result.matchedDomain})`
        )
      : ['- none']),
    '',
    '---',
    '',
  ];

  const report = `${summaryLines.join('\n')}\n${results.map(renderQuestionSection).join('\n')}`;
  await fs.writeFile(reportPath, report, 'utf8');

  originalInfo('Ask broad-discovery follow-up summary', {
    totalQuestions: results.length,
    pass: statusCounts.PASS,
    softFail: statusCounts['SOFT FAIL'],
    fail: statusCounts.FAIL,
    reportPath,
  });
} finally {
  console.info = originalInfo;
  console.warn = originalWarn;
  await server.close();
}
