Short summary

The existing bulb theme-control on `light_mode_exec` was refined rather than replaced. The control keeps the same placement, click behavior, and theme hook integration, but now reads state through the bulb, light rays, and a curved ring label instead of visible ON/OFF text.

How the existing bulb architecture was preserved

- The same compact fixed bulb control remains in the bottom-left corner.
- The same outer circular control and inner bulb core were kept as the base structure.
- The button still reads `theme` from `useTheme()` and still toggles with `toggleTheme()`.

How the On/Off text was removed

- The visible `ON` / `OFF` text element was removed from `ThemeToggle.tsx`.
- State is now communicated visually through the bulb appearance, the rays, and the curved mode label in the circular band.

How ON vs OFF is now represented

- Dark mode / OFF state:
  - dimmer bulb icon
  - muted filament
  - no rays
  - quieter ring treatment
- Light mode / ON state:
  - brighter bulb
  - illuminated filament
  - subtle light rays above the bulb
  - stronger ring emphasis

How the curved mode label was implemented

- The mode label is rendered with inline SVG inside the control.
- A `textPath` is attached to a lower arc path in the band between the outer and inner circles.
- The label updates between `DARK MODE` and `LIGHT MODE` based on the current theme.

Confirmation that theme logic/persistence was preserved

- `src/lib/theme/theme.tsx` was not changed.
- The storage key, provider behavior, startup initialization, and theme token system were not changed.
- The control still uses the existing theme state and `toggleTheme()` path.

Validation results

- `npm run typecheck`: passed
- `npm run build`: passed

Source-level validation confirmed:
- the bulb control still renders
- visible ON/OFF text is gone
- dark mode presents an OFF state
- light mode presents an ON state with rays
- the ring band now carries the curved mode label

I did not run a live browser refresh check here, so persistence-after-refresh is confirmed from the unchanged theme system rather than manual UI playback.
