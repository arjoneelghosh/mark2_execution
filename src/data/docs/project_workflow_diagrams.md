# Project Workflow Diagrams

## AgriFore

```mermaid
flowchart LR
    A[Raw mandi data] --> B[DuckDB SQL pipeline]
    W[Weather data] --> B
    B --> C[v_model datasets]
    C --> D[Model 1 diagnostics and district-vs-global experiments]
    C --> E[Model 2 base forecast training]
    E --> F[OOF predictions and base forecast outputs]
    F --> G[Residual adjustment model]
    F --> H[FastAPI analytics endpoints]
    G --> H
    H --> I[Next.js dashboard]
    H --> J[Prediction form]
    H --> K[Saved reports and figures]
```

## FlightFinder AI

```mermaid
flowchart TD
    A[User role and request] --> B[Frontend adaptive layout]
    B --> C[Chat route]
    C --> D[OpenRouter role-aware prompt]
    D --> E{Parsed intent}
    E -->|FLIGHT_SEARCH| F[Flight route]
    E -->|VIEW_TRIPS| G[Trip route]
    E -->|ASL camera path| H[ASL routes]
    F --> I[Amadeus offers or mock fallback]
    G --> J[Trip history records]
    H --> K[ASL service with palm detector, landmarks, classifier]
    I --> L[Results shown to user]
    J --> L
    K --> L
```

## SignChat

```mermaid
flowchart LR
    A[Thread and language selection] --> B[Webcam stream]
    B --> C[MediaPipe hand landmarks]
    C --> D[68-dim feature vector]
    D --> E[Language model or mock classifier]
    E --> F[Threshold and smoothing buffer]
    F --> G[Recognized text state]
    G --> H[Threaded chat-style transcript]
```

## CropIQ

```mermaid
flowchart TD
    A[Harvest modal] --> B[Crop, acreage, sow date, location]
    B --> C[Nearest market mapping]
    C --> D[Persisted chat and farm context]
    D --> E[Workspace quick actions or typed prompt]
    E --> F[llmOrchestrator]
    F --> G[Offline advisory and forecast logic]
    F --> H[Optional OpenRouter path]
    G --> I[Workspace responses and MRL-hold state]
    H --> I
```

## LoanONE AI

```mermaid
flowchart LR
    A[Login and questionnaire] --> B[Document upload step]
    B --> C[File validation, preview, drag-drop]
    C --> D[Optional speech and camera hooks]
    D --> E[Verification status flow]
    E --> F[Approved, declined, or in-review screen]
```

## AQI Forecasting

```mermaid
flowchart TD
    A[CSV upload] --> B[Date and target selection]
    B --> C[forecasting.py]
    C --> D[auto-ARIMA forecasting]
    D --> E[Forecast table, plot, MAPE]
    B --> F[model_training.py]
    F --> G[RandomForest tuning and feature importance]
    G --> H[Model export]
```

## RStudio Replica Forecasting App

```mermaid
flowchart TD
    A[React shell] --> B[CSV upload]
    B --> C[Date column or Year+Month reconstruction]
    C --> D[auto-ARIMA forecasting]
    D --> E[Forecast outputs and metrics]
    B --> F[RandomForest training flow]
    F --> G[Training results and model export]
```

## Collaborative Filtering Recommendation Engine

```mermaid
flowchart LR
    A[Movie selection UI] --> B[Watched-movie state]
    B --> C[Rule-based recommendation utility]
    C --> D[Recommendations with reasons and scores]
    E[Sample ratings data] --> F[Surprise SVD experiment]
    F --> G[RMSE and top-N output]
```

## SurgeMedi

```mermaid
flowchart TD
    A[Home page] --> B[Catalog page]
    B --> C[Search and category filters]
    C --> D[Filtered product grid]
    D --> E[Product detail route]
    E --> F[Specs, images, related products, quote CTA]
    P[products.ts static dataset] --> B
    P --> E
```

## Priority-Based CSV Sampler

```mermaid
flowchart LR
    A[CSV upload] --> B[Optional YAML config load]
    B --> C[Priority levels and value allocation]
    C --> D[Quota-based sampling engine]
    D --> E[Backfill and fallback handling]
    E --> F[Preview tables and warnings]
    F --> G[Download sampled CSV and save YAML]
```

## GitHub Contribution Scheduler

```mermaid
flowchart TD
    A[Desktop scheduler UI] --> B[Select files]
    A --> C[Enter commit date and message]
    A --> D[Save repo config]
    B --> E[Schedule list]
    C --> E
    D --> E
    E --> F[git_ops.py]
    F --> G[git add]
    G --> H[git commit with author and committer dates]
    H --> I[git push]
    I --> J[Activity log]
```
