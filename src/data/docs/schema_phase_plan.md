# Schema Phase Plan

## 1. Current Data Structure Summary

- `src/data/navigation.ts` defines Tier 1 navigation nodes plus Tier 2 labels.
- `src/data/projects.ts` contains project cards with only shallow preview metadata.
- `src/data/content.ts` contains page-facing placeholder cards for profile, experience, lab, and connect.
- `src/data/assistant.ts` contains quick actions and hard-coded assistant replies.
- `src/types.ts` only models the current placeholder UI needs, not a durable content schema.

## 2. What Is Insufficient In The Dummy Structure

- Projects do not yet capture:
  - detailed summaries
  - problem/approach/outcomes
  - link structures
  - media metadata
  - filter metadata
  - assistant/recruiter hints
- Experience is not modeled as real entries with organizations, roles, periods, or related work.
- Profile/about/skills are not represented as durable typed content records.
- Achievements / publications / certifications do not exist as a reusable schema layer.
- Assistant grounding is disconnected from the main content model and would be hard to retrieve from later.
- Current placeholder structures are optimized for the present UI, not for future project-detail pages or retrieval.

## 3. Proposed Real Schema

### Projects

- Core identity:
  - `id`
  - `slug`
  - `title`
  - `shortTitle`
- Classification:
  - `category`
  - `subcategories`
  - `tags`
  - `status`
  - `featured`
  - `priority`
  - `year`
  - `periodLabel`
- Summary layers:
  - `summary`
  - `previewSummary`
  - `overview`
  - `problem`
  - `approach`
  - `outcomes`
- Tech / metrics:
  - `techStack`
  - `metrics`
- Links:
  - `live`
  - `github`
  - `writeup`
  - `demo`
  - `external`
- Media:
  - `cover`
  - `preview`
  - `gallery`
  - each media item with `src`, `alt`, and optional `caption`
- Filtering / assistant:
  - filter facets for category/status/year/relevance
  - role relevance hints
  - assistant recommendation hints

### Experience

- `id`
- `organization`
- `role`
- `period`
- `type`
- `location`
- `summary`
- `bullets`
- `tech`
- `relatedProjectSlugs`

### Profile / About / Skills

- Profile:
  - `name`
  - `headline`
  - `shortBio`
  - `longBio`
  - `currentFocus`
- Skills:
  - grouped categories
  - ordered skill items
  - optional proficiency emphasis / notes

### Achievements / Publications / Certifications

- Shared record model with:
  - `id`
  - `type`
  - `title`
  - `issuer`
  - `date`
  - `note`
  - `link`

### Assistant Grounding

- Quick actions remain, but grounded against real content references.
- Role summaries and recruiter summaries become structured records.
- Project recommendation hints reference actual project slugs.
- Assistant knowledge cards become local typed records suitable for later retrieval.

## 4. Migration Strategy From Dummy Data To Real Structured Content

- Expand `src/types.ts` into a durable content schema.
- Replace shallow placeholder data with new modular records:
  - projects
  - experience
  - profile
  - achievements
  - assistant grounding
  - navigation metadata
- Add lightweight selector utilities that map the richer schema back into the current UI components.
- Keep placeholder values where real content is not yet available, but store them in the final schema shape.
- Preserve local project-preview assets and map them into typed media records.

## 5. What Will Be Implemented Now Vs Deferred

### Implement Now

- New TypeScript schemas/interfaces.
- Modular content records under `src/data`.
- Migration of current dummy content into those schemas.
- Minimal selectors/helpers for current UI consumption.
- Minimal UI updates to consume the new schema.

### Deferred

- Real content population beyond what is already reasonable from current placeholders.
- Project detail routes/pages.
- Production retrieval or assistant implementation.
- Large Tier 2 URL-state refactors.
