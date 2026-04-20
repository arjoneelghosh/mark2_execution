# Pass 2: Experience & Records Handoff

## Overview
This follow-up pass corrects the earlier experience and records population so that certificate and paper links resolve to real bundled assets, unsupported claims are toned down, and live placeholder contact content is removed. The lightweight certificate viewer remains in place and continues to provide inline preview plus open and download actions.

## Evidence Sources Used
- `src/assets/project-previews/InternshipCertificates/KPMG.pdf`
- `src/assets/project-previews/InternshipCertificates/SopraSteria.pdf`
- `src/assets/project-previews/IEEE.pdf`
- `src/assets/project-previews/achiev/ISRO_OnlineCourse.pdf`
- `src/assets/project-previews/achiev/DIP_DeepLearning.pdf`
- `src/assets/project-previews/achiev/DIP_MachineLearning.pdf`
- `src/assets/project-previews/achiev/Matlab_onramp.pdf`
- `src/assets/project-previews/achiev/HackathonGENESIS1.0.pdf`
- `src/assets/project-previews/achiev/MUNSOC.pdf`

## Final Experience Mapping
The live experience set is now kept conservative:
1. **KPMG India Services LLP**: Internship entry backed by the certificate, with duration and Noida location retained and responsibilities kept close to the certificate wording.
2. **Sopra Steria India Limited**: Internship/project entry backed by the certificate for "Quota-Based Three-Phase Iterative Balancing Sampler for ServiceNow Cases", linked to the CSV sampler project.
3. **SRMMUN Society**: Leadership evidence retained in a limited form because certificate support exists, but scope and timeline wording remain conservative.

The earlier **SRM research experience entry** was removed because the manuscript supports authorship, but not a formal research role title strongly enough for the Experience section.

## Final Records / Certifications Mapping
- **Publication**: IEEE-format AgriFore manuscript retained, but framed strictly as a manuscript rather than a confirmed publication.
- **Certifications**: ISRO and MathWorks certificates retained with real imported asset links.
- **Achievements**: GENESIS participation, KPMG completion, Sopra Steria completion, and MUNSOC supporting evidence retained with real imported asset links.
- **Lab Content**: Retained as a minimal evidence-backed set, but wording was reduced from metrics/deployment claims to manuscript/prototype-level summaries.

## Publication / Manuscript Wording Used
The AgriFore paper is described as:
- an **IEEE-format manuscript**
- listing **Arjoneel Ghosh among the authors**
- focused on **agricultural market and yield modeling for Kamareddy District, Telangana**

The live wording intentionally does **not** claim:
- publication acceptance
- DOI
- indexing
- journal placement

## Certificate Viewer Implementation Notes
- `CertificateViewer.tsx` remains the live viewer component.
- The viewer uses an inline `<object>` for PDFs, falls back gracefully when preview is unavailable, and provides dedicated **Open in New Tab** and **Download** actions.
- The critical fix in this pass was changing records data to import the actual files from `src/assets/project-previews/...` instead of constructing unresolved relative URLs from `src/data/records.ts`.

## Profile Cleanup
- Profile bio and focus text were tightened to align with evidence-backed themes only.
- Placeholder contact methods were removed from live data because the repo snapshot does not include real public values for them.

## Unresolved Questions Requiring User Input
- **KPMG**: Exact role title and any stronger technical scope beyond the certificate wording.
- **Sopra Steria**: Whether "B.Tech Project Intern" is the preferred public label and whether additional technical detail is safe to add.
- **MUNSOC**: Exact period and formal title wording from the certificate if you want the leadership entry strengthened.
- **Contacts**: Real email, LinkedIn, GitHub, and resume file if you want the Connect section populated again.
- **AgriFore Manuscript**: Whether any stronger publication status can be claimed beyond IEEE-format manuscript.
