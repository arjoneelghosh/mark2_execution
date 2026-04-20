# Mark 2 Plan

## Implementation Plan For This Pass

1. Introduce real routing with `react-router-dom` and replace `App.tsx` local page switching.
2. Replace the current inner-page dropdown nav with a compact ring-like Tier 1 control that:
   - keeps AG centered as home
   - highlights the active page
   - preserves a compact footprint in the top-right
3. Create a reusable inner-page shell for Work / Profile / Experience / Lab / Connect.
4. Make Tier 2 state controlled by pages and use it to drive visible dummy content changes.
5. Refactor dummy data into logical modules and prepare project schema for future richer media.
6. Refine homepage layout, spacing, and assistant entry treatment without replacing the ring concept.
7. Improve assistant quick actions and placeholder response structure.
8. Harden particle background lifecycle and reduced-motion behavior.
9. Run install/build/lint/typecheck, fix reasonable issues, and update docs with actual outcomes.

## What Will Be Changed Now

- Route-based navigation and page composition.
- Compact ring-style inner nav.
- Reusable page shell.
- Tier 2 state wiring and visible content filtering.
- Dummy data cleanup and modularization.
- Homepage layout refinement.
- Assistant UX cleanup.
- Particle background robustness improvements.
- Documentation and handoff artifacts.

## What Will Be Explicitly Deferred

- Real portfolio content.
- Production AI, RAG, or orchestration logic.
- Particle face morph or initials morph effects.
- Backend expansion or Supabase integration.
- Framework migration beyond the current Vite + React + TypeScript stack.
- Heavy animation systems or flashy visual effects.
