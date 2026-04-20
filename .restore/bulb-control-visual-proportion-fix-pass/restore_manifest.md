# Bulb Control Visual Proportion Fix Pass Restore Manifest

1. Timestamp
- `2026-04-20T19:08:00.8089729+05:30`

2. Files backed up
- `src/components/ui/ThemeToggle.tsx`
- `src/index.css`

3. Why they were changed
- `src/components/ui/ThemeToggle.tsx`
  - Rebalanced the curved mode-label arc so the label sits in the lower band.
  - Kept the same two-circle control concept while adjusting the inner symbol proportions.
- `src/index.css`
  - Enlarged the inner bulb shell and bulb icon relative to the outer control.
  - Repositioned the 7-ray pattern so it reads as emerging from the bulb and remains inside the inner circle.
  - Tuned the curved label size and spacing to reduce dead space without adding rings.

4. Exact restore instruction
- Restoring means copying the backed-up files in this folder back over the edited files in the repo:
  - copy `.restore/bulb-control-visual-proportion-fix-pass/src/components/ui/ThemeToggle.tsx` over `src/components/ui/ThemeToggle.tsx`
  - copy `.restore/bulb-control-visual-proportion-fix-pass/src/index.css` over `src/index.css`
