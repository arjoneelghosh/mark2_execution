# GitHub Repo Inventory Report

## Summary
- Total repos inspected: 19
- Likely main portfolio candidates: 2
- Likely archive/supporting candidates: 3
- Likely assignments/coursework repos: 2
- Likely template/fork/vendor repos: 3
- Likely duplicates/variants to collapse: 6
- Unclear repos needing user confirmation: 3

### Strongest likely featured GitHub repos
- `Disable_Friendly_Flight_Booking`
- `Kamareddy_Telangana_Production_Weather_Market_`

### Strongest likely archive/supporting GitHub repos
- `R-studio_replica`
- `surgemedi`
- `Collaborative-Filtering-Recommendation-Engine`

### Repos likely needing clarification
- `VolunTree` because GitHub marks it as a fork despite the project sounding meaningful
- `PotpieAI_Context_Project` because it appears empty
- `arjoneel-portfolio` because it looks incomplete/minimal

## Repo-by-Repo Review

### mark2
- Probable project title: Mark 2 portfolio site
- Probable purpose: current portfolio shell / frontend rebuild
- Likely stack: Vite, React, TypeScript, Tailwind
- Confidence: high
- Suggested portfolio treatment: merge
- Key evidence found: root contains `.bolt`, `src`, `package.json`, and Vite/Tailwind config; README is minimal and Bolt-oriented.
- Overlap/duplicate notes: main representative of the GitHub portfolio-site family; should not become a separate project card inside the portfolio itself.

### Kamareddy_Telangana_Production_Weather_Market_
- Probable project title: AgriFore / Kamareddy Telangana production-weather-market forecasting system
- Probable purpose: agriculture forecasting and market/production/weather correlation platform
- Likely stack: Python, Next.js frontend, API backend, forecasting/model artifacts, paper/report docs
- Confidence: high
- Suggested portfolio treatment: featured candidate
- Key evidence found: repo includes `api`, `frontend`, model/output folders, run reports, forecast outputs, and paper documents; homepage points to a deployed frontend.
- Overlap/duplicate notes: strongest GitHub representative of the agriculture forecasting family; likely supersedes `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`.

### PotpieAI_Context_Project
- Probable project title: PotpieAI context project
- Probable purpose: unclear
- Likely stack: unclear
- Confidence: low
- Suggested portfolio treatment: exclude
- Key evidence found: public repo metadata exists but root contents appear empty; no README, manifests, or code surfaced.
- Overlap/duplicate notes: needs user confirmation before any portfolio consideration.

### The_Wedding_Company_Backend_Assignment
- Probable project title: Wedding Company backend assignment
- Probable purpose: multi-tenant organization management backend
- Likely stack: Python, FastAPI, MongoDB, JWT, tests, Docker/Procfile
- Confidence: high
- Suggested portfolio treatment: coursework/assignment
- Key evidence found: README explicitly calls it an assignment; repo includes clean backend architecture, tests, and requirements.
- Overlap/duplicate notes: strong assignment repo, but still assignment-scoped.

### Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation
- Probable project title: Telangana agriculture rainfall correlation forecasting
- Probable purpose: earlier agriculture forecasting / correlation experiment
- Likely stack: Python, CSV-heavy forecasting workflow
- Confidence: medium
- Suggested portfolio treatment: merge
- Key evidence found: root is dominated by cleaned CSVs, scripts, and forecasting data files; naming overlaps strongly with the newer Kamareddy agriculture repo.
- Overlap/duplicate notes: best treated as an earlier variant/supporting repo in the agriculture family.

### Tredence_Assignment
- Probable project title: Tredence workflow engine assignment
- Probable purpose: backend graph/workflow execution engine
- Likely stack: Python, FastAPI, WebSockets, tests
- Confidence: high
- Suggested portfolio treatment: coursework/assignment
- Key evidence found: README explicitly frames it as an AI engineering assessment; architecture and tests are present and coherent.
- Overlap/duplicate notes: strong technical assessment repo, but assignment-scoped.

### Disable_Friendly_Flight_Booking
- Probable project title: FlightFinder AI / accessible flight booking system
- Probable purpose: adaptive flight booking experience for Deaf, Blind, Mute, and normal users
- Likely stack: Next.js, FastAPI, OpenRouter GPT, Amadeus API, SQLite/PostgreSQL, accessibility-focused UI
- Confidence: high
- Suggested portfolio treatment: featured candidate
- Key evidence found: README clearly describes the product and architecture; repo has frontend, backend, Docker Compose, and extensive ASL/voice integration docs.
- Overlap/duplicate notes: looks like a strong standalone project, not just a thin experiment.

### surgemedi
- Probable project title: SurgeMedi medical equipment tracker
- Probable purpose: medical equipment catalog/tracking interface
- Likely stack: Vite, React, TypeScript, Tailwind, Framer Motion
- Confidence: medium
- Suggested portfolio treatment: archive/supporting
- Key evidence found: deployed homepage exists; package name `surgmedi-catalog` and root app structure are coherent.
- Overlap/duplicate notes: strong overlap with `Medical-Equipment-Tracking`; likely the branded/main representative of that family.

### Medical-Equipment-Tracking
- Probable project title: Medical Equipment Tracking
- Probable purpose: medical equipment tracking/catalog app
- Likely stack: Vite, React, TypeScript, Tailwind, Framer Motion
- Confidence: high
- Suggested portfolio treatment: merge
- Key evidence found: same package name and same `src` structure pattern as `surgemedi`; separate deployment URL exists.
- Overlap/duplicate notes: looks like a descriptive-name variant or duplicate of `surgemedi`; should not become a separate portfolio entry.

### Collaborative-Filtering-Recommendation-Engine
- Probable project title: Collaborative Filtering Recommendation Engine
- Probable purpose: recommendation engine using matrix factorization with a frontend wrapper
- Likely stack: collaborative filtering / SVD model + Vite React frontend in `project/`
- Confidence: medium
- Suggested portfolio treatment: archive/supporting
- Key evidence found: description explicitly mentions SVD-based matrix factorization; repo contains a `project/` app folder and a model artifact/file.
- Overlap/duplicate notes: useful supporting ML/recsys repo, though thinner on documentation than top candidates.

### R-studio_replica
- Probable project title: RStudio replica forecasting application
- Probable purpose: time-series forecasting app with ARIMA and Prophet
- Likely stack: Python, Streamlit, Prophet, ARIMA/pmdarima, React/Vite frontend
- Confidence: high
- Suggested portfolio treatment: archive/supporting
- Key evidence found: README clearly explains forecasting functionality and mixed frontend/backend setup; repo is large and contains many forecasting scripts, datasets, and support files.
- Overlap/duplicate notes: real and substantial, but messy enough that archive/supporting is safer than featured.

### Face-Detection
- Probable project title: Face Detection
- Probable purpose: basic face-detection UI/app experiment
- Likely stack: React CRA JavaScript app
- Confidence: low
- Suggested portfolio treatment: exclude
- Key evidence found: README is only `Face Detection`; root contains a minimal Create React App style structure.
- Overlap/duplicate notes: too thin on repo evidence to justify a portfolio slot.

### arjoneel-fullstack-resume
- Probable project title: fullstack resume / portfolio app
- Probable purpose: fullstack portfolio variant with frontend and Python backend
- Likely stack: React/Vite frontend, Python backend
- Confidence: medium
- Suggested portfolio treatment: merge
- Key evidence found: repo has `frontend/` and `backend/` directories; homepage points to a deployed frontend.
- Overlap/duplicate notes: portfolio-family repo; should merge into the portfolio website lineage, not stand alone.

### portfolio
- Probable project title: early static portfolio website
- Probable purpose: older image-heavy HTML portfolio/site
- Likely stack: HTML, CSS, static assets
- Confidence: medium
- Suggested portfolio treatment: merge
- Key evidence found: root is full of HTML pages, images, certificates, and static assets; no modern app structure or README.
- Overlap/duplicate notes: legacy portfolio variant; not a separate portfolio project.

### spring-petclinic
- Probable project title: Spring Petclinic
- Probable purpose: official sample app / fork
- Likely stack: Spring app sample
- Confidence: high
- Suggested portfolio treatment: template/fork
- Key evidence found: GitHub metadata marks it as a fork; description says `A sample Spring-based application`.
- Overlap/duplicate notes: exclude from portfolio as original work.

### Website_Mark1_LLM
- Probable project title: Website Mark 1 LLM
- Probable purpose: earlier AI-enabled portfolio site backend
- Likely stack: Flask, OpenAI API, CORS, dotenv
- Confidence: medium
- Suggested portfolio treatment: merge
- Key evidence found: `app.py` exposes a chat API for `Arjoneel Ghosh's AI representative`; repo is very small and looks like an early portfolio-assistant backend.
- Overlap/duplicate notes: best treated as an earlier portfolio-site lineage repo.

### VolunTree
- Probable project title: VolunTree
- Probable purpose: online volunteering portal
- Likely stack: unclear from GitHub-first evidence
- Confidence: medium
- Suggested portfolio treatment: template/fork
- Key evidence found: GitHub metadata marks it as a fork; description says `An Online Volunteering Portal`.
- Overlap/duplicate notes: could reflect meaningful work, but GitHub-first pass treats this repo as a fork until user confirms original authored source/history.

### arjoneel-portfolio
- Probable project title: arjoneel portfolio
- Probable purpose: incomplete portfolio app variant
- Likely stack: React/TypeScript
- Confidence: low
- Suggested portfolio treatment: exclude
- Key evidence found: very small repo; root only exposes `App.tsx`, `components`, `pages`, and CSS with no manifest or README surfaced.
- Overlap/duplicate notes: looks like an incomplete duplicate in the portfolio family.

### devtraining-needit-utah
- Probable project title: devtraining-needit-utah
- Probable purpose: training/demo repo
- Likely stack: unclear
- Confidence: high
- Suggested portfolio treatment: template/fork
- Key evidence found: GitHub metadata marks it as a fork; name strongly suggests training material.
- Overlap/duplicate notes: exclude as original portfolio work.

## Repo Family Analysis

### Portfolio Website Family
- Repos in family: `mark2`, `arjoneel-fullstack-resume`, `Website_Mark1_LLM`, `portfolio`, `arjoneel-portfolio`
- Probable relationship: `mark2` is the current main portfolio shell; the others are earlier or incomplete portfolio variants.
- Recommended main representative: `mark2`
- Supporting/variant repos: `arjoneel-fullstack-resume`, `Website_Mark1_LLM`, `portfolio`
- Repos that should not become separate portfolio entries: `arjoneel-portfolio`

### Agriculture Forecasting Family
- Repos in family: `Kamareddy_Telangana_Production_Weather_Market_`, `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`
- Probable relationship: older correlation/forecasting repo plus a more mature integrated representative.
- Recommended main representative: `Kamareddy_Telangana_Production_Weather_Market_`
- Supporting/variant repos: `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`
- Repos that should not become separate portfolio entries: `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`

### Medical Equipment Tracker Family
- Repos in family: `surgemedi`, `Medical-Equipment-Tracking`
- Probable relationship: near-duplicate or rebrand pair with the same package identity and near-identical app structure.
- Recommended main representative: `surgemedi`
- Supporting/variant repos: `Medical-Equipment-Tracking`
- Repos that should not become separate portfolio entries: `Medical-Equipment-Tracking`

## Recommended Shortlist

### Strongest Likely Featured GitHub Repos
- `Disable_Friendly_Flight_Booking`
- `Kamareddy_Telangana_Production_Weather_Market_`

### Strongest Likely Archive/Supporting GitHub Repos
- `R-studio_replica`
- `surgemedi`
- `Collaborative-Filtering-Recommendation-Engine`

### Repos That Probably Should Be Excluded
- `PotpieAI_Context_Project`
- `Face-Detection`
- `spring-petclinic`
- `devtraining-needit-utah`
- `arjoneel-portfolio`

### Repos Needing User Clarification
- `VolunTree`
- `PotpieAI_Context_Project`
- `arjoneel-portfolio`
