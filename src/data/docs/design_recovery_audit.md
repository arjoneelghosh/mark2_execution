# Design Recovery Audit

## Visual Elements Present In `core_design` But Missing Or Weakened Now

- Homepage left column in `core_design` is cleaner and more focused:
  - one strong name/title block
  - one short supporting paragraph
  - one assistant CTA
  - no extra explainer cards competing with the ring
- Current homepage added extra informational cards and more conceptual copy, which weakens the premium hero balance.
- Inner-page headers in `core_design` are visually lighter and more direct; current reusable shell is structurally good but visually more generic and segmented.
- `core_design` uses a calmer, more unified glass-card language. Current recovery target should reduce the “dashboard card” feel that appeared in places like Work stats and some section shells.

## Background / Effects Differences

- `core_design` background is simple but cohesive:
  - full-screen dark gradient
  - ambient particle dots
  - soft opacity
- Current app improved lifecycle correctness, but the atmosphere feels flatter because the background treatment is now more technical and less cinematic.
- No explicit shooting-star effect exists in `core_design`.
- Recovery should preserve the current robust particle lifecycle while restoring a softer atmospheric blend and, if added, only a very subtle streak layer consistent with the original mood.

## Hero Composition Differences

- `core_design` homepage has stronger visual balance:
  - clean left text stack
  - large ring on the right
  - restrained footer strip
- Current homepage is more verbose and visually broken into multiple blocks, reducing elegance.
- `core_design/src/pages/HomePageAlt.tsx` shows an even stronger composition idea:
  - offset left text cluster
  - ring given more stage presence
  - stronger premium asymmetry
- Recovery priority is to adapt the stronger composition cues from `HomePageAlt` while keeping the current routed architecture.

## Typography / Surface / Glow Differences

- `core_design` typography is simpler and more premium:
  - fewer uppercase system labels
  - cleaner large-type hierarchy
  - less explanatory UI chrome
- Current app overuses small meta labels and tracking-heavy system text.
- `core_design` surfaces are softer:
  - glass blur with lighter borders
  - restrained cyan highlights
  - subtler shadow language
- Current app often uses chunkier cards, stronger framing, and more visible system scaffolding.
- The current ring and compact nav are functionally better but visually a bit over-built compared with the softer Bolt feel.

## Components Affected

- Homepage:
  - `src/pages/HomePage.tsx`
- Atmosphere / effects:
  - `src/components/ParticleBackground.tsx`
  - `src/index.css`
- Tier 1 ring:
  - `src/components/NavigationRing.tsx`
- Compact inner-page control:
  - `src/components/CompactNav.tsx`
- Reusable inner-page presentation:
  - `src/components/InnerPageShell.tsx`
  - `src/components/SectionContentView.tsx`
  - `src/components/ProjectCard.tsx`
  - `src/components/TierTwoNav.tsx`
- Assistant styling:
  - `src/components/AIAssistant.tsx`

## Exact Recovery Priorities

### P0

- Restore homepage visual balance using `core_design` as the source of truth.
- Remove or reduce visual clutter introduced after the architecture refactor.
- Bring back a stronger premium left-column + ring composition.

### P1

- Restore the softer atmospheric background blend from `core_design` while keeping the current robust animation lifecycle.
- Reintroduce subtle cinematic motion only if it stays premium and restrained.

### P2

- Restore the original glow / blur / surface language:
  - softer glass panels
  - less boxy segmentation
  - more elegant borders and shadows
  - calmer typography hierarchy

### P3

- Keep all architectural gains untouched:
  - routing
  - reusable shells
  - functional Tier 2 behavior
  - modular data

### P4

- Align inner pages visually with the recovered homepage language so the whole app feels like one system instead of “premium home + structured app shell.”
