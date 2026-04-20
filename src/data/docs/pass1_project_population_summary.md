# Pass 1 Project and Achievement Population Summary

## 1. Source files reviewed

Primary content sources reviewed in `content/`:
- `content/final_deep_study.yaml`
- `content/project_population_readiness_v2.yaml`
- `content/final_project_decisions.yaml`
- `content/media_manifest.yaml`
- `content/source_map.yaml`
- `content/achievements_intake.yaml`
- `content/compiled_project_catalog.yaml` was treated as lower priority than the newer final study and readiness files

Evidence and comparison sources reviewed:
- `src/assets/project-previews/achiev`
- `src/assets/project-previews/IEEE.pdf`
- `src/data/projects.ts`
- `src/data/records.ts`

Strongest planning sources:
1. `final_deep_study.yaml` for canonical project narratives and confidence
2. `final_project_decisions.yaml` for featured, archive, lineage, and exclude decisions
3. `project_population_readiness_v2.yaml` for readiness and blockers
4. `media_manifest.yaml` for screenshot and artifact readiness
5. `achievements_intake.yaml` plus the actual `achiev` folder for certificate curation

## 2. Current site vs content source comparison

Current live project records in `src/data/projects.ts`:
- AgriFore
- SignChat
- SurgeMedi
- Priority-Based CSV Sampler
- Vision Notebook Suite
- Prototype Lab Index

Current site alignment against content source:
- `AgriFore` matches the content-source featured set and should remain.
- `SignChat` matches the content-source featured set and should remain.
- `SurgeMedi` matches the content-source archive set and should remain.
- `Priority-Based CSV Sampler` matches the content-source archive set and should remain.
- `Vision Notebook Suite` is a dummy placeholder entry and does not appear in the content-source project list. It should be removed later.
- `Prototype Lab Index` is a dummy placeholder entry and does not appear in the content-source project list. It should be removed later.

Important real projects missing from the current site but present in the content source:
- FlightFinder AI
- CropIQ
- LoanONE AI
- AQI Forecasting
- RStudio Replica Forecasting App
- Collaborative Filtering Recommendation Engine
- GitHub Contribution Scheduler

Current featured and archive logic compared with content source:
- Current featured logic is incomplete. It should eventually include `AgriFore`, `FlightFinder AI`, and `SignChat`.
- Current archive logic is incomplete. It should eventually expand beyond `SurgeMedi` and `Priority-Based CSV Sampler` to include the rest of the archive candidates that are evidence-backed enough to keep.

## 3. Master project list

Evidence-backed real candidate projects from `content/`:

1. `AgriFore`
- Slug: `agrifore`
- Category: ML/Data
- Treatment: featured
- Confidence: high
- Evidence quality: high
- Media readiness: strong in `final_deep_study.yaml`, and already represented on the site with real screenshots
- Already on site: yes
- Missing from site: no
- Placeholder represented: no

2. `FlightFinder AI`
- Slug: `flightfinder-ai`
- Category: Full stack plus accessibility focused product system
- Treatment: featured
- Confidence: medium
- Evidence quality: strong text evidence, some implementation uncertainty
- Media readiness: medium in `final_deep_study.yaml`, not yet live on site as a project record
- Already on site: no
- Missing from site: yes
- Placeholder represented: no direct record, but its place in the featured tier is currently occupied by dummy featured entries

3. `SignChat`
- Slug: `signchat`
- Category: ML/Data
- Treatment: featured
- Confidence: high
- Evidence quality: high
- Media readiness: content file says partial, but the live site already has real screenshots wired
- Already on site: yes
- Missing from site: no
- Placeholder represented: no

4. `CropIQ`
- Slug: `cropiq`
- Category: product style agriculture assistant prototype
- Treatment: archive
- Confidence: medium
- Evidence quality: acceptable but still conservative
- Media readiness: weak to partial
- Already on site: no
- Missing from site: yes
- Placeholder represented: no

5. `LoanONE AI`
- Slug: `loanone-ai`
- Category: full stack or product prototype
- Treatment: archive
- Confidence: medium
- Evidence quality: acceptable but branch and completeness uncertainty remain
- Media readiness: weak to partial
- Already on site: no
- Missing from site: yes
- Placeholder represented: no

6. `AQI Forecasting`
- Slug: `aqi-forecasting`
- Category: ML/Data forecasting
- Treatment: archive
- Confidence: medium
- Evidence quality: acceptable but product boundary still fuzzy
- Media readiness: weak to partial
- Already on site: no
- Missing from site: yes
- Placeholder represented: no

7. `RStudio Replica Forecasting App`
- Slug: `rstudio-replica-forecasting-app`
- Category: ML/Data forecasting app
- Treatment: archive
- Confidence: medium
- Evidence quality: acceptable
- Media readiness: weak
- Already on site: no
- Missing from site: yes
- Placeholder represented: no

8. `Collaborative Filtering Recommendation Engine`
- Slug: `collaborative-filtering-recommendation-engine`
- Category: ML/Data recommender prototype
- Treatment: archive
- Confidence: medium
- Evidence quality: acceptable but integration ambiguity remains
- Media readiness: weak to partial
- Already on site: no
- Missing from site: yes
- Placeholder represented: no

9. `SurgeMedi`
- Slug: `surgemedi`
- Category: Full Stack
- Treatment: archive
- Confidence: high
- Evidence quality: high
- Media readiness: strong
- Already on site: yes
- Missing from site: no
- Placeholder represented: no

10. `Priority-Based CSV Sampler`
- Slug: `priority-based-csv-sampler`
- Category: ML/Data utility
- Treatment: archive
- Confidence: high
- Evidence quality: high
- Media readiness: content file marks this partial, but the live site already has real screenshots wired
- Already on site: yes
- Missing from site: no
- Placeholder represented: no

11. `GitHub Contribution Scheduler`
- Slug: `github-contribution-scheduler`
- Category: desktop utility
- Treatment: hold
- Confidence: medium on implementation, low on public-fit readiness
- Evidence quality: moderate but thin as a portfolio story
- Media readiness: weak
- Already on site: no
- Missing from site: yes
- Placeholder represented: no

Items explicitly not to migrate as public project cards:
- Agriculture Forecasting Precursors
- Gesture Recognition Precursors
- Loan Hackathon Variants
- AQI Side Workspaces
- Portfolio Website Lineage
- VolunTree
- Medical-Equipment-Tracking
- Face-Detection
- PotpieAI_Context_Project
- spring-petclinic
- devtraining-needit-utah
- The_Wedding_Company_Backend_Assignment
- Tredence_Assignment
- arjoneel-portfolio

## 4. Recommended project priority order

Final recommended migration order from highest to lower priority:
1. AgriFore
2. SignChat
3. FlightFinder AI
4. SurgeMedi
5. Priority-Based CSV Sampler
6. CropIQ
7. LoanONE AI
8. AQI Forecasting
9. RStudio Replica Forecasting App
10. Collaborative Filtering Recommendation Engine
11. GitHub Contribution Scheduler

Reasoning:
- The first five are the strongest combination of narrative value, evidence quality, and practical portfolio usefulness.
- FlightFinder AI belongs high in the order because `content/` clearly treats it as featured, even though it is not yet live on the site.
- The remaining archive entries are worth keeping, but they need more careful wording and in several cases better screenshots.
- GitHub Contribution Scheduler remains last because both readiness and public-fit confidence are weakest.

## 5. Recommended first migration batch

Recommended first migration batch for a later write pass:
- AgriFore
- SignChat
- FlightFinder AI
- SurgeMedi
- Priority-Based CSV Sampler

Notes:
- Four of these are already on the site and should remain.
- The only real addition needed to complete the first serious batch is `FlightFinder AI`.
- Before that addition, confirm which FlightFinder screenshots should be considered final and keep all accessibility claims conservative.

## 6. Recommended second migration batch

Recommended second migration batch:
- CropIQ
- LoanONE AI
- AQI Forecasting
- RStudio Replica Forecasting App
- Collaborative Filtering Recommendation Engine

Notes:
- This batch adds breadth, but several entries still have weaker media and more narrative uncertainty than the first batch.
- These should be added only after a screenshot pass and another quick wording check.

## 7. Hold and exclude list

Hold for later review:
- `GitHub Contribution Scheduler`
  - Keep on hold because the implementation is real but the public portfolio story is thin and the screenshot situation is weak.

Lineage only or support only:
- Agriculture Forecasting Precursors under AgriFore
- Gesture Recognition Precursors under SignChat
- Loan Hackathon Variants under LoanONE AI
- AQI Side Workspaces under AQI Forecasting
- Portfolio Website Lineage under the portfolio platform itself

Exclude from public project cards:
- VolunTree
- Medical-Equipment-Tracking
- Face-Detection
- PotpieAI_Context_Project
- spring-petclinic
- devtraining-needit-utah
- The_Wedding_Company_Backend_Assignment
- Tredence_Assignment
- arjoneel-portfolio

## 8. Current dummy or mock entries to remove later

Dummy or mock project records currently live in `src/data/projects.ts` and not supported by `content/`:
- `Vision Notebook Suite`
- `Prototype Lab Index`

Why they should be removed:
- They are not part of the canonical project list in `final_project_decisions.yaml` or `final_deep_study.yaml`.
- Their copy explicitly reads as dummy or conceptual shell content.
- They currently occupy space that should later be used by real projects, especially `FlightFinder AI` and the archive set.

Other outdated assumptions still present in the live project layer:
- The site currently implies a complete featured set even though one of the real featured projects, `FlightFinder AI`, is still absent.
- The live `Work` shell copy still contains prototype-era language and does not match the maturity of the current project data.

## 9. Public certifications review

Actual files present in `src/assets/project-previews/achiev`:
- `336_DIP_Cert..pdf`
- `AWS_Academy_Machine_Learning_Foundation.pdf`
- `Computer_Vision_Essential_Course_Certificate.pdf`
- `DIP_DeepLearning.pdf`
- `DIP_MachineLearning.pdf`
- `HackathonGENESIS1.0.pdf`
- `Hackathon_Certificate.pdf`
- `ISRO_OnlineCourse.pdf`
- `Matlab_DeepLearning.pdf`
- `Matlab_MachineLearning.pdf`
- `Matlab_onramp.pdf`
- `MUNSOC.pdf`
- `ServiceNowCAD.pdf`
- `ServiceNowCSA.pdf`

Recommended public certifications to keep or add:
- ServiceNow Certified System Administrator
  - Issuer: ServiceNow
  - Date: 2025
  - Public status: keep
  - Current live status: already present and correctly public
- ServiceNow Certified Application Developer
  - Issuer: ServiceNow
  - Date: 2025
  - Public status: keep
  - Current live status: already present and correctly public
- Geo-data Sharing and Cyber Security
  - Issuer: IIRS / ISRO
  - Date: 2023
  - Public status: keep
  - Current live status: already present and correctly public
- AWS Academy Machine Learning Foundations
  - Issuer: AWS Academy
  - Date: not fully confirmed from current site data, but certificate is present and achievements intake supports inclusion
  - Public status: recommended to add later as a certification or course credential
  - Current live status: missing from `records.ts`

Optional supporting certifications or course credentials, not headline items:
- Deep Learning Onramp
- Machine Learning Onramp
- MATLAB Onramp

These are already live and acceptable, but they should stay secondary to the stronger vendor certifications.

Files that should not be published yet as public certifications without manual confirmation:
- `336_DIP_Cert..pdf`
- `Computer_Vision_Essential_Course_Certificate.pdf`
  - achievements intake mentions a variant with low confidence and no issuer
- `Matlab_DeepLearning.pdf`
- `Matlab_MachineLearning.pdf`
  - likely duplicate or alternate exports relative to the current MathWorks files already in use

Files present but better treated as non-certification records:
- `HackathonGENESIS1.0.pdf`
- `Hackathon_Certificate.pdf`
- `MUNSOC.pdf`

Additional strong public certifications mentioned in `achievements_intake.yaml` but not physically present in `achiev` as currently scanned:
- GitHub Foundations
- Fortinet Certified Associate in Cybersecurity
- FCA - FortiGate 7.4 Operator Self-Paced

These should not be migrated until the actual certificate files are placed in the repo.

## 10. Public achievements review

Recommended public achievements to keep:
- Hackathon GENESIS 1.0
  - Keep as an achievement, not a certification
  - Current live status: already present
- SRMMUN Society Certificate
  - Keep if you want a public leadership achievement layer
  - Current live status: already present, but it is also valid as leadership evidence in Experience

Achievements that should not sit in the public achievements area and should instead remain tied to Experience:
- KPMG Internship Completion
- Sopra Steria B.Tech Project Completion

Why:
- These are role and placement evidence, not public-facing achievements in the same way as certifications or hackathon or leadership records.
- They belong more naturally under Experience, with the certificates still available as supporting evidence if needed.

Achievement file that exists but is ambiguous and should not be published yet:
- `Hackathon_Certificate.pdf`
  - could be a second hackathon record, but it is not cleanly identified from current evidence

## 11. Manuscript and publication review

Manuscript record to keep publicly:
- `AgriFore: Data-Driven Agricultural Market and Yield Modeling for Kamareddy District, Telangana`
  - Source file: `src/assets/project-previews/IEEE.pdf`
  - Public framing: IEEE-format manuscript or research manuscript
  - Do not claim publication, acceptance, DOI, indexing, or journal placement

Current live status in `src/data/records.ts`:
- Good and conservative overall
- Safe to keep as a publication-style record as long as it remains explicitly framed as a manuscript

## 12. Screenshot readiness notes

Recommended migration order with screenshot readiness:

1. AgriFore
- Screenshots already strong enough
- Already live with real project screenshots

2. SignChat
- Screenshots already strong enough in the current site assets
- The `content/` readiness file is slightly behind the live asset state

3. FlightFinder AI
- Screenshots needed before migration or at minimum should be selected and confirmed
- Asset barrel appears prepared in the current site, but the project is still not live

4. SurgeMedi
- Screenshots already strong enough
- Already live with real project screenshots

5. Priority-Based CSV Sampler
- Screenshots already strong enough in the current site assets
- The `content/` readiness file is slightly behind the live asset state

6. CropIQ
- Screenshots missing or not yet mapped

7. LoanONE AI
- Screenshots missing or not yet mapped

8. AQI Forecasting
- Screenshots needed before migration

9. RStudio Replica Forecasting App
- Screenshots needed before migration

10. Collaborative Filtering Recommendation Engine
- Screenshots optional but strongly recommended before migration

11. GitHub Contribution Scheduler
- Screenshots missing
- Should remain on hold anyway

## 13. Safe plan for Pass 2 migration

Recommended safe Pass 2 sequence:
1. Remove dummy project records later:
- `Vision Notebook Suite`
- `Prototype Lab Index`

2. Replace them with real project entries in this order:
- `FlightFinder AI` first
- then one or more second-batch archive entries only after screenshots are prepared

3. Keep the current live real projects in place:
- AgriFore
- SignChat
- SurgeMedi
- Priority-Based CSV Sampler

4. Clean the public records layer later by:
- keeping ServiceNow CSA and CAD public
- keeping ISRO public
- keeping the AgriFore manuscript public as a manuscript record
- keeping Hackathon GENESIS public as an achievement
- deciding whether MUNSOC stays public or is only emphasized under Experience
- removing KPMG and Sopra Steria from the public achievements area and treating them as Experience-backed evidence instead
- optionally adding AWS Academy Machine Learning Foundations if you want one more public certification and are comfortable showing it beside the stronger vendor credentials

5. Do not migrate additional certificates until their files are physically present and identifiable in `achiev`.

6. Do not trust the older dummy featured/archive placeholders in the current site as a guide for final structure. Use `final_project_decisions.yaml`, `final_deep_study.yaml`, and `project_population_readiness_v2.yaml` instead.
