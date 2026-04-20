# Dark Parity Restore Report

1. Short summary
- Restored the shared dark-mode utilities on `light_mode_exec` so dark mode tracks the original `main` branch much more closely while preserving the light-mode token system and toggle.

2. What dark regressions were found
- Shared theme utilities on the light branch were using light-leaning border and chip alpha values in dark mode, which made white borders too strong.
- Pill and tab controls were all routed through generic themed utilities that were too bright for dark mode.
- Card and shell helpers such as `card-base`, `surface-shell`, `surface-shell-deep`, and `glass-panel` had drifted away from the original dark translucency and depth.
- Ask had a visible dark-mode hierarchy regression because the shell, FAQ rail, chat column, and composer were all using the same generalized themed surface language.
- Home dark overlays and CTA surfaces had also drifted from the original darker treatment.

3. Which tokens/components were adjusted
- `src/index.css`
  - added dark-mode-specific overrides for `glass-panel`
  - restored dark-side `card-base` and hover styling
  - restored darker `surface-shell` and `surface-shell-deep` fills and softer borders
  - restored darker divider, pill, tag, muted button, accent button, media frame, home CTA, and toggle treatments
  - restored the original dark Home overlay gradients
  - added `surface-chat-column` so Ask can keep separate dark and light chat-column behavior
- `src/pages/AskPage.tsx`
  - changed the right-side wrapper from `surface-chat` to `surface-chat-column` so dark mode can preserve the original shell hierarchy without removing the light-mode chat surface

4. What was restored for tabs/pills
- In dark mode, inactive tabs/pills now match the original treatment much more closely: low-opacity dark glass, softer white borders, and navy-muted text.
- Active accent pills now use the original accent-blue tint range rather than the brighter generalized light-mode accent treatment.

5. What was restored for cards/panels/shells
- Cards were restored to the original darker glass surface with softer white borders and no extra bright dark-mode shadowing.
- Preview/focus panels and major shells now use darker navy gradients and softer white borders again.
- Media/document frames on dark mode were returned to darker navy-backed frames instead of lighter shared-surface fills.

6. What was restored for Ask dark hierarchy
- Outer shell restored to the deeper dark gradient and softer border from the original design direction.
- FAQ rail restored to a subtle lighter dark surface.
- Chat column stopped using the same generalized chat surface in dark mode, preventing the hierarchy from flattening.
- Conversation bubbles, composer shell, and input shell were all tuned back to darker baseline values.

7. What was restored for ring/particle dark mode
- No ring behavior changes were made.
- Dark-mode ring and particle values were preserved through the token system; no additional behavior-layer edits were required in this pass.
- The focus of the pass stayed on the shared dark surface utilities that were causing the visible regressions.

8. What remains intentionally deferred for later light-mode art direction
- Final visual polish for light mode across individual pages.
- Any further ring glow/particle art-direction tuning for light mode.
- A deeper visual QA pass comparing screenshots page by page between `main` and `light_mode_exec`.

9. Validation results
- `npm run typecheck`: passed
- `npm run build`: passed
- Build completed successfully with the existing Vite chunk-size warning still present.
