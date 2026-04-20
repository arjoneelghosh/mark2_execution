# Design Recovery Plan

## What Will Be Restored

- Homepage composition closer to the stronger Bolt balance, using the cleaner left-column layout and giving the ring more visual stage presence.
- Softer premium atmosphere:
  - richer gradient blend
  - subtler haze
  - ambient particle layer that feels less clinical
- Original glass / blur / glow language where it improves fidelity.
- More elegant ring and compact-nav styling so inner pages feel visually related to the homepage.
- Card, header, and Tier 2 styling tuned back toward the original Bolt softness.

## What Current Architecture Must Remain Untouched

- React Router route structure.
- Reusable inner-page shell pattern.
- Tier 2 functional content switching.
- Modular data files under `src/data/`.
- Ask as a separate assistant route and docked assistant architecture.
- Current particle cleanup / resize / reduced-motion correctness.

## What Will Be Partially Adapted Rather Than Copied Directly

- `core_design/src/pages/HomePageAlt.tsx` composition cues will be adapted into the current homepage rather than copied directly.
- Particle background will keep the current lifecycle safety while visually moving closer to the old atmosphere.
- Compact nav will not revert to the old dropdown, but its materials, glow, spacing, and softness will be tuned toward the original language.
- Inner pages will keep the reusable shell and data-driven behavior, but their presentation will be softened to feel closer to the old Bolt pages.
