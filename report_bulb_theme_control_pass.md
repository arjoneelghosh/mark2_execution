Short summary

The existing theme toggle UI was replaced with a compact bulb control on `light_mode_exec`. The bulb reuses the same theme provider, persistence, startup initialization, and `toggleTheme()` logic, so this pass changes only the control surface.

Where the old toggle was replaced

- The rendered control was replaced in `src/components/ui/ThemeToggle.tsx`.
- The old `.theme-toggle-button` styling was replaced with `.theme-bulb-button` and related bulb-state styles in `src/index.css`.

How the bulb ON/OFF states are represented

- Light mode: bulb is visually ON through a brighter icon, illuminated filament, visible aura, and stronger highlight treatment.
- Dark mode: bulb is visually OFF through a dimmer icon, reduced filament brightness, and no active aura.
- The same button toggles between those states with the existing theme hook.

Confirmation that existing theme logic/persistence was preserved

- The control still reads the current theme from `useTheme()`.
- It still switches themes via `toggleTheme()`.
- The existing localStorage key and persistence logic in `src/lib/theme/theme.tsx` were not changed.
- Startup theme initialization and theme provider behavior were not changed.

Validation results

- `npm run typecheck`: passed
- `npm run build`: passed

Source-level validation confirmed:
- the bulb control is now rendered instead of the old toggle
- `aria-pressed` reflects light-mode ON state
- light and dark visual states are theme-specific
- no theme token or persistence logic was changed

I did not run a live browser refresh check in this environment, so persistence-after-refresh is confirmed from the unchanged theme provider/storage path rather than manual UI playback.
