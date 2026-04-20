# Desktop Project Inventory Report

## Summary
- Desktop root inspected: `C:\Users\footb\Desktop`
- Total top-level folders inspected: 12
- Likely project candidates or project-family folders: 7
- Likely support/evidence folders: 1
- Likely training/coursework or excluded folders: 4
- Probable project families detected: 3

### Strongest Portfolio Candidates
1. `AgriFore`
2. `ViklangFlightBooking`
3. `Project AQI`
4. `hackathin/quickloanhub-main`

### Unclear Items Needing User Confirmation
- `AgricultureForecasting` looks more like an umbrella / precursor workspace than one clean project.
- `AgriFore_Kamareddy_Only` may be a legitimate district-specific variant, but it also looks like a narrowed copy of `AgriFore`.
- `KamareddyAgriFore` appears paper/figure oriented and may be support packaging rather than a separate app.
- `hackathin/hackathon-main` and `hackathin/quickloanhub-main` are close loan-flow relatives; one likely supersedes the other.

## Folder-by-Folder Review

### `AgriFore`
- Probable project title: AgriFore
- Probable purpose: AI agricultural market intelligence and forecasting platform for Telangana, with ETL, model artifacts, backend APIs, and a frontend dashboard.
- Likely stack: Python, DuckDB, FastAPI, XGBoost/joblib, Next.js, TypeScript, Tailwind, Recharts.
- Confidence: high
- Suggested portfolio treatment: featured candidate
- Key evidence found:
  - `frontend/README.md` describes an AI Agricultural Market Intelligence Dashboard built with Next.js 14.
  - `api/server.py` exposes a substantial FastAPI backend over DuckDB and model artifacts.
  - `REPO_FULL_REPORT.md` documents ETL, models, API endpoints, and canonical artifacts.
  - folders include `AgricultureProd`, `AgriMarket`, `aaaFinalModels`, `api`, and `frontend`.
- Overlap/duplicate notes:
  - Strongest representative in the agriculture family.
  - `AgriFore_Kamareddy_Only` and `KamareddyAgriFore` look like narrowed or presentation-heavy descendants.
  - `AgricultureForecasting` looks like an earlier umbrella or precursor workspace.

### `AgriFore_Kamareddy_Only`
- Probable project title: AgriFore Kamareddy Only
- Probable purpose: district-specific version of AgriFore narrowed to Kamareddy forecasting and reporting.
- Likely stack: Python, DuckDB, FastAPI, Next.js, TypeScript, XGBoost/joblib.
- Confidence: medium-high
- Suggested portfolio treatment: merge into another project
- Key evidence found:
  - same major folders as `AgriFore`: `AgricultureProd`, `AgriMarket`, `aaaFinalModels`, `api`, `frontend`.
  - paper file is explicitly Kamareddy-oriented.
  - root files emphasize simulation outputs and district-specific model artifacts.
- Overlap/duplicate notes:
  - Likely narrowed-scope branch of `AgriFore`.
  - probably useful as supporting evidence for a Kamareddy case study, not as a separate flagship entry.

### `KamareddyAgriFore`
- Probable project title: Kamareddy AgriFore
- Probable purpose: figure-generation, simulation, and paper-packaging variant of the AgriFore forecasting system.
- Likely stack: Python, DuckDB, FastAPI, Next.js, TypeScript, XGBoost/joblib.
- Confidence: medium
- Suggested portfolio treatment: merge into another project
- Key evidence found:
  - root contains generated figures like `architecture.png`, `arrival_price.png`, `feature_importance.png`, and `simulation.png`.
  - `generated_paper_figures_summary.md` explicitly audits figure-generation and repo-claim alignment.
  - retains the same `AgricultureProd`, `AgriMarket`, `api`, and `frontend` structure as the main AgriFore family.
- Overlap/duplicate notes:
  - looks like a paper/presentation-oriented descendant of `AgriFore_Kamareddy_Only`.

### `AgricultureForecasting`
- Probable project title: AgricultureForecasting
- Probable purpose: earlier agriculture forecasting workspace combining model experiments, frontends, and a crop advisory chatbot.
- Likely stack: Python, Streamlit/model scripts, React/Vite frontends, Supabase client, Zustand.
- Confidence: medium
- Suggested portfolio treatment: merge into another project
- Key evidence found:
  - contains multiple subprojects: `frontend`, `chatbot`, `bot/chatbot`, `Implementation`, `Models`.
  - `bot/chatbot/package.json` matches the CropIQ-style chat stack.
  - `frontend` is a separate Lovable/Vite frontend.
  - `Implementation` and `Models` contain saved models and forecasting scripts.
- Overlap/duplicate notes:
  - not a clean single project repo.
  - likely a precursor umbrella feeding both the AgriFore work and a chatbot prototype.

### `Project AQI`
- Probable project title: AQI Forecasting
- Probable purpose: time-series forecasting application for air-quality or similar series with ARIMA and Prophet workflows.
- Likely stack: Python, Streamlit, ARIMA, Prophet, scikit-learn, matplotlib; possible companion frontend experiments.
- Confidence: medium
- Suggested portfolio treatment: featured candidate
- Key evidence found:
  - top-level `README.md` describes a forecasting application replicating RStudio-style time-series workflows.
  - `requirements.txt` includes Prophet, pmdarima, Streamlit, and scikit-learn.
  - `forecasting.py` contains ARIMA forecasting flow inside Streamlit.
  - `sales_frontend` mirrors the same forecasting workspace structure.
- Overlap/duplicate notes:
  - `AQI-Forecasting` appears to be only a `.git` stub.
  - `sales_frontend` looks like a sibling/duplicate working folder, not a clearly separate project.

### `ViklangFlightBooking`
- Probable project title: FlightFinder AI
- Probable purpose: accessible AI-assisted flight booking system for deaf/mute, blind, and non-disabled users.
- Likely stack: Next.js, TypeScript, Tailwind, Framer Motion, FastAPI, SQLAlchemy, JWT, OpenRouter, Amadeus, TensorFlow/OpenCV support.
- Confidence: high
- Suggested portfolio treatment: featured candidate
- Key evidence found:
  - `README.md` explicitly brands the project as `FlightFinder AI`.
  - `PROJECT_SUMMARY.md` documents role-adaptive UI, GPT-powered chat, Amadeus integration, ASL camera support, voice input, auth, and trip history.
  - `frontend/package.json` and `backend/requirements.txt` show a credible full-stack setup.
  - nested `Gesture-Recognition-master` suggests embedded computer-vision support.
- Overlap/duplicate notes:
  - strongest standalone non-agriculture candidate on the Desktop.

### `hackathin`
- Probable project title: loan / identity hackathon workspace
- Probable purpose: umbrella folder containing related hackathon variants for loan onboarding, face ID, and side utilities.
- Likely stack: React, Vite, React Router, shadcn/Tailwind, some Python/OpenCV support in subfolders.
- Confidence: medium
- Suggested portfolio treatment: merge into another project
- Key evidence found:
  - `quickloanhub-main` and `hackathon-main` share near-identical loan-flow app structure.
  - `hackathon-main/src/App.tsx` includes login, questionnaire, document upload, and loan status routes with camera preview.
  - `SC_face_id` contains Python/OpenCV face-detection scripts.
  - `ai-branch-manager` is a separate client/server utility and not obviously part of the same product story.
- Overlap/duplicate notes:
  - should be split by family, not represented as one project entry.
  - `quickloanhub-main` is the best candidate to represent the loan-flow family.

### `InternshipCertificates`
- Probable project title: Internship Certificates
- Probable purpose: experience/support evidence, not a project.
- Confidence: high
- Suggested portfolio treatment: archive/supporting
- Key evidence found:
  - contains `KPMG.pdf` and `SopraSteria.pdf`.

### `ism`
- Probable purpose: academic/unit materials.
- Confidence: high
- Suggested portfolio treatment: exclude
- Key evidence found:
  - mostly lecture PDFs and slides.

### `SimpliLearn`
- Probable purpose: training/coursework.
- Confidence: high
- Suggested portfolio treatment: exclude

### `SimpliLearnScripts`
- Probable purpose: learning scratch space.
- Confidence: high
- Suggested portfolio treatment: exclude

### `.ipynb_checkpoints`
- Probable purpose: Jupyter cache folder.
- Confidence: high
- Suggested portfolio treatment: exclude

## Project Family / Lineage Analysis

### Family: AgriFore Forecasting Family
- Folders:
  - `AgriFore`
  - `AgriFore_Kamareddy_Only`
  - `KamareddyAgriFore`
  - `AgricultureForecasting`
- Probable relationship:
  - `AgriFore` is the strongest broad, repo-like implementation.
  - `AgriFore_Kamareddy_Only` is a narrowed district-only variant.
  - `KamareddyAgriFore` is a figure/paper/simulation-heavy derivative for Kamareddy presentation.
  - `AgricultureForecasting` is an earlier umbrella workspace with mixed experiments and chatbot branches.
- Recommended main representative: `AgriFore`
- Recommended supporting folders:
  - `AgriFore_Kamareddy_Only`
  - `KamareddyAgriFore`
  - selected evidence from `AgricultureForecasting`
- Which should not become separate portfolio entries:
  - `KamareddyAgriFore`
  - likely `AgricultureForecasting`

### Family: Loan / Face-ID Hackathon Family
- Folders:
  - `hackathin/quickloanhub-main`
  - `hackathin/hackathon-main`
  - `hackathin/SC_face_id`
  - `hackathin/ai-branch-manager` (unclear side branch)
- Probable relationship:
  - `quickloanhub-main` and `hackathon-main` are near-duplicate loan-onboarding variants.
  - `SC_face_id` is support code for face detection / identity workflow.
  - `ai-branch-manager` looks like a separate utility, not part of the main user-facing product.
- Recommended main representative: `hackathin/quickloanhub-main`
- Recommended supporting folders:
  - `hackathin/hackathon-main`
  - `hackathin/SC_face_id`
- Which should not become separate portfolio entries:
  - `hackathin/hackathon-main` if `quickloanhub-main` is kept.
  - `hackathin/SC_face_id`.

### Family: AQI Forecasting Family
- Folders:
  - `Project AQI`
  - `Project AQI/sales_frontend`
  - `Project AQI/AQI-Forecasting`
- Probable relationship:
  - `Project AQI` is the main forecasting workspace.
  - `sales_frontend` looks like a sibling/duplicate working folder.
  - `AQI-Forecasting` appears to be only a git shell/stub.
- Recommended main representative: `Project AQI`
- Recommended supporting folders:
  - selected frontend pieces from `sales_frontend` if they contain the better UI.
- Which should not become separate portfolio entries:
  - `Project AQI/AQI-Forecasting`
  - probably `Project AQI/sales_frontend`

## Supporting Evidence Folders
- `InternshipCertificates` contains internship PDFs that may help the experience section later.
- `AgriFore` and `KamareddyAgriFore` include paper drafts, audits, figures, and simulation outputs useful for later case-study writing.
- The loose WhatsApp images at Desktop root were ignored because their filenames do not identify a project.

## Recommended Shortlist

### Best Featured Candidates
1. `AgriFore`
2. `ViklangFlightBooking`
3. `Project AQI`
4. `hackathin/quickloanhub-main`

### Best Archive / Supporting Candidates
1. `AgriFore_Kamareddy_Only`
2. `AgricultureForecasting` (as precursor/support, not standalone)
3. `hackathin/SC_face_id`
4. `InternshipCertificates` (experience support, not project support)

### Folders Needing User Clarification
- `AgricultureForecasting`
- `AgriFore_Kamareddy_Only`
- `hackathin/quickloanhub-main` vs `hackathin/hackathon-main`
- `Project AQI/sales_frontend`
