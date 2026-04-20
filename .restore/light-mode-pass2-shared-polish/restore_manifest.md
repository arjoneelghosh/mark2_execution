# Restore Manifest

Timestamp: 2026-04-20 13:11:05 +05:30

## Files backed up

- `src/index.css`
- `src/components/ui/PreviewPanel.tsx`
- `src/components/ui/FocusPanel.tsx`
- `src/components/ui/ProjectMediaCarousel.tsx`
- `src/components/ui/BottomRail.tsx`
- `src/components/chat/ChatLauncher.tsx`
- `src/components/chat/PortfolioChatPanel.tsx`
- `src/components/navigation/CompactRing.tsx`
- `src/components/navigation/RingNode.tsx`
- `src/components/ui/ParticleField.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/AskPage.tsx`
- `src/pages/ProfilePage.tsx`
- `src/pages/ExperiencePage.tsx`
- `src/pages/LabPage.tsx`
- `src/pages/WorkPage.tsx`
- `src/pages/ConnectPage.tsx`

## Why they were changed

- Polished remaining light-mode weak spots in shared surfaces and major pages.
- Replaced page-local dark-first glass, chips, document frames, and action buttons with token-backed utilities.
- Improved Ask hierarchy, Home overlay treatment, and ring/particle compatibility without changing behavior.
- Kept dark mode as the reference baseline while making light mode feel more intentional and coherent.

## Restore instruction

Restoring means copying the backed-up files back over the edited files in the working tree.
