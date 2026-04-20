# Deep Project Detail Extraction

## AgriFore
1. Canonical title: AgriFore
2. Treatment: Featured
3. Source of truth: Merged
4. Deep evidence-backed context draft:

AgriFore is the clearest agriculture case study in the current set because it combines ETL, model artifacts, backend delivery, and a dashboard instead of stopping at notebooks or loose scripts. The repo centers on Telangana production, weather, and market data, and the surrounding reports, figure packs, and forecast files show that the work was also being packaged for presentation rather than kept as code only.

The workflow is concrete. Raw horticulture, weather, and market CSVs are loaded into DuckDB through the `AgricultureProd/sql` pipeline, transformed into feature tables, and then used to train separate yield and price models. At runtime, the FastAPI layer serves reference data, chart feeds, price predictions, yield forecasts, and anomaly outputs, while the Next.js frontend exposes dashboard, analysis, and prediction flows.

The implementation detail is unusually strong. `AgricultureProd/run_duckdb_pipeline.ps1` orchestrates 18 SQL stages. `AgricultureProd/tools/train_model1_xgboost.py`, `AgriMarket/train_model2_base.py`, and `AgriMarket/train_model2_adjust.py` anchor the model pipeline. `api/server.py` loads `agri_validation.duckdb` and model artifacts from `aaaFinalModels`, while `march2026_forecast.json`, `march2026_prediction_vs_reality.md`, and `1stApril_Sim/figures` provide direct output evidence.

As a portfolio piece, AgriFore demonstrates ETL, tabular ML, API design, and dashboard construction in one system with stronger artifacts than anything else in the catalog. The main uncertainty is ownership split across ETL, modeling, backend, frontend, and paper work, plus which deployment and metric claims should be used publicly.

5. Strongest evidence used:
- `C:/Users/footb/Desktop/AgriFore/REPO_FULL_REPORT.md`
- `C:/Users/footb/Desktop/AgriFore/api/server.py`
- `C:/Users/footb/Desktop/AgriFore/frontend/README.md`
- `C:/Users/footb/Desktop/AgriFore/AgricultureProd/sql`
- `C:/Users/footb/Desktop/AgriFore/1stApril_Sim/figures`

6. Important concrete files/folders inspected:
- `C:/Users/footb/Desktop/AgriFore/AgricultureProd/run_duckdb_pipeline.ps1`
- `C:/Users/footb/Desktop/AgriFore/AgricultureProd/tools/train_model1_xgboost.py`
- `C:/Users/footb/Desktop/AgriFore/AgriMarket/train_model2_base.py`
- `C:/Users/footb/Desktop/AgriFore/AgriMarket/train_model2_adjust.py`
- `C:/Users/footb/Desktop/AgriFore/aaaFinalModels`
- `C:/Users/footb/Desktop/AgriFore/march2026_prediction_vs_reality.md`

7. Missing info still needed from user:
- Exact ownership split across the stack.
- Preferred deployment or demo URL.
- Public-safe metric wording.

8. Media readiness note:
Strong. Confirmed architecture and chart assets already exist in the manifest.

## FlightFinder AI
1. Canonical title: FlightFinder AI
2. Treatment: Featured
3. Source of truth: Merged
4. Deep evidence-backed context draft:

FlightFinder AI is clearly framed as an accessible booking product rather than a generic travel search clone. The local docs and the backend or frontend split revolve around different user roles such as deaf or mute, blind, and standard users, so the product identity is tied to communication accessibility, not just styling.

The workflow is described in `PROJECT_SUMMARY.md` and supported by the route structure. Users sign up with a selected role, enter a dashboard whose middle pane changes by role, and then interact through chat, flight cards, voice input, or an ASL camera area depending on the mode. The intended flow is conversational: ask for a flight, extract intent, search flights, render cards, and save the trip into history.

Implementation evidence is concrete on both sides. `backend/app/main.py` creates the FastAPI app, tables, and routers for auth, chat, flight search, trips, and ASL endpoints. `backend/requirements.txt` includes FastAPI, SQLAlchemy, Alembic, JWT tooling, PostgreSQL support, OpenCV, and TensorFlow. `PROJECT_SUMMARY.md` maps frontend components such as `ASLCamera.tsx`, `VoiceInput.tsx`, `ChatPanel.tsx`, `FlightCard.tsx`, and `TripHistory.tsx`, and the project includes Docker, setup scripts, and troubleshooting docs for voice and ASL flows.

As a portfolio piece, FlightFinder AI shows accessibility-first product framing, real frontend and backend structure, and integration-minded thinking. The uncertainty is feature completeness: the docs also say ASL inference is not finished, flight search has fallback behavior, and payment is not implemented, so the public narrative should present it as a substantial prototype, not a shipped booking platform.

5. Strongest evidence used:
- `C:/Users/footb/Desktop/ViklangFlightBooking/README.md`
- `C:/Users/footb/Desktop/ViklangFlightBooking/PROJECT_SUMMARY.md`
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/app/main.py`
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/requirements.txt`
- `C:/Users/footb/Desktop/ViklangFlightBooking/docker-compose.yml`

6. Important concrete files/folders inspected:
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/app/routes`
- `C:/Users/footb/Desktop/ViklangFlightBooking/frontend`
- `C:/Users/footb/Desktop/ViklangFlightBooking/ASL_INTEGRATION_GUIDE.md`
- `C:/Users/footb/Desktop/ViklangFlightBooking/VOICE_INPUT_GUIDE.md`

7. Missing info still needed from user:
- Which accessibility paths were fully working in the strongest demo.
- Whether Amadeus and OpenRouter were run live or mainly through fallback.
- Best screenshots or recording.

8. Media readiness note:
Medium. Strong implementation evidence, but no confirmed screenshot path in the current manifest.

## SignChat
1. Canonical title: SignChat
2. Treatment: Featured
3. Source of truth: Local
4. Deep evidence-backed context draft:

SignChat is a user-facing assistive communication prototype built around live sign detection rather than a loose collection of gesture experiments. The project identity is consistent across the README, Streamlit entry point, and the `signchat/` package modules. It is framed as a conversation interface where a user opens threads, chooses a sign language, and transcribes live webcam input into text.

The workflow is concrete. `signchat/ui.py` shows a placeholder login gate, a sidebar for context-isolated conversations, a conversation creation flow for ASL, BSL, or ISL, a chat panel, and a `webrtc_streamer` webcam panel that appends stabilized letters into the active thread. Users can clear recognized text or insert the current recognized string into the conversation.

The technical pipeline is explicit. `signchat/detector.py` uses MediaPipe Hands with `max_num_hands=1`, extracts landmarks, converts them into a 68-dimensional feature vector, and runs a classifier loaded by `signchat/models.py`. `models.py` looks for per-language Keras models at `models/<LANG>/model.h5`, expects 27 logits for A-Z plus `_`, applies a threshold, and performs buffered smoothing before emitting letters. The README also states that BSL and ISL often need two-handed modeling and that the current scaffold is a one-hand v1.

As a portfolio piece, SignChat demonstrates an explainable webcam-to-feature-vector-to-classifier pipeline inside a user-facing interface. What remains uncertain is the provenance of the trained models, which language models had real weights, and whether the precursor gesture-recognition folders should be mentioned at all publicly.

5. Strongest evidence used:
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/README.md`
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/ui.py`
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/detector.py`
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/models.py`
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/requirements.txt`

6. Important concrete files/folders inspected:
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/app.py`
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/feature.py`
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/threads.py`
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/models`

7. Missing info still needed from user:
- Training and dataset provenance.
- Which languages were actually working.
- Screenshots or a demo recording.

8. Media readiness note:
Medium. The pipeline and interface are specific enough, but no confirmed screenshots are listed yet.

## CropIQ
1. Canonical title: CropIQ
2. Treatment: Archive
3. Source of truth: Local
4. Deep evidence-backed context draft:

CropIQ is an agriculture advisory chat workspace rather than a forecasting dashboard. The app is explicitly branded as CropIQ in `Workspace.tsx`, and its quick actions focus on harvest timing, pricing, and pesticide-related prompts instead of generic chat behavior.

The implementation is more specific than the current catalog suggests. `src/store.ts` uses Zustand to persist chat state and create harvest-specific conversations tied to crop, subdistrict, sow date, and acreage. `src/data.ts` defines local geography, representative markets, synthetic price series across Wayanad and Palakkad, and short weather histories. `src/engine.ts` combines an offline rules-based path with an OpenRouter path and a 30-day model switch for price-after-harvest estimates.

CropIQ is worth keeping because it shows domain-specific chat state and orchestration logic, even if some of the advisory intelligence is simulated. What still needs confirmation is whether it was part of an SIH build or another event, whether any real backend or external data source powered it, and how much of the forecasting path was demo logic versus production intent.

5. Strongest evidence used:
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/pages/Workspace.tsx`
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/data.ts`
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/engine.ts`
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/store.ts`

6. Important concrete files/folders inspected:
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/package.json`
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/components`

7. Missing info still needed from user:
- Event context and ownership.
- Real data or backend usage.
- Screenshots.

8. Media readiness note:
Weak. No confirmed screenshot or demo asset is in the manifest.

## LoanONE AI
1. Canonical title: LoanONE AI
2. Treatment: Archive
3. Source of truth: Local
4. Deep evidence-backed context draft:

LoanONE AI is a hackathon-style loan onboarding product built as a routed application flow rather than a single landing page. The useful part is the guided journey through login, questionnaire, document upload, and final status, with supporting hooks for speech input, instructional video, and face-related camera preview behavior.

The implementation evidence is specific. `src/App.tsx` wires routes for `/login`, `/questionnaire`, `/document-upload`, and `/loan-status`, and conditionally mounts `CameraPreview`. `src/pages/DocumentUpload.tsx` implements drag-and-drop uploads for government ID, proof of income, and bank statement files with preview support, file-type limits, and embedded instructional videos. `src/pages/LoanStatus.tsx` simulates a timed verification workflow and then branches into approved, in-review, or declined outcomes.

This project is worth keeping because it demonstrates product flow design and onboarding UX under hackathon constraints. It still needs confirmation on which branch was canonical, whether speech and face verification were fully functioning in the final demo, and whether the decision logic was anything more than simulated frontend behavior.

5. Strongest evidence used:
- `C:/onedrive_localdata/Programming/hackathon-main/README.md`
- `C:/onedrive_localdata/Programming/hackathon-main/src/App.tsx`
- `C:/onedrive_localdata/Programming/hackathon-main/src/pages/DocumentUpload.tsx`
- `C:/onedrive_localdata/Programming/hackathon-main/src/pages/LoanStatus.tsx`

6. Important concrete files/folders inspected:
- `C:/onedrive_localdata/Programming/hackathon-main/src/hooks/useSpeechToText.tsx`
- `C:/onedrive_localdata/Programming/hackathon-main/src/hooks/useCamera.tsx`
- `C:/Users/footb/Desktop/hackathin/SC_face_id/main.py`

7. Missing info still needed from user:
- Canonical branch.
- Actual working AI or verification features.
- Screenshots.

8. Media readiness note:
Weak. No stable screenshots or demo assets were identified.

## AQI Forecasting
1. Canonical title: AQI Forecasting
2. Treatment: Archive
3. Source of truth: Local
4. Deep evidence-backed context draft:

AQI Forecasting is a Streamlit-first forecasting application centered on practical time-series prediction rather than a notebook-only exercise. The README describes an upload-driven workflow for running ARIMA and Prophet forecasts, reviewing model outputs, and exporting results.

The implementation that is directly visible is grounded in forecasting utilities. `forecasting.py` auto-detects date columns, lets the user choose a numeric target, runs `auto_arima`, generates forecast periods, plots actual-versus-forecast curves in Streamlit, computes MAPE where possible, and displays forecast tables. `requirements.txt` confirms a forecasting stack around Prophet, pmdarima, scikit-learn, Streamlit, Plotly, and related scientific Python packages.

The project is worth keeping because it demonstrates hands-on time-series workflow design and user-facing analytical tooling. What still needs confirmation is whether the representative dataset was actually AQI-focused throughout, how much of the React frontend was part of the final demo, and whether this should be described narrowly as AQI forecasting or more broadly as a forecasting application prototype.

5. Strongest evidence used:
- `C:/Users/footb/Desktop/Project AQI/README.md`
- `C:/Users/footb/Desktop/Project AQI/forecasting.py`
- `C:/Users/footb/Desktop/Project AQI/requirements.txt`

6. Important concrete files/folders inspected:
- `C:/Users/footb/Desktop/Project AQI/model_training.py`
- `C:/Users/footb/Desktop/Project AQI/sales_frontend`

7. Missing info still needed from user:
- AQI-specific domain framing.
- Representative frontend branch.
- Screenshots.

8. Media readiness note:
Weak. No confirmed image or screenshot evidence was recovered.

## RStudio Replica Forecasting App
1. Canonical title: RStudio Replica Forecasting App
2. Treatment: Archive
3. Source of truth: GitHub
4. Deep evidence-backed context draft:

RStudio Replica Forecasting App is another forecasting workspace, but it is framed more explicitly as a recreation of RStudio-style forecasting functionality rather than as a domain-specific AQI tool. The GitHub README describes a web-based application where users upload time-series data, fit ARIMA and Prophet models, compare outputs, and review interactive visualizations and exported results.

The strongest direct evidence comes from the GitHub repo files. `forecasting.py` implements an ARIMA path with date-column construction from `Year` and `Month`, sidebar target selection, debug views of prepared data, automatic model fitting, forecast generation, MAPE reporting, and a forecast plot rendered in Streamlit. `requirements.txt` includes Streamlit, Prophet, pmdarima, Plotly, folium, and other analysis packages, while `project/package.json` confirms a separate Vite React frontend branch.

This project is worth keeping because it shows breadth in forecasting tools and an attempt to productize analyst-style workflows. The remaining uncertainty is mainly operational: which interface was the intended entry point and whether you have any media that make the RStudio-replica concept obvious at a glance.

5. Strongest evidence used:
- `https://github.com/arjoneelghosh/R-studio_replica/blob/main/README.md`
- `https://github.com/arjoneelghosh/R-studio_replica/blob/main/forecasting.py`
- `https://github.com/arjoneelghosh/R-studio_replica/blob/main/requirements.txt`
- `https://github.com/arjoneelghosh/R-studio_replica/blob/main/project/package.json`

6. Important concrete files/folders inspected:
- `forecasting.py`
- `requirements.txt`
- `project/package.json`

7. Missing info still needed from user:
- Best demo path.
- Screenshots.

8. Media readiness note:
Weak. The repo evidence is usable, but no media asset is currently mapped.

## Collaborative Filtering Recommendation Engine
1. Canonical title: Collaborative Filtering Recommendation Engine
2. Treatment: Archive
3. Source of truth: Merged
4. Deep evidence-backed context draft:

This project combines a movie recommendation frontend with a separate collaborative-filtering experiment instead of presenting one tightly unified recommendation pipeline. The React application is clearly movie-oriented: users browse movies, filter by genre, click titles, mark items as watched, and open a recommendation panel.

The implementation split is explicit in the files. `src/App.tsx` manages selected genre, watched history, a recommendation panel, and recommendation generation on movie click. `src/utils/recommendations.ts` is heuristic and explainable, recommending based on genre, actor, director, and rating fallbacks. In parallel, `cf_model/collaborative_filtering.py` uses Surprise SVD on a very small hardcoded interaction dataset, performs a train/test split, prints RMSE, and computes top recommendations for unwatched movies.

It is still worth keeping because it demonstrates recommender-system exploration and a presentable UI. The part that still needs confirmation is whether the intended showcase was the heuristic frontend recommender, the SVD experiment, or a planned integration of both.

5. Strongest evidence used:
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/src/App.tsx`
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/src/utils/recommendations.ts`
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/cf_model/collaborative_filtering.py`

6. Important concrete files/folders inspected:
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/src/components`
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/cf_model`

7. Missing info still needed from user:
- Canonical demo story.
- Real dataset scope.
- Screenshots.

8. Media readiness note:
Weak. The UI likely has screenshot potential, but none is cataloged yet.

## SurgeMedi
1. Canonical title: SurgeMedi
2. Treatment: Archive
3. Source of truth: Merged
4. Deep evidence-backed context draft:

SurgeMedi is best supported as a branded medical products catalog frontend rather than a full verified tracking system. The app presents itself as a healthcare and hygiene brand with landing, catalog, product detail, about, and contact routes.

The implementation details are concrete. `src/App.tsx` wires routes for home, catalog, product detail, about, and contact pages. `src/pages/Home.tsx` defines a hero, category cards, about preview, and contact preview using Framer Motion and React Router. `src/data/products.ts` contains a large static product catalog with surgical packs, drapes, gloves, uniforms, and devices, each with structured descriptions, images, and specifications.

The project is worth keeping because it shows polished frontend execution, route design, and content modeling for a domain catalog. What still needs confirmation is whether any backend, inventory management logic, or real client context existed beyond the static catalog implementation.

5. Strongest evidence used:
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/App.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/pages/Home.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/data/products.ts`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/public/2.png`

6. Important concrete files/folders inspected:
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/pages/Catalog.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/pages/ProductDetail.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/data/categories.ts`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/public`

7. Missing info still needed from user:
- Backend or client context.
- Preferred hosted URL.

8. Media readiness note:
Strong. The manifest already contains preview and cover candidates.

## Priority-Based CSV Sampler
1. Canonical title: Priority-Based CSV Sampler
2. Treatment: Archive
3. Source of truth: Local
4. Deep evidence-backed context draft:

Priority-Based CSV Sampler is a practical internal-tool style project for creating weighted or quota-based samples from CSV uploads. The value proposition is concrete: upload a CSV, define priority levels and per-value quotas, preview the sample, and export both the sample and the sampling configuration.

The workflow is encoded in `dashboard.py` and `utils_backup.py`. `dashboard.py` sets up a Streamlit interface with CSV upload, optional YAML config loading, configurable preview size, priority levels, per-column value allocation, config export, sample generation, and sampled CSV download. `utils_backup.py` performs the actual sampling with quota tracking, backfill logic, fallback sampling, warnings when requested quotas cannot be fulfilled, and log tables summarizing requested versus fulfilled counts.

It is worth keeping because it demonstrates a useful workflow utility with real interaction design and nontrivial sampling logic. The main missing piece is context: whether this supported an internship or workplace need and how directly it connects to the Sopra Steria filtering dashboard evidence.

5. Strongest evidence used:
- `C:/onedrive_localdata/Programming/File_filter/dashboard.py`
- `C:/onedrive_localdata/Programming/File_filter/utils_backup.py`
- `C:/onedrive_localdata/Programming/File_filter/requirements.txt`

6. Important concrete files/folders inspected:
- `C:/onedrive_localdata/Programming/File_filter/assets/style.css`
- `C:/onedrive_localdata/Programming/SopraSteria/Filtering`

7. Missing info still needed from user:
- Professional usage context.
- Screenshots.

8. Media readiness note:
Weak. Useful narrative evidence exists, but not confirmed image assets.

## GitHub Contribution Scheduler
1. Canonical title: GitHub Contribution Scheduler
2. Treatment: Archive
3. Source of truth: Local
4. Deep evidence-backed context draft:

GitHub Contribution Scheduler is a desktop utility for scheduling file commits and pushing them to GitHub through a GUI rather than a terminal workflow. The project is niche, but the code is structured enough to treat it as a real tooling experiment.

The implementation shows a fairly complete desktop interface. `main.py` launches a ttkbootstrap window, and `ui_layout.py` builds a full-screen application with panels for file selection, schedule management, repository configuration, and an activity log. Users can select files, enter a commit date and message, maintain a schedule table, save repo and branch configuration, and trigger commit-and-push actions. `git_ops.py` then stages files, sets `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE`, commits with the chosen message, and pushes to the configured branch.

This project is worth keeping only as a breadth item for desktop tooling. It still needs confirmation on whether the scheduling flow was actually used, whether the Python app was the final version you want represented, and whether you want to mention the adjacent design prototype at all. It is also still too thin visually because no UI screenshots were recovered.

5. Strongest evidence used:
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/main.py`
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/ui_layout.py`
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/git_ops.py`

6. Important concrete files/folders inspected:
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/config.json`
- `C:/onedrive_localdata/Programming/Commitment_issues/commitment_issue_design`

7. Missing info still needed from user:
- Usage context.
- Preferred public framing.
- UI screenshots.

8. Media readiness note:
Weak. No confirmed screenshot evidence is currently mapped.
