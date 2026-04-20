import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface FocusPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const FocusPanel: React.FC<FocusPanelProps> = ({ isOpen, onClose, title, children }) => {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 overlay-dim animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-hidden
        rounded-2xl border border-[rgba(255,255,255,0.08)]
        bg-gradient-to-b from-navy-900/95 to-navy-950/95
        backdrop-blur-xl shadow-panel animate-scale-in
        flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-0">
          <h2 className="font-heading text-2xl font-semibold text-navy-50 pr-8">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-navy-300 hover:text-navy-50
              hover:bg-white/5 transition-all duration-220 flex-shrink-0"
            aria-label="Close panel"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content with internal scroll */}
        <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-6 text-navy-200 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FocusPanel;
