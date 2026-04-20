import React, { useEffect, useMemo, useState } from 'react';
import type { ProjectMediaSlide } from '../../lib/projects/buildProjectSlides';

interface ProjectMediaCarouselProps {
  slides: ProjectMediaSlide[];
  mode: 'card' | 'preview';
  intervalMs: number;
  containerClassName: string;
  imageClassName: string;
  debugLabel?: string;
}

const FADE_DURATION_MS = 900;

const preloadSlides = (slides: ProjectMediaSlide[]) =>
  Promise.all(
    slides.map(
      (slide) =>
        new Promise<void>((resolve) => {
          const image = new window.Image();
          image.onload = () => resolve();
          image.onerror = () => resolve();
          image.src = slide.src;
        })
    )
  );

const ProjectMediaCarousel: React.FC<ProjectMediaCarouselProps> = ({
  slides,
  mode,
  intervalMs,
  containerClassName,
  imageClassName,
  debugLabel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(slides.length > 1);
  const [isReady, setIsReady] = useState(false);
  const hasMultipleSlides = slides.length > 1;

  useEffect(() => {
    setCurrentIndex(0);
    setNextIndex(null);
    setIsPlaying(slides.length > 1);
    setIsReady(false);
  }, [slides]);

  useEffect(() => {
    if (slides.length === 0) return;

    let cancelled = false;

    preloadSlides(slides).then(() => {
      if (!cancelled) {
        setIsReady(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [slides]);

  useEffect(() => {
    if (import.meta.env.DEV && slides.length > 0) {
      console.debug('[project-media-carousel]', {
        project: debugLabel,
        mode,
        distinctSlides: slides.length,
        ready: isReady,
      });
    }
  }, [debugLabel, isReady, mode, slides.length]);

  useEffect(() => {
    if (!hasMultipleSlides || !isReady || !isPlaying || nextIndex !== null) return;

    const timer = window.setTimeout(() => {
      setNextIndex((currentIndex + 1) % slides.length);
    }, intervalMs);

    return () => window.clearTimeout(timer);
  }, [currentIndex, hasMultipleSlides, intervalMs, isPlaying, isReady, nextIndex, slides.length]);

  useEffect(() => {
    if (nextIndex === null) return;

    const timer = window.setTimeout(() => {
      setCurrentIndex(nextIndex);
      setNextIndex(null);
    }, FADE_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [nextIndex]);

  if (slides.length === 0) {
    return (
      <div className={`${containerClassName} theme-media-frame`} aria-hidden="true" />
    );
  }

  const activeSlide = slides[currentIndex];
  const upcomingSlide = nextIndex !== null ? slides[nextIndex] : null;

  const showPrevious = () => {
    if (!hasMultipleSlides) return;
    setIsPlaying(false);
    setNextIndex(null);
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    if (!hasMultipleSlides) return;
    setIsPlaying(false);
    setNextIndex(null);
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  return (
    <div className={containerClassName}>
      <div className="relative w-full h-full">
        <img
          key={`${activeSlide.src}-${currentIndex}`}
          src={activeSlide.src}
          alt={activeSlide.alt}
          className={`${imageClassName} absolute inset-0 ${upcomingSlide ? 'scale-[1.02]' : 'scale-100'} transition-transform duration-[3200ms] ease-out`}
        />

        {upcomingSlide && (
          <img
            key={`${upcomingSlide.src}-${nextIndex}`}
            src={upcomingSlide.src}
            alt={upcomingSlide.alt}
            className={`${imageClassName} absolute inset-0 opacity-0 scale-[1.04]`}
            style={{ animation: `projectMediaFade ${FADE_DURATION_MS}ms ease-out forwards` }}
          />
        )}

        {mode === 'card' && hasMultipleSlides && (
          <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--page-bg-rgb)/0.18)] via-transparent to-transparent pointer-events-none" />
        )}
      </div>

      {mode === 'preview' && hasMultipleSlides && (
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={showPrevious}
            className="theme-button-muted px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
            aria-label="Previous slide"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => {
              setNextIndex(null);
              setIsPlaying((current) => !current);
            }}
            className="theme-button-muted px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            type="button"
            onClick={showNext}
            className="theme-button-muted px-2.5 py-1.5 rounded-lg text-[11px] transition-colors"
            aria-label="Next slide"
          >
            Next
          </button>
        </div>
      )}

      <style>{`
        @keyframes projectMediaFade {
          0% { opacity: 0; transform: scale(1.04); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default ProjectMediaCarousel;
