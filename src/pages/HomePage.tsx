import React, { useEffect, useRef, useState } from 'react';
import HomepageRing from '../components/navigation/HomepageRing';
import ParticleField from '../components/ui/ParticleField';
import PreviewPanel from '../components/ui/PreviewPanel';
import { profileRecord } from '../data';
import { useNavigate } from 'react-router-dom';
import portraitPhoto from '../assets/project-previews/photo.png';
import { MessageCircle } from 'lucide-react';
import type { ContentCard } from '../types';
import { useTheme } from '../lib/theme/theme';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [ringRevealProgress, setRingRevealProgress] = useState(0);
  const [ringIsActive, setRingIsActive] = useState(false);
  const [previewCard, setPreviewCard] = useState<ContentCard | null>(null);
  const landingFocusCards = [
    'Machine Learning and Forecasting',
    'Computer Vision and Applied ML',
    'Data and Tooling',
    'Full Stack and Product Delivery',
  ]
    .map((label) => profileRecord.skillGroups.find((group) => group.label === label))
    .filter((group): group is NonNullable<typeof group> => Boolean(group));

  const ringRef = useRef<HTMLDivElement>(null);
  const mobileRingRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const focusSectionRef = useRef<HTMLDivElement>(null);
  const ringActiveRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobileLayout(mediaQuery.matches);

    sync();

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', sync);
      return () => mediaQuery.removeEventListener('change', sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  useEffect(() => {
    const apply = () => {
      const t = Math.min(Math.max(window.scrollY / 560, 0), 1);
      const ringOpacity = isMobileLayout ? Math.min(0.58 + t * 0.36, 1) : Math.min(0.04 + t * 1.04, 1);
      const ringScale = isMobileLayout ? 0.82 + t * 0.08 : 0.94 + t * 0.06;

      if (portraitRef.current) {
        const baseOpacity = isLight ? (isMobileLayout ? 0.48 : 0.3) : 0.28;
        const minOpacity = isLight ? 0.12 : 0.08;
        const mobileOpacityPenalty = isMobileLayout ? (isLight ? 0.02 : 0.08) : 0;
        const portraitOpacity = baseOpacity - t * (isLight ? 0.18 : 0.2) - mobileOpacityPenalty;
        portraitRef.current.style.opacity = `${Math.max(portraitOpacity, minOpacity)}`;
      }

      if (ringRef.current) {
        ringRef.current.style.opacity = `${isMobileLayout ? 0 : ringOpacity}`;
        ringRef.current.style.transform = `translateY(-50%) scale(${ringScale})`;
      }

      if (mobileRingRef.current) {
        mobileRingRef.current.style.opacity = `${isMobileLayout ? ringOpacity : 0}`;
        mobileRingRef.current.style.transform = `scale(${ringScale})`;
      }

      setRingRevealProgress(t);

      if (focusSectionRef.current && ringRef.current) {
        const focusTop = focusSectionRef.current.getBoundingClientRect().top;
        const activationPoint = window.innerHeight * 0.34;
        const isActive = focusTop <= activationPoint;

        if (isActive !== ringActiveRef.current) {
          ringActiveRef.current = isActive;
          setRingIsActive(isActive);
        }
      }
    };

    apply();
    const onScroll = () => requestAnimationFrame(apply);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isLight, isMobileLayout]);

  return (
    <div className="bg-home relative">
      <ParticleField />

      <div className="relative z-10 min-h-screen flex items-center overflow-hidden">
        <div
          ref={portraitRef}
          className="absolute top-0 right-0 h-full pointer-events-none select-none w-[74%] sm:w-[62%] md:w-[52%]"
          style={{
            opacity: isLight ? (isMobileLayout ? 0.48 : 0.3) : 0.28,
            width: isLight && isMobileLayout ? '82%' : undefined,
          }}
        >
          <div className="home-portrait-overlay-left absolute inset-0 z-10" />
          <div className="home-portrait-overlay-top absolute inset-0 z-10" />
          <div className="home-portrait-overlay-bottom absolute inset-0 z-10" />
          <img
            src={portraitPhoto}
            alt="Arjoneel Ghosh"
            className="w-full h-full object-cover"
            style={{ objectPosition: isLight && isMobileLayout ? '72% 12%' : '54% 14%' }}
          />
        </div>

        <div className="relative z-20 page-shell-home w-full">
          <div className="home-hero-copy home-mobile-hero-copy max-w-[34rem] lg:max-w-[32rem] pt-28 md:pt-24 lg:pt-0">
            <p
              className="text-accent-blue/70 tracking-widest uppercase mb-7 animate-fade-in opacity-0 italic font-medium"
              style={{
                fontFamily: "'Caveat', 'Segoe Script', cursive",
                fontSize: '1.95rem',
                letterSpacing: '0.12em',
                transform: 'rotate(-2deg)',
                transformOrigin: 'left center',
                animationDelay: '200ms',
                animationFillMode: 'forwards',
              }}
            >
              Hello
            </p>

            <h1
              className="font-heading text-[clamp(2.2rem,4.35vw,3.25rem)] font-semibold text-navy-50 leading-[1.16] tracking-[-0.02em] mb-16 animate-fade-in opacity-0"
              style={{ animationDelay: '350ms', animationFillMode: 'forwards' }}
            >
              I am Arjoneel Ghosh,
              <br />
              and this is my
              <br />
              portfolio website
            </h1>

            <p
              className="text-navy-300 text-[0.95rem] leading-relaxed max-w-[31rem] animate-fade-in opacity-0"
              style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}
            >
              {profileRecord.longBio[0]}
            </p>

          </div>
        </div>
      </div>

      <div
        ref={ringRef}
        className="fixed z-30 will-change-transform hidden md:block"
        style={{
          right: '14%',
          top: '51%',
          transform: 'translateY(-50%) scale(0.94)',
          opacity: 0.04,
          pointerEvents: 'auto',
        }}
      >
        <div
          style={{
            transform: 'scale(1.14)',
            filter: isLight
              ? 'drop-shadow(0 0 34px rgba(74, 144, 217, 0.14))'
              : 'drop-shadow(0 0 48px rgba(74, 144, 217, 0.18))',
          }}
        >
          <HomepageRing
            scrollProgress={ringRevealProgress}
            isActive={ringIsActive}
          />
        </div>
      </div>

      <div className="relative z-10 page-shell-home pb-40">
        <div className="max-w-[34rem] space-y-6 mt-14">
          {profileRecord.longBio.slice(1).map((paragraph, i) => (
            <p
              key={i}
              className="text-navy-200 text-base leading-[1.75] animate-fade-in opacity-0"
              style={{ animationDelay: `${600 + i * 140}ms`, animationFillMode: 'forwards' }}
            >
              {paragraph}
            </p>
          ))}
          <p
            className="text-navy-200 text-base leading-[1.75] animate-fade-in opacity-0"
            style={{ animationDelay: '760ms', animationFillMode: 'forwards' }}
          >
            Please scroll down to active the navigation ring and checkout my portfolio website.
          </p>
        </div>

        <div className="mt-24 mb-3 w-12 h-px bg-accent-blue/20" />

        <div
          ref={focusSectionRef}
          className="mt-8 animate-fade-in opacity-0"
          style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
        >
          <h3 className="font-heading text-title font-semibold text-navy-50 mb-4">
            Current Focus
          </h3>
        </div>

        <div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-[38rem] animate-fade-in opacity-0"
          style={{ animationDelay: '950ms', animationFillMode: 'forwards' }}
        >
          {landingFocusCards.map((group, i) => (
            <button
              key={group.id}
              type="button"
              onClick={() =>
                setPreviewCard({
                  title: group.label,
                  body: group.description || 'Skill group.',
                  tags: group.skills.map((skill) =>
                    skill.emphasis ? `${skill.name} (${skill.emphasis})` : skill.name
                  ),
                })
              }
              className="home-focus-card card-base p-4 min-h-[88px] flex items-end text-left w-full cursor-pointer animate-fade-in opacity-0"
              style={{ animationDelay: `${1000 + i * 80}ms`, animationFillMode: 'forwards' }}
            >
              <h4 className="font-heading text-sm font-semibold text-navy-100">
                {group.label}
              </h4>
            </button>
          ))}
        </div>

        <div
          className="mt-20 animate-fade-in opacity-0"
          style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}
        >
          <button
            onClick={() => navigate('/ask')}
            className="theme-home-cta group flex items-center gap-3 rounded-xl px-5 py-3 transition-all duration-280"
          >
            <MessageCircle
              size={16}
              className="text-accent-blue/50 group-hover:text-accent-blue transition-colors duration-280"
            />
            <span className="text-sm text-navy-400 group-hover:text-navy-200 transition-colors duration-280">
              Ask me anything about this portfolio
            </span>
          </button>
        </div>

        <div
          ref={mobileRingRef}
          className="home-mobile-ring-panel md:hidden mt-14 mb-8 flex items-center justify-center animate-fade-in opacity-0"
          style={{ opacity: 0.86, transform: 'scale(0.9)', animationDelay: '1260ms', animationFillMode: 'forwards' }}
        >
          <HomepageRing
            scrollProgress={1}
            isActive
          />
        </div>

        <div className="mt-32 space-y-20">
          <div className="home-feature-block animate-fade-in opacity-0" style={{ animationDelay: '1350ms', animationFillMode: 'forwards' }}>
            <h3 className="font-heading text-title font-semibold text-navy-50 mb-4">Featured Work</h3>
            <p className="text-navy-300 text-sm leading-relaxed max-w-md mb-6">
              Projects spanning ML systems, assistive technology, product engineering, and data tooling, each built with care for both technical depth and user experience.
            </p>
            <button
              onClick={() => navigate('/work')}
              className="theme-link-inline flex items-center gap-2 text-sm font-medium transition-colors duration-220"
            >
              Explore projects
            </button>
          </div>

          <div className="home-feature-block animate-fade-in opacity-0" style={{ animationDelay: '1450ms', animationFillMode: 'forwards' }}>
            <h3 className="font-heading text-title font-semibold text-navy-50 mb-4">Professional Experience</h3>
            <p className="text-navy-300 text-sm leading-relaxed max-w-md mb-6">
              Certificate-backed internships at KPMG and Sopra Steria, leadership at SRMMUN Society, and a role-based view of practical responsibility.
            </p>
            <button
              onClick={() => navigate('/experience')}
              className="theme-link-inline flex items-center gap-2 text-sm font-medium transition-colors duration-220"
            >
              View experience
            </button>
          </div>

          <div className="home-feature-block animate-fade-in opacity-0" style={{ animationDelay: '1550ms', animationFillMode: 'forwards' }}>
            <h3 className="font-heading text-title font-semibold text-navy-50 mb-4">Research and Exploration</h3>
            <p className="text-navy-300 text-sm leading-relaxed max-w-md mb-6">
              Manuscript work, technical experiments, evolving concepts, and prototype systems that sit alongside the polished project record.
            </p>
            <button
              onClick={() => navigate('/lab')}
              className="theme-link-inline flex items-center gap-2 text-sm font-medium transition-colors duration-220"
            >
              Enter Lab
            </button>
          </div>
        </div>
      </div>

      <PreviewPanel
        isOpen={!!previewCard}
        onClose={() => setPreviewCard(null)}
        title={previewCard?.title || ''}
      >
        {previewCard && (
          <>
            <p className="text-navy-200 text-sm">{previewCard.body}</p>
            {previewCard.meta && <p className="text-navy-400 text-xs mt-2">{previewCard.meta}</p>}
            {previewCard.tags && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {previewCard.tags.map((tag) => (
                  <span
                    key={tag}
                    className="theme-tag text-[10px] px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </PreviewPanel>
    </div>
  );
};

export default HomePage;
