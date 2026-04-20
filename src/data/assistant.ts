import {
  AssistantAction,
  AssistantActionId,
  AssistantKnowledgeCard,
  AssistantReply,
  RoleSummary,
} from '../types';
import { experienceEntries } from './experience';
import { profileRecord } from './profile';
import { projectRecords } from './projects';
import { publicationRecords, certificationRecords, achievementRecords } from './records';

export const assistantActions: AssistantAction[] = [
  {
    id: 'best-ml',
    label: 'Show DS/ML work',
    description: 'Surface the strongest DS/ML, forecasting, computer-vision, and data-tooling work first.',
  },
  {
    id: 'recruiter-summary',
    label: 'Summarize for recruiter',
    description: 'Generate a concise overview grounded in the current portfolio structure and evidence.',
  },
  {
    id: 'full-stack',
    label: 'Show full-stack work',
    description: 'Focus on product workflows, interfaces, API-connected delivery, and real portfolio context.',
  },
  {
    id: 'guide',
    label: 'Guide me through this portfolio',
    description: 'Explain how the site is organized now across Work, Profile, Experience, and Lab.',
  },
];

export const assistantFaqs = [
  {
    id: 'navigation-ring',
    label: 'How do I use the navigation ring?',
    description: 'Understand how the persistent ring navigation works across the portfolio.',
  },
  {
    id: 'education',
    label: "What is Arjoneel's education?",
    description: 'Get the grounded education record including institution, period, qualification, and score.',
  },
  {
    id: 'project-overview',
    label: 'Show project overview',
    description: "A grouped overview of the portfolio's project work across DS/ML and Full Stack.",
  },
] as const;

export const assistantFaqReplies = {
  'navigation-ring': {
    title: 'How do I use the navigation ring?',
    summary: 'The ring is the portfolio\'s persistent navigation system rather than a decorative visual.',
    bullets: [
      'Use the outer ring nodes to move between the main sections of the portfolio.',
      'On inner pages, click AG in the center of the ring to return to the landing page.',
    ],
  },
  education: {
    title: 'Education',
    summary:
      "Arjoneel's published education record includes a B.Tech in Computer Science and Engineering at SRM Institute of Science and Technology, plus CBSE Class XII and Class X school records.",
    bullets: [
      'SRM Institute of Science and Technology | Aug 2022 - May 2026 | B.Tech in Computer Science and Engineering | CGPA 8.18',
      'Navyug Convent Sr. Secondary School | Apr 2021 - Mar 2022 | CBSE Class XII | Percentage 70.8%',
      'Amity International School, Sector 46 | Feb 2019 - Mar 2020 | CBSE Class X | Percentage 89.8%',
    ],
  },
  'project-overview': {
    title: 'Project Overview',
    summary: 'The portfolio covers DS/ML systems, full-stack product delivery, and applied AI across featured and archive projects.',
    bullets: [
      'DS/ML lane: AgriFore, SignChat, Priority-Based CSV Sampler, R Styled Forecast Tool for Business Metrics.',
      'Full Stack lane: FlightFinder AI, SurgeMedi, LoanOne AI. FlightFinder AI spans both DS/ML and Full Stack.',
      'Lab holds supporting prototypes and the AgriFore manuscript alongside concept-stage work.',
    ],
  },
} as const satisfies Record<string, AssistantReply>;

export const assistantMethodology: AssistantReply = {
  title: 'Methodology',
  summary:
    'The Ask assistant is local-first and answers only from the portfolio data bundled into this site.',
  bullets: [
    'Questions are routed through local intent detection and direct matching across projects, profile, education, experience, Lab, records, navigation, and Ask-specific site metadata.',
    'Broader portfolio questions can use local knowledge-search over the bundled content and docs corpus when direct matching is not enough.',
    'Follow-up questions can reuse short in-session chat context, so references like he, it, that project, or which ones can stay grounded to the current conversation.',
    'If the local portfolio corpus does not support a detail, the assistant says so instead of inventing it.',
  ],
};

const featuredProjects = projectRecords
  .filter((project) => project.featured)
  .sort((a, b) => a.priority - b.priority);

const internshipEntries = experienceEntries.filter((entry) => entry.type === 'Internships');

export const assistantKnowledgeCards: AssistantKnowledgeCard[] = [
  {
    id: 'knowledge-ml',
    title: 'DS/ML Systems Focus',
    summary: 'The DS/ML lane now centers on forecasting systems, assistive computer vision, practical data tooling, and FlightFinder AI as a product-facing AI workflow.',
    relatedProjectSlugs: ['agrifore', 'signchat', 'priority-based-csv-sampler', 'rstyled-forecast-tool', 'flightfinder-ai'],
    relatedExperienceIds: ['exp-kpmg', 'exp-sopra-steria'],
    tags: ['ds-ml', 'forecasting', 'data-tooling'],
  },
  {
    id: 'knowledge-full-stack',
    title: 'Full Stack Product Flow',
    summary: 'The strongest full-stack lane now centers on FlightFinder AI, SurgeMedi, and LoanOne AI, while CropIQ has moved into Lab Concepts as a concept-prototype rather than a main Work section item.',
    relatedProjectSlugs: ['flightfinder-ai', 'surgemedi', 'loanone-ai', 'cropiq'],
    relatedExperienceIds: ['exp-sopra-steria'],
    tags: ['full-stack', 'product', 'workflows'],
  },
  {
    id: 'knowledge-records',
    title: 'Evidence Layer',
    summary: 'The portfolio\'s evidence layer now combines richer internship records, consolidated leadership, certifications, and the AgriFore manuscript without relying on filler content.',
    relatedExperienceIds: ['exp-kpmg', 'exp-sopra-steria', 'exp-munsoc'],
    tags: ['records', 'certificates', 'manuscript'],
  },
];

export const roleSummaries: RoleSummary[] = [
  {
    id: 'recruiter',
    title: 'Recruiter Summary',
    summary: `${profileRecord.name} is positioned as a machine learning engineer and full-stack developer with work spanning forecasting systems, assistive computer vision, accessibility-first product workflows, and practical internal-style data tooling.`,
    highlights: [
      `Featured work now centers on ${featuredProjects.map((project) => project.title).join(', ')}.`,
      'SignChat remains a strong ML and computer-vision project, while Movie Recommendation Engine and CropIQ are now archive-facing items rather than active category shelf entries.',
      'Published education record includes a B.Tech in Computer Science and Engineering at SRM Institute of Science and Technology (Aug 2022 - May 2026, CGPA 8.18).',
      'Experience combines richer certificate-backed internships with consolidated leadership evidence, and Lab now uses Papers, Concepts, and Prototypes.',
    ],
  },
  {
    id: 'portfolio-guide',
    title: 'Portfolio Guide',
    summary: 'Use Work for project narratives, Profile for positioning and skills, Experience for role history, Lab for manuscript and concept exploration, and Connect for direct public destinations.',
    highlights: [
      'Work allows Featured overlap, but the non-Featured sections are now mutually exclusive so Archive is reserved for Movie Recommendation Engine and CropIQ.',
      'Profile separates long-form About, detailed Skills under About, grouped Tech Stack as a distinct section, and Education beneath Skills.',
      'Lab now uses Papers, Concepts, and Prototypes; Concepts holds Quota-Based Iterative Balancing Sampler and CropIQ, while Prototypes holds Agricultural Market Intelligence Dashboard, FlightFinder AI, and the R-Style Forecast Tool.',
    ],
  },
];

export const assistantReplies: Record<AssistantActionId, AssistantReply> = {
  'best-ml': {
    title: 'Best DS/ML Projects',
    summary: 'The strongest DS/ML work here combines forecasting systems, assistive computer vision, data tooling, and AI-assisted product workflows with clear delivery surfaces.',
    bullets: [
      `AgriFore, SignChat, Priority-Based CSV Sampler, R Styled Forecast Tool for Business Metrics, and FlightFinder AI are the clearest DS/ML-facing projects in the current portfolio set.`,
      'Together they cover forecasting workflows, applied computer vision, quota-aware data tooling, structured retrieval, and reusable analytical workbench design.',
    ],
  },
  'recruiter-summary': {
    title: roleSummaries[0].title,
    summary: roleSummaries[0].summary,
    bullets: [
      roleSummaries[0].highlights[0],
      roleSummaries[0].highlights[2],
      'The portfolio also includes richer internship records, consolidated leadership evidence, and a Lab section organized around papers, concepts, and prototypes.',
    ],
  },
  'full-stack': {
    title: 'Full Stack Work',
    summary: 'The strongest full-stack work now centers on guided product flow, accessibility-aware interaction, catalog delivery, and API-connected interfaces.',
    bullets: [
      'FlightFinder AI, SurgeMedi, and LoanOne AI are the clearest full-stack product-facing projects in the current Work structure.',
      'FlightFinder AI now also appears in DS/ML because the project combines an accessibility-first product surface with conversational interpretation and structured flight retrieval.',
      'CropIQ is still relevant, but it is now positioned in Lab Concepts as a future-facing agricultural intelligence concept rather than a Work shelf entry.',
    ],
  },
  guide: {
    title: roleSummaries[1].title,
    summary: roleSummaries[1].summary,
    bullets: [
      'Work covers the main project narratives, with Featured allowed to overlap and the non-Featured sections kept mutually exclusive.',
      'Profile holds the long-form bio, detailed Skills under About, Education beneath Skills, and a separate grouped Tech Stack section, while Lab is organized into Papers, Concepts, and Prototypes.',
    ],
  },
};

export const recruiterHighlightBullets = [
  ...featuredProjects.map((project) => project.title),
  ...internshipEntries.slice(0, 2).map((entry) => `${entry.role} at ${entry.organization}`),
  `${publicationRecords[0]?.title || 'AgriFore manuscript'} as the Lab paper record`,
  `${certificationRecords.length + achievementRecords.length} certificate-backed records in Profile`,
];
