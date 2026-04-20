# Main Branch Cleanup Pass Restore Manifest

1. Timestamp
- `2026-04-21T00:23:56.7461951+05:30`

2. Files backed up
- `.gitignore`

3. Why they were changed
- `.gitignore`
  - Added ignore entries for local-only process artifacts, pass reports, design reference folders, and repo planning manifests so they do not get re-added to `main`.

4. Exact restore instruction
- Restoring means copying the backed-up file in this folder back over the edited repo file:
  - copy `.restore/main-branch-cleanup-pass/.gitignore` over `.gitignore`

Notes
- This cleanup removes process-artifact files from Git tracking with `git rm --cached` but leaves them on disk locally.
- To restore those tracked entries, re-add the local files to Git after restoring `.gitignore`.
