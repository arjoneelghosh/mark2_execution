# Mark2 Content Population Audit

> **Audit Date**: 2026-04-07  
> **Scope**: READ-ONLY inspection of all data, content, and evidence sources  
> **Constraint**: No `.ts` files were modified during this audit

---

## 1. Repo Structure Map

```
frontend/
├── src/                          ← MAIN APPLICATION
│   ├── main.tsx                  ← BrowserRouter + App mount
│   ├── App.tsx                   ← Routes + AIAssistant overlay
│   ├── types.ts                  ← 20+ TypeScript interfaces
│   ├── index.css                 ← TailwindCSS + dark theme base
│   │
│   ├── data/                     ← Static data layer (ALL site content)
│   │   ├── index.ts              ← Barrel re-export
│   │   ├── navigation.ts         ← Tier 1 + Tier 2 nav definitions
│   │   ├── projects.ts           ← ProjectRecord[] (6 entries)
│   │   ├── experience.ts         ← ExperienceEntry[] (6 entries)
│   │   ├── profile.ts            ← ProfileRecord + ContactMethod[]
│   │   ├── records.ts            ← Achievements, Publications, Certs, Lab
│   │   ├── content.ts            ← SectionContent derivations for all pages
│   │   ├── assistant.ts          ← AI assistant actions, replies, knowledge
│   │   └── selectors.ts          ← getProjectsForTier2(), getFeaturedProjects()
│   │
│   ├── components/               ← 8 reusable UI components
│   ├── pages/                    ← 7 route-level pages
│   └── assets/project-previews/  ← Images + IEEE.pdf + Certificates
│
├── content/                      ← 22 YAML research/intake files
├── docs/                         ← 26 markdown reports (reference only)
├── dist/                         ← Production build
└── *.json                        ← GitHub API data dumps
```

### Data → UI Flow

| Section | Data File(s) | Rendering File(s) | Content Derivation |
|---------|-------------|-------------------|-------------------|
| **Work** | `projects.ts`, `selectors.ts` | `WorkPage.tsx`, `ProjectCard.tsx` | Direct from `ProjectRecord[]` |
| **Profile** | `profile.ts` | `ProfilePage.tsx`, `SectionContentView.tsx` | Via `content.ts` → `profileContent` |
| **Experience** | `experience.ts` | `ExperiencePage.tsx`, `SectionContentView.tsx` | Via `content.ts` → `experienceContent` |
| **Lab** | `records.ts` | `LabPage.tsx`, `SectionContentView.tsx` | Via `content.ts` → `labContent` |
| **Connect** | `profile.ts` | `ConnectPage.tsx`, `SectionContentView.tsx` | Via `content.ts` → `connectContent` |
| **Ask** | `assistant.ts` | `AskPage.tsx`, `AIAssistant.tsx` | Direct from actions/replies |

---

## 2. Data Layer Map

### `src/data/profile.ts` — Profile Section

| Aspect | Status |
|--------|--------|
| **Role** | Defines `profileRecord` (name, headline, bio, skills) and `contactMethods[]` |
| **Content quality** | **Mixed.** Name is real (`Arjoneel Ghosh`). Headline is generic but decent. `shortBio` is usable with edits. `longBio` is explicitly placeholder. `currentFocus` is placeholder-vague. Contact methods are all placeholder (`placeholder@portfolio.dev`, `#` links). |
| **Usable as-is** | Name, headline |
| **Needs replacement** | `longBio` (says "currently holding placeholder copy"), all `contactMethods`, `currentFocus` items |
| **Skill groups** | Structure is good but content is partially placeholder — e.g., "Evaluation Design" and "Retrieval Concepts" are vague labels, not real skills from evidence |

### `src/data/projects.ts` — Work Section

| Aspect | Status |
|--------|--------|
| **Role** | Defines `projectRecords[]` — 6 entries with full schema |
| **Content quality** | **Mixed.** AgriFore (proj-01) is well-written with real screenshots. SignChat (proj-02) has real narrative but placeholder SVG media. SurgeMedi (proj-03) has real narrative, placeholder media. CSV Sampler (proj-04) has real narrative, placeholder media. **Vision Notebook Suite (proj-05) and Prototype Lab Index (proj-06) are fully dummy/filler entries.** |
| **Missing projects** | FlightFinder AI (has 5 PNGs in assets but no entry), CropIQ, LoanONE AI, AQI Forecasting, Collaborative Filtering, RStudio Replica, GitHub Contribution Scheduler |
| **Media status** | Only AgriFore has real PNGs wired. 4 project folders have real PNGs sitting unused. |

### `src/data/experience.ts` — Experience Section

| Aspect | Status |
|--------|--------|
| **Role** | Defines `experienceEntries[]` — 6 entries |
| **Content quality** | **Almost entirely placeholder.** Every entry uses fake organization names ("Applied Intelligence Studio", "Platform Systems Group", "Systems and ML Lab", etc.) and generic summaries starting with "Placeholder..." |
| **Real evidence available** | KPMG internship certificate (Dec 2024 – Feb 2025), Sopra Steria project certificate (Jul 2025 – Nov 2025) |
| **Usable as-is** | Nothing — every entry needs real data |

### `src/data/records.ts` — Records/Achievements

| Aspect | Status |
|--------|--------|
| **Role** | Defines `achievementRecords[]`, `publicationRecords[]`, `certificationRecords[]`, `labKnowledgeEntries[]` |
| **Content quality** | **Almost entirely placeholder.** Achievements use "Placeholder Lab / Event". Publications use "Draft Research Note" and "Concept Note". Certification uses "Deferred Source". Lab entries are concept-only. |
| **Real evidence available** | 13 certificates in `achievements_intake.yaml` (AWS, Fortinet, GitHub, ServiceNow, MathWorks, ISRO). IEEE paper for publication. |
| **Usable as-is** | Nothing |

### `src/data/content.ts` — Content Derivation Layer

| Aspect | Status |
|--------|--------|
| **Role** | Transforms data from profile, experience, records into `SectionContent` maps consumed by pages |
| **Quality** | Structure is excellent — it programmatically builds cards from records. Content quality inherits from source data (mostly placeholder) |
| **Implication** | Fixing the source data files automatically fixes what renders on all pages |

### `src/data/assistant.ts` — AI Assistant

| Aspect | Status |
|--------|--------|
| **Role** | Defines assistant actions, knowledge cards, role summaries, and pre-built replies |
| **Content quality** | Functional but references non-existent project slugs ("adaptive-model-studio", "retrieval-workbench", "signal-ops-console", "systems-review-desk") |
| **Risk** | Knowledge cards reference projects that don't exist in `projects.ts` |

### `src/data/navigation.ts` — Navigation

| Aspect | Status |
|--------|--------|
| **Role** | Defines Tier 1 and Tier 2 navigation nodes |
| **Content quality** | **Fully functional.** No changes needed for content population |

### `src/data/selectors.ts` — Selectors

| Aspect | Status |
|--------|--------|
| **Role** | Filters projects by Tier 2 tab state |
| **Content quality** | **Functional.** Will work correctly with any project data |

---

## 3. Section Structure Analysis

### Profile

**Data files**: `profile.ts` → feeds `content.ts` → `profileContent`  
**Rendering**: `ProfilePage.tsx` → `SectionContentView.tsx`  
**Tier 2 tabs**: About | Skills | Resume | Achievements

**Expected shape** (from `types.ts`):
```typescript
interface ProfileRecord {
  name: string;           // ✅ Real: "Arjoneel Ghosh"
  headline: string;       // ⚠️ Generic but usable
  shortBio: string;       // ⚠️ Needs refinement
  longBio: string[];      // ❌ Explicitly placeholder
  currentFocus: string[]; // ❌ Placeholder-vague
  skillGroups: SkillGroup[]; // ⚠️ Structure good, labels weak
}
```

**Hidden assumptions**:  
- `content.ts` builds the Achievements tab from `records.ts` achievement + certification records
- Skills tab is auto-derived from `skillGroups[]` — emphasis labels ("Core"/"Strong"/"Working") appear in rendered tags
- Resume tab content is hardcoded placeholder cards about "future export target"

---

### Work

**Data files**: `projects.ts` → `selectors.ts`  
**Rendering**: `WorkPage.tsx` → `ProjectCard.tsx`  
**Tier 2 tabs**: Featured | ML/Data | Full Stack | Research | Archive

**Expected shape** (from `types.ts`):
```typescript
interface ProjectRecord {
  id: string;              // Required
  slug: string;            // Required
  title: string;           // Required
  shortTitle: string;      // Required
  category: ProjectCategory; // 'ML/Data' | 'Full Stack' | 'Research'
  subcategories: string[]; // Used for Archive filter
  tags: string[];          // Rendered as pills
  status: ProjectStatus;   // 'Completed' | 'Active' | 'In Progress'
  featured: boolean;       // Controls Featured filter
  priority: number;        // Sort order
  year: string;            // Period label
  periodLabel: string;     // Display text
  summary: string;         // Long summary
  previewSummary: string;  // Card preview text
  overview: string;        // Detailed overview
  problem: string;         // Problem statement
  approach: string[];      // Approach bullets
  outcomes: string[];      // Outcome bullets
  techStack: string[];     // Technology list
  links: ProjectLinkSet;   // Optional URLs
  media: { cover, preview, gallery[] }; // Images
  filters: ProjectFilterMeta;
  metrics?: ProjectMetric[];
  roleHints?: ProjectRoleHint[];
}
```

**Hidden assumptions**:
- `ProjectCard` renders `cover.src` as the main image, `preview.src` as secondary thumbnail
- Categories must be exactly `'ML/Data' | 'Full Stack' | 'Research'` for Tier 2 filtering to work
- `subcategories` must include `'Archive'` for the Archive filter to pick them up

---

### Experience

**Data files**: `experience.ts` → `content.ts` → `experienceContent`  
**Rendering**: `ExperiencePage.tsx` → `SectionContentView.tsx`  
**Tier 2 tabs**: Internships | Research | Leadership

**Expected shape** (from `types.ts`):
```typescript
interface ExperienceEntry {
  id: string;
  organization: string;       // ❌ All placeholder
  role: string;                // ❌ All placeholder  
  period: string;              // ❌ All placeholder
  type: ExperienceType;        // 'Internships' | 'Research' | 'Leadership'
  location?: string;
  summary: string;             // ❌ All start with "Placeholder..."
  bullets: string[];           // ❌ All generic
  tech: string[];
  relatedProjectSlugs?: string[]; // References non-existent slugs
}
```

**Hidden assumptions**:  
- `content.ts` filters by `type` field to populate each tab
- Card title is rendered as `"${role} | ${organization}"`
- `relatedProjectSlugs` are rendered as tags (but never resolved to links currently)

---

### Lab

**Data files**: `records.ts` → `content.ts` → `labContent`  
**Rendering**: `LabPage.tsx` → `SectionContentView.tsx`  
**Tier 2 tabs**: Papers | Concepts | Experiments | Prototypes

**Expected shape**:
- **Papers tab**: Rendered from `publicationRecords[]` — currently 2 placeholder entries
- **Concepts/Experiments/Prototypes tabs**: From `labKnowledgeEntries[]` filtered by `section` field

**Hidden assumptions**:
- Papers tab uses `publicationRecords` (type `AchievementRecord`), not `labKnowledgeEntries`
- Lab entries use `status` field as the meta tag (e.g., "Exploring", "Active", "Demo")

---

### Records (supporting layer, no dedicated page)

**Data files**: `records.ts`  
**Consumers**: `content.ts` (Achievements tab in Profile, Papers tab in Lab)

Records feed two different page sections:
1. `achievementRecords` + `certificationRecords` → Profile's Achievements tab
2. `publicationRecords` → Lab's Papers tab
3. `labKnowledgeEntries` → Lab's other tabs

---

## 4. Content Folder Audit

The `content/` folder contains 22 YAML files from a prior research pipeline. Here is a relevance and quality assessment:

### High-Value Files (directly usable for population)

| File | Supports | Quality | Notes |
|------|----------|---------|-------|
| `final_deep_study.yaml` | Work (all projects) | **Strong** | 10 project deep-dives with objectives, approach, outcomes, key components, confirmed implementation details, and uncertainty flags. Conservative evidence-based language. |
| `compiled_project_catalog.yaml` | Work | **Strong** | 17 projects with treatment decisions (featured/archive/early/exclude), categories, source paths, media candidates |
| `project_population_readiness_v2.yaml` | Work | **Strong** | Per-project readiness flags (narrative, specificity, media, source) with blockers and next actions |
| `achievements_intake.yaml` | Records | **Strong** | 13 certificates with issuers, types, confidence levels, portfolio treatment recommendations |
| `final_project_decisions.yaml` | Work | **Strong** | Canonical featured (3), archive (7), lineage-only (5), excluded (9) decisions |
| `source_map.yaml` | Work | **Good** | Local folder + GitHub + hosted URL mapping for every project |
| `media_manifest.yaml` | Work | **Good** | Mapped media assets with confidence and usage recommendations |

### Medium-Value Files (useful as reference)

| File | Supports | Notes |
|------|----------|-------|
| `enriched_project_catalog.yaml` | Work | Earlier version of compiled catalog, largely superseded |
| `desktop_project_intake.yaml` | Work | Raw intake from Desktop scan — now superseded by deep study |
| `project_intake.yaml` | Work | Earlier intake, superseded |
| `github_repo_inventory.yaml` | Work | GitHub repo details — reference only |
| `github_local_crosswalk.yaml` | Work | Links GitHub to local folders — useful for tracing |
| `project_family_map.yaml` | Work | Family groupings — aligned with final decisions |
| `*_triage.yaml` (4 files) | Work | Per-project triage reports — useful detail but now in deep study |

### Low-Value Files (skip for population)

| File | Notes |
|------|-------|
| `deep_project_detail_catalog.yaml` | Superseded by `final_deep_study.yaml` |
| `supporting_evidence_intake.yaml` | Minimal content |
| `github_repo_family_map.yaml` | Reference only |

---

## 5. Research Paper Audit

**File**: `src/assets/project-previews/IEEE.pdf`

### Extracted Facts

| Field | Value |
|-------|-------|
| **Title** | "AgriFore: Data-Driven Agricultural Market and Yield Modeling for Kamareddy District, Telangana" |
| **Authors** | 1st: Arjoneel Ghosh, 2nd: Sankar Shanan G, 3rd: Dr. Arul Prakash |
| **Affiliation** | Computing Technologies, SRM Institute of Science and Technology, Chennai, India |
| **Author email** | arjoneelghosh03@gmail.com |
| **System name** | AgriFore |
| **Domain** | Agricultural forecasting for Telangana/Kamareddy |
| **Model 1** | Weather-to-Yield XGBoost — test R² ≈ 0.77 on 28 Kamareddy test records |
| **Model 2 (primary)** | Market Price XGBoost — test R² = 0.885 on 2024 holdout of 4,264 records |
| **Supporting components** | RidgeCV residual-correction layer, LSTM autoencoder for anomaly scoring |
| **Tech stack** | DuckDB ETL, XGBoost, LightGBM, RidgeCV, LSTM, FastAPI, Next.js |
| **Data sources** | AGMARKNET mandi data, IMD weather data, horticulture production records |
| **Index Terms** | Agricultural forecasting, XGBoost, LSTM autoencoder, crop yield prediction, price forecasting, DuckDB |
| **Appendix B** | Fresh March 2026 validation: 6 matched rows, MAE=623.87, RMSE=673.88, R²=0.778 |

### Publication Status

> [!WARNING]
> The paper is written in IEEE format with proper structure (Abstract, Introduction, Related Work, Architecture, Results, References with 22 citations). However, **no evidence of acceptance, journal name, or DOI** was found in the extracted text. It should be described as **"IEEE-format manuscript"** or **"research paper"**, not as a published/indexed paper.

### Portfolio Fields This Paper Can Populate

| Section | Field | What the paper provides |
|---------|-------|------------------------|
| **Work** (AgriFore project) | `summary`, `overview`, `problem`, `approach`, `outcomes`, `techStack` | All strengthened with evidence-backed details |
| **Work** (AgriFore project) | `metrics` | R² = 0.885 (Market Model), R² ≈ 0.77 (Yield Model) |
| **Records** | `publicationRecords[]` | Title, author list, draft status |
| **Lab** | Papers tab | Title + abstract-level summary |
| **Profile** | `longBio`, `currentFocus` | "Research paper author" evidence; ML systems + agricultural forecasting focus |

### Still Needed From User

- Whether this paper has been submitted, accepted, or is still a draft
- Whether to list co-authors or keep the entry author-agnostic
- Whether the email address should be used as the portfolio contact

---

## 6. Internship Certificate Audit

### KPMG Certificate ✅

| Field | Extracted Value |
|-------|----------------|
| **Organization** | KPMG India Services LLP |
| **Location** | Noida office |
| **Duration** | 02-Dec-24 to 28-Feb-25 (3 months) |
| **Division** | G & PS - GovTech |
| **Achievement** | "successfully contributed in institutionalizing the project assigned" |
| **Performance** | "diligently supported... performed in line with expectations" |
| **Signatory** | Mandanna SC, Head - HR Tech & Digital Trans |
| **Certificate date** | 3 April 2025 |

**Assessment**: **Strong — supports a formal experience entry.**  
Missing: Exact role title, project description/domain, tech stack used. These need user clarification.

### Sopra Steria Certificate ✅

| Field | Extracted Value |
|-------|----------------|
| **Organization** | Sopra Steria India Limited |
| **Location** | Noida |
| **Duration** | 01/07/2025 – 01/11/2025 (4 months) |
| **Purpose** | Partial fulfillment of B.Tech |
| **Project title** | "Quota-Based Three-Phase Iterative Balancing Sampler for ServiceNow Cases" |
| **Mentor** | Udgar Dixit, Module Lead |
| **Approving authority** | Chanchal Chauhan, Head - Talent Development |
| **Certificate date** | 11th Dec (year likely 2025) |

**Assessment**: **Strong — supports a formal experience entry.**  

> [!IMPORTANT]
> The Sopra Steria certificate names the project as "Quota-Based Three-Phase Iterative Balancing Sampler for ServiceNow Cases" — this directly connects to the "Priority-Based CSV Sampler" project in the portfolio. This link should be made explicit.

---

## 7. Placeholder/Dummy Content Audit

### Critical Placeholders (must be replaced before launch)

| File | Location | Issue | Action |
|------|----------|-------|--------|
| `experience.ts` | Lines 3-98 | **ALL 6 entries are placeholder.** Organizations like "Applied Intelligence Studio", "Platform Systems Group" are fabricated. Every summary starts with "Placeholder..." | **Replace entirely** |
| `profile.ts` | Lines 8-11 | `longBio` says "currently holding placeholder copy" | **Replace** with real bio |
| `profile.ts` | Lines 54-83 | All `contactMethods` use `placeholder@portfolio.dev` and `#` links | **Replace** with real contacts |
| `records.ts` | Lines 3-20 | `achievementRecords[]` — fake "Research Signal" and "Build Signal" | **Replace** with real achievements |
| `records.ts` | Lines 22-39 | `publicationRecords[]` — "Draft Research Note" and "Concept Note" | **Replace** with IEEE paper |
| `records.ts` | Lines 41-50 | `certificationRecords[]` — "Placeholder Certification" | **Replace** with real certs |
| `records.ts` | Lines 52-101 | `labKnowledgeEntries[]` — concept sketches with no evidence backing | **Review** |

### Dummy Project Entries (should be removed)

| File | Entry | Issue | Action |
|------|-------|-------|--------|
| `projects.ts` | `proj-05` "Vision Notebook Suite" | Fully dummy: "Dummy computer-vision exploration surface" | **Remove** |
| `projects.ts` | `proj-06` "Prototype Lab Index" | Fully dummy: "Dummy catalog for half-formed concepts" | **Remove** |

### Media Not Wired (screenshots exist but unused)

| Project | Available PNGs | Location |
|---------|---------------|----------|
| SignChat | 4 (login, language selector, ASL session, BSL session) | `assets/project-previews/signchat/` |
| SurgeMedi | 3 (about, contact, product range) | `assets/project-previews/surgemedi/` |
| CSV Sampler | 7 (workflow, config, validation, results, etc.) | `assets/project-previews/csv-sampler/` |
| FlightFinder AI | 5 (dashboards, auth pages) | `assets/project-previews/flightfinder-ai/` |

### Assistant Data Issues

| File | Issue | Action |
|------|-------|--------|
| `assistant.ts` | `assistantKnowledgeCards[]` references non-existent slugs: "adaptive-model-studio", "retrieval-workbench", "signal-ops-console", "systems-review-desk" | **Fix after project population** |

---

## 8. Readiness Matrix

| Section | Structure | Content | Media | Launch Safe |
|---------|-----------|---------|-------|-------------|
| **Navigation** | ✅ | ✅ | N/A | ✅ |
| **Work (AgriFore)** | ✅ | ✅ | ✅ | ✅ |
| **Work (SignChat)** | ✅ | ✅ | ❌ unwired | ⚠️ |
| **Work (SurgeMedi)** | ✅ | ✅ | ❌ unwired | ⚠️ |
| **Work (CSV Sampler)** | ✅ | ✅ | ❌ unwired | ⚠️ |
| **Work (FlightFinder)** | ❌ no entry | ✅ deep study | ❌ unwired | ❌ |
| **Work (dummy x2)** | ✅ | ❌ dummy | ❌ | ❌ Remove |
| **Profile** | ✅ | ❌ placeholder | N/A | ❌ |
| **Experience** | ✅ | ❌ all placeholder | N/A | ❌ |
| **Records** | ✅ | ❌ all placeholder | N/A | ❌ |
| **Lab** | ✅ | ❌ concept-only | N/A | ⚠️ |
| **Connect** | ✅ | ❌ placeholder | N/A | ❌ |
| **Ask/Assistant** | ✅ | ⚠️ broken refs | N/A | ⚠️ |

---

## 9. Missing-Information Checklist

> [!IMPORTANT]
> These items **cannot be inferred** from the repo and require user input before population.

### Profile
- [ ] Real email address for portfolio
- [ ] Real LinkedIn URL
- [ ] Real GitHub username/URL
- [ ] University name and degree details
- [ ] Year of study or graduation date
- [ ] Long-form bio paragraph(s)
- [ ] Confirm whether IEEE paper email (`arjoneelghosh03@gmail.com`) should be used

### Experience — KPMG
- [ ] Exact role title (certificate says "internship" only)
- [ ] Project/domain within GovTech
- [ ] Technologies used
- [ ] Key contributions or deliverables

### Experience — Sopra Steria
- [ ] Exact role title
- [ ] Confirm link between CSV Sampler project and ServiceNow Sampler certificate
- [ ] Additional tech stack details
- [ ] ServiceNow integration context

### Experience — Others
- [ ] Any other internships or roles?
- [ ] Any real research assistantship?
- [ ] Any leadership positions?

### Records
- [ ] Which certifications to highlight publicly?
- [ ] MathWorks Onramp courses: include or too minor?
- [ ] IEEE paper submission/publication status?

### Projects
- [ ] FlightFinder AI: hackathon context, team size, your role?
- [ ] CropIQ: event context (SIH?), your role?
- [ ] LoanONE AI: hackathon name, your role?

---

## 10. Recommended Population Order

### Phase 1: Experience (highest impact, clear evidence)
1. Replace KPMG placeholder with certificate-backed real data
2. Replace Sopra Steria placeholder with certificate-backed real data
3. Remove or hide remaining placeholder entries
4. Ask user for any additional roles

### Phase 2: Records (clear evidence available)
1. Replace placeholder achievements with real certifications (Fortinet, GitHub, ServiceNow, AWS, ISRO)
2. Replace placeholder publications with IEEE paper entry (conservative "manuscript" wording)
3. Remove "Placeholder Certification" entry

### Phase 3: Profile (needs Phases 1-2 context)
1. Replace `longBio` with real narrative
2. Update `currentFocus` to match actual themes
3. Replace contact methods with real values (user input needed)
4. Refine `skillGroups` to match real tech evidence

### Phase 4: Work — Clean + Wire Media
1. Remove dummy entries (proj-05, proj-06)
2. Wire real screenshots for SignChat, SurgeMedi, CSV Sampler
3. Update `assets/project-previews/index.ts`
4. Connect Sopra Steria context to CSV Sampler

### Phase 5: Work — Add New Projects
1. Add FlightFinder AI (featured, narrative + 5 PNGs ready)
2. Consider archive entries: CropIQ, LoanONE AI, Collaborative Filtering, AQI Forecasting

### Phase 6: Lab (lowest priority)
1. Replace lab knowledge entries with evidence-backed content
2. Update Papers tab with IEEE paper
3. Keep forward-looking items conceptual

### Phase 7: Assistant + Connect (cleanup)
1. Fix knowledge card slug references
2. Update role summaries
3. Replace connect URLs with real links

---

## 11. Safe Next-Step Plan

### Immediately Safe (no user input needed)
- [ ] Remove dummy project entries (proj-05, proj-06)
- [ ] Wire existing unbundled screenshots (signchat, surgemedi, csv-sampler, flightfinder)

### Requires User Input First
- [ ] Populate Experience (need role titles, tech, contributions for KPMG/Sopra Steria)
- [ ] Populate Profile (need real contact info, bio)
- [ ] Confirm which certifications to show publicly
- [ ] Confirm IEEE paper publication status
- [ ] Add FlightFinder AI entry (need hackathon context)

### Do NOT Touch Yet
- Navigation system — working correctly
- `content.ts` — auto-derives from source data
- `selectors.ts` — functional with any data
- UI components — no changes needed for population
- `assistant.ts` — fix only after project slugs are settled

> [!IMPORTANT]
> **No `.ts` files were modified during this audit.** All findings are based on read-only inspection.
