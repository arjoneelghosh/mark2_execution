import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type LightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

interface ImageLightboxProps {
  isOpen: boolean;
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (!isOpen) return;
    const safeIndex = Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0));
    setActiveIndex(safeIndex);
  }, [images.length, initialIndex, isOpen]);

  const showPrevious = useCallback(() => {
    if (!hasMultiple) return;
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }, [hasMultiple, images.length]);

  const showNext = useCallback(() => {
    if (!hasMultiple) return;
    setActiveIndex((current) => (current + 1) % images.length);
  }, [hasMultiple, images.length]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'ArrowLeft') {
        showPrevious();
        return;
      }

      if (event.key === 'ArrowRight') {
        showNext();
      }
    },
    [onClose, showNext, showPrevious]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown, isOpen]);

  const activeImage = useMemo(() => images[activeIndex], [activeIndex, images]);

  if (!isOpen || !activeImage) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 overlay-dim animate-fade-in" onClick={onClose} />

      <div className="glass-panel relative z-10 flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[26px] p-3 sm:p-5">
        <button
          type="button"
          onClick={onClose}
          className="theme-button-muted absolute right-3 top-3 z-20 rounded-xl p-2 transition-all duration-220"
          aria-label="Close image preview"
        >
          <X size={18} />
        </button>

        <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[20px] bg-[rgb(var(--panel-elevated-rgb)/0.36)] px-2 py-10 sm:px-6 sm:py-12">
          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                className="theme-button-muted absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-xl p-2 transition-all duration-220"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="theme-button-muted absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-xl p-2 transition-all duration-220"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <img
            src={activeImage.src}
            alt={activeImage.alt}
            className="max-h-[72vh] w-auto max-w-full object-contain"
          />
        </div>

        <div className="mt-3 flex items-start justify-between gap-4 px-1 sm:px-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-navy-100">{activeImage.alt}</p>
            {activeImage.caption && (
              <p className="mt-1 text-xs leading-relaxed text-navy-300">{activeImage.caption}</p>
            )}
          </div>
          {hasMultiple && (
            <p className="shrink-0 text-xs text-navy-400">
              {activeIndex + 1} / {images.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;
