# Bulb Control Visual Proportion / Layout Fix Pass

## 1. Short summary

This pass rebalanced the existing bulb control without changing its concept, behavior, or theme logic. The control keeps the same two-circle architecture, but the curved mode label now sits in the lower band, the inner bulb shell fills the control more confidently, and the ON-state rays read more clearly as part of the bulb symbol.

## 2. How the two-circle architecture was preserved

- Kept the same outer circular control boundary.
- Kept the same single inner bulb shell circle.
- Did not add any new visible inner or outer rings.
- Kept the curved label on an invisible SVG text path only, so the control still reads as two circles instead of layered ring geometry.

## 3. How the label was moved to the lower arc

- Changed the SVG text path in `src/components/ui/ThemeToggle.tsx` to a lower-band arc instead of the previous higher arc.
- Increased the curved label text length slightly so the mode label can sit more naturally in the bottom band.
- Increased font size and slightly tightened letter spacing in `src/index.css` so `LIGHT MODE` / `DARK MODE` is more legible while still fitting within the existing band.

## 4. How the proportions and dead space were corrected

- Enlarged the inner bulb shell from `2.35rem` to `2.62rem`.
- Increased the bulb icon size from `18` to `20` and nudged it slightly downward for better optical centering.
- Widened the filament slightly and adjusted its vertical placement to better anchor the symbol in the inner circle.
- These changes reduce empty band space and make the control feel more compact and intentional without enlarging the whole control.

## 5. How the bulb/beam relationship was fixed

- Kept the 7-beam alternating pattern.
- Repositioned the beam container lower inside the inner circle so the rays visually originate from the bulb head rather than floating as background decoration.
- Widened the beam field slightly and adjusted the individual ray heights and angles so the pattern still reads `big, small, big, small, big, small, big`.
- The inner shell still clips overflow, so all rays remain inside the inner circle.

## 6. Confirmation that behavior and persistence were unchanged

- Theme state still comes from the existing `useTheme()` hook.
- Click behavior still uses the existing `toggleTheme()` path.
- Theme persistence and startup initialization were not changed.
- Placement, keyboard access, and the current button semantics were preserved.

## 7. Validation results

- `npm run typecheck`: passed
- `npm run build`: passed

Notes:
- No live browser verification was available in this pass, so visual validation is based on the updated SVG/CSS structure and successful build output.
- The existing Vite chunk-size warning remains, but the build completed successfully.
