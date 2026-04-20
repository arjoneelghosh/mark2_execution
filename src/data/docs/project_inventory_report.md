# Project Inventory Report

## Summary
- Root inspected: `C:\onedrive_localdata\Programming`
- Top-level folders inspected: 18
- Likely portfolio candidates reviewed: 12
- Skipped or excluded top-level items: 8
- Blocked item: `Face-Detection` could not be opened because the directory returned access denied

### Top Featured Candidates
1. `Sign_Language/signchat_py` - live sign-language transcription app with Streamlit, MediaPipe, and TensorFlow
2. `hackathon-main` - LoanONE AI loan-approval product prototype with clear product flow and hackathon framing
3. `SIH_bot/chatbot` - CropIQ agriculture assistant with chat workflow, mock domain data, and orchestration logic
4. `VolunTree/code` - multi-page volunteer platform with frontend, backend, auth, and infra traces
5. `Collaborative_Filtering_Rec_Engine/project` - movie recommender with React frontend plus a separate collaborative-filtering model script

### Top Supporting / Archive Candidates
1. `Gesture-Recognition-master` - hand-tracking / ASL recognition ML project
2. `ansh_c/surgemedi` - polished medical supplies catalog frontend
3. `File_filter` - Streamlit CSV priority sampler utility
4. `SopraSteria/Filtering` - incident CSV filtering dashboard
5. `Commitment_issues/github_contribution_scheduler` - desktop utility for planning scheduled GitHub commits

### Low-Confidence / Unclear
- `Payment_Wall` - looks like a project, but the folder is structurally messy and may overlap with `hackathon-main`
- `STEP_saturday_extra_class/Project/rec_system` - recommendation/chatbot experiment with mixed frontend/backend evidence, but unclear scope and polish
- `Face-Detection` - blocked by filesystem permissions, so no reliable classification was possible

## Folder-by-Folder Review

### `hackathon-main`
- Probable project name: LoanONE AI
- Probable purpose: AI-assisted online loan approval / onboarding flow
- Likely stack: React, TypeScript, Vite, Tailwind, shadcn/ui, React Router, TanStack Query
- Confidence: high
- Suggested portfolio treatment: featured
- Why: strong product framing, named features, multi-route structure, and enough evidence to describe meaningfully
- Key evidence found:
  - `README.md` explicitly describes "LoanONE AI - Intelligent Loan Approval System"
  - README lists voice entry, document upload, verification status, live camera, and AI-based face detection
  - `package.json` shows a substantial frontend stack
  - `App.tsx` has real route composition for login, questionnaire, upload, and status flows

### `Sign_Language/signchat_py`
- Probable project name: SignChat
- Probable purpose: live sign-language transcription / communication assistant
- Likely stack: Python, Streamlit, streamlit-webrtc, OpenCV, MediaPipe, TensorFlow, Pydantic
- Confidence: high
- Suggested portfolio treatment: featured
- Why: strong technical depth, clear assistive use case, and detailed README with implementation notes
- Key evidence found:
  - `README.md` names the app and describes ASL/BSL/ISL support
  - README references webcam inference, language switching, and model files
  - `requirements.txt` includes Streamlit, MediaPipe, TensorFlow, and OpenCV

### `SIH_bot/chatbot`
- Probable project name: CropIQ
- Probable purpose: agriculture advisory chatbot / crop planning assistant
- Likely stack: React, TypeScript, Vite, Zustand, Supabase client, Tailwind, local orchestration logic
- Confidence: medium-high
- Suggested portfolio treatment: featured
- Why: domain-specific assistant, nontrivial chat workflow, and clear product naming inside the UI
- Key evidence found:
  - `Workspace.tsx` labels the product as `CropIQ`
  - `data.ts` contains market, subdistrict, crop, price, and weather mock data
  - `Workspace.tsx` exposes planning/advisory quick actions and assistant orchestration
  - `package.json` includes Zustand and Supabase client usage

### `VolunTree/code`
- Probable project name: VolunTree
- Probable purpose: volunteer / host matching and event management platform
- Likely stack: React, Vite, React Router, styled-components, Express, PostgreSQL, JWT auth, Terraform
- Confidence: medium
- Suggested portfolio treatment: featured
- Why: broader full-stack scope than most folders here, with auth, role-based dashboards, backend routes, and infrastructure traces
- Key evidence found:
  - `src/App.jsx` includes public pages plus protected volunteer and host routes
  - `backend/package.json` shows Express, JWT, bcrypt, PostgreSQL
  - folder includes `infra/terraform`
  - page names such as `CreateOpportunity`, `ManageVolunteers`, and `MyEvents` indicate a real product surface

### `Collaborative_Filtering_Rec_Engine/project`
- Probable project name: Collaborative Filtering Recommendation Engine
- Probable purpose: movie recommendation demo combining UI recommendations with a separate collaborative-filtering model experiment
- Likely stack: React, TypeScript, Vite, Tailwind, Python, pandas, surprise, SVD
- Confidence: medium-high
- Suggested portfolio treatment: featured
- Why: recommendation systems are relevant portfolio material, and the folder contains both frontend and model logic
- Key evidence found:
  - `src/App.tsx` implements watched history plus generated recommendations
  - `src/utils/recommendations.ts` contains recommendation heuristics for the UI
  - `cf_model/collaborative_filtering.py` trains an SVD model with Surprise
  - duplicate nested folder suggests versioning clutter, but the project intent is clear

### `Gesture-Recognition-master`
- Probable project name: Gesture Recognition / ASL Recognition
- Probable purpose: hand-tracking sign recognition experiment
- Likely stack: Python, MediaPipe Hands, Jupyter notebooks, Bayesian classifier
- Confidence: medium-high
- Suggested portfolio treatment: archive
- Why: technically relevant, but appears narrower and older than `SignChat`
- Key evidence found:
  - `README.md` explains MediaPipe-based hand tracking and ASL recognition
  - README references notebooks for exploration and training plus runnable scripts

### `ansh_c/surgemedi`
- Probable project name: SurgMedi
- Probable purpose: medical supplies / healthcare catalog site
- Likely stack: React, TypeScript, Vite, Tailwind, Framer Motion, React Router
- Confidence: medium
- Suggested portfolio treatment: archive
- Why: cleaner than a toy app and visually presentable, but evidence points to a frontend catalog rather than deeper custom technical systems
- Key evidence found:
  - `Home.tsx` brands the app as `SurgMedi`
  - pages include Home, Catalog, ProductDetail, About, and Contact
  - hero copy positions it as a premium healthcare supplies site

### `File_filter`
- Probable project name: Priority-Based CSV Sampler
- Probable purpose: CSV sampling / filtering utility with YAML-configurable priority rules
- Likely stack: Python, Streamlit, pandas, YAML
- Confidence: high
- Suggested portfolio treatment: archive
- Why: useful data utility with a clear UI and practical workflow, but smaller in scope than the best featured candidates
- Key evidence found:
  - `dashboard.py` titles the app `Priority-Based CSV Sampler`
  - supports CSV upload, YAML config, configurable priority levels, and sample export
  - `requirements.txt` confirms Streamlit and pandas-based workflow

### `SopraSteria/Filtering`
- Probable project name: CSV Data Dashboard
- Probable purpose: incident CSV filtering and analytics dashboard, likely workplace/internship related
- Likely stack: Python, Streamlit, pandas; also contains a lightweight Vite shell
- Confidence: medium-high
- Suggested portfolio treatment: archive
- Why: practical dashboard work with clear requirements, but narrower and somewhat overlapped by `File_filter` / `priority_filter`
- Key evidence found:
  - `README.md` clearly describes CSV filtering, sorting, insights, and export
  - expects incident-style operational data fields
  - folder naming under `SopraSteria` suggests professional context

### `SopraSteria/priority_filter`
- Probable project name: Priority Sampler / Priority Filter
- Probable purpose: earlier or alternate version of the CSV sampling dashboard
- Likely stack: Python, Streamlit, pandas, YAML
- Confidence: medium
- Suggested portfolio treatment: exclude
- Why: appears substantially similar to `File_filter`, with overlapping code and naming; likely not worth showing separately unless it represents a distinct internship deliverable
- Key evidence found:
  - `dashboard.py` is effectively the same priority-sampler flow as `File_filter`
  - folder sits beside `Filtering`, suggesting variants rather than distinct projects

### `Commitment_issues/github_contribution_scheduler`
- Probable project name: GitHub Contribution Scheduler
- Probable purpose: schedule and automate planned contribution commits
- Likely stack: Python, ttkbootstrap / Tk UI, local Git utilities
- Confidence: medium
- Suggested portfolio treatment: archive
- Why: niche utility, but specific and concrete enough to show breadth
- Key evidence found:
  - `main.py` boots a themed desktop app from `ui_layout.py`
  - file names such as `git_ops.py`, `config.json`, and `ui_layout.py` indicate a working utility

### `Commitment_issues/commitment_issue_design`
- Probable project name: Commitment Issue Design
- Probable purpose: frontend UI concept for scheduling GitHub commits
- Likely stack: React, TypeScript, Vite, Tailwind, lucide-react
- Confidence: medium
- Suggested portfolio treatment: exclude
- Why: appears more like a UI prototype for the scheduler idea than a separate finished project
- Key evidence found:
  - `App.tsx` shows commit scheduling, GitHub settings, activity log, and simulated commit flow
  - folder name and overlap with `github_contribution_scheduler` suggest concept/prototype status

### `Payment_Wall`
- Probable project name: unclear; possibly a loan/fintech or payment-related prototype
- Probable purpose: unclear, possibly another copy or partial branch of the loan product work
- Likely stack: mixed; React/TypeScript files plus unrelated Python scripts
- Confidence: low
- Suggested portfolio treatment: exclude
- Why: no coherent manifest was found at the project root, file structure is noisy, and `App.tsx` overlaps conceptually with `hackathon-main`
- Key evidence found:
  - top-level `App.tsx` uses routed pages including loan-related flows
  - folder also contains many unrelated loose Python files
  - project boundary is not clean enough for confident portfolio framing

### `STEP_saturday_extra_class/Project/rec_system`
- Probable project name: rec_system / recommendation system experiment
- Probable purpose: OTT recommendation or chatbot experiment with mixed frontend/backend setup
- Likely stack: FastAPI, requests, React frontend, Recharts
- Confidence: low
- Suggested portfolio treatment: exclude
- Why: idea is project-like, but the scope and maturity are unclear and the backend currently includes a hardcoded API key that would need cleanup before any showcasing
- Key evidence found:
  - `backend/main.py` exposes an "OTT Recommendation Assistant" chat endpoint
  - `backend/rec.py` shows only `recharts` in `package.json`, suggesting incomplete structure
  - overall folder is nested inside a coursework/practice umbrella and lacks clean documentation

## Skipped Items

### Required exclusion
- `NLP_quiz'`
  - skipped because the user explicitly requested complete exclusion

### Skipped as non-project / low-value / umbrella noise
- `Basic`
  - appears to be programming exercises and practice scripts
- `InitialProgramming`
  - appears to be early learning material rather than a portfolio project
- `ServiceNow`
  - appears to be training/course material rather than a standalone build
- `Resume`
  - contains resume assets and the portfolio repo itself, not a separate portfolio project candidate
- `adv`
  - wrapper folder containing weather CSVs, loose scripts, and a nested duplicate of `hackathon-main`
- `SopraSteria`
  - treated as an umbrella folder; subprojects were reviewed instead
- `Commitment_issues`
  - treated as an umbrella folder; subprojects were reviewed instead
- `STEP_saturday_extra_class`
  - treated as an umbrella coursework folder; only the nested `rec_system` project was reviewed

### Blocked / inaccessible
- `Face-Detection`
  - directory access was denied, so it was not possible to inspect responsibly

### Obvious file-level noise skipped
- `bfg-1.15.0.jar`
- `Face-Detection.zip`
- `terraform.exe`
- `VSCodeUserSetup-x64-1.82.3.exe`
- `R 4.2.3.lnk`
- `Rattle.lnk`
- `UNIT-1_PPT_DMA[1].pptx`
- `UNIT-2_DMA_(2)[1].pptx`
- `videoplayback.m4a`
- `LICENSE.txt`

## Recommended First Projects To Populate Into The Portfolio
1. `Sign_Language/signchat_py`
2. `hackathon-main`
3. `SIH_bot/chatbot`
4. `VolunTree/code`
5. `Collaborative_Filtering_Rec_Engine/project`
6. `Gesture-Recognition-master`

These six have the best mix of technical substance, identifiable purpose, and enough evidence to write meaningful portfolio entries after your review.
