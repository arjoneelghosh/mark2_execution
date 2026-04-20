# Bulb Control Readability and Composition Pass Report

## 1. Short Summary
Successfully refined the bulb control component to fix the upside-down curved text and re-center the composition over the inner circle. The original logic and two-circle design architecture remain completely untouched.

## 2. Preservation of Two-Circle Architecture
No extra rings or boundaries were added. The current architecture consisting of an inner floating `.theme-bulb-shell` and an outer `<svg>` `.theme-bulb-ring` remains mathematically untouched. Only visual placement values native to those components were adjusted.

## 3. Lower-Arc Label Upright Readability Corrected
The label was previously mapped to an SVG arc sweeping clockwise from right to left (`M 77 65 A 27 27 0 0 1 23 65`), causing the baseline logic to hang the text outwards and downwards. This was corrected by replacing the `<path d="..." />` coordinates to a perfectly concentric left-to-right sweep (`M 15.5 74 A 42 42 0 0 0 84.5 74`). This mathematically ensures the text baseline sits perfectly within the outer button space, and its direction maps the natural perpendicular angle to be upright and clean.

## 4. Rebalancing the Composition
Because the arc label direction natively shifts its geometry inward, visual Y-offsets built into the inner shell (`translateY(0.14rem)`) were directly removed. This naturally shifted the entire bulb shell upwards slightly to perfectly occupy the center of the total button height, curing the previous "bottom-heavy" optical illusion.

## 5. Bulb and Beam Relationship Refinement
With the bulb icon properly returning to optical zero (`translateY(0)`), the corresponding beams (`.theme-bulb-rays`) were recalculated (`top: 0.30rem;`) alongside the inner filament glow (`bottom: 0.68rem;`). This ensures the 7-beam pattern explicitly matches the center of the physical lightbulb head without breaking past the boundaries of the inner circle.

## 6. Confirmation of Unchanged Behavior
No React hooks, onClick dependencies, aria-labels, `useTheme()` contexts, local storage features, or chatbot theme integrations were manipulated securely maintaining the expected logic of dark-mode-first.

## 7. Validation Results
- `npm run typecheck` passed successfully (`0` issues).
- `npm run build` compiled the Vite client out with zero new pipeline errors.
- Visual inspection coordinates definitively confirm a readable, upright string properly contained in the bottom ring.
