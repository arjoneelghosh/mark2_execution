import type { KnowledgeChunk } from './knowledgeIndex';

export interface ChatLink {
  label: string;
  href: string;
}

export interface TechStackGroupSummary {
  label: string;
  values: string[];
}

export interface SiteMetaEntry {
  id: string;
  label: string;
  summary: string;
  bullets: string[];
  related?: string[];
}

export type ProjectSynthesisMode = 'discovery' | 'comparative' | 'evidence' | 'fuzzy';
export type ProjectSynthesisTheme =
  | 'overview'
  | 'secondary'
  | 'data-science'
  | 'software'
  | 'ai'
  | 'analytics'
  | 'research'
  | 'forecasting'
  | 'full-stack'
  | 'assistive-ai'
  | 'hackathon'
  | 'product'
  | 'practical'
  | 'recruiter'
  | 'technical'
  | 'maturity'
  | 'deep-work';

export interface ProjectSynthesisEntry {
  project: any;
  reason: string;
  supportCount: number;
  supportingSources: string[];
}

export interface ProjectThemeHighlight {
  label: string;
  summary: string;
  examples: string[];
}

export interface PortfolioChatReply {
  title: string;
  answer: string;
  bullets?: string[];
  links?: ChatLink[];
  related?: string[];
  unsupported?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text?: string;
  reply?: PortfolioChatReply;
}

export type AskResponsePath =
  | 'local-only'
  | 'local-knowledge-search'
  | 'follow-up-resolved-local'
  | 'follow-up-resolved-local-knowledge-search'
  | 'refusal';

export interface AskResponseDiagnostics {
  responsePath: AskResponsePath;
  localSupportKind: PortfolioMatchContext['kind'];
  usedKnowledgeSearch: boolean;
  followUpResolutionUsed: boolean;
  followUpResolutionReason?: string;
  priorEntity?: string;
  priorDomain?: string;
  priorCanonicalIntent?: string | null;
  effectiveQuery: string;
  openRouterRuntimeRemoved: true;
}

export type PortfolioMatchContext =
  | { kind: 'faq'; item: { label: string; replyTitle: string; replySummary: string; replyBullets: string[] } }
  | { kind: 'action'; item: { label: string; replyTitle: string; replySummary: string; replyBullets: string[] } }
  | { kind: 'project'; project: any; request: 'overview' | 'tech-stack' }
  | { kind: 'project-list'; scope: 'featured' | 'ml' | 'full-stack' | 'archive'; projects: any[] }
  | {
      kind: 'project-synthesis';
      query: string;
      mode: ProjectSynthesisMode;
      theme: ProjectSynthesisTheme;
      projects: ProjectSynthesisEntry[];
      supportChunks: KnowledgeChunk[];
      presentation?: 'projects' | 'themes';
      themeHighlights?: ProjectThemeHighlight[];
    }
  | { kind: 'experience-entry'; entry: any }
  | { kind: 'experience-list'; scope: 'internships' | 'leadership'; entries: any[] }
  | { kind: 'lab-lane'; lane: 'papers' | 'concepts' | 'working-prototypes'; entries: any[] }
  | { kind: 'lab-overview'; lanes: Array<{ label: string; count: number }>; answer: string }
  | { kind: 'lab-entry'; entry: any }
  | { kind: 'record-list'; scope: 'certifications' | 'achievements' | 'publications' | 'global-certifications' | 'certificates'; entries: any[] }
  | { kind: 'record-groups'; groups: Array<{ label: string; entries: any[] }> }
  | { kind: 'record-entry'; entry: any }
  | { kind: 'education'; entries: any[] }
  | { kind: 'skill-group'; group: any }
  | { kind: 'skills-overview'; groups: any[] }
  | { kind: 'tech-stack-groups'; groups: TechStackGroupSummary[] }
  | { kind: 'contact-links'; links: any[] }
  | { kind: 'site-structure'; sections: any[] }
  | { kind: 'site-meta'; topic: SiteMetaEntry }
  | {
      kind: 'knowledge-search';
      query: string;
      mode: 'broad-synthesis' | 'fallback';
      chunks: KnowledgeChunk[];
    }
  | {
      kind: 'unsupported';
      suggestions: string[];
      title?: string;
      summary?: string;
      bullets?: string[];
      related?: string[];
    };
