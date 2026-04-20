import { ExperienceEntry } from '../types';
import kpmgCertificatePdf from '../assets/project-previews/InternshipCertificates/KPMG.pdf';
import sopraSteriaCertificatePdf from '../assets/project-previews/InternshipCertificates/SopraSteria.pdf';

export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'exp-kpmg',
    organization: 'KPMG India Services LLP',
    role: 'Intern',
    period: '02-Dec-24 to 28-Feb-25',
    type: 'Internships',
    location: 'Noida, India',
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
    summary:
      'Worked on a quota-driven CSV sampling engine for ServiceNow-style case datasets, focusing on hierarchical sampling logic, iterative balancing, configuration-driven execution, and a Streamlit-based interface for practical workflow use.',
    bullets: [
      'Built around a formal project titled "Quota-Based Three-Phase Iterative Balancing Sampler for ServiceNow Cases" inside a company setting rather than as a purely personal utility.',
      'The system was designed to preserve multi-priority quota distributions across structured incident-style datasets while supporting fallback handling, constrained balancing, and reproducible configuration.',
      'The workflow combined algorithm design, configurable execution logic, and a user-facing Streamlit interface for sampling, validation, export, and result inspection.',
      'This internship record should stay grounded in the professional project context while still clearly connecting to the portfolio’s CSV sampler and balancing engine work.',
    ],
    tech: ['Python', 'Streamlit', 'Pandas', 'YAML', 'JSON', 'Configuration-Driven Workflow', 'Quota Balancing', 'ServiceNow'],
    relatedProjectSlugs: ['priority-based-csv-sampler'],
    certificateLink: sopraSteriaCertificatePdf,
    certificateLabel: 'View Internship Certificate',
  },
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
