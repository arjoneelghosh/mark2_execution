# Final Deep Study

## AgriFore

### Canonical title
AgriFore

### Why it matters
AgriFore is the strongest evidence-backed analytics project in the set because it spans repeatable data preparation, multi-stage forecasting experiments, API serving, and a frontend that consumes real endpoints instead of only mocked summaries.

### Objective
Build an agricultural market-intelligence workflow that prepares mandi and weather data in DuckDB, trains forecasting layers for production and market-price analysis, and exposes both descriptive analytics and forecast requests through a FastAPI plus Next.js stack.

### Workflow explainer
An operator starts by running `AgricultureProd/run_duckdb_pipeline.ps1`, which executes ordered SQL scripts for ingestion, cleaning, diagnostics, weather augmentation, and model-dataset creation. Offline scripts then train forecast-related models: `train_model1_xgboost.py` explores district-vs-global production-side modeling choices, while `train_model2_base.py` and `train_model2_adjust.py` generate market-price predictions and residual corrections. The user-facing flow begins in the dashboard, which requests overview, commodity, cluster, and trend data in parallel, and continues through the prediction form, where commodity, market, and district selections are posted to `/predict-price`.

### System/pipeline explainer
The repo is organized around an offline-first analytical pipeline. DuckDB views such as `v_model2_base_dataset` and `v_model2_adjust_dataset` normalize the raw data into reusable model tables. The base market model engineers lag, rolling, cyclical, and weather features and writes predictions, metrics, and serialized artifacts. A second script trains a residual-adjustment model using base predictions plus arrivals, humidity, rain, yield signals, and seasonal normalization. `api/server.py` then loads model assets and precomputed forecast outputs and serves them through analytics and inference routes.

### Key files and components
- `C:/Users/footb/Desktop/AgriFore/AgricultureProd/run_duckdb_pipeline.ps1`: orchestration layer for SQL-based preparation.
- `C:/Users/footb/Desktop/AgriFore/AgricultureProd/tools/train_model1_xgboost.py`: experiment-heavy production-side modeling and diagnostics.
- `C:/Users/footb/Desktop/AgriFore/AgriMarket/train_model2_base.py`: base market-price modeling pipeline.
- `C:/Users/footb/Desktop/AgriFore/AgriMarket/train_model2_adjust.py`: residual adjustment stage over base predictions.
- `C:/Users/footb/Desktop/AgriFore/api/server.py`: FastAPI routes for overview, trends, seasonal data, arrivals, and prediction.
- `C:/Users/footb/Desktop/AgriFore/frontend/components/prediction/PredictionForm.tsx`: user-driven forecast submission path.

### Detailed narrative
AgriFore solves a concrete analytical problem: market and production data for agriculture are messy, seasonal, and region-sensitive, so useful forecasting requires more than a single notebook model. The repo shows explicit ETL and diagnostics work before modeling, which makes the forecasting claims more believable than if they were only described at a high level.

The operational flow is clear. Data is prepared offline, model artifacts are produced, and then the frontend consumes an API layer that supports both exploration and prediction. The home page is not just a static landing screen; it acts like a dashboard that aggregates several market views, while the forecast form narrows the interaction to a selected commodity-market-district combination.

The technical depth is concentrated in the scripts. `train_model2_base.py` behaves like a production-style training pipeline with multiple booster options and artifact outputs, and `train_model2_adjust.py` turns the base forecast into a staged modeling process by learning a correction layer. `api/server.py` also suggests pragmatic serving decisions because it can expose data from saved outputs even if a fully live retraining loop is not present.

What remains uncertain is productization rather than implementation existence. The analytics and forecast-serving path is real, but the exact freshness of shipped artifacts, deployment status, and maturity of the `/ask-agent` feature still need user confirmation.

### What is confirmed
- DuckDB is the repeatable transformation layer for the analytical pipeline.
- The market-price workflow contains a base model and a residual-adjustment model.
- FastAPI endpoints exist for overview, trends, seasonal data, arrivals, and prediction.
- The frontend prediction form is connected to API calls rather than only mocked UI.

### What is still uncertain
- Whether the packaged model outputs are the latest ones relative to the training scripts.
- How far the conversational `/ask-agent` path was taken beyond experimentation.
- Which figures best represent the final intended demo story.

### Media / diagram notes
Strong media potential exists in the figure folders and dashboard UI. A workflow diagram is justified because the data pipeline, modeling layers, API, and frontend flow are all visible in the repo.

## FlightFinder AI

### Canonical title
FlightFinder AI

### Why it matters
FlightFinder AI stands out because accessibility is not just a theme in the README; it shapes how the backend is routed and how the product is described to adapt by user role.

### Objective
Build an accessible flight-search assistant that combines role-adaptive interaction, conversational intent routing, flight search, trip history, and attempted sign-language support.

### Workflow explainer
The documented user flow starts with a role-sensitive interface for blind, deaf, mute, or general users. From there, a request can go through chat, search, trip management, or ASL-related paths. `chat_routes.py` sends a role-aware system prompt to OpenRouter and looks for markers such as `FLIGHT_SEARCH::`, `BOOK_FLIGHT`, `VIEW_TRIPS`, or `NEW_SEARCH`. Search requests are passed to the flight router for Amadeus-backed lookups with a mock fallback. Trip-related actions are handled through the trip router, and the ASL endpoints provide a possible camera-recognition path when enabled.

### System/pipeline explainer
`backend/app/main.py` is the composition root: it mounts auth, chat, flight, trip, and ASL routers, creates tables, and adds request logging. The chat route acts as an orchestration layer over LLM output. The flight route fetches Amadeus tokens and requests shopping offers. The trip route manages persisted records. `asl_service.py` loads a bundled gesture-recognition stack with palm detection, hand landmarks, and a pickled classifier, then returns a sign prediction when confidence clears a threshold.

### Key files and components
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/app/main.py`: app setup and router composition.
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/app/routes/chat_routes.py`: intent parsing over LLM responses.
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/app/routes/flight_routes.py`: Amadeus search and fallback behavior.
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/app/routes/trip_routes.py`: trip-history management.
- `C:/Users/footb/Desktop/ViklangFlightBooking/backend/app/services/asl_service.py`: sign-recognition inference path.
- `C:/Users/footb/Desktop/ViklangFlightBooking/PROJECT_SUMMARY.md`: strongest product-level framing and limitations.

### Detailed narrative
The repo is trying to solve a specific accessibility gap in travel search: many booking interfaces assume standard visual and interaction patterns, while this one is framed around different accessibility profiles. That gives the project a stronger product story than a generic chatbot with a travel API attached.

The workflow is more product-like than the README alone would imply. User role influences the interface framing, chat is used as a router rather than only a response generator, search goes through a dedicated flight route, and trip history is persisted in its own path. That structure suggests deliberate decomposition instead of a single endpoint trying to do everything.

Technically, the backend contains real implementation detail. The chat layer parses structured markers from model output, the flight layer integrates with Amadeus, and the ASL service loads actual sign-recognition assets. That matters because the code supports a claim of backend experimentation beyond a pure frontend mock.

The uncertainty is mostly around completeness. Documentation admits limited production readiness, no payment flow, and a simplified or unfinished ASL story, yet the backend does include recognition code. The safest portfolio framing is an accessibility-focused routed flight assistant with experimental ASL support, not a fully finished accessible booking platform.

### What is confirmed
- Separate backend routers exist for chat, flights, trips, and ASL.
- The chat route parses structured markers from LLM output.
- The flight route integrates with Amadeus and a fallback path.
- The backend includes real ASL-recognition service code.

### What is still uncertain
- Whether the frontend fully exposes the ASL path end to end.
- How much booking beyond search and trip storage was finished.
- Whether the documented layout adaptations match the last runnable frontend build exactly.

### Media / diagram notes
Medium media readiness. Screenshots of role-adaptive panes, chat results, and search responses would materially strengthen the portfolio story. A workflow diagram is justified because the router structure is visible.

## SignChat

### Canonical title
SignChat

### Why it matters
SignChat is a focused and technically legible real-time CV prototype. It ties webcam capture, hand-landmark preprocessing, classifier loading, smoothing, and thread-based UX into one coherent interaction model.

### Objective
Create a chat-style sign-recognition interface that turns webcam hand poses into text-like output while keeping conversations separated by thread and language.

### Workflow explainer
The user enters the Streamlit app, passes the placeholder auth gate, opens or creates a thread, and chooses a language such as ASL, BSL, or ISL for that thread. Live webcam frames are processed with MediaPipe Hands. The resulting landmarks are normalized into a 68-dimensional feature vector and sent to the selected language model. Predictions are buffered and smoothed before letters or tokens are committed to the transcript shown in the chat-style interface.

### System/pipeline explainer
`app.py` sets up the page and hands control to `signchat/ui.py`. `ui.py` manages the thread sidebar, selected language, live panel, and transcript controls. `detector.py` runs one-hand MediaPipe detection and updates recognition state. `feature.py` builds the 68-dimensional vector from landmarks. `models.py` loads a Keras model if available or a mock classifier otherwise, and it applies thresholding plus majority smoothing over a short buffer.

### Key files and components
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/app.py`: Streamlit entry point.
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/ui.py`: thread-based chat UI and live panel.
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/detector.py`: landmark detection and recognition loop.
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/feature.py`: 68-dimensional feature encoding.
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/signchat/models.py`: model loading, fallback behavior, and smoothing.
- `C:/onedrive_localdata/Programming/Sign_Language/signchat_py/README.md`: project scope and known limitations.

### Detailed narrative
SignChat is solving a narrower and more defensible problem than generic sign-language translation claims. The README and code both indicate a webcam-driven recognition interface that is organized like a conversation app, which makes the product story more grounded than a standalone prediction demo.

The workflow is explicit and unusually well supported in code. `ui.py` creates a thread sidebar and language selection flow, then ties the live recognition panel to transcript management. The user can treat recognition as an ongoing conversation, clear accumulated text, and work in isolated per-thread contexts.

The technical path is also specific. Landmark coordinates are normalized relative to the wrist and palm length, the feature vector is fixed at 68 dimensions, and the prediction path uses thresholding plus an eight-frame smoothing buffer. The model loader is conservative enough to fall back safely when a language model is missing.

The remaining uncertainty is about breadth rather than implementation. The README openly notes one-hand assumptions, likely gaps for two-handed BSL or ISL signing, and temporal-sign limitations, so the project should be presented as a thread-based sign-recognition prototype rather than a complete multilingual translator.

### What is confirmed
- The app uses Streamlit, WebRTC, MediaPipe Hands, and Keras model loading.
- The feature vector is explicitly 68-dimensional.
- Predictions are stabilized with buffering and majority logic.
- Thread and language state are isolated in session state.

### What is still uncertain
- The exact trained label sets for each language model folder.
- Real-world recognition quality on diverse signing.
- Whether any two-hand handling exists beyond the documented one-hand-first scaffold.

### Media / diagram notes
Medium media readiness. A screenshot of the live recognition panel plus the threaded transcript would be enough to make the system legible. A workflow diagram is justified.

## CropIQ

### Canonical title
CropIQ

### Why it matters
CropIQ is useful because it shows product thinking around farmer-specific context, stateful advisory flows, and nearest-market mapping even though it remains a prototype.

### Objective
Prototype a crop-planning and advisory workspace that combines farm-plan setup, market context, synthetic local data, and a lightweight orchestrator for forecast-like and advisory responses.

### Workflow explainer
The flow begins in `HarvestModal.tsx`, where the user enters crop, sow date, acreage, and location details. The app maps the selected subdistrict to a nearest market, creates local chat context, and opens `Workspace.tsx`. The workspace offers quick actions such as daily advice, harvest pricing, or pesticide-confession prompts. Submitted questions are routed through `llmOrchestrator`, which can answer from local logic or use OpenRouter when configured.

### System/pipeline explainer
`data.ts` generates the regional farming context, including crop lists, subdistricts, price history, and weather series. `engine.ts` contains the forecasting and advisory logic, including distinct handling for short-horizon price prompts, daily operational guidance, and pesticide-related MRL hold scenarios. `store.ts` persists chat threads, selected chat, and hold-state information in local storage.

### Key files and components
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/components/HarvestModal.tsx`: farm-plan setup and nearest-market entry point.
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/pages/Workspace.tsx`: main advisory workspace and message flow.
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/engine.ts`: orchestrator and heuristic forecasting logic.
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/store.ts`: persisted local state.
- `C:/onedrive_localdata/Programming/SIH_bot/chatbot/src/data.ts`: synthetic Kerala context data.

### Detailed narrative
CropIQ is less about a backend-heavy AI system and more about a contextual farming workspace. The repo encodes the idea that advice becomes more useful once the app knows the user's crop, location, sow date, and nearest market.

That context is built into the workflow itself. The user does not simply open an empty chat box; the app first gathers operational context, creates a project or chat record, and then offers guided entry points into common agricultural questions. That makes the prototype more structured than a generic assistant wrapper.

The implementation shows clear product reasoning even if the data is synthetic. Forecast and advisory branches are encoded in `engine.ts`, local storage keeps the conversation state persistent, and the MRL-hold logic gives the app a specific operational behavior beyond general advice. The main caution is that the labels 'XGB' and 'Prophet' in the code should not be oversold as confirmed full model integrations.

### What is confirmed
- The flow starts with plan capture through a modal rather than only freeform messaging.
- The app maps local context to a nearest market.
- Advisory and forecast-like behavior can run offline from frontend logic.

### What is still uncertain
- Whether a real backend or live data feed existed outside the checked repo.
- How much OpenRouter use was actually exercised.
- Whether the model labels corresponded to future intentions rather than current implementation depth.

### Media / diagram notes
A workflow diagram is justified. Screenshots of the plan modal and the workspace quick actions would make the project easier to explain.

## LoanONE AI

### Canonical title
LoanONE AI

### Why it matters
LoanONE AI is worth keeping because the guided application flow and document-upload experience are concrete, even though the deeper AI and verification claims remain experimental.

### Objective
Prototype a loan-application journey with staged onboarding, document collection, status visibility, and optional speech or camera assistance.

### Workflow explainer
The user moves through routed pages for login, questionnaire, document upload, and loan status. `DocumentUpload.tsx` handles file validation, preview, and drag-and-drop for multiple document categories. After submission, `LoanStatus.tsx` simulates a verification sequence and then displays approved, declined, or in-review states. Speech and camera hooks can assist the process when enabled.

### System/pipeline explainer
The visible application flow is built in React. `useSpeechToText.tsx` wraps the browser speech-recognition API. `useCamera.tsx` opens webcam access, captures frames, and attempts calls to localhost-based face-verification endpoints. The verification result shown to the user is simulated in the status page, which is why the repo reads as a guided UX prototype rather than a finished underwriting platform.

### Key files and components
- `C:/onedrive_localdata/Programming/hackathon-main/src/App.tsx`: route map and camera-preview conditions.
- `C:/onedrive_localdata/Programming/hackathon-main/src/pages/DocumentUpload.tsx`: file intake implementation.
- `C:/onedrive_localdata/Programming/hackathon-main/src/pages/LoanStatus.tsx`: simulated verification and decision states.
- `C:/onedrive_localdata/Programming/hackathon-main/src/hooks/useSpeechToText.tsx`: browser speech support.
- `C:/onedrive_localdata/Programming/hackathon-main/src/hooks/useCamera.tsx`: experimental camera and verification logic.

### Detailed narrative
LoanONE AI is strongest when described as a guided borrower intake prototype. The app structure shows that a user can move through a coherent sequence of screens, upload required documents, and see the state of the application without needing a live banking backend.

The document-upload path is the most credible implementation area. It validates file types and sizes, supports drag-and-drop, previews uploaded files, and visually anchors the flow as one step in a larger process. That is concrete enough to support a portfolio narrative around workflow design and UX implementation.

The AI-heavy claims need restraint. Speech support is real browser integration, but the camera hook suggests an experimental local-verification path rather than a stable deployed service. The decision view is simulated, so the project should be framed as an onboarding and verification-flow prototype rather than a finished AI approval engine.

### What is confirmed
- The user journey across onboarding, upload, and status pages is implemented.
- Document upload is a real feature with validation and previews.
- Speech input is wired through browser APIs.

### What is still uncertain
- Whether face verification worked reliably with a real backend.
- Whether any underwriting logic existed beyond simulation.
- How much of the README's AI language corresponded to working systems.

### Media / diagram notes
A diagram is justified because the step-based flow is clear. Screenshots of upload validation and the status page would help most.

## AQI Forecasting

### Canonical title
AQI Forecasting

### Why it matters
This project is worth keeping as an analytical tool because the forecasting and model-training scripts are interactive and user-facing rather than only notebook code.

### Objective
Provide an upload-driven forecasting workspace, likely AQI-motivated, for time-series prediction and related model training.

### Workflow explainer
The user uploads a CSV, identifies the date and target columns, and runs forecasting from the Streamlit interface. `forecasting.py` fits auto-ARIMA, projects future values, computes MAPE, and renders results. A separate flow in `model_training.py` allows feature and target selection for RandomForest training with hyperparameter search and export.

### System/pipeline explainer
The implemented evidence is strongest on the Python side. Streamlit hosts the interaction, `forecasting.py` handles time-series processing and visualization, and `model_training.py` adds a supervised-learning branch. `requirements.txt` shows a broader analytical toolkit that includes Prophet and plotting libraries, though the exact final exposure of all tools is less certain.

### Key files and components
- `C:/Users/footb/Desktop/Project AQI/forecasting.py`
- `C:/Users/footb/Desktop/Project AQI/model_training.py`
- `C:/Users/footb/Desktop/Project AQI/README.md`
- `C:/Users/footb/Desktop/Project AQI/requirements.txt`

### Detailed narrative
The repo demonstrates an effort to turn forecasting work into a shareable app experience. Instead of burying logic in notebooks, it exposes upload, configuration, forecasting, and evaluation flows through Streamlit.

That makes the project more usable than a raw analysis script. A person can bring in a dataset, run a forecast, inspect metrics, and then move into a separate training utility for broader predictive modeling. The mix of forecasting and supervised learning makes the project feel like a small analytical workbench.

The caution is thematic clarity. AQI appears to be the motivating frame, but the scripts are generic enough that the project should be described as AQI-oriented rather than a tightly domain-locked production AQI system unless stronger domain evidence is available.

### What is confirmed
- The forecast path is interactive and implemented in Python.
- A separate RandomForest training utility exists.
- The app is more than notebook code.

### What is still uncertain
- How AQI-specific the final intended product really was.
- Whether a referenced frontend layer was completed.
- How Prophet was surfaced in the final UX.

### Media / diagram notes
The workflow is diagrammable, but media is weak until forecast-screen screenshots are collected.

## RStudio Replica Forecasting App

### Canonical title
RStudio Replica Forecasting App

### Why it matters
This project is useful as a public-facing forecasting variant because it packages the analytical workflow with an explicit RStudio-inspired framing and a React shell.

### Objective
Create a web-based forecasting app that imitates the feel of an RStudio-style analytical workflow using React for the shell and Python for the analytical work.

### Workflow explainer
The user enters a React-based shell, uploads data, and runs a forecasting flow that can reconstruct dates from either a dedicated date column or Year and Month fields. The app then performs auto-ARIMA forecasting and exposes outputs and metrics. A parallel training path supports RandomForest experiments with user-selected features.

### System/pipeline explainer
The repo combines a minimal Vite React app with Python scripts that do the substantive work. `forecasting.py` performs data conditioning, time-series modeling, and metric generation. `model_training.py` adds supervised training support. `requirements.txt` shows the analytical dependency stack.

### Key files and components
- `README.md` in `arjoneelghosh/R-studio_replica`
- `forecasting.py` in `arjoneelghosh/R-studio_replica`
- `model_training.py` in `arjoneelghosh/R-studio_replica`
- `project/package.json` in `arjoneelghosh/R-studio_replica`

### Detailed narrative
The strongest reason to keep this project is that it packages familiar data-analysis tasks in a more product-like wrapper. The repo clearly wants users to think of forecasting and model experimentation as an application flow, not only a script collection.

The technical center of gravity remains in Python. The forecasting script is robust enough to repair date structure from Year and Month columns, fit an ARIMA workflow, and report MAPE. The model-training utility extends the project into broader predictive experimentation.

The portfolio description should stay calibrated. The React shell exists, but the evidence for a deeply integrated IDE-like experience is light. The defensible claim is a web-based forecasting app with an RStudio-inspired framing and concrete forecasting scripts behind it.

### What is confirmed
- The repo contains working forecasting and training scripts.
- A React package is present alongside the Python code.
- Date reconstruction logic is implemented.

### What is still uncertain
- How tightly the React shell and Python execution were integrated.
- Whether this should be presented separately from AQI Forecasting or as a public variant.
- Which screenshots best prove the RStudio-inspired UX.

### Media / diagram notes
Media is weak, but a diagram is justified because the shell-to-analytics relationship is still visible.

## Collaborative Filtering Recommendation Engine

### Canonical title
Collaborative Filtering Recommendation Engine

### Why it matters
This project is useful because it exposes both the UX side of recommendations and a separate model-side experiment, making the distinction between visible product behavior and backend algorithm work explicit.

### Objective
Explore movie recommendation through a React interface with explainable suggestions and a separate Surprise SVD collaborative-filtering experiment.

### Workflow explainer
The user browses or selects movies and adds watched titles to local state. The frontend recommendation utility then computes candidate suggestions based on overlaps in genre, actor, or director and shows them in a side panel with reasons and scores. Separately, the Python script trains an SVD model on sample interaction data and outputs recommendations for a test user.

### System/pipeline explainer
The React app carries the product flow: `App.tsx` stores state, `recommendations.ts` performs rule-based recommendation generation, and `RecommendationPanel.tsx` renders explanatory output. The Python branch is independent and uses Surprise SVD for latent-factor experimentation on small sample ratings.

### Key files and components
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/src/App.tsx`
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/src/utils/recommendations.ts`
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project/src/components/RecommendationPanel.tsx`
- `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/cf_model/collaborative_filtering.py`

### Detailed narrative
The frontend portion is built around interpretability. Users can see why a recommendation was generated, which makes the app easier to demonstrate than a hidden-score system. That also means the project has a stronger UX story than many early recommender experiments.

The backend claim needs to stay narrower. There is a real collaborative-filtering script using Surprise SVD, but the repository does not show a confident integration between that model and the UI. The visible user path is still driven by rule-based logic.

That split is not a weakness if it is described honestly. The project becomes an archive piece about recommendation-interface design plus an exploratory collaborative-filtering model, rather than a misleading claim of a production-integrated CF stack.

### What is confirmed
- The React UI generates and explains recommendations.
- A separate Surprise SVD experiment exists.
- The frontend recommendation reasons are visible to the user.

### What is still uncertain
- Whether the SVD path was ever wired into the app.
- How representative the sample rating data was.
- Whether the final portfolio wording should emphasize hybrid experimentation.

### Media / diagram notes
A diagram is justified. A screenshot of the recommendation panel would do most of the explanatory work.

## SurgeMedi

### Canonical title
SurgeMedi

### Why it matters
SurgeMedi is a stronger archive frontend because the browse, filter, and detail flow is coherent and backed by structured product data.

### Objective
Build a surgical-supplies catalog site that helps users browse products, filter categories, inspect specifications, and request quotes.

### Workflow explainer
The visitor lands on a home page with category entry points, navigates to the catalog, filters by category or search term, and then opens a detailed product page. The detail view shows images, description, specifications, breadcrumb context, and related products, along with a quote-request call to action.

### System/pipeline explainer
The system is frontend-led. `products.ts` acts as the local inventory dataset. `Catalog.tsx` filters and searches that dataset. `ProductDetail.tsx` uses the route parameter to resolve the product record and build the detail page. Routing is handled in `App.tsx`.

### Key files and components
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/App.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/pages/Home.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/pages/Catalog.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/pages/ProductDetail.tsx`
- `C:/onedrive_localdata/Programming/ansh_c/surgemedi/src/data/products.ts`

### Detailed narrative
SurgeMedi solves a clear catalog-browsing problem and does so with enough structure to feel like a real product interface. The route design and data model make the project easy to explain without inventing backend depth that is not there.

The catalog page is where the product behavior becomes concrete. Search, category filtering, and result counts turn the static dataset into a usable browsing experience. The detail page then reuses the same data model for specification-heavy views and related-product discovery.

The limitation is scope, not coherence. There is no strong evidence of inventory management, ordering, or CRM integration, so the project should stay framed as a catalog and quote-request frontend. Within that scope, it is a solid archive piece.

### What is confirmed
- The app has a complete browse-filter-detail route flow.
- Product specifications are modeled in local structured data.
- The quote-request CTA is part of the detail experience.

### What is still uncertain
- Whether the quote CTA was connected to any backend workflow.
- Which public assets best represent the intended brand state.

### Media / diagram notes
Strong media readiness. Home, catalog, and product-detail screenshots would all be portfolio-usable. A diagram is justified.

## Priority-Based CSV Sampler

### Canonical title
Priority-Based CSV Sampler

### Why it matters
This project is a credible utility because it addresses a real data-operations problem and contains explicit fallback handling, configuration persistence, and export behavior.

### Objective
Allow users to sample rows from a CSV while preserving priority rules and quota allocations across selected values and categories.

### Workflow explainer
A user uploads a CSV and can optionally load a YAML config. The dashboard then lets the user set multiple priority levels, choose columns and values, and assign percentage allocations. When the sample is generated, the app previews the result, surfaces warnings or fallback behavior, and offers the sampled CSV for download.

### System/pipeline explainer
`dashboard.py` controls the Streamlit interface and the configuration workflow. `utils_backup.py` contains the sampling engine, which tracks used indices, enforces quotas where possible, backfills from alternate values when needed, and reports logs or metrics back to the UI.

### Key files and components
- `C:/onedrive_localdata/Programming/File_filter/dashboard.py`
- `C:/onedrive_localdata/Programming/File_filter/utils_backup.py`
- `C:/onedrive_localdata/Programming/File_filter/requirements.txt`

### Detailed narrative
The project is narrower than a general dashboard, which is a good thing. It is focused on controlled sampling, a task that often matters in data review and operational workflows but is easy to mishandle with naive random selection.

The code shows that the tool was designed for repeated use rather than a one-off script. YAML save-load support means the same allocation logic can be reused, and the sampling utility goes beyond simple filtering by handling backfill and warning states explicitly.

The missing context is domain usage rather than technical purpose. There is not enough evidence to say what organization or dataset motivated it, but the underlying utility is clear and implementationally real.

### What is confirmed
- The app supports YAML-backed configuration persistence.
- Sampling includes backfill or fallback behavior when quotas cannot be met exactly.
- Preview and export are built into the interface.

### What is still uncertain
- What operational context originally drove the tool.
- Whether `utils_backup.py` is the final intended utility module or a preserved working copy.

### Media / diagram notes
A diagram is justified. A configuration screenshot and a sampled-output preview would be enough for portfolio support.

## GitHub Contribution Scheduler

### Canonical title
GitHub Contribution Scheduler

### Why it matters
This project is thin but still understandable: it wraps Git scheduling behavior in a desktop interface, which makes the mechanism legible even if the broader use case is narrow.

### Objective
Build a desktop utility that lets users schedule dated Git commits and pushes through a GUI.

### Workflow explainer
The user selects files, enters a commit date and message, adds that schedule to the UI list, and saves repository settings locally. When the scheduled action is run, the tool stages files, creates a commit using overridden author and committer dates, pushes the result, and logs activity in the interface.

### System/pipeline explainer
`main.py` starts a ttkbootstrap-themed desktop window. `ui_layout.py` builds the panels for file selection, schedule management, configuration, and logs. `git_ops.py` performs the underlying `git add`, `git commit`, and `git push` operations with scheduled timestamp overrides.

### Key files and components
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/main.py`
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/ui_layout.py`
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/git_ops.py`
- `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler/config.json`

### Detailed narrative
The project is solving a narrow workflow problem by wrapping Git operations in a desktop interface. That makes the command sequence approachable for a user who would rather not manage commit-date overrides manually.

The code organization is clear. UI layout, execution helpers, and application startup are separated into distinct files, and the key technical trick is exposed directly in `git_ops.py`: commit metadata is controlled through `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE` before the push step.

It remains one of the thinner archive entries because the repo mainly proves the interface and command path, not a mature product surface. There is little evidence of validation, safety guardrails, or broader distribution. If it stays in the portfolio, it should be framed as a local desktop utility with a specific Git workflow focus.

### What is confirmed
- The desktop scheduling UI exists.
- Git operations are executed with explicit date overrides.
- Repository configuration is stored locally.

### What is still uncertain
- How much validation or safety handling existed in real use.
- Whether the tool was used beyond local experimentation.
- Whether this use case is one you want publicly emphasized in a portfolio.

### Media / diagram notes
Diagram is justified, but media is weak until a clean desktop screenshot is available. Do not expose local secrets or config values in screenshots.
