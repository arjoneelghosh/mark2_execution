# Mark 2 Audit

## Current Stack And Architecture Summary

- Stack: Vite 5, React 18, TypeScript 5, Tailwind CSS, Lucide icons.
- App shell: single `App.tsx` with local `useState` page switching instead of route-driven navigation.
- Data layer: single `src/data.ts` file mixing nav metadata, assistant actions, and project content.
- Page structure: one page component per section, with repeated page shell markup and duplicated content patterns.
- Navigation model:
  - Home uses a large ring (`NavigationRing`).
  - Inner pages use a hover-expanded dropdown-like control (`CompactNav`).
  - Tier 2 nav is locally stateful and visual-only (`TierTwoNav`).
- Assistant model: separate floating panel component with placeholder responses, currently driven by parent state.
- Visual system: dark theme, cyan accents, glassmorphism-like surfaces, ambient canvas background.

## What Already Matches Requirements

- Uses the preferred Vite + React + TypeScript stack.
- Keeps the homepage Tier 1 navigation as a large ring rather than a project ring.
- Keeps the assistant separate from the ring.
- Uses a dark theme with restrained animation overall.
- Includes a bottom information strip on the homepage.
- Uses dummy content rather than production portfolio data.
- Inner pages already include a compact navigation area and Tier 2 controls in some form.
- Work page already has placeholder project cards and breathable spacing.

## What Partially Matches

- Homepage visual direction is close to premium/futuristic, but still reads more like a polished prototype than a deliberate premium portfolio.
- The Tier 1 ring has hover enlargement, dimming, glow, and readable labels, but balance and depth cues can be improved.
- Inner-page compact nav exists, but the current interaction is a generic hover dropdown instead of a compact ring/navigation control.
- Secondary pages share a rough layout language, but they do not use one reusable shell component.
- Tier 2 items exist for each section, but they mostly do not drive meaningful visible content changes.
- Particle background exists, but cleanup and reduced-motion handling are incomplete.

## What Clearly Fails Or Misses

- No real routing: navigation is local state switching, so URLs, back/forward navigation, and route semantics are missing.
- `Ask` is not treated as a navigable top-level route or consistent assistant entry state; it only opens the panel.
- Compact inner nav does not match the intended compact ring/navigation control.
- AG home return exists on inner pages, but the active page is only shown as a dropdown selection state.
- Tier 2 is not contextual state that meaningfully changes page content in most sections.
- There is no reusable secondary page shell for Profile / Experience / Lab / Connect.
- Dummy data structure is too flat and coupled for future richer project/media evolution.
- Particle background leaks animation frames because `requestAnimationFrame` is never cancelled.
- Resize handling is basic and does not rebuild particle positions or support device pixel ratio.
- Accessibility/reduced-motion handling is missing for animated background and motion-heavy transitions.

## UX / Design Issues

- The homepage left content block is too generic and content-specific for a phase that should stay dummy-first.
- The visual hierarchy is inconsistent across pages; some pages feel sparse, others stacked.
- The current compact nav reveal on hover feels like a utilitarian menu rather than part of the same ring language.
- Tier 2 pills feel disconnected because clicking them often does not visibly change anything.
- Card and section treatments are similar but not fully systematized, so polish feels uneven.
- The assistant panel is functionally separate but visually abrupt relative to the rest of the UI.
- Work page filters are implicit in Tier 2 only; visible filtering language is weak.

## Structural / Code Issues

- `src/App.tsx` is a routing bottleneck and couples page state with assistant visibility.
- `src/data.ts` is overstuffed and not shaped for future extension.
- Several page components duplicate shell concerns: particle background, headers, nav placement, spacing.
- `TierTwoNav` owns its own local state instead of receiving state from the page/router layer.
- `CompactNav` is stateful hover UI rather than a deterministic navigation component.
- `HomePageAlt.tsx` appears unused and increases ambiguity.
- Content data is embedded inside page components for profile, experience, lab, and connect.

## Priority-Ranked Gaps

### P0

- Replace the dropdown-like inner-page compact nav with a compact ring/navigation control aligned with the homepage language.
- Keep AG as the clear home return and show the active Tier 1 page explicitly.

### P1

- Move from local state page switching to real route-based navigation.
- Make assistant open state route-aware enough to support direct navigation patterns cleanly.

### P2

- Refine homepage composition, spacing, and premium feel while preserving large ring, assistant separation, and bottom strip.

### P3

- Make Tier 2 actually drive visible content state on Work and secondary pages.

### P4

- Refactor dummy data into cleaner modules and prepare project schema for multiple preview images.

### P5

- Improve assistant UX structure and quick-action intent while keeping dummy-only behavior.

### P6

- Harden particle background lifecycle, resize handling, and reduced-motion support.

### P7

- Improve system-wide spacing, card consistency, hover states, and alignment polish.

## Update After Fixes

## What Was Fixed In This Pass

- Replaced local `useState` page switching with real route-based navigation via `react-router-dom`.
- Replaced the generic hover dropdown inner nav with a compact ring-style Tier 1 control that keeps `AG` centered as the home return and highlights the active page.
- Added a reusable inner-page shell used by Work / Profile / Experience / Lab / Connect / Ask.
- Made Tier 2 controlled by the page layer rather than internal component state.
- Made Tier 2 visibly useful:
  - Work filters the project grid by the active Tier 2 category.
  - Profile / Experience / Lab / Connect switch their visible dummy content by Tier 2 selection.
- Refactored dummy data into modular files under `src/data/`.
- Updated the dummy project schema to support multiple preview images and richer metadata.
- Refined the homepage hero composition, premium block structure, and separate assistant entry treatment.
- Restructured the assistant UI around intentional quick actions and structured placeholder responses.
- Hardened the particle background with resize rebuilding, reduced-motion handling, and animation-frame cleanup.

## What Remains

- The compact inner nav is now ring-like and route-driven, but it could still be tuned further for mobile ergonomics and spatial balance.
- Tier 2 state is useful now, but it is still local UI state rather than encoded in the URL.
- The Ask route works as a real Tier 1 destination, but its main-page content is still intentionally lightweight because the docked assistant remains the primary interaction surface.
- Visual polish can still improve in typography nuance, spacing rhythm, and finer motion timing.
- Image assets are still remote placeholder URLs rather than local controlled assets.
- The assistant architecture is cleaner, but no real retrieval, ranking, or evidence model exists yet by design.

## Known Issues

- `npm install` reports 15 package vulnerabilities in the dependency tree inherited from the current stack. This pass did not attempt dependency upgrades beyond adding routing.
- `npm run build` needed elevation in this environment because Vite/esbuild process spawning hit Windows sandbox restrictions. The build succeeded once rerun with elevation.
- Browserslist reports an outdated `caniuse-lite` dataset during build. This is informational and did not block the build.

## Next Recommended Step

- Move Tier 2 state into route params or search params so filtered views become directly shareable and reviewable.
- Tighten the compact nav layout for smaller screens and run a visual pass on page-header spacing.
- Replace remote placeholder imagery with controlled local dummy assets to reduce external dependency risk during demos.

## Design Recovery Update

- Recovered the homepage composition toward the original Bolt balance by removing extra explanatory cards and restoring a cleaner left-column hero with stronger ring stage presence.
- Softened the shared visual language across the routed app:
  - calmer glass surfaces
  - restored glow behavior
  - less dashboard-like segmentation
  - improved atmospheric background blend
- Kept routing, reusable shells, functional Tier 2 behavior, and modular data untouched.

## Current Visual Status

- The app now sits closer to the original Bolt visual tone while preserving the stronger architecture from the previous pass.
- Homepage quality is materially improved.
- Inner pages feel more related to the homepage than before, though they still need another polish pass for mobile spacing and typography nuance.

## Remaining Polish Gaps

- Compact inner-page navigation can still be tuned further on smaller screens.
- Section content blocks are softer now, but some inner-page layouts still read more utilitarian than the original homepage.
- Remote placeholder images still limit full visual control during demos.

## Final Pre-Schema Pass Summary

- Polished the compact inner-page ring/control for better responsiveness, hit-target clarity, and active-page readability.
- Improved shared inner-page composition rhythm with page-specific accents while keeping the reusable shell intact.
- Refined typography and block hierarchy across shell headers, content cards, and project cards.
- Replaced remote placeholder imagery with local project-controlled dummy assets under `src/assets/project-previews/`.
- Added a very subtle rare diagonal streak layer to the ambient background because it improved atmosphere without creating visual noise.
- Clarified the relationship between the Ask route and the docked assistant while keeping them visually separate.

## Remaining Pre-Schema Gaps

- Compact nav should still be manually reviewed on very small devices for touch comfort.
- Inner-page layouts are now stronger, but some pages may still benefit from richer page-specific composition after real content arrives.
- Tier 2 URL-state syncing is still deferred and should be evaluated in the next phase rather than in this visual pass.

## Recommended Next Step

- Move into the real data/schema planning phase using the current routed UI shell as the stable product surface.
- During that phase, define the project/content schema around the existing modular dummy data and local preview-image pattern rather than reshaping the UI again first.

## Schema / Data Phase Summary

- Replaced the shallow dummy content model with a richer typed local schema for projects, experience, profile, records, navigation metadata, and assistant grounding.
- Migrated current placeholder content into final-schema-shaped local records rather than UI-only cards.
- Preserved the current routed UI and adapted only the minimal selectors/components needed to consume the richer schema.
- Kept the app local-first and TypeScript-first without introducing CMS, backend, or production AI complexity.

## Remaining Content-Population Gaps

- Real portfolio copy is still placeholder content in the new schema.
- Real links, metrics, project outcomes, publications, and certifications still need actual source material.
- Project detail pages are not implemented yet, though the project schema now supports them.
- Tier 2 URL-state syncing remains deferred.

## Recommended Next Step

- Start real content population against the new schema modules rather than editing UI components directly.
- After initial content population, evaluate assistant grounding refinement and then Tier 2 URL state if it still matters for review/shareability.
