# Chatbot Validation Report - Pass 3

## Environment
- Branch: `main`
- Starting commit hash: `57b313594441df46895ce528af579daf4a56f75d`
- Ending implementation commit hash: `1845e155cfc872f15a742d3d9b3ab748c5d7d44d`
- Run method: normal `npm run dev` was not used because this environment still throws `spawn EPERM`; validation used the same temporary source-level runner pattern as Pass 2, rebuilt after the resolver change, then executed once against the exact prompt set.
- Validation commands:
  - `npm run typecheck`
  - `npm run build`
  - temporary runner build and execution

## What Changed In Pass 3
- Added a flatter recurring-tools answer path for prompts about tools or technologies used regularly.
- Prevented recurring `tech stack ... regularly` prompts from being claimed too early by the grouped tech-stack summary route.
- Improved noise-plus-valid-token handling so prompts like `fsd projects` and `abc experience` acknowledge the unsupported token but still answer the grounded valid intent.
- Preserved the Pass 2 early routing and exact grounded fallback behavior for unsupported anecdotal or private prompts.

## Before / After Quality Summary
- Before Pass 3, recurring-tools prompts still sounded too taxonomy-heavy and `fsd projects` style prompts were only partially graceful.
- After Pass 3, recurring-tools prompts resolve to a flatter recruiter-natural answer, and noise-plus-valid-token prompts keep the useful intent while explicitly ignoring the unsupported token.
- No Pass 2 regression showed up in the required regression set.

## Prompt Results

### Q1
**Question:** What tools/technologies do you use regularly?  
**Raw chatbot response:**  
**Title:** Regularly Used Tools  
**Answer:** The tools that appear most consistently across this portfolio are Python, SQL, Pandas, DuckDB, FastAPI, React, TypeScript, Streamlit, and model-oriented tooling such as scikit-learn, XGBoost, and Prophet.  
**Bullets:**  
- Data and analytics: Python, SQL, Pandas, DuckDB, and Streamlit show up repeatedly in forecasting, tooling, and dashboard-style work.
- Delivery and interfaces: React, TypeScript, FastAPI, and dashboard or workflow-oriented frontend delivery appear across the strongest product-facing projects.
- ML and forecasting: scikit-learn, XGBoost, Prophet, ARIMA, and computer-vision tooling such as OpenCV and MediaPipe are the clearest recurring model-side tools.  
**Judgment:** Correct  
**Reason:** This is grounded in the published stack and now answers the recurring-tools wording directly instead of dumping category buckets.

### Q2
**Question:** What tools do you use?  
**Raw chatbot response:**  
**Title:** Regularly Used Tools  
**Answer:** The tools that appear most consistently across this portfolio are Python, SQL, Pandas, DuckDB, FastAPI, React, TypeScript, Streamlit, and model-oriented tooling such as scikit-learn, XGBoost, and Prophet.  
**Bullets:** same as Q1.  
**Judgment:** Correct  
**Reason:** This is a recruiter-natural recurring-tools answer grounded in the same recurring stack signals.

### Q3
**Question:** What tech stack do you use regularly?  
**Raw chatbot response:**  
**Title:** Regularly Used Tools  
**Answer:** The tools that appear most consistently across this portfolio are Python, SQL, Pandas, DuckDB, FastAPI, React, TypeScript, Streamlit, and model-oriented tooling such as scikit-learn, XGBoost, and Prophet.  
**Bullets:** same as Q1.  
**Judgment:** Correct  
**Reason:** The wording includes `regularly`, so the flatter recurring-tools answer is the right shape.

### Q4
**Question:** Summarize tech stack  
**Raw chatbot response:**  
**Title:** Tech Stack Summary  
**Answer:** The portfolio tech stack is best understood through these grouped skill areas rather than one flat tool list.  
**Bullets:** grouped skill areas for Machine Learning and Forecasting, Computer Vision and Applied ML, Full Stack and Product Delivery, and Data and Tooling.  
**Judgment:** Correct  
**Reason:** This explicitly asks for a tech stack summary, so the grouped taxonomy answer remains appropriate.

### Q5
**Question:** fsd projects  
**Raw chatbot response:**  
**Title:** Portfolio Projects  
**Answer:** I do not have a grounded meaning for "fsd" in this portfolio, but based on "projects" here is the closest relevant project overview.  
**Bullets:** AgriFore, SignChat, FlightFinder AI, Priority-Based CSV Sampler, and R Styled Forecast Tool for Business Metrics.  
**Judgment:** Correct  
**Reason:** The response does not hallucinate `fsd`, keeps the valid `projects` intent, and stays grounded.

### Q6
**Question:** abc experience  
**Raw chatbot response:**  
**Title:** Experience Summary  
**Answer:** I do not have a grounded meaning for "abc" in this portfolio, but based on "experience" here is the closest relevant summary. The published experience here is internship-led and project-heavy, with additional leadership evidence rather than a long full-time role history.  
**Bullets:** KPMG internship, Sopra Steria project internship, and leadership evidence.  
**Judgment:** Correct  
**Reason:** The unsupported token is acknowledged, and the answer stays on the valid experience intent without misrouting into a project.

### Q7
**Question:** xyz frontend projects  
**Raw chatbot response:**  
**Title:** Frontend and Website Projects  
**Answer:** I do not have a grounded meaning for "xyz" in this portfolio, but based on "frontend projects" the closest relevant project signals are SurgeMedi, FlightFinder AI, and the AgriFore dashboard surfaces.  
**Bullets:** SurgeMedi, FlightFinder AI, AgriFore.  
**Judgment:** Correct  
**Reason:** This stays grounded and picks relevant frontend-facing work instead of falling back generically.

### Q8
**Question:** qqq tech stack  
**Raw chatbot response:**  
**Title:** Tech Stack Summary  
**Answer:** I do not have a grounded meaning for "qqq" in this portfolio, but based on "tech stack" here is the closest grounded summary.  
**Bullets:** grouped tech-stack areas.  
**Judgment:** Correct  
**Reason:** `tech stack` is still the strongest valid token, so a grouped summary is appropriate after acknowledging the noise.

### Q9
**Question:** What is your experience?  
**Raw chatbot response:**  
**Title:** Experience Summary  
**Answer:** The published experience here is internship-led and project-heavy, with additional leadership evidence rather than a long full-time role history.  
**Bullets:** KPMG, Sopra Steria, leadership evidence.  
**Judgment:** Correct  
**Reason:** This directly answers the candidate-level experience question and no longer collapses into a project.

### Q10
**Question:** What is your job profile?  
**Raw chatbot response:**  
**Title:** Job Profile  
**Answer:** Arjoneel Ghosh is best described here as a machine learning engineer and full-stack developer with strongest evidence in forecasting systems, assistive AI, and product-oriented technical delivery.  
**Judgment:** Correct  
**Reason:** This is grounded in the site headline and the strongest published project signals.

### Q11
**Question:** What risks might recruiters see in this portfolio?  
**Raw chatbot response:**  
**Title:** Portfolio Gaps  
**Answer:** The weaker signals in this portfolio are mostly evidence and packaging gaps rather than a lack of technical range.  
**Bullets:** prototype maturity, uneven depth visibility, limited public production evidence, recruiter confusion risk.  
**Judgment:** Correct  
**Reason:** This directly addresses recruiter risk using the local portfolio weaknesses entry.

### Q12
**Question:** Why should I hire Arjoneel?  
**Raw chatbot response:**  
**Title:** Why Hire Arjoneel  
**Answer:** The strongest case for hiring Arjoneel from this portfolio is the combination of evidence-backed forecasting and ML work, practical tooling, and product-oriented delivery.  
**Judgment:** Correct  
**Reason:** The answer is grounded in the strongest projects and does not invent outside evidence.

### Q13
**Question:** Why should I not hire Arjoneel?  
**Raw chatbot response:**  
**Title:** Why Not Hire Arjoneel  
**Answer:** The main reasons for caution from this portfolio are maturity and packaging gaps rather than a lack of technical range.  
**Judgment:** Correct  
**Reason:** This stays evidence-based and uses portfolio limitations rather than speculative personal weaknesses.

### Q14
**Question:** What role is this portfolio best suited for?  
**Raw chatbot response:**  
**Title:** Best-Fit Role  
**Answer:** The single best fit here is an ML engineer role with product-facing delivery expectations.  
**Judgment:** Correct  
**Reason:** This is grounded in the portfolio headline plus forecasting, AI, and delivery signals.

### Q15
**Question:** What role is this portfolio NOT yet strong enough for?  
**Raw chatbot response:**  
**Title:** Current Role Gaps  
**Answer:** This portfolio is not yet strongest for a pure research-scientist role.  
**Judgment:** Correct  
**Reason:** This is a defensible portfolio-level gap based on the current mix of applied and product-facing evidence.

### Q16
**Question:** ds or swe  
**Raw chatbot response:**  
**Title:** DS or SWE  
**Answer:** This portfolio reads closer to DS/ML than to pure software engineering, with full-stack delivery used to operationalize the work.  
**Judgment:** Correct  
**Reason:** Direct, grounded, and aligned with the strongest visible work.

### Q17
**Question:** full stack or ml  
**Raw chatbot response:**  
**Title:** Full Stack or ML  
**Answer:** This portfolio is closer to ML, with full-stack used as the delivery layer.  
**Judgment:** Correct  
**Reason:** This preserves the intended shorthand-comparison behavior from Pass 2.

### Q18
**Question:** research or product  
**Raw chatbot response:**  
**Title:** Research or Product  
**Answer:** This portfolio reads closer to product-oriented engineering than to pure research.  
**Judgment:** Correct  
**Reason:** This is consistent with the featured workflow and product-surface orientation across projects.

### Q19
**Question:** what is the best project here and why  
**Raw chatbot response:**  
**Title:** Best Project Pick  
**Answer:** The best single project here is AgriFore because it combines the deepest evidence-backed ML and analytics work with visible product delivery.  
**Judgment:** Correct  
**Reason:** This makes one grounded pick and justifies it instead of dumping a grouped list.

### Q20
**Question:** What is the clearest proof of frontend ability here?  
**Raw chatbot response:**  
**Title:** Frontend Proof  
**Answer:** The clearest proof of frontend ability here is SurgeMedi.  
**Judgment:** Correct  
**Reason:** This is a defensible recruiter-facing one-pick answer grounded in the deployed catalog site.

### Q21
**Question:** What is the clearest proof of backend ability here?  
**Raw chatbot response:**  
**Title:** Backend Proof  
**Answer:** The clearest proof of backend ability here is AgriFore.  
**Judgment:** Correct  
**Reason:** The answer is grounded in the visible DuckDB, SQL, and FastAPI delivery path.

### Q22
**Question:** Tell me about a time you worked in a team  
**Raw chatbot response:**  
**Title:** Grounded Portfolio Assistant  
**Answer:** I can only answer from the local portfolio knowledge currently loaded into this site. That means I will not invent missing facts, external background, metrics, or unsupported project details.  
**Bullets:** Try asking about projects, internships, Lab content, records, skills, or navigation.  
**Judgment:** Correct fallback  
**Reason:** This requires anecdotal evidence not published in the local portfolio knowledge, so fallback is the right behavior.

### Q23
**Question:** What are your salary expectations?  
**Raw chatbot response:**  
**Title:** Grounded Portfolio Assistant  
**Answer:** I can only answer from the local portfolio knowledge currently loaded into this site. That means I will not invent missing facts, external background, metrics, or unsupported project details.  
**Judgment:** Correct fallback  
**Reason:** Salary expectations are private and unsupported by local portfolio content.

### Q24
**Question:** fsd  
**Raw chatbot response:**  
**Title:** Grounded Portfolio Assistant  
**Answer:** I can only answer from the local portfolio knowledge currently loaded into this site. That means I will not invent missing facts, external background, metrics, or unsupported project details.  
**Judgment:** Correct fallback  
**Reason:** This is pure noise with no safely grounded intent token.

## Regression Check Summary
- Pass 2 profile-routing wins held.
- Candidate and recruiter prompts did not collapse into CropIQ, the AgriFore manuscript, or navigation explainers.
- Unsupported anecdotal or private prompts still use the exact grounded fallback.
- Ranking prompts still make one grounded pick instead of defaulting to grouped lists.
- Short comparison prompts like `ds or swe`, `full stack or ml`, and `research or product` stayed direct and correct.

## Remaining Imperfections
- The recurring-tools answer is now much flatter, but it is still a fairly dense list because the portfolio spans both delivery and model-side tooling.
- Noise handling currently relies on a leading-noise-token heuristic. It works well for the tested prompts, but more chaotic noise patterns could still fall through to generic unsupported behavior.

