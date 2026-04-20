import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const reportPath = path.join(root, 'report_selective_llm_synthesis_pass.md');

const simpleQueries = [
  'Who is Arjoneel?',
  'What is AgriFore?',
  'What internships are listed?',
  'How does the chatbot for this portfolio website work?',
];

const selectiveQueries = [
  'What kind of analytics work is included?',
  'What kind of software work is included?',
  'What recurring themes show up across the project docs?',
  'Classify Arjoneel as ML or software dev',
  'Which projects are strongest technically?',
];

const mutedPrefixes = new Set([
  '[portfolio-knowledge-index-ready]',
  '[portfolio-knowledge-search]',
  '[portfolio-query-knowledge-resolution]',
  '[portfolio-chat-openrouter-fallback]',
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

const renderReplyText = (reply) => {
  const lines = [];
  if (reply.title) lines.push(`Title: ${reply.title}`);
  lines.push(`Answer: ${reply.answer}`);

  if (reply.bullets?.length) {
    lines.push('Bullets:');
    reply.bullets.forEach((bullet) => lines.push(`- ${bullet}`));
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

const makeTrace = (index) => ({
  requestId: `selective-pass-${index + 1}`,
  chatSessionId: 'selective-pass-session',
  route: '/ask',
  component: 'AskPage',
  functionSource: 'run-ask-selective-llm-synthesis-pass',
  triggerSource: 'automatic',
  userTriggered: false,
  stream: false,
});

const renderCase = (item) => `## ${item.query}

- Matched domain: \`${item.matchedDomain}\`
- Canonical intent: ${item.canonicalIntent ? `\`${item.canonicalIntent}\`` : 'None'}
- Local support kind: \`${item.off.diagnostics.localSupportKind}\`
- Selective-synthesis eligible in enhance mode: ${item.enhance.diagnostics.selectiveSynthesisEligible ? 'Yes' : 'No'}
- Selective-synthesis kind: ${item.enhance.diagnostics.selectiveSynthesisKind ? `\`${item.enhance.diagnostics.selectiveSynthesisKind}\`` : 'None'}

### Off mode

- Response path: \`${item.off.diagnostics.responsePath}\`
- OpenRouter attempted: ${item.off.diagnostics.openRouterAttempted ? 'Yes' : 'No'}
- OpenRouter bypass reason: ${item.off.diagnostics.openRouterBypassReason ? `\`${item.off.diagnostics.openRouterBypassReason}\`` : 'None'}

\`\`\`text
${item.off.responseText}
\`\`\`

### Enhance mode

- Response path: \`${item.enhance.diagnostics.responsePath}\`
- Selective synthesis triggered: ${item.enhance.diagnostics.selectiveSynthesisTriggered ? 'Yes' : 'No'}
- OpenRouter eligible: ${item.enhance.diagnostics.openRouterEligible ? 'Yes' : 'No'}
- OpenRouter attempted: ${item.enhance.diagnostics.openRouterAttempted ? 'Yes' : 'No'}
- OpenRouter bypass reason: ${item.enhance.diagnostics.openRouterBypassReason ? `\`${item.enhance.diagnostics.openRouterBypassReason}\`` : 'None'}

\`\`\`text
${item.enhance.responseText}
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
  const orchestrationModule = await server.ssrLoadModule(
    '/src/lib/chatbot/composeGroundedOpenRouterReply.ts'
  );
  const architectureModule = await server.ssrLoadModule('/src/lib/chatbot/askArchitecture.ts');

  const { resolvePortfolioQuery } = retrievalModule;
  const { composePortfolioReply } = replyModule;
  const { composeGroundedOpenRouterReply } = orchestrationModule;
  const { clearAskOpenRouterSessionCooldown, setAskOpenRouterSessionCooldownUntil } = architectureModule;

  clearAskOpenRouterSessionCooldown();

  const cases = [];
  const allQueries = [...simpleQueries, ...selectiveQueries];

  for (const [index, query] of allQueries.entries()) {
    const resolution = resolvePortfolioQuery(query);
    const fallbackReply = composePortfolioReply(resolution.context);

    const off = await composeGroundedOpenRouterReply({
      question: query,
      canonicalIntent: resolution.canonicalIntent,
      context: resolution.context,
      fallbackReply,
      trace: makeTrace(index),
      architectureOverrides: {
        openRouterMode: 'off',
        localFirst: true,
        openRouterOptional: true,
      },
    });

    const enhance = await composeGroundedOpenRouterReply({
      question: query,
      canonicalIntent: resolution.canonicalIntent,
      context: resolution.context,
      fallbackReply,
      trace: makeTrace(index + 100),
      architectureOverrides: {
        openRouterMode: 'enhance',
        localFirst: true,
        openRouterOptional: true,
      },
      networkPolicy: 'disable',
    });

    cases.push({
      query,
      matchedDomain: resolution.matchedDomain,
      canonicalIntent: resolution.canonicalIntent,
      off: {
        diagnostics: off.diagnostics,
        responseText: renderReplyText(off.reply),
      },
      enhance: {
        diagnostics: enhance.diagnostics,
        responseText: renderReplyText(enhance.reply),
      },
    });
  }

  setAskOpenRouterSessionCooldownUntil(Date.now() + 60_000);
  const cooldownResolution = resolvePortfolioQuery('Which projects are strongest technically?');
  const cooldownFallback = composePortfolioReply(cooldownResolution.context);
  const cooldownResult = await composeGroundedOpenRouterReply({
    question: 'Which projects are strongest technically?',
    canonicalIntent: cooldownResolution.canonicalIntent,
    context: cooldownResolution.context,
    fallbackReply: cooldownFallback,
    trace: makeTrace(999),
    architectureOverrides: {
      openRouterMode: 'enhance',
      localFirst: true,
      openRouterOptional: true,
    },
  });
  clearAskOpenRouterSessionCooldown();

  const simpleBypassedInEnhance = cases
    .filter((item) => simpleQueries.includes(item.query))
    .every((item) => !item.enhance.diagnostics.openRouterEligible);
  const selectiveEligibleInEnhance = cases
    .filter((item) => selectiveQueries.includes(item.query))
    .every((item) => item.enhance.diagnostics.selectiveSynthesisEligible && item.enhance.diagnostics.openRouterEligible);

  const lines = [
    '# Ask Selective LLM Synthesis Report',
    '',
    '## Short Summary',
    '',
    '- Old behavior: local-first mode bypassed OpenRouter for all supported queries, even when the question type was ambiguity-heavy and the local support set was strong.',
    '- New behavior: Ask remains local-first by default, but enhance mode now marks only ambiguity-heavy synthesis/classification/comparative prompts as remote-eligible.',
    '',
    '## Selective-Synthesis Eligible Classes',
    '',
    '- profile classification',
    '- theme synthesis',
    '- broad category grouping',
    '- comparative / ranking explanation',
    '',
    '## Local-Only Classes',
    '',
    '- identity / recruiter summary',
    '- direct project detail',
    '- internships / records / Lab detail',
    '- site/chatbot meta',
    '',
    '## Validation Summary',
    '',
    `- Simple queries stayed local-only in enhance mode: ${simpleBypassedInEnhance ? 'Yes' : 'No'}`,
    `- Ambiguity-heavy queries became selective-synthesis eligible in enhance mode: ${selectiveEligibleInEnhance ? 'Yes' : 'No'}`,
    `- Session 429 bypass still works: ${cooldownResult.diagnostics.openRouterBypassReason === 'session-429-cooldown' ? 'Yes' : 'No'}`,
    '',
    '## Representative Results',
    '',
    ...cases.map(renderCase),
    '## Simulated Session 429 Bypass',
    '',
    `- Query: \`Which projects are strongest technically?\``,
    `- Response path: \`${cooldownResult.diagnostics.responsePath}\``,
    `- OpenRouter bypass reason: \`${cooldownResult.diagnostics.openRouterBypassReason}\``,
    `- Session cooldown active: ${cooldownResult.diagnostics.session429CooldownActive ? 'Yes' : 'No'}`,
    '',
    '## Tradeoffs / Notes',
    '',
    '- Off mode still returns the local answer only.',
    '- Enhance mode still needs a real OpenRouter connection to actually synthesize remotely; this validation deliberately kept network disabled.',
    '- The local fallback is still the final safety net for every selective-synthesis candidate.',
    '',
  ];

  await fs.writeFile(reportPath, `${lines.join('\n')}\n`, 'utf8');

  originalInfo('Ask selective synthesis summary', {
    simpleBypassedInEnhance,
    selectiveEligibleInEnhance,
    cooldownBypassReason: cooldownResult.diagnostics.openRouterBypassReason,
    reportPath,
  });
} finally {
  console.info = originalInfo;
  console.warn = originalWarn;
  await server.close();
}
