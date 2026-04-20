# Light Mode Effects Tune Experiment

## Summary
Created an experimental branch from `light_mode_exec` to test whether the main remaining mismatch was in the small accent surfaces rather than the broader light-mode system. The experiment confirms that tags, pills, chips, helper labels, and related micro-accents were the dominant issue.

## Were tags/pills/chips the dominant offender?
Yes. After isolating the current warm base palette mentally, the most visually disconnected elements were the small accent surfaces: tabs, FAQ/helper pills, related tags, accent buttons, muted utility buttons, and similar micro-highlights. They still carried a cooler blue treatment than the surrounding warm materials.

## What changed for tags/pills/chips
- Softened `theme-pill` and `theme-tag` so the default micro-surfaces lean more into the warm chip materials and less into crisp cool contrast.
- Retuned `theme-pill-accent` and `theme-tag-accent` to use a gentler blue-tinted blend over the warm chip base instead of a stronger cool fill.
- Reduced accent border intensity and blue-shadow strength on those micro-surfaces.
- Softened `theme-button-accent` so it behaves more like a premium warm-light action surface rather than a colder blue insert.
- Retuned `theme-button-muted` so muted controls stay within the same warm material family.
- Softened `theme-meta-pill` and inline accent links so supporting accents feel designed rather than pasted on top.
- Slightly reduced the accent strength of the light user-message bubble for the same reason.

## Were any ring/particle tweaks needed?
No. For this branch, I intentionally stopped after the micro-surface pass. Once the tags/pills/chips were brought into harmony, further ring or particle retuning was not clearly necessary for the experiment.

## Dark mode confirmation
Dark mode was not altered. Only light-theme-specific CSS overrides were adjusted.

## Validation results
- `npm run typecheck`: passed
- `npm run build`: passed
- Build note: the existing Vite chunk-size warning remains, but the build completed successfully.

## Recommendation
This experiment is worth keeping and comparing against `light_mode_exec`. If visual review confirms the improvement, this branch is a strong candidate to replace `light_mode_exec` later. If not, it is also cleanly isolated enough to discard without affecting the base light branch.
