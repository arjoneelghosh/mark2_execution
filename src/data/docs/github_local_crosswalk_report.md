# GitHub Local Crosswalk Report

## Summary
- Serious candidates reconciled: 11
- Confirmed featured candidates: 3
- Confirmed archive/supporting candidates: 8
- Merged families or lineage groups: 5
- Excluded candidates: 9
- Unresolved items: 1

### Confirmed Featured Candidates
- `AgriFore`
- `FlightFinder AI`
- `SignChat`

### Confirmed Archive / Supporting Candidates
- `CropIQ`
- `LoanONE AI`
- `AQI Forecasting`
- `RStudio Replica Forecasting App`
- `Collaborative Filtering Recommendation Engine`
- `SurgeMedi`
- `Priority-Based CSV Sampler`
- `GitHub Contribution Scheduler`

### Unresolved
- `VolunTree`

## Candidate-by-Candidate Reconciliation

### AgriFore
- Canonical project name: `AgriFore`
- Canonical slug: `agrifore`
- Local evidence:
  - `C:/Users/footb/Desktop/AgriFore`
  - `C:/Users/footb/Desktop/AgriFore_Kamareddy_Only`
  - `C:/Users/footb/Desktop/KamareddyAgriFore`
  - `C:/Users/footb/Desktop/AgricultureForecasting`
- GitHub evidence:
  - `Kamareddy_Telangana_Production_Weather_Market_`
  - `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`
- Source of truth decision: `merged`
- Why:
  - Local folders are richer for artifacts, figures, reports, and lineage.
  - GitHub provides the clearest public repo proof.
  - The evidence points to one main agriculture project with multiple narrowed or earlier variants.
- Portfolio treatment: `featured`
- Supporting evidence to keep:
  - `C:/Users/footb/Desktop/AgriFore/1stApril_Sim/figures`
  - `C:/Users/footb/Desktop/KamareddyAgriFore`
  - `C:/Users/footb/Desktop/AgriFore_Kamareddy_Only`
  - `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`
- Variants to exclude as separate entries:
  - `AgricultureForecasting`
  - `AgriFore_Kamareddy_Only`
  - `KamareddyAgriFore`
  - `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`

### LoanONE AI
- Canonical project name: `LoanONE AI`
- Canonical slug: `loanone-ai`
- Local evidence:
  - `C:/onedrive_localdata/Programming/hackathon-main`
  - `C:/Users/footb/Desktop/hackathin/quickloanhub-main`
  - `C:/Users/footb/Desktop/hackathin/hackathon-main`
  - `C:/Users/footb/Desktop/hackathin/SC_face_id`
- GitHub evidence:
  - no confirmed corresponding public repo in the GitHub inventory
- Source of truth decision: `local`
- Why:
  - The cleanest evidence is local.
  - The Desktop variants overlap too heavily to justify separate entries.
  - `SC_face_id` reads as support code for the same product story.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - `C:/Users/footb/Desktop/hackathin/hackathon-main`
  - `C:/Users/footb/Desktop/hackathin/SC_face_id`
- Variants to exclude as separate entries:
  - `C:/Users/footb/Desktop/hackathin/quickloanhub-main`
  - `C:/Users/footb/Desktop/hackathin/hackathon-main`
  - `C:/Users/footb/Desktop/hackathin/SC_face_id`
- Note:
  - The canonical representation should be one combined `LoanONE AI` story sourced primarily from `C:/onedrive_localdata/Programming/hackathon-main`.

### FlightFinder AI
- Canonical project name: `FlightFinder AI`
- Canonical slug: `flightfinder-ai`
- Local evidence:
  - `C:/Users/footb/Desktop/ViklangFlightBooking`
- GitHub evidence:
  - `Disable_Friendly_Flight_Booking`
- Source of truth decision: `merged`
- Why:
  - GitHub gives the best public repo proof and consistent product naming.
  - Local evidence appears at least as rich and likely more current in supporting docs.
  - Both sources clearly point to the same accessibility-focused project.
- Portfolio treatment: `featured`
- Supporting evidence to keep:
  - `Gesture-Recognition-master` inside the local project if it was actually part of the shipped demo story
  - product summary and architecture docs from the local folder
- Variants to exclude as separate entries:
  - none confirmed beyond support material inside the project

### SignChat
- Canonical project name: `SignChat`
- Canonical slug: `signchat`
- Local evidence:
  - `C:/onedrive_localdata/Programming/Sign_Language/signchat_py`
  - `C:/Users/footb/Downloads/hackathon hand gesture`
  - `C:/onedrive_localdata/Programming/Gesture-Recognition-master`
- GitHub evidence:
  - no clearly corresponding public repo found
- Source of truth decision: `local`
- Why:
  - The strongest evidence is local and coherent.
  - The hand-gesture folders read like precursor work, not separate portfolio entries.
- Portfolio treatment: `featured`
- Supporting evidence to keep:
  - `C:/Users/footb/Downloads/hackathon hand gesture`
  - `C:/onedrive_localdata/Programming/Gesture-Recognition-master`
- Variants to exclude as separate entries:
  - `hackathon hand gesture`
  - `Gesture-Recognition-master`

### CropIQ
- Canonical project name: `CropIQ`
- Canonical slug: `cropiq`
- Local evidence:
  - `C:/onedrive_localdata/Programming/SIH_bot/chatbot`
  - supporting traces inside `C:/Users/footb/Desktop/AgricultureForecasting`
- GitHub evidence:
  - no confirmed corresponding public repo in the GitHub inventory
- Source of truth decision: `local`
- Why:
  - The local app identity is clear enough to keep.
  - It overlaps thematically with the agriculture family, but the interface and product framing are distinct enough to keep separately.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - `C:/Users/footb/Desktop/AgricultureForecasting` chatbot traces if they genuinely belong to the same product line
- Variants to exclude as separate entries:
  - `AgricultureForecasting` as a standalone project

### AQI Forecasting
- Canonical project name: `AQI Forecasting`
- Canonical slug: `aqi-forecasting`
- Local evidence:
  - `C:/Users/footb/Desktop/Project AQI`
  - `C:/Users/footb/Desktop/Project AQI/sales_frontend`
  - `C:/Users/footb/Desktop/Project AQI/AQI-Forecasting`
- GitHub evidence:
  - no confirmed one-to-one GitHub repo found
- Source of truth decision: `local`
- Why:
  - The top-level `Project AQI` folder is the clearest canonical local workspace.
  - `sales_frontend` looks like a duplicate or side workspace.
  - `R-studio_replica` is related in forecasting theme, but the evidence does not support collapsing them into one project.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - selected UI or assets from `sales_frontend` if they are materially better than the main workspace
- Variants to exclude as separate entries:
  - `Project AQI/sales_frontend`
  - `Project AQI/AQI-Forecasting`

### RStudio Replica Forecasting App
- Canonical project name: `RStudio Replica Forecasting App`
- Canonical slug: `rstudio-replica-forecasting-app`
- Local evidence:
  - none confirmed in the local discovery files
- GitHub evidence:
  - `R-studio_replica`
- Source of truth decision: `github`
- Why:
  - It appears to be a separate forecasting product line from `AQI Forecasting`.
  - The GitHub repo is substantial enough to stand on its own as archive/supporting work.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - none identified outside the GitHub repo
- Variants to exclude as separate entries:
  - none confirmed

### Collaborative Filtering Recommendation Engine
- Canonical project name: `Collaborative Filtering Recommendation Engine`
- Canonical slug: `collaborative-filtering-recommendation-engine`
- Local evidence:
  - `C:/onedrive_localdata/Programming/Collaborative_Filtering_Rec_Engine/project`
- GitHub evidence:
  - `Collaborative-Filtering-Recommendation-Engine`
- Source of truth decision: `merged`
- Why:
  - GitHub provides clean public repo proof.
  - Local evidence captures the same project family and may be easier to inspect for nested structure.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - local model scripts or datasets from the `cf_model` area
- Variants to exclude as separate entries:
  - nested duplicate workspaces inside the local repo tree

### SurgeMedi
- Canonical project name: `SurgeMedi`
- Canonical slug: `surgemedi`
- Local evidence:
  - `C:/onedrive_localdata/Programming/ansh_c/surgemedi`
- GitHub evidence:
  - `surgemedi`
  - `Medical-Equipment-Tracking`
- Source of truth decision: `merged`
- Why:
  - Local and GitHub evidence clearly point to the same product line.
  - `Medical-Equipment-Tracking` is too close to justify a separate entry.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - local screenshots under the `public/` folder if useful
- Variants to exclude as separate entries:
  - `Medical-Equipment-Tracking`

### Priority-Based CSV Sampler
- Canonical project name: `Priority-Based CSV Sampler`
- Canonical slug: `priority-based-csv-sampler`
- Local evidence:
  - `C:/onedrive_localdata/Programming/File_filter`
  - `C:/onedrive_localdata/Programming/SopraSteria/Filtering`
- GitHub evidence:
  - no confirmed corresponding public repo in the GitHub inventory
- Source of truth decision: `local`
- Why:
  - The local utility evidence is strong and coherent.
  - `SopraSteria/Filtering` overlaps as a related operational dashboard, but `File_filter` is the cleaner canonical identity.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - `C:/onedrive_localdata/Programming/SopraSteria/Filtering`
- Variants to exclude as separate entries:
  - `C:/onedrive_localdata/Programming/SopraSteria/priority_filter`

### GitHub Contribution Scheduler
- Canonical project name: `GitHub Contribution Scheduler`
- Canonical slug: `github-contribution-scheduler`
- Local evidence:
  - `C:/onedrive_localdata/Programming/Commitment_issues/github_contribution_scheduler`
  - `C:/onedrive_localdata/Programming/Commitment_issues/commitment_issue_design`
- GitHub evidence:
  - no confirmed corresponding public repo in the GitHub inventory
- Source of truth decision: `local`
- Why:
  - The Python desktop utility is the stronger canonical project.
  - The React design folder reads like a UI prototype for the same idea.
- Portfolio treatment: `archive`
- Supporting evidence to keep:
  - `C:/onedrive_localdata/Programming/Commitment_issues/commitment_issue_design`
- Variants to exclude as separate entries:
  - `C:/onedrive_localdata/Programming/Commitment_issues/commitment_issue_design`

### VolunTree
- Canonical project name: `VolunTree`
- Canonical slug: `voluntree`
- Local evidence:
  - `C:/onedrive_localdata/Programming/VolunTree/code`
- GitHub evidence:
  - `VolunTree`
- Source of truth decision: `unresolved`
- Why:
  - Local evidence suggests substantial work.
  - GitHub evidence is weak for authorship because the public repo is marked as a fork.
  - Without a clearer original repo or stronger provenance, this should be downgraded conservatively.
- Portfolio treatment: `exclude` for now
- Supporting evidence to keep:
  - local folder structure and any screenshots if you later confirm ownership/provenance
- Variants to exclude as separate entries:
  - the GitHub fork as proof of original work

## Special Conflict Notes

### Agriculture Family
- The evidence supports one main agriculture entry, not several.
- `AgriFore` should absorb the Kamareddy-only, paper-packaging, and older rainfall-correlation variants as support material.
- `CropIQ` should remain separate only if you want one agriculture-adjacent assistant product in addition to the forecasting platform.

### Loan Family
- The canonical story should be `LoanONE AI`, not `quickloanhub-main` versus `hackathon-main` as separate entries.
- The top-level local `hackathon-main` is the cleanest canonical source.
- `SC_face_id` should stay support-only.

### Sign-Language Lineage
- `SignChat` is the only main entry worth keeping.
- The hand-gesture and older gesture-recognition folders are useful lineage, not separate projects.

### AQI Family
- Keep `Project AQI` as the one AQI entry.
- Do not let `sales_frontend` or `AQI-Forecasting` inflate into separate cards.
- `R-studio_replica` should stay separate as a broader forecasting archive project.

### VolunTree Fork Issue
- Local evidence suggests a real project.
- GitHub evidence does not currently prove original ownership because the visible repo is a fork.
- Until that is clarified, it should not enter the final confirmed shortlist.

## Recommended Final Shortlist

### Featured Projects
- `AgriFore`
- `FlightFinder AI`
- `SignChat`

### Archive / Supporting Projects
- `CropIQ`
- `LoanONE AI`
- `AQI Forecasting`
- `RStudio Replica Forecasting App`
- `Collaborative Filtering Recommendation Engine`
- `SurgeMedi`
- `Priority-Based CSV Sampler`
- `GitHub Contribution Scheduler`

### Early Projects / Lineage Only
- `AgricultureForecasting`
- `AgriFore_Kamareddy_Only`
- `KamareddyAgriFore`
- `Telengana_Price_Forecasting_by_Agriculture_Railfall_Correlation`
- `hackathon hand gesture`
- `Gesture-Recognition-master`
- `hackathin/hackathon-main`
- `hackathin/SC_face_id`
- `Project AQI/sales_frontend`
- `commitment_issue_design`

### Excluded Items
- `VolunTree` for now, pending authorship clarification
- `Medical-Equipment-Tracking`
- `Face-Detection`
- `PotpieAI_Context_Project`
- `spring-petclinic`
- `devtraining-needit-utah`
- `The_Wedding_Company_Backend_Assignment`
- `Tredence_Assignment`
- portfolio-site family repos as separate project entries
