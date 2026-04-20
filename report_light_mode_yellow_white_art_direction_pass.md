# Light Mode Yellow/White Art Direction Pass

## Summary
Applied the approved warm yellow/white light-direction cues on `light_mode_exec` by retuning the light-theme token family and the light-only material overrides in the shared CSS layer. Dark mode was left unchanged.

## What was learned from `approved_design/Light`
- The approved direction is not neutral white; it uses an ivory-to-pale-yellow base with olive-beige panel families.
- Blue remains the identity accent, but it should sit on top of a warmer world rather than define the entire light palette.
- The Home hero needs a warm translucent block and warmer portrait masking so it feels intentionally art-directed.
- The ring and particle effects should stay visible in light mode and read as part of the same brand system, not disappear into the page.

## Light-theme palette/material changes
- Replaced the cool gray light base with warmer ivory, parchment, and pale-yellow light tokens.
- Warmed panel, soft-panel, elevated-panel, border, and chip tokens while preserving the existing blue accent family.
- Increased light-only particle density, radius, and halo strength for a more perceptible but still subtle ambient field.
- Increased light-only compact-ring field and halo strength and warmed the ring core fill.
- Retuned shared light-only materials like `glass-panel`, `card-base`, `surface-shell`, `surface-shell-deep`, pills, tags, buttons, callouts, and media frames toward warmer shadows and less sterile white highlights.
- Added warmer light-only `bg-page` and `bg-home` radial layering so the site background is visibly warmer without changing layout.

## Home improvements
- Shifted the Home hero card to a warm olive-beige translucent panel closer to the approved references.
- Restyled hero title/body copy in light mode so the hero reads as a designed composition rather than dark-mode text placed on a pale page.
- Warmed the Current Focus and lower feature-block surfaces so they sit naturally inside the approved palette.
- Adjusted portrait overlays so the portrait integrates into the warm page atmosphere instead of sitting against a cool background.

## Ask and shared content page improvements
- Ask and the content pages inherit warmer shells, chat surfaces, pills, buttons, chips, callouts, and media/document frames from the shared CSS layer.
- The existing surface hierarchy and component structure were preserved; only the light-theme material treatment changed.
- The light palette now reads as cream/parchment with blue accents instead of cool gray-white.

## Ring and particle improvements
- Light-mode particles are more visible through stronger density, radius, opacity, and halo values.
- The compact ring keeps the same behavior but now sits on a warmer ivory core with stronger blue field and halo presence in light mode.

## Dark mode confirmation
Dark mode was intentionally left unchanged in this pass. No dark-theme tokens or dark-only overrides were edited.

## Validation results
- `npm run typecheck`: passed
- `npm run build`: passed
- Build note: the existing Vite chunk-size warning remains, but the build completed successfully.

## Minor deferred issues
- No live screenshot/browser QA was possible in this pass, so visual confirmation is based on the approved reference review plus source/build validation.
- If later polish is wanted, it should focus on screenshot-level tuning rather than another palette rewrite.
