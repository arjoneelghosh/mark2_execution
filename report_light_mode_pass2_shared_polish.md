# Light Mode Pass 2: Shared Pages + Surface Polish

## Summary

This pass focused on the most visible remaining light-mode weak spots after the infrastructure pass. The work stayed centered on shared surfaces, page-level polish, Ask hierarchy, Home readability, and ring/particle compatibility. Dark mode remains the baseline reference.

## Main weak spots identified before edits

- Page-local white-alpha chips, borders, and glass surfaces still looked muddy in light mode.
- Document and media containers in Profile, Experience, and Work still used dark-first navy overlays.
- Ask shell hierarchy was structurally correct but the outer shell and chat pane still felt too close in tone.
- Home portrait overlays and the Ask CTA still felt heavier than they should on pale backgrounds.
- Project/Lab preview controls, inline action links, and secondary buttons still relied on dark-only styling.
- Ring and particle support was functional in light mode but still under-contrasted.

## Pages and components polished

- Shared utilities in `src/index.css`
- `ProjectMediaCarousel`
- `BottomRail`
- `ChatLauncher`
- `ParticleField`
- `HomePage`
- `AskPage`
- `ProfilePage`
- `ExperiencePage`
- `LabPage`
- `WorkPage`
- `ConnectPage`

## What improved in Ask light mode

- The outer Ask shell now uses a deeper themed shell surface so it reads as a distinct frame.
- The right-side chat column now sits on a dedicated chat surface instead of feeling visually flat against the shell.
- Existing FAQ, chat, composer, and action surfaces continue to use the shared token system, so the hierarchy remains:
  - outer shell deepest
  - FAQ rail lighter
  - chat area lightest
  - composer distinct but related
- Disabled mic state was normalized to a token-backed muted control instead of a hardcoded dark glass fallback.

## What improved on Home

- Portrait overlays now use theme-backed Home-specific overlay utilities instead of hardcoded dark gradients.
- Portrait opacity scales down more gently in light mode so the image does not dominate the page.
- The Ask CTA now uses a dedicated themed callout surface instead of white-alpha dark glass.
- Section navigation links and preview tags were normalized to token-backed link/tag utilities.
- Homepage ring shadow treatment was softened in light mode without changing the ring behavior.

## What improved for ring and particle compatibility

- Light-mode ring stroke and muted label tokens were strengthened for better visibility.
- Particle layer opacity now responds to theme through CSS variables instead of a fixed dark-first opacity.
- Ring architecture and interactions were left unchanged.

## Page-local hardcoded colors cleaned up

- Replaced remaining dark-first chips and meta pills on Work, Lab, Experience, Profile, and Home preview tags with token-backed classes.
- Replaced dark-first document/media frames in Profile, Experience, and Work with a shared themed media frame.
- Replaced page-local action buttons and inline links with theme-backed button/link utilities on Work, Lab, Profile, Experience, Connect, and Home.
- Replaced page-local top-divider borders with shared themed divider utilities where the light-mode contrast was weak.

## What remains for later polish

- Final art direction for Home portrait composition in light mode.
- Final homepage/subsection ring glow tuning beyond compatibility.
- More exhaustive cleanup of page-local typography and spacing for light mode.
- Secondary components not central to this pass, especially any remaining isolated dark-first classes outside the main shared surfaces.
- Manual browser-based visual QA across both themes would still be useful before a final polish pass.

## Validation results

- Branch confirmed: `light_mode_exec`
- `npm run typecheck`: passed
- `npm run build`: passed
- Build still reports the existing chunk-size warning, but production build completed successfully.
- Source-level verification confirms the major shared page remnants were moved onto token-backed surfaces.
