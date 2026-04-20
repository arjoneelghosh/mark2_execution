import React, { useState } from 'react';
import CompactRing from '../components/navigation/CompactRing';
import PortfolioChatPanel from '../components/chat/PortfolioChatPanel';
import ParticleField from '../components/ui/ParticleField';
import GlowCard from '../components/ui/GlowCard';
import PreviewPanel from '../components/ui/PreviewPanel';
import { Info, ShieldCheck, Sparkles } from 'lucide-react';
import { assistantActions, assistantFaqs, assistantMethodology } from '../data';
import { usePortfolioChat } from '../hooks/usePortfolioChat';

interface AskPromptItem {
  id: string;
  label: string;
  description: string;
  prompt: string;
}

const UNIFIED_QUESTION_LIST: AskPromptItem[] = [
  {
    id: 'best-ml',
    label: 'Show DS/ML work',
    description: assistantActions.find((item) => item.id === 'best-ml')?.description || '',
    prompt: 'Show DS/ML work',
  },
  {
    id: 'recruiter-summary',
    label: 'Summarize Arjoneel for a recruiter',
    description:
      assistantActions.find((item) => item.id === 'recruiter-summary')?.description || '',
    prompt: 'Summarize Arjoneel for a recruiter',
  },
  {
    id: 'full-stack',
    label: 'Show full-stack work',
    description: assistantActions.find((item) => item.id === 'full-stack')?.description || '',
    prompt: 'Show full-stack work',
  },
  {
    id: 'agrifore',
    label: 'What is AgriFore?',
    description: 'Open the strongest portfolio system record through a direct grounded project question.',
    prompt: 'What is AgriFore?',
  },
  {
    id: 'lab-concepts',
    label: 'What is in Lab Concepts?',
    description: 'Surface the current concept records without leaving the unified Ask workflow.',
    prompt: 'What is in Lab Concepts?',
  },
  {
    id: 'internships',
    label: 'What internships are listed?',
    description: 'Show the current internship records and keep the answer grounded in the portfolio.',
    prompt: 'What internships are listed?',
  },
  {
    id: 'project-overview',
    label: assistantFaqs.find((item) => item.id === 'project-overview')?.label || 'Show project overview',
    description:
      assistantFaqs.find((item) => item.id === 'project-overview')?.description ||
      'A grouped overview of the portfolio project set.',
    prompt: 'Show project overview',
  },
  {
    id: 'education',
    label: assistantFaqs.find((item) => item.id === 'education')?.label || "What is Arjoneel's education?",
    description:
      assistantFaqs.find((item) => item.id === 'education')?.description ||
      'Get the grounded education record.',
    prompt: "What is Arjoneel's education?",
  },
  {
    id: 'navigation-ring',
    label:
      assistantFaqs.find((item) => item.id === 'navigation-ring')?.label ||
      'How do I use the navigation ring?',
    description:
      assistantFaqs.find((item) => item.id === 'navigation-ring')?.description ||
      'Understand how the persistent ring navigation works across the portfolio.',
    prompt: 'How do I use the navigation ring?',
  },
  {
    id: 'guide',
    label: 'Guide me through this portfolio',
    description: assistantActions.find((item) => item.id === 'guide')?.description || '',
    prompt: 'Guide me through this portfolio',
  },
];

const AskPage: React.FC = () => {
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const {
    messages,
    inputValue,
    setInputValue,
    sendMessage,
    isResponding,
    speechSupported,
    isListening,
    startListening,
    stopListening,
  } = usePortfolioChat();

  return (
    <div className="bg-page min-h-screen relative">
      <ParticleField />
      <CompactRing />

      <div className="relative z-10 max-w-[1520px] mx-auto pl-9 pr-8 py-8 lg:pl-14 lg:pr-14 lg:py-10">
        <div className="surface-shell-deep animate-fade-in overflow-hidden rounded-[30px] xl:h-[calc(100dvh-5.5rem)] xl:min-h-[680px] xl:max-h-[860px]">
          <div className="theme-divider border-b px-6 py-6 lg:px-8 lg:py-7">
            <div className="flex items-start gap-3">
              <div className="theme-pill-accent mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl">
                <Sparkles size={16} />
              </div>
              <div>
                <h1 className="font-heading text-[29px] font-semibold tracking-[-0.025em] text-navy-50">
                  Portfolio Assistant
                </h1>
                <p className="mt-2 text-[15px] leading-relaxed text-accent-blue/92">
                  Grounded local portfolio assistant
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="theme-pill-accent inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px]">
                    <ShieldCheck size={12} />
                    <span>Local knowledge only</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMethodologyOpen(true)}
                    className="theme-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] transition-all duration-220"
                  >
                    <Info size={12} />
                    <span>Methodology</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[340px_minmax(0,1fr)] xl:h-[calc(100%-10.25rem)] min-h-0">
            <section className="theme-divider surface-faq min-h-0 overflow-hidden border-b xl:border-b-0 xl:border-r">
              <div className="flex h-full min-h-0 flex-col px-5 py-5 lg:px-6 lg:py-6">
                <div className="mb-5 shrink-0">
                  <p className="font-heading text-base font-medium text-navy-100 mb-2">FAQs</p>
                  <p className="text-sm leading-relaxed text-navy-400">
                    One unified question bank for guided prompts and grounded portfolio queries.
                  </p>
                </div>

                <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
                  {UNIFIED_QUESTION_LIST.map((item, index) => (
                    <GlowCard
                      key={item.id}
                      delay={index * 70}
                      onClick={() =>
                        sendMessage(item.prompt, {
                          triggerSource: 'faq-rail',
                          userTriggered: true,
                        })
                      }
                      className="!p-5"
                    >
                      <h3 className="font-heading text-sm font-semibold text-navy-50 mb-1.5">
                        {item.label}
                      </h3>
                      <p className="text-navy-400 text-xs leading-relaxed">
                        {item.description}
                      </p>
                    </GlowCard>
                  ))}
                </div>
              </div>
            </section>

            <section className="surface-chat min-h-0 min-w-0 overflow-hidden">
              <PortfolioChatPanel
                isOpen={true}
                onClose={() => {}}
                messages={messages}
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSend={() =>
                  sendMessage(undefined, {
                    triggerSource: 'typed-input',
                    userTriggered: true,
                  })
                }
                onStarterSelect={(prompt) =>
                  sendMessage(prompt, {
                    triggerSource: 'starter-prompt',
                    userTriggered: true,
                  })
                }
                isResponding={isResponding}
                speechSupported={speechSupported}
                isListening={isListening}
                onStartListening={startListening}
                onStopListening={stopListening}
                starterPrompts={[]}
                showCloseButton={false}
                embedded={true}
                integrated={true}
                className="h-full min-h-0"
              />
            </section>
          </div>
        </div>
      </div>

      <PreviewPanel
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
        title={assistantMethodology.title}
      >
        <p className="text-navy-200 text-sm leading-relaxed">{assistantMethodology.summary}</p>
        <div className="space-y-3">
          {assistantMethodology.bullets.map((bullet) => (
            <p key={bullet} className="text-navy-300 text-sm leading-relaxed">
              {bullet}
            </p>
          ))}
        </div>
      </PreviewPanel>
    </div>
  );
};

export default AskPage;
