Short summary

The bulb control on `light_mode_exec` was refined without changing its two-circle geometry or behavior. The ON-state beam pattern now uses seven internal rays with an alternating big/small rhythm, and the curved `LIGHT MODE` / `DARK MODE` label was enlarged for better legibility.

Confirmation that the two-circle architecture was preserved

- The control still uses the same outer circular control boundary and the same inner bulb shell circle.
- No extra inner rings or outer rings were added.
- The curved label still uses an invisible SVG arc only; it does not introduce any additional visible ring layer.

How the beam count/pattern was updated

- The beam count was increased from 3 to 7.
- The visual rhythm is now:
  - big
  - small
  - big
  - small
  - big
  - small
  - big
- The rays are still rendered inside the bulb shell and remain clipped by the inner circle so they do not spill outside it.

How the mode-label text was enlarged

- The curved ring-label font size was increased in `src/index.css`.
- The text path length was slightly widened in `src/components/ui/ThemeToggle.tsx` so the larger text still fits the existing band cleanly.
- The label remains centered and curved inside the band between the two circles.

Confirmation that behavior and persistence were unchanged

- `src/lib/theme/theme.tsx` was not changed.
- Theme initialization, localStorage persistence, and theme switching behavior were not changed.
- The button still toggles through the existing `useTheme()` path.

Validation results

- `npm run typecheck`: passed
- `npm run build`: passed

Source-level validation confirmed:
- the control still uses only the same two visible circles
- the curved mode label is larger than before
- the ON-state ray container now has seven rays
- the ray sizing alternates between larger and smaller strokes while staying inside the bulb shell

I did not run a live browser verification in this environment, so the seven-ray visual outcome is confirmed from the updated DOM/CSS structure and successful build rather than manual UI playback.
