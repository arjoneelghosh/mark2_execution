import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer } from 'vite';

const root = process.cwd();
const reportPath = path.join(root, 'report_local_first_architecture_pass.md');

const representativeQueries = [
  'Who is Arjoneel?',
  'What is AgriFore?',
  'Tell me about the various data science projects.',
  'What recurring themes show up across the project docs?',
  'Which projects are strongest technically?',
  'What exact backend infrastructure powers this chatbot?',
];

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

const makeTrace = (index) => ({
  requestId: `local-first-report-${index + 1}`,
  chatSessionId: 'local-first-report-session',
  route: '/ask',
  component: 'AskPage',
  functionSource: 'run-ask-local-first-architecture-pass',
  triggerSource: 'automatic',
  userTriggered: false,
  stream: false,
});

const renderCase = (item) => `## ${item.query}

- Matched domain: \`${item.matchedDomain}\`
- Canonical intent: ${item.canonicalIntent ? `\`${item.canonicalIntent}\`` : 'None'}
- Response path: \`${item.diagnostics.responsePath}\`
- Architecture mode: \`${item.diagnostics.architectureMode}\`
- OpenRouter eligible: ${item.diagnostics.openRouterEligible ? 'Yes' : 'No'}
- OpenRouter attempted: ${item.diagnostics.openRouterAttempted ? 'Yes' : 'No'}
- OpenRouter bypassed: ${item.diagnostics.openRouterBypassed ? 'Yes' : 'No'}
- Bypass reason: ${item.diagnostics.openRouterBypassReason ? `\`${item.diagnostics.openRouterBypassReason}\`` : 'None'}
- Knowledge-search used: ${item.diagnostics.usedKnowledgeSearch ? 'Yes' : 'No'}
- Final response source: \`${item.source}\`

### Exact local/default response
\`\`\`text
${item.responseText}
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
  const {
    clearAskOpenRouterSessionCooldown,
    getAskArchitectureConfig,
    setAskOpenRouterSessionCooldownUntil,
  } = architectureModule;

  clearAskOpenRouterSessionCooldown();

  const defaultResults = [];

  for (const [index, query] of representativeQueries.entries()) {
    const resolution = resolvePortfolioQuery(query);
    const fallbackReply = composePortfolioReply(resolution.context);
    const result = await composeGroundedOpenRouterReply({
      question: query,
      context: resolution.context,
      fallbackReply,
      trace: makeTrace(index),
    });

    defaultResults.push({
      query,
      matchedDomain: resolution.matchedDomain,
      canonicalIntent: resolution.canonicalIntent,
      source: result.source,
      diagnostics: result.diagnostics,
      responseText: renderReplyText(result.reply),
    });
  }

  const sampleQuery = 'What recurring themes show up across the project docs?';
  const sampleResolution = resolvePortfolioQuery(sampleQuery);
  const sampleFallbackReply = composePortfolioReply(sampleResolution.context);

  const enhanceResult = await composeGroundedOpenRouterReply({
    question: sampleQuery,
    context: sampleResolution.context,
    fallbackReply: sampleFallbackReply,
    trace: makeTrace(100),
    architectureOverrides: {
      openRouterMode: 'enhance',
      localFirst: true,
      openRouterOptional: true,
    },
    networkPolicy: 'disable',
  });

  const legacyResult = await composeGroundedOpenRouterReply({
    question: sampleQuery,
    context: sampleResolution.context,
    fallbackReply: sampleFallbackReply,
    trace: makeTrace(101),
    architectureOverrides: {
      openRouterMode: 'legacy',
      localFirst: true,
      openRouterOptional: true,
    },
    networkPolicy: 'disable',
  });

  setAskOpenRouterSessionCooldownUntil(Date.now() + 60_000);
  const cooldownResult = await composeGroundedOpenRouterReply({
    question: 'What is AgriFore?',
    context: resolvePortfolioQuery('What is AgriFore?').context,
    fallbackReply: composePortfolioReply(resolvePortfolioQuery('What is AgriFore?').context),
    trace: makeTrace(102),
    architectureOverrides: {
      openRouterMode: 'enhance',
      localFirst: true,
      openRouterOptional: true,
    },
  });
  clearAskOpenRouterSessionCooldown();

  const config = getAskArchitectureConfig();
  const defaultBypassCount = defaultResults.filter((item) => item.diagnostics.openRouterBypassed).length;

  const lines = [
    '# Ask Local-First / OpenRouter-Optional Architecture Report',
    '',
    '## Short Summary',
    '',
    '- Old behavior: normal Ask flow attempted OpenRouter first for supported questions, then fell back locally on failure.',
    '- New behavior: normal Ask flow returns the local grounded answer first by default, with OpenRouter behind explicit architecture modes.',
    '',
    '## Flags / Modes Added',
    '',
    '- `VITE_ASK_LOCAL_FIRST=true`',
    '- `VITE_ASK_OPENROUTER_OPTIONAL=true`',
    '- `VITE_ASK_OPENROUTER_DEFAULT_MODE=off|enhance|legacy`',
    '- `VITE_ASK_OPENROUTER_SESSION_429_COOLDOWN_MS=<milliseconds>`',
    '',
    '## Default Behavior',
    '',
    `- Effective default mode: \`${config.openRouterMode}\``,
    `- Local-first enabled: ${config.localFirst ? 'Yes' : 'No'}`,
    `- OpenRouter optional: ${config.openRouterOptional ? 'Yes' : 'No'}`,
    `- Representative queries bypassed OpenRouter by default: ${defaultBypassCount}/${defaultResults.length}`,
    '',
    '## Representative Default-Mode Results',
    '',
    ...defaultResults.map(renderCase),
    '## Optional OpenRouter Modes',
    '',
    `- Enhance mode remains available: ${enhanceResult.diagnostics.openRouterEligible ? 'Yes' : 'No'}`,
    `- Enhance mode validation path: \`${enhanceResult.diagnostics.responsePath}\` with bypass reason \`${enhanceResult.diagnostics.openRouterBypassReason}\``,
    `- Legacy mode remains available: ${legacyResult.diagnostics.openRouterEligible ? 'Yes' : 'No'}`,
    `- Legacy mode validation path: \`${legacyResult.diagnostics.responsePath}\` with bypass reason \`${legacyResult.diagnostics.openRouterBypassReason}\``,
    '',
    '## Session 429 Bypass',
    '',
    `- Simulated cooldown response path: \`${cooldownResult.diagnostics.responsePath}\``,
    `- Simulated cooldown bypass reason: \`${cooldownResult.diagnostics.openRouterBypassReason}\``,
    `- Session cooldown active during bypass: ${cooldownResult.diagnostics.session429CooldownActive ? 'Yes' : 'No'}`,
    '',
    '## Tradeoffs / Limitations',
    '',
    '- Default Ask responses now depend entirely on local retrieval and local composition quality, which is the intended product path for free-tier stability.',
    '- Enhance and legacy modes still require OpenRouter connectivity when actually enabled; this validation kept network disabled deliberately.',
    '- Session 429 bypass is a frontend session safeguard. It reduces repeated remote attempts in one session, but it does not replace provider-side rate limits.',
    '',
  ];

  await fs.writeFile(reportPath, `${lines.join('\n')}\n`, 'utf8');

  originalInfo('Ask local-first architecture summary', {
    defaultMode: config.openRouterMode,
    defaultBypassedAllRemote: defaultBypassCount === defaultResults.length,
    enhanceEligible: enhanceResult.diagnostics.openRouterEligible,
    legacyEligible: legacyResult.diagnostics.openRouterEligible,
    sessionCooldownBypass: cooldownResult.diagnostics.openRouterBypassReason,
    reportPath,
  });
} finally {
  console.info = originalInfo;
  console.warn = originalWarn;
  await server.close();
}
