import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

interface PreviewPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onDeepen?: () => void;
  title: string;
  children: React.ReactNode;
  deepenLabel?: string;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({
  isOpen,
  onClose,
  onDeepen,
  title,
  children,
  deepenLabel = 'View Details',
}) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg glass-panel p-8 animate-scale-in max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-navy-300 hover:text-navy-50
            hover:bg-white/5 transition-all duration-220"
          aria-label="Close preview"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h3 className="font-heading text-xl font-semibold text-navy-50 mb-4 pr-8">{title}</h3>

        {/* Content */}
        <div className="space-y-4 text-navy-200 text-sm leading-relaxed">
          {children}
        </div>

        {/* Deepen action */}
        {onDeepen && (
          <button
            onClick={onDeepen}
            className="mt-6 px-5 py-2.5 rounded-xl text-sm font-medium
              bg-accent-blue/15 text-accent-blue border border-accent-blue/20
              hover:bg-accent-blue/25 hover:border-accent-blue/35
              transition-all duration-250"
          >
            {deepenLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default PreviewPanel;
