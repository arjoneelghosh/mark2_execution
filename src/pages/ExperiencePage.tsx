import React, { useState } from 'react';
import CompactRing from '../components/navigation/CompactRing';
import ParticleField from '../components/ui/ParticleField';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PreviewPanel from '../components/ui/PreviewPanel';
import FocusPanel from '../components/ui/FocusPanel';
import { experiencePageEntries } from '../data';
import type { ExperienceEntry } from '../types';

const TABS = ['Internships', 'Leadership'];
const CARD_SURFACE_TAG_CLASS = 'theme-tag-accent text-[10px] px-2 py-0.5 rounded-md';

const ExperiencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Internships');
  const [previewEntry, setPreviewEntry] = useState<ExperienceEntry | null>(null);
  const [focusEntry, setFocusEntry] = useState<ExperienceEntry | null>(null);

  const filtered = experiencePageEntries.filter((entry) => entry.type === activeTab);

  return (
    <div className="bg-page min-h-screen relative">
      <ParticleField />
      <CompactRing />

      <div className="relative z-10 page-shell-standard py-20 lg:py-28">
        <SectionHeading
          heading="Experience"
          description="This page contains role-based experience focused on structured environments, practical responsibility, and certificate-backed evidence."
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="space-y-6 max-w-2xl">
          {filtered.length === 0 && (
            <p className="text-navy-400 text-sm animate-fade-in">
              No entries in this category yet.
            </p>
          )}
          {filtered.map((entry, i) => (
            <GlowCard key={entry.id} delay={i * 100} onClick={() => setPreviewEntry(entry)}>
              <div className="mb-3">
                <h3 className="font-heading text-base font-semibold text-navy-50">
                  {entry.role}
                </h3>
                <p className="text-accent-blue/80 text-sm font-medium mt-0.5">
                  {entry.organization}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-navy-400 mb-3">
                <span>{entry.period}</span>
                {entry.location && (
                  <span>{entry.location}</span>
                )}
              </div>

              <p className="text-navy-300 text-sm leading-relaxed">
                {entry.cardText || entry.summary}
              </p>

              <div className="theme-divider-soft flex flex-wrap gap-1.5 mt-3 pt-3 border-t">
                {entry.tech.map((t) => (
                  <span key={t} className={CARD_SURFACE_TAG_CLASS}>
                    {t}
                  </span>
                ))}
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      <PreviewPanel
        isOpen={!!previewEntry}
        onClose={() => setPreviewEntry(null)}
        onDeepen={() => {
          if (previewEntry) {
            setFocusEntry(previewEntry);
            setPreviewEntry(null);
          }
        }}
        title={previewEntry ? `${previewEntry.role} at ${previewEntry.organization}` : ''}
        deepenLabel="View Full Role Details"
      >
        {previewEntry && (
          <>
            {previewEntry.certificateLink && activeTab === 'Internships' && (
              <div className="theme-media-frame w-full rounded-xl overflow-hidden mb-4">
                <iframe
                  src={previewEntry.certificateLink}
                  title={`${previewEntry.organization} certificate preview`}
                  className="w-full h-[320px]"
                />
              </div>
            )}
            <div className="flex flex-wrap gap-3 text-xs text-navy-400 mb-3">
              <span>{previewEntry.period}</span>
              {previewEntry.location && (
                <span>{previewEntry.location}</span>
              )}
            </div>
            <p className="text-navy-200 text-sm leading-relaxed">
              {previewEntry.previewText || previewEntry.summary}
            </p>
          </>
        )}
      </PreviewPanel>

      <FocusPanel
        isOpen={!!focusEntry}
        onClose={() => setFocusEntry(null)}
        title={focusEntry ? `${focusEntry.role} at ${focusEntry.organization}` : ''}
      >
        {focusEntry && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 text-sm text-navy-300">
              <span>{focusEntry.period}</span>
              {focusEntry.location && (
                <span>{focusEntry.location}</span>
              )}
            </div>

            <div>
              <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Summary</h4>
              <p className="text-navy-200 text-sm leading-relaxed">{focusEntry.summary}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Details</h4>
              <div className="space-y-3">
                {focusEntry.bullets.map((bullet, i) => (
                  <p key={i} className="text-navy-200 text-sm">
                    {bullet}
                  </p>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-3">Skills and Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {focusEntry.tech.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-lg bg-accent-blue/8 text-accent-blue/80 border border-accent-blue/12">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {focusEntry.relatedProjectSlugs && focusEntry.relatedProjectSlugs.length > 0 && (
              <div className="theme-divider pt-4 border-t">
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Related Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {focusEntry.relatedProjectSlugs.map((slug) => (
                    <span key={slug} className="theme-tag text-xs px-3 py-1 rounded-lg">
                      {slug}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {focusEntry.certificateLink && focusEntry.type === 'Internships' && (
              <div className="theme-divider space-y-4 pt-4 border-t">
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider">Certificate Evidence</h4>
                <div className="theme-media-frame rounded-2xl overflow-hidden">
                  <iframe
                    src={focusEntry.certificateLink}
                    title={`${focusEntry.organization} internship certificate`}
                    className="w-full h-[420px]"
                  />
                </div>
                <div className="flex gap-3">
                  <a
                    href={focusEntry.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-accent px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250"
                  >
                    {focusEntry.certificateLabel || 'Open Certificate'}
                  </a>
                  <a
                    href={focusEntry.certificateLink}
                    download
                    className="theme-button-muted px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250"
                  >
                    Download Certificate
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </FocusPanel>
    </div>
  );
};

export default ExperiencePage;
