# Chatbot Short Query Recruiter Pass Restore Manifest

1. Timestamp
- `2026-04-21T09:52:39.2453829+05:30`

2. Files backed up
- `src/lib/chatbot/retrievePortfolioContext.ts`
- `src/data/chatbotKnowledge.ts`

3. Why they were changed
- `src/lib/chatbot/retrievePortfolioContext.ts`
  - Hardened routing for short identity prompts, summary typos, recruiter-style strengths/weaknesses prompts, and SWOT/SWAT analysis prompts.
- `src/data/chatbotKnowledge.ts`
  - Added grounded portfolio-level strengths, weaknesses, and SWOT knowledge entries used by the local answer layer.

4. Exact restore instruction
- Restoring means copying the backed-up files in this folder back over the edited files:
  - copy `.restore/chatbot-short-query-recruiter-pass/src/lib/chatbot/retrievePortfolioContext.ts` over `src/lib/chatbot/retrievePortfolioContext.ts`
  - copy `.restore/chatbot-short-query-recruiter-pass/src/data/chatbotKnowledge.ts` over `src/data/chatbotKnowledge.ts`
