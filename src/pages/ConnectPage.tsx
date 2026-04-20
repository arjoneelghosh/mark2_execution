import React, { useState } from 'react';
import CompactRing from '../components/navigation/CompactRing';
import ParticleField from '../components/ui/ParticleField';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PreviewPanel from '../components/ui/PreviewPanel';
import { connectContent } from '../data';
import type { ContentCard } from '../types';

const DESTINATIONS = [
  { key: 'Contact' },
  { key: 'LinkedIn' },
  { key: 'GitHub' },
  { key: 'Resume' },
];

const ConnectPage: React.FC = () => {
  const [previewCard, setPreviewCard] = useState<ContentCard | null>(null);
  const [previewKey, setPreviewKey] = useState<string>('');

  return (
    <div className="bg-page min-h-screen relative">
      <ParticleField />
      <CompactRing />

      <div className="relative z-10 max-w-4xl mx-auto pl-9 pr-8 py-20 lg:pl-14 lg:pr-14 lg:py-28">
        <SectionHeading
          heading="Connect"
          description="A simple place to reach out, find my public profiles, and access the most direct supporting documents."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {DESTINATIONS.map((dest, i) => {
            const section = connectContent[dest.key];
            if (!section || section.cards.length === 0) return null;
            const card = section.cards[0];

            return (
              <GlowCard
                key={dest.key}
                delay={i * 100}
                onClick={() => {
                  setPreviewCard(card);
                  setPreviewKey(dest.key);
                }}
              >
                <h3 className="font-heading text-base font-semibold text-navy-50 mb-1">
                  {card.title}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed line-clamp-2">
                  {card.body}
                </p>
                {card.meta && (
                  <p className="text-navy-500 text-xs mt-2">{card.meta}</p>
                )}
              </GlowCard>
            );
          })}
        </div>
      </div>

      <PreviewPanel
        isOpen={!!previewCard}
        onClose={() => { setPreviewCard(null); setPreviewKey(''); }}
        title={previewCard?.title || ''}
      >
        {previewCard && (
          <>
            <p className="text-navy-200 text-sm">{previewCard.body}</p>
            {previewCard.meta && <p className="text-navy-400 text-xs mt-2">{previewCard.meta}</p>}

            <div className="flex gap-3 mt-5">
              {previewCard.link && (
                <a href={previewCard.link} target="_blank" rel="noopener noreferrer"
                  className="theme-button-accent px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250">
                  {previewCard.linkLabel || 'Open'}
                </a>
              )}
              {previewKey === 'Resume' && previewCard.link && (
                <a href={previewCard.link} download
                  className="theme-button-muted px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250">
                  Download
                </a>
              )}
            </div>
          </>
        )}
      </PreviewPanel>
    </div>
  );
};

export default ConnectPage;
