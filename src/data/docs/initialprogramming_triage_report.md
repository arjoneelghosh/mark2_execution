# InitialProgramming Triage Report

## Summary
- Folders inspected: `DBMS`, `DIP AI`, `Project file`, `Web Dev`
- Probable standalone projects: 1
- Probable coursework/training folders: 3
- Likely merge/support-only items: 2
- Excluded by default: `Project file PPT`, `Untitled-1.c`, `Untitled-1.exe`, `VSCodeUserSetup-x64-1.82.3.exe`

## Folder Review

### DBMS
- Probable title: `ClinicDBMS` / clinic database exercises
- Assessment: coursework/training
- Portfolio treatment: exclude
- Why:
  - The folder is mostly loose SQL practice files and SSMS solution files.
  - `ClinicDBMS` contains table definitions, joins, procedures, triggers, and backup statements, but no application layer, README, packaging, or cohesive deliverable beyond SQL practice.
- Key evidence:
  - `patient_master.sql` defines a single clinic-style table and manual schema edits.
  - `Queries and joining.sql` contains ad hoc joins, stored procedure examples, triggers, cursor examples, and backup commands.
  - Top-level `DBMS` also contains multiple generic SQL query files like `Query1.sql`, `SQLQuery1.sql`, `RANDOM.sql`.
- Recommendation: archive mentally as coursework, do not include as a portfolio project.

### DIP AI
- Probable title: hand gesture recognition training / prototype
- Assessment: coursework/training with duplicated variants
- Portfolio treatment: exclude as standalone, optionally merge into a later CV-learning timeline if needed
- Why:
  - Both visible subfolders resolve to the same `hackathon hand gesture` structure.
  - The project appears centered on webcam data collection and classification scripts using `cvzone`, with `Data` and `Model` folders but no README, product framing, or deployable app structure.
  - One variant predicts all A-Z labels; another narrower variant predicts only `A`, `L`, `O`, `V`, `Y`, suggesting experimentation rather than separate products.
- Key evidence:
  - `datacollection.py` captures webcam frames into `Data/Z`.
  - `test.py` loads `Model/keras_model.h5` and `Model/labels.txt` with `cvzone.ClassificationModule`.
  - Folder duplication between `DIP AI\\hackathon hand gesture\\hackathon hand gesture` and `DIP AI\\Hand Gesture Training\\hackathon hand gesture`.
- Recommendation: not strong enough for standalone portfolio inclusion from this root alone.

### Project file
- Probable title: Human Resource Management System
- Assessment: real standalone project, but small and template-heavy
- Portfolio treatment: archive candidate
- Why:
  - `hrm` is a coherent PHP/MySQL web app with login, employee management, leave tracking, admin and user views, and an included SQL dump.
  - The implementation appears functional enough to count as a real project.
  - It also appears based on an older template stack and contains plain PHP/MySQL patterns, weak security practices, and vendor/template traces, which lowers flagship value.
- Key evidence:
  - `index.php` clearly brands the app as `Human Resource Management System`.
  - `controller/login.php` implements admin and employee authentication and workload/login tracking.
  - `db/hrm_db.sql` contains a full schema for employees, roles, cities, daily workload, etc.
  - Separate `user` area exists with profile, leave status, apply leave, and contact pages.
- Recommendation: keep only as an archive/supporting candidate, not featured.

### Web Dev
- Probable title: web development practice collection
- Assessment: coursework/training
- Portfolio treatment: exclude
- Why:
  - The folder is a bundle of early HTML/CSS exercises rather than a single coherent project.
  - `DAA portfolio` is explicitly a lab proof/demo page for coursework.
  - `First website`, `CSS`, `Forms`, `Inline Block ID and Classes`, and `2nd part` are basic practice pages with media embeds and simple markup.
- Key evidence:
  - `DAA portfolio/index.html` says `Lab Experiment Completion Proof` and shows assignment/demo screenshots.
  - `First website/index.html` is an early personal practice page with inline base64 image markup and loose text files.
  - Other subfolders contain tiny HTML/CSS exercises only.
- Recommendation: exclude as portfolio entries.

## Worth Merging Into Another Project
- `DIP AI`
  - If you later build a broader timeline of ML/CV learning work, the hand-gesture scripts could be referenced as an early experiment rather than as a standalone project.
- `Project file/hrm`
  - Could be retained as an archive project if you want breadth in web CRUD/database systems.

## Final Recommendation
- Keep: `Project file/hrm` as an archive-only candidate.
- Archive mentally but do not prioritize: `DIP AI` only as evidence of early computer-vision experimentation.
- Exclude: `DBMS`, `Web Dev`, `Project file PPT`, `Untitled-1.c`, `Untitled-1.exe`, `VSCodeUserSetup-x64-1.82.3.exe`.
