import { ExperienceEntry } from '../types';
import kpmgCertificatePdf from '../assets/project-previews/InternshipCertificates/KPMG.pdf';
import sopraSteriaCertificatePdf from '../assets/project-previews/InternshipCertificates/SopraSteria.pdf';

const internshipEntries: ExperienceEntry[] = [
  {
    id: 'exp-kpmg',
    organization: 'KPMG India Services LLP',
    role: 'Intern',
    period: '02-Dec-24 to 28-Feb-25',
    type: 'Internships',
    location: 'Noida, India',
    cardText:
      'As a Data Science Intern at KPMG, I worked on real-world analytics and forecasting challenges across agriculture and business domains. I developed ML-driven pipelines, built interactive dashboards, and created predictive tools that supported data-driven decision-making. My responsibilities included time-series modeling, data visualization, and implementing geospatial analysis using advanced Python libraries.',
    previewText:
      'Worked on data mining, pattern recognition, forecasting workflows, and analytics automation in a structured internship environment, contributing to business-facing analytical delivery rather than a standalone personal project. Built automation-oriented reporting and analytics flows that helped reduce repeated manual effort in client-specific workflows.',
    summary:
      'Worked on data mining, pattern recognition, forecasting workflows, and analytics automation in a structured internship environment, contributing to business-facing analytical delivery rather than a standalone personal project.',
    bullets: [
      'Worked on real-world datasets with a focus on extracting patterns, building forecasting workflows, and supporting analytical interpretation.',
      'Built automation-oriented reporting and analytics flows that helped reduce repeated manual effort in client-specific workflows.',
      'Developed Prophet-based forecasting work and dashboard-style analytical surfaces that strengthened the bridge between modeling and delivery.',
      'This experience is best represented as a structured internship record tied to professional workflow exposure rather than as an isolated independent build.',
    ],
    tech: ['Python', 'Prophet', 'Data Mining', 'Pattern Recognition', 'Forecasting Workflows', 'Analytics Automation', 'Dashboarding'],
    certificateLink: kpmgCertificatePdf,
    certificateLabel: 'View Internship Certificate',
  },
  {
    id: 'exp-sopra-steria',
    organization: 'Sopra Steria India Limited',
    role: 'Intern',
    period: '01-07-2025 to 01-11-2025',
    type: 'Internships',
    location: 'Hybrid / Noida, India',
    cardText:
      'Designed and implemented a priority-based sampling engine that reduced analyst prep time. Contributed to business intelligence workflows, supporting data cleaning, transformation, and structured reporting. Built around a formal project titled "Quota-Based Three-Phase Iterative Balancing Sampler for ServiceNow Cases" inside a company setting rather than as a purely personal utility. The system was designed to preserve multi-priority quota distributions across structured incident-style datasets while supporting fallback handling, constrained balancing, and reproducible configuration.',
    previewText:
      'Worked on a quota-driven CSV sampling engine for ServiceNow-style case datasets, focusing on hierarchical sampling logic, iterative balancing, configuration-driven execution, and a Streamlit-based interface for practical workflow use.',
    summary:
      'Worked on a quota-driven CSV sampling engine for ServiceNow-style case datasets, focusing on hierarchical sampling logic, iterative balancing, configuration-driven execution, and a Streamlit-based interface for practical workflow use.',
    bullets: [
      'Built around a formal project titled "Quota-Based Three-Phase Iterative Balancing Sampler for ServiceNow Cases" inside a company setting rather than as a purely personal utility.',
      'The system was designed to preserve multi-priority quota distributions across structured incident-style datasets while supporting fallback handling, constrained balancing, and reproducible configuration.',
      'The workflow combined algorithm design, configurable execution logic, and a user-facing Streamlit interface for sampling, validation, export, and result inspection.',
      "This internship record should stay grounded in the professional project context while still clearly connecting to the portfolio's CSV sampler and balancing engine work.",
    ],
    tech: ['Python', 'Streamlit', 'Pandas', 'YAML', 'JSON', 'Configuration-Driven Workflow', 'Quota Balancing', 'ServiceNow'],
    relatedProjectSlugs: ['priority-based-csv-sampler'],
    certificateLink: sopraSteriaCertificatePdf,
    certificateLabel: 'View Internship Certificate',
  },
];

const leadershipSourceEntries: ExperienceEntry[] = [
  {
    id: 'exp-munsoc',
    organization: 'SRMMUN Society',
    role: 'Council Affairs',
    period: 'Certificate-backed campus role',
    type: 'Leadership',
    location: 'SRM campus',
    summary:
      'Certificate-backed campus leadership entry kept conservative because the supporting context is narrower than the internship records.',
    bullets: [
      'Included as a formal leadership signal rather than expanded into a detailed role narrative.',
      'Detailed responsibilities and timeline remain intentionally limited until stronger supporting context is added.',
    ],
    tech: ['Event Coordination', 'Public Speaking'],
  },
  {
    id: 'exp-dsa-2022-23',
    organization: 'SRM Directorate of Student Affairs',
    role: 'Committee Head',
    period: '2022-23',
    type: 'Leadership',
    location: 'SRM campus',
    summary:
      'Year-wise committee leadership record under the SRM Directorate of Student Affairs, kept concise and aligned with the broader leadership evidence style used on the page.',
    bullets: [
      'Presented as a formal year-specific committee leadership entry.',
      'Kept conservative because this section emphasizes role clarity over expanded narrative detail.',
    ],
    tech: ['Committee Leadership', 'Event Coordination'],
  },
  {
    id: 'exp-dsa-2023-24',
    organization: 'SRM Directorate of Student Affairs',
    role: 'Committee Head',
    period: '2023-24',
    type: 'Leadership',
    location: 'SRM campus',
    summary:
      'Year-wise committee leadership record under the SRM Directorate of Student Affairs, maintained as a separate entry for clearer period-specific representation.',
    bullets: [
      'Presented as a formal year-specific committee leadership entry.',
      'Kept concise to remain uniform with the current Experience page evidence style.',
    ],
    tech: ['Committee Leadership', 'Event Coordination'],
  },
  {
    id: 'exp-srmmunsoc-2022-23',
    organization: 'SRMMUN Society',
    role: 'Committee Head',
    period: '2022-23',
    type: 'Leadership',
    location: 'SRM campus',
    summary:
      'Year-wise SRMMUN Society committee leadership record added to make the leadership section reflect the full sequence of committee-head responsibilities.',
    bullets: [
      'Maintained as a period-specific leadership entry rather than folded into a single range.',
      'Kept evidence-backed and concise to match the rest of the Experience page.',
    ],
    tech: ['Committee Leadership', 'Public Speaking'],
  },
  {
    id: 'exp-srmmunsoc-2023-24',
    organization: 'SRMMUN Society',
    role: 'Committee Head',
    period: '2023-24',
    type: 'Leadership',
    location: 'SRM campus',
    summary:
      'Year-wise SRMMUN Society committee leadership record continuing the period-specific representation of committee-head roles.',
    bullets: [
      'Maintained as a separate year entry for clarity.',
      'Presented conservatively in line with the rest of the leadership section.',
    ],
    tech: ['Committee Leadership', 'Public Speaking'],
  },
  {
    id: 'exp-srmmunsoc-2024-25',
    organization: 'SRMMUN Society',
    role: 'Committee Head',
    period: '2024-25',
    type: 'Leadership',
    location: 'SRM campus',
    summary:
      'Year-wise SRMMUN Society committee leadership record for the latest committee-head period represented in the current local evidence set.',
    bullets: [
      'Maintained as a separate year entry for clearer period coverage.',
      'Kept aligned with the current Experience page style rather than expanded into a narrative-heavy role card.',
    ],
    tech: ['Committee Leadership', 'Public Speaking'],
  },
];

const leadershipDisplayEntries: ExperienceEntry[] = [
  {
    id: 'leadership-srm-directorate-of-student-affairs-committee-head',
    organization: 'SRM Directorate of Student Affairs',
    role: 'Committee Head',
    period: '2022-2024',
    type: 'Leadership',
    location: 'SRM campus',
    cardText:
      'My two year tenure with the Directorate of Student Affairs at SRM University has been a defining experience in shaping my leadership and organizational abilities. I began as a member of the discipline team where I contributed to ensuring smooth coordination and effective crowd management during large scale events including Milan. Building on this foundation I advanced to the role of Committee Head in my second year where I led teams managed logistics and oversaw end to end event execution. This progression reflects my commitment and consistency and highlights my ability to take on increasing responsibility collaborate effectively and deliver under pressure skills that I am eager to further develop and apply in future academic and professional settings.',
    previewText:
      'A member of the Directorate of Student Affairs (DSA) at SRM for two years, contributing to the organization and management of multiple events, including the college fest Milan. In the first year, worked as part of the discipline team, ensuring smooth conduct and coordination during events, and in the second year, progressed to the role of Committee Head, taking on leadership responsibilities and overseeing event execution.',
    summary:
      'A member of the Directorate of Student Affairs (DSA) at SRM for two years, contributing to the organization and management of multiple events, including the college fest Milan. In the first year, worked as part of the discipline team, ensuring smooth conduct and coordination during events, and in the second year, progressed to the role of Committee Head, taking on leadership responsibilities and overseeing event execution.',
    bullets: [
      'Proof of leadership and continuous involvement in extracurricular growth',
      'Demonstrates strong leadership and sustained extracurricular involvement through a two-year tenure with the Directorate of Student Affairs (DSA) at SRM.',
      'Began as a discipline team member, contributing to event coordination, and progressed to Committee Head, leading teams and overseeing execution for major events such as Milan, reflecting both commitment and growth in responsibility.',
    ],
    tech: ['Committee Leadership', 'Event Coordination'],
  },
  {
    id: 'leadership-srmmun-society-committee-head',
    organization: 'SRMMUN Society',
    role: 'Committee Head',
    period: '2022-2025',
    type: 'Leadership',
    location: 'SRM campus',
    cardText:
      'My involvement with SRM MUNSOC has been marked by consistent growth and increasing leadership responsibility across multiple years. I began as a committee member in 2022, gaining foundational experience in conference organization and delegate engagement. In 2023, I advanced to serve as Committee Head of the UNSC during SRMMUN where I led discussions mentored delegates and ensured the smooth functioning of committee proceedings. Building on this experience, I took on the role of Committee Head of the Council Affairs team in 2024 where I oversaw broader organizational responsibilities and contributed to the overall execution of the conference. This progression reflects my sustained commitment to extracurricular development and my ability to lead teams manage complex responsibilities and drive organizational excellence.',
    previewText:
      'Extracurricular development through progressive roles in SRM MUNSOC (Model United Nations Society) where I served as a committee member in 2022, advanced to Committee Head of the UNSC committee in 2023 during the SRMMUN-23, and further took on the role of Committee Head of the Council Affairs team in 2024, reflecting sustained growth, responsibility, and commitment to organizational excellence.',
    summary:
      'Extracurricular development through progressive roles in SRM MUNSOC (Model United Nations Society) where I served as a committee member in 2022, advanced to Committee Head of the UNSC committee in 2023 during the SRMMUN-23, and further took on the role of Committee Head of the Council Affairs team in 2024, reflecting sustained growth, responsibility, and commitment to organizational excellence.',
    bullets: [
      'Proof of leadership and continuous involvement in extracurricular growth',
      'Progressed into leadership roles in subsequent editions, serving as Committee Head of the UNSC in 2023 and Committee Head of the Council Affairs team in 2024, taking on responsibilities such as leading teams, mentoring delegates, and ensuring the effective management and smooth functioning of conference proceedings.',
    ],
    tech: ['Committee Leadership', 'Public Speaking'],
  },
];

export const experienceEntries: ExperienceEntry[] = [
  ...internshipEntries,
  ...leadershipSourceEntries,
];

export const experiencePageEntries: ExperienceEntry[] = [
  ...internshipEntries,
  ...leadershipDisplayEntries,
];
