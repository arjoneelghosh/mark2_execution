import Fuse from 'fuse.js';
import { parse as parseYaml } from 'yaml';

export type KnowledgeSourceType = 'yaml' | 'md';
export type KnowledgeDocType =
  | 'project'
  | 'experience'
  | 'achievement'
  | 'publication'
  | 'meta'
  | 'audit'
  | 'handoff'
  | 'draft'
  | 'inventory'
  | 'other';

export interface KnowledgeChunk {
  id: string;
  sourceFile: string;
  sourceLabel: string;
  sourceType: KnowledgeSourceType;
  docType: KnowledgeDocType;
  title: string;
  section?: string;
  entity?: string;
  tags: string[];
  aliases: string[];
  content: string;
  excerpt: string;
  priority: number;
  trustRank: number;
}

export interface KnowledgeQueryProfile {
  normalizedQuery: string;
  tokens: string[];
  wantsBroadSynthesis: boolean;
  wantsEvidence: boolean;
  wantsThemes: boolean;
  wantsReadiness: boolean;
  wantsHackathons: boolean;
  wantsForecasting: boolean;
  wantsFullStack: boolean;
  wantsAssistiveAi: boolean;
  wantsStudyMaterial: boolean;
  wantsDocs: boolean;
  hasPublicationCue: boolean;
  hasIdentityCue: boolean;
}

export interface KnowledgeSearchResult {
  chunk: KnowledgeChunk;
  score: number;
  fuseScore: number | null;
}

export interface KnowledgeIndexStats {
  totalChunks: number;
  contentChunkCount: number;
  docsChunkCount: number;
  yamlSourceCount: number;
  markdownSourceCount: number;
  docTypeCounts: Record<KnowledgeDocType, number>;
  docsSourceExamples: string[];
  contentSourceExamples: string[];
}

const RAW_YAML_FILES = import.meta.glob('../../data/content/**/*.{yaml,yml}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const RAW_MARKDOWN_FILES = import.meta.glob('../../data/docs/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const DEBUG_RETRIEVAL =
  import.meta.env.DEV || import.meta.env.VITE_PORTFOLIO_RETRIEVAL_DEBUG === 'true';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value: string) => normalize(value).split(' ').filter(Boolean);

const editDistance = (left: string, right: string) => {
  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let row = 0; row < rows; row += 1) matrix[row][0] = row;
  for (let col = 0; col < cols; col += 1) matrix[0][col] = col;

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost
      );
    }
  }

  return matrix[left.length][right.length];
};

const includesAny = (query: string, phrases: string[]) =>
  phrases.some((phrase) => query.includes(normalize(phrase)));

const hasApproximateToken = (tokens: string[], target: string, maxDistance = 2) =>
  tokens.some((token) => token.length >= 4 && editDistance(token, target) <= maxDistance);

const hasTokenFamily = (tokens: string[], targets: string[], maxDistance = 1) =>
  targets.some((target) => {
    const normalizedTarget = normalize(target);
    return (
      tokens.includes(normalizedTarget) ||
      hasApproximateToken(tokens, normalizedTarget, maxDistance)
    );
  });

const uniqueStrings = (values: Array<string | undefined | null>) =>
  Array.from(new Set(values.filter((value): value is string => !!value && value.trim().length > 0)));

const getSourceBucket = (sourceFile: string) =>
  normalize(sourceFile).includes('/docs/') || normalize(sourceFile).includes('\\docs\\')
    ? 'docs'
    : 'content';

const SEARCH_STOP_WORDS = new Set([
  'a',
  'about',
  'across',
  'an',
  'and',
  'are',
  'at',
  'did',
  'do',
  'does',
  'exists',
  'for',
  'how',
  'in',
  'is',
  'it',
  'me',
  'of',
  'say',
  'show',
  'strongest',
  'summarize',
  'summarise',
  'tell',
  'the',
  'this',
  'what',
  'which',
  'work',
]);

const basename = (value: string) => value.split('/').pop()?.split('\\').pop() || value;

const humanize = (value: string) =>
  basename(value)
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (match) => match.toUpperCase());

const sanitizePathLikeText = (value: string) => {
  const trimmed = value.trim();
  if (/^[a-z]:[\\/]/i.test(trimmed) || trimmed.includes('/') || trimmed.includes('\\')) {
    return basename(trimmed);
  }

  return trimmed;
};

const stringifyScalar = (value: unknown) => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return sanitizePathLikeText(value);
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const slugify = (value: string) =>
  normalize(value)
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const extractStrings = (value: unknown, depth = 0, maxItems = 24): string[] => {
  if (depth > 4 || maxItems <= 0) return [];

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    const scalar = stringifyScalar(value);
    return scalar ? [scalar] : [];
  }

  if (Array.isArray(value)) {
    return value
      .slice(0, maxItems)
      .flatMap((item) => extractStrings(item, depth + 1, Math.max(6, maxItems - 2)));
  }

  if (isPlainObject(value)) {
    return Object.entries(value)
      .slice(0, maxItems)
      .flatMap(([key, entryValue]) => {
        const nested = extractStrings(entryValue, depth + 1, Math.max(6, maxItems - 2));
        if (nested.length === 0) return [];
        return [`${humanize(key)}: ${nested.join('; ')}`];
      });
  }

  return [];
};

const pickFirstString = (value: Record<string, unknown>, keys: string[]) => {
  for (const key of keys) {
    const entry = value[key];
    if (typeof entry === 'string' && entry.trim().length > 0) {
      return sanitizePathLikeText(entry);
    }
  }

  return undefined;
};

const pickStringArray = (value: Record<string, unknown>, keys: string[]) => {
  const strings: string[] = [];

  keys.forEach((key) => {
    const entry = value[key];
    if (Array.isArray(entry)) {
      entry.forEach((item) => {
        const scalar = stringifyScalar(item);
        if (scalar) strings.push(scalar);
      });
    } else if (typeof entry === 'string') {
      strings.push(sanitizePathLikeText(entry));
    }
  });

  return uniqueStrings(strings);
};

const inferDocType = (sourceFile: string, section: string, title: string): KnowledgeDocType => {
  const fingerprint = normalize(`${sourceFile} ${section} ${title}`);

  if (fingerprint.includes('publication') || fingerprint.includes('manuscript') || fingerprint.includes('paper')) {
    return 'publication';
  }

  if (
    fingerprint.includes('internship') ||
    fingerprint.includes('experience') ||
    fingerprint.includes('leadership')
  ) {
    return 'experience';
  }

  if (fingerprint.includes('achievement') || fingerprint.includes('certificate') || fingerprint.includes('certification')) {
    return 'achievement';
  }

  if (
    fingerprint.includes('chatbot') ||
    fingerprint.includes('ask page') ||
    fingerprint.includes('navigation') ||
    fingerprint.includes('site meta') ||
    fingerprint.includes('portfolio structure')
  ) {
    return 'meta';
  }

  if (fingerprint.includes('handoff')) return 'handoff';
  if (fingerprint.includes('audit')) return 'audit';
  if (fingerprint.includes('inventory') || fingerprint.includes('crosswalk') || fingerprint.includes('manifest') || fingerprint.includes('source map') || fingerprint.includes('family map')) {
    return 'inventory';
  }

  if (fingerprint.includes('plan') || fingerprint.includes('draft') || fingerprint.includes('triage')) {
    return 'draft';
  }

  return 'project';
};

const inferTrustRank = (sourceFile: string) => {
  const fingerprint = normalize(sourceFile);

  if (
    fingerprint.includes('compiled_project_catalog') ||
    fingerprint.includes('deep_project_detail_catalog') ||
    fingerprint.includes('enriched_project_catalog')
  ) {
    return 100;
  }

  if (
    fingerprint.includes('final_deep_study') ||
    fingerprint.includes('project_intake') ||
    fingerprint.includes('final_project_decisions')
  ) {
    return 92;
  }

  if (
    fingerprint.includes('project_population_readiness') ||
    fingerprint.includes('supporting_evidence_intake') ||
    fingerprint.includes('achievements_intake')
  ) {
    return 84;
  }

  if (
    fingerprint.includes('inventory') ||
    fingerprint.includes('crosswalk') ||
    fingerprint.includes('source_map') ||
    fingerprint.includes('media_manifest') ||
    fingerprint.includes('family_map')
  ) {
    return 68;
  }

  if (fingerprint.includes('handoff')) return 46;
  if (fingerprint.includes('audit')) return 38;
  if (fingerprint.includes('triage') || fingerprint.includes('plan') || fingerprint.includes('draft')) {
    return 28;
  }

  return 60;
};

const inferPriority = (sourceFile: string) => {
  const fingerprint = normalize(sourceFile);

  if (fingerprint.includes('compiled_project_catalog') || fingerprint.includes('deep_project_detail_catalog')) {
    return 40;
  }

  if (fingerprint.includes('enriched_project_catalog') || fingerprint.includes('final_deep_study')) {
    return 34;
  }

  if (fingerprint.includes('project_population_readiness')) return 28;
  if (fingerprint.includes('supporting_evidence')) return 24;
  if (fingerprint.includes('inventory') || fingerprint.includes('crosswalk')) return 16;
  if (fingerprint.includes('triage')) return 8;

  return 20;
};

const buildContentFromEntry = (entry: Record<string, unknown>) => {
  const prioritizedKeys = [
    'one_line_summary',
    'one_line_summary_guess',
    'preview_summary',
    'preview_summary_guess',
    'summary',
    'overview',
    'problem_guess',
    'problem',
    'approach_guess',
    'approach',
    'outcomes_guess',
    'outcomes',
    'deep_context',
    'concrete_implementation_points',
    'strongest_evidence',
    'key_files_and_artifacts',
    'notes_for_user',
    'blockers',
    'recommended_next_action',
    'evidence',
    'missing_info',
    'notes',
  ];

  const selected = prioritizedKeys.flatMap((key) => extractStrings(entry[key]));
  const fallback = Object.entries(entry)
    .filter(([key]) => !prioritizedKeys.includes(key))
    .flatMap(([key, value]) => {
      const values = extractStrings(value);
      if (values.length === 0) return [];
      return [`${humanize(key)}: ${values.join('; ')}`];
    });

  return uniqueStrings([...selected, ...fallback]).join(' ');
};

const buildChunk = ({
  sourceFile,
  sourceType,
  section,
  entry,
  index,
  fallbackTitle,
}: {
  sourceFile: string;
  sourceType: KnowledgeSourceType;
  section: string;
  entry: unknown;
  index: number;
  fallbackTitle: string;
}): KnowledgeChunk | null => {
  const sourceLabel = basename(sourceFile);
  const trustRank = inferTrustRank(sourceFile);
  const priority = inferPriority(sourceFile);

  if (!isPlainObject(entry)) {
    const content = extractStrings(entry).join(' ');
    if (!content) return null;

    const title = fallbackTitle;
    return {
      id: `${sourceLabel}::${slugify(section)}::${index}`,
      sourceFile,
      sourceLabel,
      sourceType,
      docType: inferDocType(sourceFile, section, title),
      title,
      section,
      entity: undefined,
      tags: [],
      aliases: [],
      content: content.slice(0, 1800),
      excerpt: content.slice(0, 280),
      priority,
      trustRank,
    };
  }

  const title =
    pickFirstString(entry, [
      'canonical_title',
      'probable_title',
      'title',
      'repo_name',
      'folder',
      'organization',
      'label',
      'id',
      'canonical_slug',
      'suggested_slug',
    ]) || fallbackTitle;

  const entity = pickFirstString(entry, [
    'canonical_title',
    'title',
    'repo_name',
    'folder',
    'organization',
    'canonical_slug',
    'suggested_slug',
  ]);

  const tags = uniqueStrings([
    ...pickStringArray(entry, [
      'tags',
      'detected_stack',
      'subcategories',
      'techStack',
      'tech_stack',
      'notes_for_user',
    ]),
    pickFirstString(entry, ['category', 'subcategory', 'probable_category', 'probable_subcategory', 'type', 'related_family']),
    humanize(section),
  ]);

  const aliases = uniqueStrings([
    entity,
    pickFirstString(entry, ['canonical_slug', 'suggested_slug', 'short_title', 'shortTitle']),
    pickFirstString(entry, ['repo_name', 'folder']),
  ]);

  const content = buildContentFromEntry(entry);
  if (!content) return null;

  return {
    id: `${sourceLabel}::${slugify(section)}::${slugify(title)}::${index}`,
    sourceFile,
    sourceLabel,
    sourceType,
    docType: inferDocType(sourceFile, section, title),
    title,
    section,
    entity,
    tags,
    aliases,
    content: content.slice(0, 1800),
    excerpt: content.slice(0, 320),
    priority,
    trustRank,
  };
};

const chunkYamlFile = (sourceFile: string, raw: string) => {
  try {
    const parsed = parseYaml(raw);
    const chunks: KnowledgeChunk[] = [];

    if (Array.isArray(parsed)) {
      parsed.forEach((entry, index) => {
        const chunk = buildChunk({
          sourceFile,
          sourceType: 'yaml',
          section: 'items',
          entry,
          index,
          fallbackTitle: `${humanize(sourceFile)} Item ${index + 1}`,
        });
        if (chunk) chunks.push(chunk);
      });
      return chunks;
    }

    if (isPlainObject(parsed)) {
      Object.entries(parsed).forEach(([section, value]) => {
        if (Array.isArray(value)) {
          value.forEach((entry, index) => {
            const chunk = buildChunk({
              sourceFile,
              sourceType: 'yaml',
              section,
              entry,
              index,
              fallbackTitle: `${humanize(section)} ${index + 1}`,
            });
            if (chunk) chunks.push(chunk);
          });
          return;
        }

        if (isPlainObject(value)) {
          const nestedEntries = Object.entries(value);
          const canExplodeChildren =
            nestedEntries.length > 0 &&
            nestedEntries.every(([, nestedValue]) => Array.isArray(nestedValue) || isPlainObject(nestedValue));

          if (canExplodeChildren) {
            nestedEntries.forEach(([childSection, childValue], childIndex) => {
              if (Array.isArray(childValue)) {
                childValue.forEach((entry, entryIndex) => {
                  const chunk = buildChunk({
                    sourceFile,
                    sourceType: 'yaml',
                    section: `${section} / ${childSection}`,
                    entry,
                    index: entryIndex,
                    fallbackTitle: `${humanize(childSection)} ${entryIndex + 1}`,
                  });
                  if (chunk) chunks.push(chunk);
                });
              } else {
                const chunk = buildChunk({
                  sourceFile,
                  sourceType: 'yaml',
                  section: `${section} / ${childSection}`,
                  entry: childValue,
                  index: childIndex,
                  fallbackTitle: humanize(childSection),
                });
                if (chunk) chunks.push(chunk);
              }
            });
            return;
          }
        }

        const chunk = buildChunk({
          sourceFile,
          sourceType: 'yaml',
          section,
          entry: value,
          index: 0,
          fallbackTitle: humanize(section),
        });

        if (chunk) chunks.push(chunk);
      });

      return chunks;
    }

    const fallbackChunk = buildChunk({
      sourceFile,
      sourceType: 'yaml',
      section: 'content',
      entry: parsed,
      index: 0,
      fallbackTitle: humanize(sourceFile),
    });

    return fallbackChunk ? [fallbackChunk] : [];
  } catch (error) {
    if (DEBUG_RETRIEVAL) {
      console.warn('[portfolio-knowledge-index-parse-failed]', {
        sourceFile,
        sourceType: 'yaml',
        error,
      });
    }

    return [];
  }
};

const chunkMarkdownFile = (sourceFile: string, raw: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const chunks: KnowledgeChunk[] = [];
  const matches = [...raw.matchAll(headingRegex)];

  if (matches.length === 0) {
    const chunk = buildChunk({
      sourceFile,
      sourceType: 'md',
      section: 'document',
      entry: { title: humanize(sourceFile), summary: raw.trim() },
      index: 0,
      fallbackTitle: humanize(sourceFile),
    });

    return chunk ? [chunk] : [];
  }

  matches.forEach((match, index) => {
    const start = match.index || 0;
    const end = index + 1 < matches.length ? matches[index + 1].index || raw.length : raw.length;
    const heading = match[2].trim();
    const body = raw.slice(start + match[0].length, end).trim();
    const chunk = buildChunk({
      sourceFile,
      sourceType: 'md',
      section: heading,
      entry: { title: heading, summary: body },
      index,
      fallbackTitle: heading,
    });

    if (chunk) chunks.push(chunk);
  });

  return chunks;
};

const knowledgeChunks = [
  ...Object.entries(RAW_YAML_FILES).flatMap(([sourceFile, raw]) => chunkYamlFile(sourceFile, raw)),
  ...Object.entries(RAW_MARKDOWN_FILES).flatMap(([sourceFile, raw]) => chunkMarkdownFile(sourceFile, raw)),
];

const docTypeCounts = knowledgeChunks.reduce<Record<KnowledgeDocType, number>>(
  (counts, chunk) => {
    counts[chunk.docType] += 1;
    return counts;
  },
  {
    project: 0,
    experience: 0,
    achievement: 0,
    publication: 0,
    meta: 0,
    audit: 0,
    handoff: 0,
    draft: 0,
    inventory: 0,
    other: 0,
  }
);

const knowledgeFuse = new Fuse(knowledgeChunks, {
  includeScore: true,
  threshold: 0.42,
  ignoreLocation: true,
  minMatchCharLength: 2,
  keys: [
    { name: 'title', weight: 0.24 },
    { name: 'entity', weight: 0.18 },
    { name: 'section', weight: 0.12 },
    { name: 'tags', weight: 0.14 },
    { name: 'aliases', weight: 0.12 },
    { name: 'content', weight: 0.2 },
  ],
});

const profileQuery = (rawQuery: string): KnowledgeQueryProfile => {
  const normalizedQuery = normalize(rawQuery);
  const tokens = tokenize(rawQuery);
  const wantsEvidence =
    hasTokenFamily(tokens, ['evidence', 'supporting'], 2) ||
    includesAny(normalizedQuery, ['supporting material', 'supporting evidence', 'project evidence']);
  const wantsThemes =
    hasTokenFamily(tokens, ['theme', 'themes', 'recurring'], 2) ||
    includesAny(normalizedQuery, ['recurring themes', 'across the project docs']);
  const wantsReadiness =
    hasTokenFamily(tokens, ['readiness', 'ready'], 2) ||
    includesAny(normalizedQuery, ['docs say about project readiness']);
  const wantsHackathons = hasTokenFamily(tokens, ['hackathon', 'hackathons'], 2);
  const wantsForecasting =
    hasTokenFamily(tokens, ['forecasting', 'forecast', 'time-series'], 2) ||
    includesAny(normalizedQuery, ['forecasting work']);
  const wantsFullStack =
    includesAny(normalizedQuery, ['full-stack work', 'full stack work']) ||
    (hasTokenFamily(tokens, ['full', 'stack'], 1) && hasTokenFamily(tokens, ['work', 'project', 'projects'], 1));
  const wantsAssistiveAi =
    includesAny(normalizedQuery, ['assistive ai', 'assistive technology']) ||
    hasTokenFamily(tokens, ['assistive', 'accessibility', 'sign', 'asl'], 2);
  const wantsStudyMaterial =
    includesAny(normalizedQuery, ['deeper study material', 'study material', 'deep study']) ||
    (hasTokenFamily(tokens, ['study'], 1) && hasTokenFamily(tokens, ['deep', 'deeper'], 2));
  const wantsDocs =
    hasTokenFamily(tokens, ['docs', 'documentation'], 2) ||
    includesAny(normalizedQuery, ['project docs', 'what do the docs say']);
  const hasPublicationCue =
    hasTokenFamily(tokens, ['paper', 'publication', 'manuscript', 'ieee', 'article', 'author'], 2) ||
    includesAny(normalizedQuery, ['listed on']);
  const hasIdentityCue =
    hasTokenFamily(tokens, ['arjoneel', 'ghosh'], 2) &&
    hasTokenFamily(tokens, ['who', 'introduce', 'summary', 'summarize', 'tell', 'background'], 2);

  return {
    normalizedQuery,
    tokens,
    wantsBroadSynthesis:
      wantsEvidence ||
      wantsThemes ||
      wantsReadiness ||
      wantsHackathons ||
      wantsStudyMaterial ||
      (wantsDocs && (wantsForecasting || wantsFullStack || wantsAssistiveAi || wantsThemes || wantsReadiness)) ||
      includesAny(normalizedQuery, ['what did arjoneel build at hackathons', 'strongest supporting material']),
    wantsEvidence,
    wantsThemes,
    wantsReadiness,
    wantsHackathons,
    wantsForecasting,
    wantsFullStack,
    wantsAssistiveAi,
    wantsStudyMaterial,
    wantsDocs,
    hasPublicationCue,
    hasIdentityCue,
  };
};

const matchTextFingerprint = (chunk: KnowledgeChunk) =>
  normalize(
    [
      chunk.title,
      chunk.section,
      chunk.entity,
      chunk.tags.join(' '),
      chunk.aliases.join(' '),
      chunk.content,
      chunk.sourceFile,
    ]
      .filter(Boolean)
      .join(' ')
  );

const rerankKnowledgeResult = (
  result: { item: KnowledgeChunk; score?: number },
  profile: KnowledgeQueryProfile
) => {
  const fuseScore = typeof result.score === 'number' ? result.score : null;
  const baseScore = (1 - Math.min(fuseScore ?? 0.45, 1)) * 100;
  const fingerprint = matchTextFingerprint(result.item);
  let score = baseScore + result.item.trustRank * 0.6 + result.item.priority;

  if (profile.normalizedQuery.includes(normalize(result.item.title))) score += 18;
  if (result.item.entity && profile.normalizedQuery.includes(normalize(result.item.entity))) score += 16;

  if (profile.wantsHackathons && includesAny(fingerprint, ['hackathon', 'genesis'])) score += 26;
  if (profile.wantsForecasting && includesAny(fingerprint, ['forecast', 'forecasting', 'arima', 'prophet', 'market', 'price', 'agrifore', 'aqi'])) score += 18;
  if (profile.wantsFullStack && includesAny(fingerprint, ['full stack', 'frontend', 'backend', 'api', 'react', 'next js', 'fastapi'])) score += 18;
  if (profile.wantsAssistiveAi && includesAny(fingerprint, ['assistive', 'accessibility', 'signchat', 'sign language', 'asl', 'blind', 'deaf', 'mute', 'computer vision'])) score += 18;
  if (profile.wantsEvidence && includesAny(fingerprint, ['evidence', 'strongest evidence', 'supporting evidence', 'key files', 'artifacts'])) score += 16;
  if (profile.wantsStudyMaterial && includesAny(fingerprint, ['deep study', 'deep context', 'strongest evidence', 'key files', 'artifacts'])) score += 18;
  if (profile.wantsReadiness && includesAny(fingerprint, ['readiness', 'ready for live population', 'blockers', 'recommended next action'])) score += 22;
  if (profile.wantsThemes && result.item.docType === 'project') score += 10;
  if (profile.wantsDocs && result.item.sourceType === 'md') score += 8;

  if (profile.hasIdentityCue && !profile.hasPublicationCue && result.item.docType === 'publication') score -= 48;
  if (result.item.trustRank <= 35 && !profile.wantsReadiness) score -= 18;

  return {
    chunk: result.item,
    score,
    fuseScore,
  };
};

const dedupeResults = (results: KnowledgeSearchResult[]) => {
  const seen = new Set<string>();

  return results.filter((result) => {
    const key = `${result.chunk.sourceLabel}::${result.chunk.entity || result.chunk.title}::${result.chunk.section || ''}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const knowledgeIndexStats: KnowledgeIndexStats = {
  totalChunks: knowledgeChunks.length,
  contentChunkCount: knowledgeChunks.filter((chunk) => getSourceBucket(chunk.sourceFile) === 'content').length,
  docsChunkCount: knowledgeChunks.filter((chunk) => getSourceBucket(chunk.sourceFile) === 'docs').length,
  yamlSourceCount: Object.keys(RAW_YAML_FILES).length,
  markdownSourceCount: Object.keys(RAW_MARKDOWN_FILES).length,
  docTypeCounts,
  docsSourceExamples: uniqueStrings(Object.keys(RAW_MARKDOWN_FILES).map((sourceFile) => basename(sourceFile))).slice(0, 6),
  contentSourceExamples: uniqueStrings(Object.keys(RAW_YAML_FILES).map((sourceFile) => basename(sourceFile))).slice(0, 6),
};

if (DEBUG_RETRIEVAL) {
  console.info('[portfolio-knowledge-index-ready]', knowledgeIndexStats);
}

export const getKnowledgeQueryProfile = profileQuery;

const buildSearchQueries = (rawQuery: string, profile: KnowledgeQueryProfile) => {
  const focusedTokens = profile.tokens.filter(
    (token) => token.length >= 3 && !SEARCH_STOP_WORDS.has(token)
  );
  const queries = new Set<string>([rawQuery, profile.normalizedQuery]);

  if (focusedTokens.length > 0) {
    queries.add(focusedTokens.join(' '));
  }

  if (profile.wantsHackathons) queries.add('hackathon prototype loanone genesis signchat');
  if (profile.wantsReadiness) queries.add('project readiness blockers recommended next action ready for live population');
  if (profile.wantsStudyMaterial) queries.add('deep study strongest evidence key files artifacts');
  if (profile.wantsForecasting) queries.add('forecasting agrifore aqi arima prophet');
  if (profile.wantsFullStack) queries.add('full stack frontend backend api product workflow');
  if (profile.wantsAssistiveAi) queries.add('assistive accessibility signchat flightfinder computer vision');
  if (profile.wantsEvidence) queries.add('supporting evidence strongest evidence key files');
  if (profile.wantsThemes) queries.add('project themes recurring patterns');

  return Array.from(queries).filter((query) => query.trim().length > 0);
};

export function searchKnowledgeChunks(rawQuery: string, limit = 6): KnowledgeSearchResult[] {
  const profile = profileQuery(rawQuery);

  if (!profile.normalizedQuery) {
    return [];
  }

  const fusedCandidates = new Map<string, { item: KnowledgeChunk; score?: number }>();

  buildSearchQueries(rawQuery, profile).forEach((searchQuery) => {
    knowledgeFuse.search(searchQuery, { limit: 18 }).forEach((result) => {
      const existing = fusedCandidates.get(result.item.id);
      if (!existing || (typeof result.score === 'number' && (existing.score ?? Number.POSITIVE_INFINITY) > result.score)) {
        fusedCandidates.set(result.item.id, { item: result.item, score: result.score });
      }
    });
  });

  const reranked = dedupeResults(
    Array.from(fusedCandidates.values())
      .map((result) => rerankKnowledgeResult(result, profile))
      .sort((left, right) => right.score - left.score)
  ).slice(0, limit);

  if (DEBUG_RETRIEVAL) {
    const docsResultCount = reranked.filter(
      (result) => getSourceBucket(result.chunk.sourceFile) === 'docs'
    ).length;
    const contentResultCount = reranked.length - docsResultCount;
    console.info('[portfolio-knowledge-search]', {
      query: rawQuery,
      normalizedQuery: profile.normalizedQuery,
      resultSourceCounts: {
        docs: docsResultCount,
        content: contentResultCount,
      },
      topResults: reranked.map((result) => ({
        id: result.chunk.id,
        title: result.chunk.title,
        sourceFile: result.chunk.sourceLabel,
        sourceBucket: getSourceBucket(result.chunk.sourceFile),
        docType: result.chunk.docType,
        score: result.score,
        trustRank: result.chunk.trustRank,
      })),
    });
  }

  return reranked;
}
