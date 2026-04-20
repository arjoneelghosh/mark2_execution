import React, { useEffect, useRef } from 'react';
import { Mic, MicOff, SendHorizontal, ShieldCheck, Sparkles, X } from 'lucide-react';
import type { ChatMessage } from '../../lib/chatbot/chatTypes';

interface PortfolioChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onStarterSelect: (prompt: string) => void;
  isResponding?: boolean;
  speechSupported: boolean;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
  starterPrompts?: string[];
  showCloseButton?: boolean;
  embedded?: boolean;
  integrated?: boolean;
  className?: string;
}

const DEFAULT_STARTER_PROMPTS = [
  'Show DS/ML work',
  'Summarize Arjoneel for a recruiter',
  'Show full-stack work',
  'What is AgriFore?',
  'What is in Lab Concepts?',
  'What internships are listed?',
  'How do I use the navigation ring?',
];

const isRenderableReplyLink = (link: unknown): link is { label: string; href: string } => {
  if (!link || typeof link !== 'object') return false;

  const candidate = link as { label?: unknown; href?: unknown };
  return (
    typeof candidate.label === 'string' &&
    candidate.label.trim().length > 0 &&
    typeof candidate.href === 'string' &&
    candidate.href.trim().length > 0
  );
};

const PortfolioChatPanel: React.FC<PortfolioChatPanelProps> = ({
  isOpen,
  onClose,
  messages,
  inputValue,
  onInputChange,
  onSend,
  onStarterSelect,
  isResponding = false,
  speechSupported,
  isListening,
  onStartListening,
  onStopListening,
  starterPrompts = DEFAULT_STARTER_PROMPTS,
  showCloseButton = true,
  embedded = false,
  integrated = false,
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const getSafeReplyLinks = (message: ChatMessage) =>
    (message.reply?.links || []).filter(isRenderableReplyLink);

  return (
    <>
      {!embedded && (
        <div className="fixed inset-0 z-50 bg-navy-950/78 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`${
          embedded
            ? integrated
              ? 'relative h-full min-h-0 bg-transparent'
              : 'relative h-full min-h-[540px] rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-navy-900/96 via-navy-950/96 to-navy-950/98 shadow-[0_20px_80px_rgba(4,10,20,0.42)]'
            : 'fixed inset-x-3 bottom-3 top-3 z-[80] rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-navy-900/96 via-navy-950/96 to-navy-950/98 shadow-[0_20px_80px_rgba(4,10,20,0.55)] lg:static lg:inset-auto lg:h-[calc(100vh-2rem)] lg:rounded-none lg:border-l lg:border-y-0 lg:border-r-0 lg:border-white/[0.08] lg:bg-transparent lg:pt-16 lg:shadow-none'
        } flex flex-col overflow-hidden ${className}`}
      >
        {!integrated && (
        <div className="flex items-start justify-between border-b border-white/[0.06] px-5 py-5 lg:px-8 lg:py-6 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-navy-50">
              <Sparkles size={15} className="text-accent-blue" />
              <h2 className="font-heading text-[17px] font-semibold tracking-[0.01em]">Portfolio Assistant</h2>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-navy-300">Grounded local portfolio assistant</p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent-blue/15 bg-accent-blue/8 px-2.5 py-1 text-[11px] text-accent-blue/85">
              <ShieldCheck size={12} />
              <span>Local knowledge only</span>
            </div>
          </div>

          {showCloseButton ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-2 text-navy-300 transition-all duration-220 hover:bg-white/[0.06] hover:text-navy-50"
              aria-label="Close portfolio assistant"
            >
              <X size={18} />
            </button>
          ) : (
            <div className="w-[42px] h-[42px]" aria-hidden="true" />
          )}
        </div>
        )}

        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto ${integrated ? 'bg-white/[0.035] px-6 pt-6 pb-3 lg:px-8 lg:pt-7 lg:pb-4' : 'px-5 py-6 lg:px-8 lg:py-8'}`}
        >
          <div className={`mx-auto flex min-h-full w-full flex-col justify-end ${integrated ? 'max-w-[860px] gap-5' : 'max-w-3xl gap-6'}`}>
            {starterPrompts.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-1">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => onStarterSelect(prompt)}
                    disabled={isResponding}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-left text-xs leading-relaxed text-navy-200 transition-all duration-220 hover:border-accent-blue/20 hover:bg-accent-blue/8 hover:text-navy-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[90%] rounded-[24px] border px-4 py-3.5 lg:px-5 lg:py-4 ${
                  message.role === 'user'
                    ? 'ml-auto border-accent-blue/18 bg-accent-blue/10 text-navy-50 shadow-[0_0_18px_rgba(74,144,217,0.06)]'
                    : 'border-white/[0.06] bg-white/[0.03] text-navy-200'
                }`}
              >
                {message.role === 'user' ? (
                  <p className="text-[15px] leading-7">{message.text}</p>
                ) : message.reply ? (
                  <div className="space-y-4">
                    <div>
                      {message.reply.title ? (
                        <h3 className="font-heading text-[15px] font-semibold text-navy-50">
                          {message.reply.title}
                        </h3>
                      ) : null}
                      <p className={`${message.reply.title ? 'mt-3' : ''} whitespace-pre-line text-[15px] leading-7 text-navy-200`}>
                        {message.reply.answer}
                      </p>
                    </div>

                    {message.reply.bullets && message.reply.bullets.length > 0 && (
                      <div className="space-y-3">
                        {message.reply.bullets.map((bullet, index) => (
                          <p key={`${message.id}-bullet-${index}`} className="text-[14px] leading-7 text-navy-300">
                            {bullet}
                          </p>
                        ))}
                      </div>
                    )}

                    {getSafeReplyLinks(message).length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {getSafeReplyLinks(message).map((link) => (
                          <a
                            key={`${message.id}-${link.href}`}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-xl border border-accent-blue/18 bg-accent-blue/10 px-3 py-1.5 text-xs text-accent-blue transition-all duration-220 hover:bg-accent-blue/16"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}

                    {message.reply.related && message.reply.related.length > 0 && (
                      <div className="pt-2">
                        <p className="mb-2.5 text-[11px] uppercase tracking-[0.16em] text-navy-500">
                          Related
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {message.reply.related.map((item) => (
                            <span
                              key={`${message.id}-${item}`}
                              className="rounded-md border border-accent-blue/8 bg-accent-blue/5 px-2 py-0.5 text-[10px] text-accent-blue/70"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className={`shrink-0 border-t border-white/[0.06] ${integrated ? 'bg-white/[0.02] px-6 py-5 lg:px-8 lg:py-6' : 'bg-navy-950/55 px-5 py-4 lg:px-8 lg:py-5'} backdrop-blur-xl`}>
          <div className={`mx-auto w-full ${integrated ? 'max-w-[860px]' : 'max-w-3xl'}`}>
            <div className={`rounded-[24px] border border-white/[0.07] bg-white/[0.035] ${integrated ? 'p-3.5 shadow-[0_14px_34px_rgba(4,10,20,0.22)]' : 'p-3 shadow-[0_10px_30px_rgba(4,10,20,0.18)]'}`}>
            {isResponding && (
              <p className="px-3 pb-2 text-[11px] text-accent-blue/80">
                Building a grounded answer from local portfolio context...
              </p>
            )}
            <div className="flex items-end gap-3">
              <textarea
                value={inputValue}
                onChange={(event) => onInputChange(event.target.value)}
                disabled={isResponding}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    onSend();
                  }
                }}
                rows={2}
                placeholder="Ask about projects, experience, Lab, skills, or records..."
                className={`min-h-[72px] max-h-[180px] flex-1 resize-none bg-transparent px-3 py-2.5 text-[15px] leading-7 text-navy-100 outline-none placeholder:text-navy-500 ${integrated ? 'min-h-[76px]' : ''}`}
              />

              <button
                type="button"
                onClick={isListening ? onStopListening : onStartListening}
                disabled={!speechSupported || isResponding}
                className={`shrink-0 rounded-2xl border px-3.5 py-3.5 transition-all duration-220 ${
                  speechSupported && !isResponding
                    ? 'border-white/[0.06] bg-white/[0.03] text-navy-200 hover:border-accent-blue/18 hover:bg-accent-blue/10 hover:text-accent-blue'
                    : 'cursor-not-allowed border-white/[0.04] bg-white/[0.02] text-navy-500'
                }`}
                aria-label={isListening ? 'Stop speech input' : 'Start speech input'}
                title={speechSupported ? 'Speech input' : 'Speech input not supported in this browser'}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              <button
                type="button"
                onClick={onSend}
                disabled={isResponding}
                className="shrink-0 rounded-2xl border border-accent-blue/18 bg-accent-blue/12 px-4 py-3.5 text-accent-blue transition-all duration-220 hover:bg-accent-blue/18 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Send message"
              >
                <SendHorizontal size={16} />
              </button>
            </div>
          </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PortfolioChatPanel;
