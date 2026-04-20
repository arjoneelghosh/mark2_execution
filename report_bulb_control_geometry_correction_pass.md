Short summary

The bulb control on `light_mode_exec` was corrected back toward the cleaner two-circle design. The extra visible ring layer was removed, the curved mode label was kept inside the existing band, and the light-mode rays now originate from the bulb drawing and stay inside the inner circle.

How the control was restored to the two-circle design

- The visible SVG ring circles were removed from `ThemeToggle.tsx`.
- The control now reads visually as:
  - the outer circular control boundary
  - the inner bulb shell circle
- No additional visible inner or outer ring layers were kept.

How the curved mode label was kept without extra rings

- The curved label still uses SVG `textPath`, but only on an invisible arc path.
- The label sits in the band between the outer control circle and the inner bulb shell.
- Font sizing and text length were tightened slightly so the label fits the two-circle geometry cleanly.

How the beams were repositioned into the bulb/inner circle

- The light-mode rays were moved inside the bulb shell instead of being positioned around the full control.
- The bulb shell now clips overflow, which keeps the rays contained inside the inner circle.
- The rays are positioned above the bulb icon so they read as part of the bulb drawing rather than as external rays around the toggle.

Confirmation that behavior and persistence were unchanged

- `src/lib/theme/theme.tsx` was not changed.
- Theme storage, initialization, and toggle behavior were not changed.
- The control still toggles via the same `useTheme()` path and keeps persistence unchanged.

Validation results

- `npm run typecheck`: passed
- `npm run build`: passed

Source-level validation confirmed:
- only the outer control and inner bulb shell remain as visible circular layers
- the curved mode label still exists in the band between them
- the rays now live inside the bulb shell and only appear in the ON state

I did not run a live browser check in this environment, so the beam-placement result is validated from the updated DOM/CSS structure and build output rather than manual UI playback.
