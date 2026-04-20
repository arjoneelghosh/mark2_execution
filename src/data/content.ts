import { SectionContent } from '../types';
import { experienceEntries } from './experience';
import { educationRecords, profileRecord } from './profile';
import {
  certificateRecords,
  globalCertificationRecords,
  publicationRecords,
} from './records';
import resumePdf from '../assets/project-previews/resume.pdf';

export const profileContent: Record<string, SectionContent> = {
  About: {
    heading: 'Profile Overview',
    description: 'Evidence-backed profile summary, current technical focus, and published academic context.',
    cards: [
      {
        title: profileRecord.headline,
        body: profileRecord.shortBio,
        meta: profileRecord.name,
      },
      {
        title: 'Long-Form Narrative',
        body: profileRecord.longBio.join(' '),
        meta: 'Profile summary',
      },
      {
        title: 'Current Focus',
        body: 'Current themes reflected across the project, experience, and records sections.',
        tags: profileRecord.currentFocus,
      },
      ...educationRecords.map((record) => ({
        title: record.institution,
        body: record.summary,
        meta: `${record.period} | ${record.qualification}`,
        tags: [
          ...(record.score ? [`${record.score.label} ${record.score.value}`] : []),
          ...(record.tags || []),
        ],
      })),
    ],
  },
  Skills: {
    heading: 'Skill Architecture',
    description: 'Skill groups drawn from the current portfolio evidence and project set.',
    cards: profileRecord.skillGroups.map((group) => ({
      title: group.label,
      body: group.description || 'Skill group.',
      tags: group.skills.map((skill) =>
        skill.emphasis ? `${skill.name} (${skill.emphasis})` : skill.name
      ),
    })),
  },
  Resume: {
    heading: 'Resume',
    description: 'Open the latest resume file for a compact summary of background, experience, and technical work.',
    cards: [
      {
        title: 'Resume',
        body: 'Open the latest resume file for a compact view of background, experience, and technical work.',
        meta: 'PDF document',
        link: resumePdf,
        linkLabel: 'Open Resume',
      },
    ],
  },
  Achievements: {
    heading: 'Achievements and Certifications',
    description: 'Public certificate-backed records and verified learning credentials.',
    cards: [],
    cardGroups: [
      {
        label: 'Global Certifications',
        cards: globalCertificationRecords.map((record) => ({
          title: record.title,
          body: record.note,
          meta: `${record.issuer} | ${record.date}`,
          link: record.link,
          linkLabel: 'View Certificate',
        })),
      },
      {
        label: 'Certificates',
        cards: certificateRecords.map((record) => ({
          title: record.title,
          body: record.note,
          meta: `${record.issuer} | ${record.date}`,
          link: record.link,
          linkLabel: 'View Certificate',
        })),
      },
    ],
  },
};

const experienceByType = (type: string) =>
  experienceEntries
    .filter((entry) => entry.type === type)
    .map((entry) => ({
      title: `${entry.role} | ${entry.organization}`,
      body: entry.summary,
      meta: `${entry.period}${entry.location ? ' | ' + entry.location : ''}`,
      tags: [...entry.tech, ...(entry.relatedProjectSlugs || [])],
    }));

const experienceResearchCards =
  experienceByType('Research').length > 0
    ? experienceByType('Research')
    : [
        {
          title: 'Research Roles',
          body: 'No separate formal research role is published here. Manuscript work, technical exploration, and prototype-driven investigation are grouped under Lab instead.',
          meta: 'Role-based section',
        },
      ];

export const experienceContent: Record<string, SectionContent> = {
  Internships: {
    heading: 'Internship Experience',
    description: 'Structured industry experience focused on role context, project responsibility, and practical delivery.',
    cards: experienceByType('Internships'),
  },
  Research: {
    heading: 'Research Roles',
    description: 'This tab stays limited to formal role-based research experience rather than manuscript, experiment, or prototype work.',
    cards: experienceResearchCards,
  },
  Leadership: {
    heading: 'Leadership and Community',
    description: 'Formal leadership and community roles kept conservative and grounded in supporting evidence.',
    cards: experienceByType('Leadership'),
  },
};

export const labContent: Record<string, SectionContent> = {
  Papers: {
    heading: 'Papers',
    description: 'Manuscript-level systems writing that documents how the underlying research and delivery layers fit together.',
    cards: [
      {
        title: 'AgriFore Data-Driven Agricultural Market and Yield Modeling for Kamareddy District, Telangana',
        body: 'Research manuscript built around the AgriFore forecasting system, combining weather, crop production, and market transaction data into a full-stack agricultural analytics and prediction workflow for Telangana, with Kamareddy used as the district-level yield modeling case.',
        meta: `${publicationRecords[0].issuer} | ${publicationRecords[0].date}`,
        link: publicationRecords[0].link,
        linkLabel: 'View Paper',
      },
    ],
  },
  Concepts: {
    heading: 'Concepts',
    description: 'Conceptual system directions where algorithmic architecture, balancing logic, and future-use intelligence layers are the main value.',
    cards: [
      {
        title: 'Quota-Based Iterative Balancing Sampler',
        body: 'Conceptual evolution of a quota-aware CSV sampling engine for ServiceNow-style case datasets, combining hierarchical priority enforcement, iterative balancing, fallback logic, and configuration-driven workflow design.',
        meta: 'Applied systems concept',
      },
      {
        title: 'CropIQ',
        body: 'Prototype agricultural intelligence layer intended to become the reasoning and conversational brain behind the broader AgriFore agentic system, presented here as a future-facing mock version rather than a proof of concept.',
        meta: 'Future-use concept',
      },
    ],
  },
  Prototypes: {
    heading: 'Working Prototypes',
    description: 'Working prototype system layers that show how forecasting, accessibility, analytics, and agentic interaction are translated into usable product surfaces.',
    cards: [
      {
        title: 'Agricultural Market Intelligence Dashboard',
        body: 'Working prototype dashboard layer for AgriFore that turns the underlying forecasting and market analysis pipeline into an interactive exploration surface for prices, arrivals, and prediction workflows.',
        meta: 'Working prototype system layer',
        link: 'https://github.com/arjoneelghosh/AgriFore',
        linkLabel: 'View GitHub',
      },
      {
        title: 'FlightFinder AI',
        body: 'Accessibility-oriented adaptive flight booking working prototype that combines role-based interfaces, sign language support, voice interaction, conversational search, and real-time flight retrieval into one guided booking experience.',
        meta: 'Accessibility working prototype',
        link: 'https://github.com/arjoneelghosh/Disable_Friendly_Flight_Booking',
        linkLabel: 'View GitHub',
      },
      {
        title: 'R-Style Forecast Tool for Business Metric Analysis',
        body: 'Business forecasting working prototype shaped by real internship work, combining automated analytical workflows, Prophet-based forecasting, and dashboard-style reporting into a productized analytics surface.',
        meta: 'Forecasting workflow working prototype',
        link: 'https://github.com/arjoneelghosh/R-studio_replica',
        linkLabel: 'View GitHub',
      },
    ],
  },
};

export const connectContent: Record<string, SectionContent> = {
  Contact: {
    heading: 'Contact',
    description: 'Reach out directly through the contact details below.',
    cards: [
      {
        title: 'Email',
        body: 'arjoneelghosh03@gmail.com',
        meta: 'Primary contact',
        link: 'mailto:arjoneelghosh03@gmail.com',
        linkLabel: 'Send Email',
      },
    ],
  },
  LinkedIn: {
    heading: 'LinkedIn',
    description: 'A direct path to my professional profile and background.',
    cards: [
      {
        title: 'LinkedIn Profile',
        body: 'Visit my LinkedIn profile for a more formal view of my background, education, and experience.',
        meta: 'Public profile',
        link: 'https://www.linkedin.com/in/arjoneel-ghosh-7195142a1/',
        linkLabel: 'Open LinkedIn',
      },
    ],
  },
  GitHub: {
    heading: 'GitHub',
    description: 'Move from the portfolio into the code, repositories, and implementation history behind the work.',
    cards: [
      {
        title: 'GitHub Profile',
        body: 'Browse the repositories, project history, and active code behind the portfolio work.',
        meta: 'Public code',
        link: 'https://github.com/arjoneelghosh',
        linkLabel: 'Open GitHub',
      },
    ],
  },
  Resume: {
    heading: 'Resume',
    description: 'A direct route to the latest formal summary of my background and work.',
    cards: [
      {
        title: 'Resume',
        body: 'Open the latest resume file for a compact view of my background, experience, and technical work.',
        meta: 'PDF document',
        link: resumePdf,
        linkLabel: 'Open Resume',
      },
    ],
  },
};
