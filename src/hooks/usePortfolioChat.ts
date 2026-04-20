import { useCallback, useMemo, useRef, useState } from 'react';
import { composePortfolioReply } from '../lib/chatbot/composePortfolioReply';
import type {
  AskResponseDiagnostics,
  AskResponsePath,
  ChatMessage,
  PortfolioMatchContext,
} from '../lib/chatbot/chatTypes';
import {
  resolvePortfolioQuery,
  type CanonicalIntent,
} from '../lib/chatbot/retrievePortfolioContext';

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult {
  0: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  }
}

type AskSessionEntityType = 'person' | 'project' | 'project-group' | 'site' | 'other';

interface AskSessionMemory {
  lastResolvedEntity?: string;
  lastResolvedEntityType?: AskSessionEntityType;
  lastResolvedDomain?: PortfolioMatchContext['kind'];
  lastCanonicalIntent?: CanonicalIntent;
  lastMatchedProjectSlug?: string;
  lastProjectSlugs?: string[];
  lastAnswerKind?: PortfolioMatchContext['kind'];
}

interface FollowUpResolution {
  effectiveQuery: string;
  used: boolean;
  reason?: string;
}

const DEBUG_CHAT =
  import.meta.env.DEV || import.meta.env.VITE_PORTFOLIO_RETRIEVAL_DEBUG === 'true';

const INITIAL_ASSISTANT_MESSAGE: ChatMessage = {
  id: 'assistant-welcome',
  role: 'assistant',
  reply: {
    title: '',
    answer:
      'I answer only from the local portfolio knowledge loaded into this site. Ask about projects, experience, education, Lab, records, skills, navigation, or Ask-page behavior.\n\nI can also use short in-session follow-up context, but I do not invent unsupported details.',
    related: [
      'Show DS/ML work',
      'Summarize Arjoneel for a recruiter',
      'What is AgriFore?',
    ],
  },
};

const createId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const RESUBMIT_GUARD_WINDOW_MS = 900;

interface SendMessageOptions {
  triggerSource?: 'typed-input' | 'faq-rail' | 'starter-prompt' | 'automatic';
  userTriggered?: boolean;
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const includesAny = (query: string, phrases: string[]) =>
  phrases.some((phrase) => query.includes(normalize(phrase)));

const getLocalResponsePath = ({
  context,
  followUpResolutionUsed,
}: {
  context: PortfolioMatchContext;
  followUpResolutionUsed: boolean;
}): AskResponsePath => {
  const usesKnowledgeSearch =
    context.kind === 'knowledge-search' ||
    (context.kind === 'project-synthesis' && context.supportChunks.length > 0);

  if (context.kind === 'unsupported') return 'refusal';
  if (followUpResolutionUsed && usesKnowledgeSearch) return 'follow-up-resolved-local-knowledge-search';
  if (followUpResolutionUsed) return 'follow-up-resolved-local';
  if (usesKnowledgeSearch) return 'local-knowledge-search';
  return 'local-only';
};

const buildSessionMemoryFromResolution = ({
  context,
  canonicalIntent,
}: {
  context: PortfolioMatchContext;
  canonicalIntent: CanonicalIntent;
}): AskSessionMemory | null => {
  switch (context.kind) {
    case 'project':
      return {
        lastResolvedEntity: context.project.title,
        lastResolvedEntityType: 'project',
        lastResolvedDomain: context.kind,
        lastCanonicalIntent: canonicalIntent,
        lastMatchedProjectSlug: context.project.slug,
        lastProjectSlugs: [context.project.slug],
        lastAnswerKind: context.kind,
      };
    case 'project-list':
      return {
        lastResolvedEntity:
          context.scope === 'ml'
            ? 'DS/ML projects'
            : context.scope === 'full-stack'
              ? 'full-stack projects'
              : 'portfolio projects',
        lastResolvedEntityType: 'project-group',
        lastResolvedDomain: context.kind,
        lastCanonicalIntent: canonicalIntent,
        lastProjectSlugs: context.projects.map((project) => project.slug),
        lastAnswerKind: context.kind,
      };
    case 'project-synthesis':
      return {
        lastResolvedEntity:
          context.presentation === 'themes' ? 'portfolio themes' : 'portfolio projects',
        lastResolvedEntityType: 'project-group',
        lastResolvedDomain: context.kind,
        lastCanonicalIntent: canonicalIntent,
        lastProjectSlugs: context.projects.map((entry) => entry.project.slug),
        lastAnswerKind: context.kind,
      };
    case 'education':
    case 'experience-list':
    case 'experience-entry':
    case 'skills-overview':
    case 'skill-group':
    case 'tech-stack-groups':
      return {
        lastResolvedEntity: 'Arjoneel Ghosh',
        lastResolvedEntityType: 'person',
        lastResolvedDomain: context.kind,
        lastCanonicalIntent: canonicalIntent,
        lastAnswerKind: context.kind,
      };
    case 'action': {
      const personIntents: CanonicalIntent[] = [
        'identity-intro',
        'profile-summary',
        'portfolio-owner',
        'recruiter-summary',
        'profile-classification',
        'profile-location',
      ];
      const isPersonAction = canonicalIntent !== null && personIntents.includes(canonicalIntent);
      const isProjectGroupAction =
        canonicalIntent === 'best-ml' || canonicalIntent === 'full-stack';

      return {
        lastResolvedEntity: isPersonAction
          ? 'Arjoneel Ghosh'
          : isProjectGroupAction
            ? context.item.replyTitle
            : 'portfolio assistant',
        lastResolvedEntityType: isPersonAction
          ? 'person'
          : isProjectGroupAction
            ? 'project-group'
            : 'site',
        lastResolvedDomain: context.kind,
        lastCanonicalIntent: canonicalIntent,
        lastAnswerKind: context.kind,
      };
    }
    case 'site-meta':
    case 'site-structure':
      return {
        lastResolvedEntity: 'portfolio assistant',
        lastResolvedEntityType: 'site',
        lastResolvedDomain: context.kind,
        lastCanonicalIntent: canonicalIntent,
        lastAnswerKind: context.kind,
      };
    case 'knowledge-search':
      return {
        lastResolvedEntity: 'portfolio knowledge',
        lastResolvedEntityType: 'project-group',
        lastResolvedDomain: context.kind,
        lastCanonicalIntent: canonicalIntent,
        lastAnswerKind: context.kind,
      };
    default:
      return null;
  }
};

const resolveFollowUpQuery = (
  rawQuery: string,
  memory: AskSessionMemory | null
): FollowUpResolution => {
  const trimmedQuery = rawQuery.trim();
  const normalizedQuery = normalize(trimmedQuery);
  const queryTokens = normalizedQuery.split(' ').filter(Boolean);

  if (!normalizedQuery || !memory?.lastResolvedDomain) {
    return { effectiveQuery: trimmedQuery, used: false };
  }

  const mentionsPersonPronoun = ['he', 'him', 'his'].some((token) => queryTokens.includes(token));
  const mentionsProjectPronoun = ['it', 'its'].some((token) => queryTokens.includes(token));
  const personEntity =
    memory.lastResolvedEntityType === 'person' ? memory.lastResolvedEntity || 'Arjoneel Ghosh' : null;
  const personReference = personEntity ? personEntity.split(' ')[0] : 'Arjoneel';
  const projectEntity =
    memory.lastResolvedEntityType === 'project' ? memory.lastResolvedEntity || null : null;
  const hasProjectGroupContext = Array.isArray(memory.lastProjectSlugs) && memory.lastProjectSlugs.length > 1;

  if (
    normalizedQuery === 'education' ||
    includesAny(normalizedQuery, ['what about education', 'and education'])
  ) {
    return {
      effectiveQuery: "What is Arjoneel's education?",
      used: true,
      reason: 'topic-carry-forward:education',
    };
  }

  if (
    normalizedQuery === 'internships' ||
    includesAny(normalizedQuery, ['what about internships', 'and internships'])
  ) {
    return {
      effectiveQuery: 'What internships are listed?',
      used: true,
      reason: 'topic-carry-forward:internships',
    };
  }

  if (
    personEntity &&
    mentionsPersonPronoun &&
    ((normalizedQuery.includes('where') &&
      (normalizedQuery.includes('based') || normalizedQuery.includes('located'))) ||
      includesAny(normalizedQuery, ['where is he based out of', 'where is he based']))
  ) {
    return {
      effectiveQuery: `Where is ${personReference} based out of?`,
      used: true,
      reason: 'pronoun-resolution:person-location',
    };
  }

  if (
    personEntity &&
    mentionsPersonPronoun &&
    (normalizedQuery.includes('study') ||
      normalizedQuery.includes('studying') ||
      normalizedQuery.includes('degree') ||
      normalizedQuery.includes('college'))
  ) {
    return {
      effectiveQuery: `What is ${personReference} studying?`,
      used: true,
      reason: 'pronoun-resolution:person-education',
    };
  }

  if (
    personEntity &&
    mentionsPersonPronoun &&
    (normalizedQuery.includes('project') ||
      normalizedQuery.includes('projects') ||
      normalizedQuery.includes('build') ||
      normalizedQuery.includes('built') ||
      normalizedQuery.includes('work'))
  ) {
    return {
      effectiveQuery: `What all has ${personReference} built?`,
      used: true,
      reason: 'pronoun-resolution:person-projects',
    };
  }

  if (
    hasProjectGroupContext &&
    (includesAny(normalizedQuery, ['which ones are forecasting focused', 'which ones are forecasting-focused']) ||
      (normalizedQuery.includes('which ones') && normalizedQuery.includes('forecast')))
  ) {
    return {
      effectiveQuery: 'Which projects are forecasting-focused?',
      used: true,
      reason: 'group-follow-up:forecasting-filter',
    };
  }

  if (
    projectEntity &&
    mentionsProjectPronoun &&
    ((normalizedQuery.includes('ds/ml') || normalizedQuery.includes('ml/data') || normalizedQuery.includes('full stack') || normalizedQuery.includes('full-stack')) &&
      normalizedQuery.includes('or'))
  ) {
    return {
      effectiveQuery: `Is ${projectEntity} DS/ML or Full Stack?`,
      used: true,
      reason: 'pronoun-resolution:project-classification',
    };
  }

  if (
    projectEntity &&
    (includesAny(normalizedQuery, [
      'tell me more about that project',
      'tell me more about it',
      'what about that project',
      'what about it',
    ]) ||
      (normalizedQuery.includes('more about') && mentionsProjectPronoun))
  ) {
    return {
      effectiveQuery: `What is ${projectEntity}?`,
      used: true,
      reason: 'pronoun-resolution:project-detail',
    };
  }

  return { effectiveQuery: trimmedQuery, used: false };
};

export type { AskSessionMemory, FollowUpResolution };
export const buildAskSessionMemoryFromResolution = buildSessionMemoryFromResolution;
export const resolveAskSessionFollowUp = resolveFollowUpQuery;

export function usePortfolioChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_ASSISTANT_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isResponding, setIsResponding] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const chatSessionIdRef = useRef(createId('chat-session'));
  const isSendingRef = useRef(false);
  const lastSubmissionRef = useRef<{ text: string; timestamp: number } | null>(null);
  const sessionMemoryRef = useRef<AskSessionMemory | null>(null);

  const speechSupported = useMemo(
    () =>
      typeof window !== 'undefined' &&
      !!(window.SpeechRecognition || window.webkitSpeechRecognition),
    []
  );

  const sendMessage = useCallback(
    async (rawText?: string, options?: SendMessageOptions) => {
      const text = (rawText ?? inputValue).trim();
      if (!text) return;

      const now = Date.now();
      const triggerSource = options?.triggerSource || 'typed-input';
      const userTriggered = options?.userTriggered ?? true;

      if (isSendingRef.current) {
        if (DEBUG_CHAT) {
          console.debug('[portfolio-chat-send-rejected]', {
            reason: 'in-flight-request',
            chatSessionId: chatSessionIdRef.current,
            triggerSource,
            text,
          });
        }
        return;
      }

      if (
        lastSubmissionRef.current &&
        lastSubmissionRef.current.text === text &&
        now - lastSubmissionRef.current.timestamp < RESUBMIT_GUARD_WINDOW_MS
      ) {
        if (DEBUG_CHAT) {
          console.debug('[portfolio-chat-send-rejected]', {
            reason: 'rapid-duplicate-submit',
            chatSessionId: chatSessionIdRef.current,
            triggerSource,
            text,
            elapsedMs: now - lastSubmissionRef.current.timestamp,
          });
        }
        return;
      }

      isSendingRef.current = true;
      lastSubmissionRef.current = { text, timestamp: now };

      const userMessage: ChatMessage = {
        id: createId('user'),
        role: 'user',
        text,
      };

      const memorySnapshot = sessionMemoryRef.current;
      const followUpResolution = resolveFollowUpQuery(text, memorySnapshot);
      const effectiveQuery = followUpResolution.effectiveQuery;
      const resolution = resolvePortfolioQuery(effectiveQuery);
      const reply = composePortfolioReply(resolution.context);
      const requestId = createId('chat-request');
      const usedKnowledgeSearch =
        resolution.context.kind === 'knowledge-search' ||
        (resolution.context.kind === 'project-synthesis' &&
          resolution.context.supportChunks.length > 0);
      const responsePath = getLocalResponsePath({
        context: resolution.context,
        followUpResolutionUsed: followUpResolution.used,
      });

      const diagnostics: AskResponseDiagnostics = {
        responsePath,
        localSupportKind: resolution.context.kind,
        usedKnowledgeSearch,
        followUpResolutionUsed: followUpResolution.used,
        followUpResolutionReason: followUpResolution.reason,
        priorEntity: followUpResolution.used ? memorySnapshot?.lastResolvedEntity : undefined,
        priorDomain: followUpResolution.used ? memorySnapshot?.lastResolvedDomain : undefined,
        priorCanonicalIntent: followUpResolution.used
          ? memorySnapshot?.lastCanonicalIntent
          : undefined,
        effectiveQuery,
        openRouterRuntimeRemoved: true,
      };

      setMessages((current) => [...current, userMessage]);
      setInputValue('');
      setIsListening(false);
      recognitionRef.current?.stop();
      setIsResponding(true);

      if (DEBUG_CHAT) {
        if (followUpResolution.used) {
          console.debug('[portfolio-chat-follow-up-resolution]', {
            requestId,
            chatSessionId: chatSessionIdRef.current,
            rawQuery: text,
            effectiveQuery,
            reason: followUpResolution.reason,
            priorEntity: memorySnapshot?.lastResolvedEntity,
            priorDomain: memorySnapshot?.lastResolvedDomain,
            priorCanonicalIntent: memorySnapshot?.lastCanonicalIntent,
          });
        }

        console.debug('[portfolio-chat]', {
          requestId,
          chatSessionId: chatSessionIdRef.current,
          query: text,
          effectiveQuery,
          normalizedQuery: resolution.normalizedQuery,
          canonicalIntent: resolution.canonicalIntent,
          matchedKind: resolution.matchedDomain,
          matchedEntryCount: resolution.matchedEntryCount,
          answerType: resolution.context.kind === 'unsupported' ? 'refusal' : 'grounded-local',
          triggerSource,
          userTriggered,
          openRouterRuntimeRemoved: true,
        });
      }

      try {
        const assistantMessage: ChatMessage = {
          id: createId('assistant'),
          role: 'assistant',
          reply,
        };

        const nextMemory = buildSessionMemoryFromResolution({
          context: resolution.context,
          canonicalIntent: resolution.canonicalIntent,
        });

        if (nextMemory) {
          sessionMemoryRef.current = nextMemory;
        }

        if (DEBUG_CHAT) {
          console.debug('[portfolio-chat-response]', {
            requestId,
            chatSessionId: chatSessionIdRef.current,
            query: text,
            effectiveQuery,
            responsePath: diagnostics.responsePath,
            localSupportKind: diagnostics.localSupportKind,
            usedKnowledgeSearch: diagnostics.usedKnowledgeSearch,
            followUpResolutionUsed: diagnostics.followUpResolutionUsed,
            followUpResolutionReason: diagnostics.followUpResolutionReason,
            priorEntity: diagnostics.priorEntity,
            priorDomain: diagnostics.priorDomain,
            priorCanonicalIntent: diagnostics.priorCanonicalIntent,
            openRouterRuntimeRemoved: diagnostics.openRouterRuntimeRemoved,
          });
        }

        setMessages((current) => [...current, assistantMessage]);
      } finally {
        isSendingRef.current = false;
        setIsResponding(false);
      }
    },
    [inputValue]
  );

  const startListening = useCallback(() => {
    if (!speechSupported) return;

    const RecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!RecognitionCtor) return;

    const recognition = new RecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let transcript = '';

      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }

      setInputValue(transcript.trim());
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [speechSupported]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  return {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isResponding,
    speechSupported,
    isListening,
    startListening,
    stopListening,
  };
}
