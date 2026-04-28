export type TierOneId = 'work' | 'profile' | 'experience' | 'lab' | 'connect' | 'ask';
export type ProjectCategory = 'DS/ML' | 'Full Stack' | 'Research';
export type ProjectStatus = 'Completed' | 'Active' | 'In Progress' | 'Prototype';
export type ExperienceType = 'Internships' | 'Research' | 'Leadership';
export type AchievementType = 'Achievement' | 'Publication' | 'Certification';
export type AssistantActionId = 'best-ml' | 'recruiter-summary' | 'full-stack' | 'guide';

export interface TierTwoDefinition {
  id: string;
  label: string;
  description?: string;
}

export interface NavNode {
  id: TierOneId;
  path: string;
  label: string;
  position: { x: number; y: number };
  compactPosition: { x: number; y: number };
  tier2Nav: string[];
}

export interface ProjectLinkSet {
  live?: string;
  github?: string;
  writeup?: string;
  demo?: string;
  external?: string;
}

export interface ProjectMediaItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectRoleHint {
  audience: 'recruiter' | 'ml' | 'full-stack' | 'research';
  note: string;
}

export interface ProjectFilterMeta {
  featured: boolean;
  year: string;
  status: ProjectStatus;
  category: ProjectCategory;
  spotlightTags: string[];
}

export interface ProjectRecord {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  workBuckets?: ProjectCategory[];
  disciplineTags?: string[];
  subcategories: string[];
  tags: string[];
  status: ProjectStatus;
  featured: boolean;
  priority: number;
  year: string;
  periodLabel: string;
  summary: string;
  previewSummary: string;
  overview: string;
  problem: string;
  approach: string[];
  outcomes: string[];
  techStack: string[];
  links: ProjectLinkSet;
  media: {
    cover: ProjectMediaItem;
    preview: ProjectMediaItem;
    gallery: ProjectMediaItem[];
  };
  filters: ProjectFilterMeta;
  metrics?: ProjectMetric[];
  roleHints?: ProjectRoleHint[];
}

export interface ExperienceEntry {
  id: string;
  organization: string;
  role: string;
  period: string;
  type: ExperienceType;
  location?: string;
  cardText?: string;
  previewText?: string;
  summary: string;
  bullets: string[];
  tech: string[];
  relatedProjectSlugs?: string[];
  certificateLink?: string;
  certificateLabel?: string;
}

export interface SkillItem {
  name: string;
  emphasis?: 'Core' | 'Strong' | 'Working';
}

export interface SkillGroup {
  id: string;
  label: string;
  description?: string;
  skills: SkillItem[];
}

export interface EducationScore {
  kind: 'cgpa' | 'percentage';
  label: 'CGPA' | 'Percentage';
  value: string;
}

export interface EducationRecord {
  id: string;
  institution: string;
  period: string;
  qualification: string;
  summary: string;
  score?: EducationScore;
  tags?: string[];
}

export interface ProfileRecord {
  name: string;
  headline: string;
  shortBio: string;
  longBio: string[];
  currentFocus: string[];
  skillGroups: SkillGroup[];
  education: EducationRecord[];
}

export interface AchievementRecord {
  id: string;
  type: AchievementType;
  title: string;
  issuer: string;
  date: string;
  note: string;
  link?: string;
  bucket?: 'global-certifications' | 'certificates';
}

export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href?: string;
  note?: string;
}

export interface KnowledgeEntry {
  id: string;
  section: 'Papers' | 'Concepts' | 'Experiments' | 'Prototypes';
  title: string;
  summary: string;
  status: string;
  tags?: string[];
}

export interface AssistantAction {
  id: AssistantActionId;
  label: string;
  description: string;
}

export interface AssistantReply {
  title: string;
  summary: string;
  bullets: string[];
}

export interface AssistantKnowledgeCard {
  id: string;
  title: string;
  summary: string;
  relatedProjectSlugs?: string[];
  relatedExperienceIds?: string[];
  tags: string[];
}

export interface RoleSummary {
  id: string;
  title: string;
  summary: string;
  highlights: string[];
}

export interface ContentCard {
  title: string;
  body: string;
  meta?: string;
  tags?: string[];
  link?: string;
  linkLabel?: string;
}

export interface ContentCardGroup {
  label: string;
  cards: ContentCard[];
}

export interface SectionContent {
  heading: string;
  description: string;
  cards: ContentCard[];
  cardGroups?: ContentCardGroup[];
}
