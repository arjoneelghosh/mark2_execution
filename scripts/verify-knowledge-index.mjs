import { createServer } from 'vite';

const root = process.cwd();

const deterministicQueries = [
  'Who is Arjoneel?',
  'Summarize Arjoneel for a recruiter',
  'What is AgriFore?',
  'What paper is Arjoneel listed on?',
  'What internships are listed?',
  'What is in Lab Concepts?',
  'How does the chatbot for this portfolio website work?',
];

const broaderQueries = [
  'What did Arjoneel build at hackathons?',
  'What recurring themes show up across the project docs?',
  'Which projects have deeper study material?',
  'What do the docs say about project readiness?',
  'What supporting material exists for forecasting work?',
  'What supporting material exists for full-stack work?',
];

const sourceBucketForChunk = (chunk) =>
  chunk.sourceFile.includes('/docs/') || chunk.sourceFile.includes('\\docs\\') ? 'docs' : 'content';

const summarizeRetrievedChunks = (chunks) => {
  const docsCount = chunks.filter((chunk) => sourceBucketForChunk(chunk) === 'docs').length;
  const contentCount = chunks.length - docsCount;

  return {
    totalRetrievedChunks: chunks.length,
    docsChunkCount: docsCount,
    contentChunkCount: contentCount,
    topSupportSource:
      docsCount > 0 && contentCount > 0
        ? 'both'
        : docsCount > 0
          ? 'docs'
          : contentCount > 0
            ? 'content'
            : 'none',
    topChunks: chunks.slice(0, 5).map((chunk) => ({
      id: chunk.id,
      title: chunk.title,
      section: chunk.section,
      sourceFile: chunk.sourceLabel,
      sourceBucket: sourceBucketForChunk(chunk),
      docType: chunk.docType,
    })),
  };
};

const server = await createServer({
  root,
  appType: 'custom',
  logLevel: 'error',
  server: {
    middlewareMode: true,
  },
});

try {
  const knowledgeIndexModule = await server.ssrLoadModule('/src/lib/chatbot/knowledgeIndex.ts');
  const retrievalModule = await server.ssrLoadModule('/src/lib/chatbot/retrievePortfolioContext.ts');

  const { knowledgeIndexStats, searchKnowledgeChunks } = knowledgeIndexModule;
  const { resolvePortfolioQuery } = retrievalModule;

  const deterministicResults = deterministicQueries.map((query) => {
    const resolution = resolvePortfolioQuery(query);
    return {
      query,
      matchedDomain: resolution.matchedDomain,
      canonicalIntent: resolution.canonicalIntent,
      usedKnowledgeSearch: resolution.context.kind === 'knowledge-search',
      matchedEntryCount: resolution.matchedEntryCount,
    };
  });

  const broaderResults = broaderQueries.map((query) => {
    const resolution = resolvePortfolioQuery(query);
    const retrievedChunks =
      resolution.context.kind === 'knowledge-search'
        ? resolution.context.chunks
        : searchKnowledgeChunks(query, 6).map((result) => result.chunk);

    return {
      query,
      matchedDomain: resolution.matchedDomain,
      canonicalIntent: resolution.canonicalIntent,
      usedKnowledgeSearch: resolution.context.kind === 'knowledge-search',
      ...summarizeRetrievedChunks(retrievedChunks),
    };
  });

  console.log(
    JSON.stringify(
      {
        knowledgeIndexStats,
        deterministicResults,
        broaderResults,
      },
      null,
      2
    )
  );
} finally {
  await server.close();
}
