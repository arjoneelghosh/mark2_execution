# Chatbot Validation Report - Pass 4

## Environment
- Branch: `main`
- Starting commit hash: `a731f8b88cfbf3568d0eb35bcd9f0171a0512f61`
- Ending implementation commit hash: `dd2abe23b08ca4aef332c16b9e3dff7e8303dce7`
- Final HEAD hash after report commit: recorded in terminal output after the report commit, because that hash cannot be embedded self-referentially into the same committed report file
- Run method: `npm run typecheck` and `npm run build` both passed; normal live app launch was not used because this environment still hits `spawn EPERM`, so validation used a temporary source-level runner that was removed after capture

## What Changed In Pass 4
- Expanded the existing exact grounded fallback gate to catch unsupported company, future-plan, pressure/deadline, salary shorthand, and vague role-fit prompts.
- Added an explicit supported-role allowlist so `add value` prompts only answer when the role is clearly grounded and supported.
- Prevented unsupported prompts from falling through into role-fit, project-ranking, or other fallback-prone match layers.

## Prompt Results

### Q1
**Question:** salary  
**Raw chatbot response:** Grounded Portfolio Assistant — I can only answer from the local portfolio knowledge currently loaded into this site. That means I will not invent missing facts, external background, metrics, or unsupported project details.  
**Judgment:** Correct fallback

### Q2
**Question:** salary expectations  
**Raw chatbot response:** Grounded Portfolio Assistant — I can only answer from the local portfolio knowledge currently loaded into this site. That means I will not invent missing facts, external background, metrics, or unsupported project details.  
**Judgment:** Correct fallback

### Q3
**Question:** How do you think you can add value to this role?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q4
**Question:** How do you think you can add value to the role?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q5
**Question:** How do you think you can add value here?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q6
**Question:** How do you think you can add value to a stripper role?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q7
**Question:** What do you know about our company?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q8
**Question:** What do you know about us?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q9
**Question:** Why do you want to work with us?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q10
**Question:** Why this company?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q11
**Question:** Why do you want to join our team?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q12
**Question:** What excites you about our mission?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q13
**Question:** Where do you see yourself in 5 years?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q14
**Question:** What are your long term goals?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q15
**Question:** What are your future plans?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q16
**Question:** How do you handle pressure or deadlines?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q17
**Question:** Tell me about a time you worked in a team  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q18
**Question:** Describe a conflict at work and how you resolved it  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q19
**Question:** Give an example of a failure and what you learned  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q20
**Question:** Do you have any other offers?  
**Raw chatbot response:** Grounded Portfolio Assistant — same exact grounded fallback.  
**Judgment:** Correct fallback

### Q21
**Question:** How do you think Arjoneel can add value to an applied AI engineer role?  
**Raw chatbot response:** Applied AI Engineer Fit — The portfolio looks well suited for an applied AI engineer role because it combines ML workflows with user-facing delivery rather than stopping at model experimentation.  
**Judgment:** Correct

### Q22
**Question:** How do you think Arjoneel can add value to a frontend engineer role?  
**Raw chatbot response:** Frontend Engineer Fit — The portfolio is partially suited for a frontend engineer role, but the strongest overall signal is broader full-stack and ML-oriented delivery rather than frontend-only specialization.  
**Judgment:** Correct

### Q23
**Question:** How do you think Arjoneel can add value to a data scientist role?  
**Raw chatbot response:** Data Scientist Fit — The portfolio is well suited for a data scientist role, especially where forecasting, analytics workflows, and practical delivery matter.  
**Judgment:** Correct

### Q24
**Question:** How do you think Arjoneel can add value to an ML engineer role?  
**Raw chatbot response:** ML Engineer Fit — This portfolio is best suited for ML engineer roles, especially ones that value product delivery rather than pure offline modeling.  
**Judgment:** Correct

### Q25
**Question:** What role is this portfolio best suited for?  
**Raw chatbot response:** Best-Fit Role — The single best fit here is an ML engineer role with product-facing delivery expectations.  
**Judgment:** Correct

### Q26
**Question:** What role is this portfolio NOT yet strong enough for?  
**Raw chatbot response:** Current Role Gaps — This portfolio is not yet strongest for a pure research-scientist role.  
**Judgment:** Correct

### Q27
**Question:** ds or swe  
**Raw chatbot response:** DS or SWE — This portfolio reads closer to DS/ML than to pure software engineering, with full-stack delivery used to operationalize the work.  
**Judgment:** Correct

### Q28
**Question:** full stack or ml  
**Raw chatbot response:** Full Stack or ML — This portfolio is closer to ML, with full-stack used as the delivery layer.  
**Judgment:** Correct

### Q29
**Question:** research or product  
**Raw chatbot response:** Research or Product — This portfolio reads closer to product-oriented engineering than to pure research.  
**Judgment:** Correct

### Q30
**Question:** What is your experience?  
**Raw chatbot response:** Experience Summary — The published experience here is internship-led and project-heavy, with additional leadership evidence rather than a long full-time role history.  
**Judgment:** Correct

### Q31
**Question:** What is your job profile?  
**Raw chatbot response:** Job Profile — Arjoneel Ghosh is best described here as a machine learning engineer and full-stack developer with strongest evidence in forecasting systems, assistive AI, and product-oriented technical delivery.  
**Judgment:** Correct

### Q32
**Question:** What risks might recruiters see in this portfolio?  
**Raw chatbot response:** Portfolio Gaps — The weaker signals in this portfolio are mostly evidence and packaging gaps rather than a lack of technical range.  
**Judgment:** Correct

### Q33
**Question:** Why should I hire Arjoneel?  
**Raw chatbot response:** Why Hire Arjoneel — The strongest case for hiring Arjoneel from this portfolio is the combination of evidence-backed forecasting and ML work, practical tooling, and product-oriented delivery.  
**Judgment:** Correct

### Q34
**Question:** Why should I not hire Arjoneel?  
**Raw chatbot response:** Why Not Hire Arjoneel — The main reasons for caution from this portfolio are maturity and packaging gaps rather than a lack of technical range.  
**Judgment:** Correct

### Q35
**Question:** What is the best project here and why  
**Raw chatbot response:** Best Project Pick — The best single project here is AgriFore because it combines the deepest evidence-backed ML and analytics work with visible product delivery.  
**Judgment:** Correct

### Q36
**Question:** What is the clearest proof of frontend ability here?  
**Raw chatbot response:** Frontend Proof — The clearest proof of frontend ability here is SurgeMedi.  
**Judgment:** Correct

### Q37
**Question:** What is the clearest proof of backend ability here?  
**Raw chatbot response:** Backend Proof — The clearest proof of backend ability here is AgriFore.  
**Judgment:** Correct

### Q38
**Question:** What tools/technologies do you use regularly?  
**Raw chatbot response:** Regularly Used Tools — The tools that appear most consistently across this portfolio are Python, SQL, Pandas, DuckDB, FastAPI, React, TypeScript, Streamlit, and model-oriented tooling such as scikit-learn, XGBoost, and Prophet.  
**Judgment:** Correct

### Q39
**Question:** fsd projects  
**Raw chatbot response:** Portfolio Projects — I do not have a grounded meaning for "fsd" in this portfolio, but based on "projects" here is the closest relevant project overview.  
**Judgment:** Correct

### Q40
**Question:** fsd  
**Raw chatbot response:** Grounded Portfolio Assistant — I can only answer from the local portfolio knowledge currently loaded into this site. That means I will not invent missing facts, external background, metrics, or unsupported project details.  
**Judgment:** Correct fallback

## Regression Summary
- Unsupported company prompts now fallback cleanly.
- Unsupported future-personal-plan prompts now fallback cleanly.
- Unsupported vague or unsafe role-fit prompts now fallback cleanly.
- Supported role-fit prompts still route to grounded role-fit answers.
- Profile, recruiter-risk, ranking, recurring-tools, and noise-plus-valid-token behavior did not regress in the tested set.
- No tested unsupported prompt fell through into CropIQ, the AgriFore manuscript, navigation, or recurring theme summaries.

## Remaining Imperfections
- The unsupported guardrail is still pattern-based, so future untested phrasings may need more coverage if they are phrased very differently from the current family.
- Supported role-fit coverage remains intentionally narrow by design; that is safer, but it means adjacent role phrasings outside the explicit allowlist will fallback until deliberately supported.

