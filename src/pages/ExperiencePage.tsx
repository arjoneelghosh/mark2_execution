import React, { useState } from 'react';
import CompactRing from '../components/navigation/CompactRing';
import ParticleField from '../components/ui/ParticleField';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PreviewPanel from '../components/ui/PreviewPanel';
import FocusPanel from '../components/ui/FocusPanel';
import { experienceEntries } from '../data';
import type { ExperienceEntry } from '../types';

const TABS = ['Internships', 'Leadership'];
const CARD_SURFACE_TAG_CLASS =
  'text-[10px] px-2 py-0.5 rounded-md bg-accent-blue/5 text-accent-blue/60 border border-accent-blue/8';

const formatCompactLeadershipPeriod = (periods: string[]) => {
  const parsed = periods
    .map((period) => {
      const match = period.match(/^(\d{4})-(\d{2})$/);
      if (!match) return null;
      const start = Number(match[1]);
      const end = 2000 + Number(match[2]);
      return { start, end };
    })
    .filter((value): value is { start: number; end: number } => value !== null);

  if (parsed.length === 0) return periods.join(', ');

  const start = Math.min(...parsed.map((value) => value.start));
  const end = Math.max(...parsed.map((value) => value.end));
  return `${start}-${end}`;
};

const buildLeadershipEntries = (entries: ExperienceEntry[]): ExperienceEntry[] => {
  const grouped = new Map<string, ExperienceEntry[]>();

  entries
    .filter((entry) => entry.type === 'Leadership' && entry.role === 'Committee Head')
    .forEach((entry) => {
      const key = `${entry.organization}__${entry.role}`;
      const existing = grouped.get(key) || [];
      existing.push(entry);
      grouped.set(key, existing);
    });

  return Array.from(grouped.entries()).map(([key, group]) => {
    const [organization, role] = key.split('__');
    const years = group.map((entry) => entry.period);
    const tech = Array.from(new Set(group.flatMap((entry) => entry.tech)));


    

    return {
      id: `leadership-${organization.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${role.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      organization,
      role,
      period: formatCompactLeadershipPeriod(years),
      type: 'Leadership',
      location: group[0]?.location,
      summary:
        organization === 'SRM Directorate of Student Affairs'
          ? 'A member of the Directorate of Student Affairs (DSA) at SRM for two years, contributing to the organization and management of multiple events, including the college fest Milan. In the first year, worked as part of the discipline team, ensuring smooth conduct and coordination during events, and in the second year, progressed to the role of Committee Head, taking on leadership responsibilities and overseeing event execution.'
          : 'Extracurricular development through progressive roles in SRM MUNSOC (Model United Nations Society) where I served as a committee member in 2022, advanced to Committee Head of the UNSC committee in 2023 during the SRMMUN-23, and further took on the role of Committee Head of the Council Affairs team in 2024, reflecting sustained growth, responsibility, and commitment to organizational excellence.',

          bullets:
            organization === 'SRM Directorate of Student Affairs'
              ? [
                  '* Proof of leadership and continuous involvement in extracurricular growth',
                  '* Demonstrates strong leadership and sustained extracurricular involvement through a two-year tenure with the Directorate of Student Affairs (DSA) at SRM.',
                  '* Began as a discipline team member, contributing to event coordination, and progressed to Committee Head, leading teams and overseeing execution for major events such as Milan, reflecting both commitment and growth in responsibility.',
                ]
              : [
                  '* Proof of leadership and continuous involvement in extracurricular growth',
                  '* Progressed into leadership roles in subsequent editions, serving as Committee Head of the UNSC in 2023 and Committee Head of the Council Affairs team in 2024, taking on responsibilities such as leading teams, mentoring delegates, and ensuring the effective management and smooth functioning of conference proceedings.',
                 ],



//      bullets: [
 //       '* Proof of leadership and continuous involvment in extracurriculum growth',
//        organization === 'SRM Directorate of Student Affairs'
//          ? '* Demonstrates strong leadership and sustained extracurricular involvement through a two-year tenure with the Directorate of Student Affairs (DSA) at SRM.'
//          ? '* Began as a discipline team member, contributing to event coordination, and progressed to Committee Head, leading teams and overseeing execution for major events such as Milan, reflecting both commitment and growth in responsibility.'
//          : '* Displayed leadership'
//          : '* Managed the SRM MUN of 2022 as a committee member, 2023 as committee head of the UNSC committee and 2024 the committee head of council affairs team',
//      ],
      tech,
    };
  });
};

const ExperiencePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Internships');
  const [previewEntry, setPreviewEntry] = useState<ExperienceEntry | null>(null);
  const [focusEntry, setFocusEntry] = useState<ExperienceEntry | null>(null);

  const filtered =
    activeTab === 'Leadership'
      ? buildLeadershipEntries(experienceEntries)
      : experienceEntries.filter((e) => e.type === activeTab);

  return (
    <div className="bg-page min-h-screen relative">
      <ParticleField />
      <CompactRing />

      <div className="relative z-10 max-w-5xl mx-auto pl-9 pr-8 py-20 lg:pl-14 lg:pr-14 lg:py-28">
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
                {entry.summary}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/[0.04]">
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
              <div className="w-full rounded-xl overflow-hidden border border-white/[0.08] bg-navy-950/50 mb-4">
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
            <p className="text-navy-200 text-sm">{previewEntry.summary}</p>
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
              <p className="text-navy-200 leading-relaxed">{focusEntry.summary}</p>
            </div>

            {focusEntry.bullets.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Details</h4>
                <div className="space-y-2">
                  {focusEntry.bullets.map((bullet, i) => (
                    <p key={i} className="text-navy-200 text-sm">
                      {bullet}
                    </p>
                  ))}
                </div>
              </div>
            )}

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
              <div className="pt-4 border-t border-white/[0.06]">
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Related Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {focusEntry.relatedProjectSlugs.map((slug) => (
                    <span key={slug} className="text-xs px-3 py-1 rounded-lg bg-white/[0.03] text-navy-300 border border-white/[0.06]">
                      {slug}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {focusEntry.certificateLink && focusEntry.type === 'Internships' && (
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider">Certificate Evidence</h4>
                <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-navy-950/60">
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
                    className="px-4 py-2 rounded-xl text-sm font-medium
                      bg-accent-blue/15 text-accent-blue border border-accent-blue/20
                      hover:bg-accent-blue/25 transition-all duration-250"
                  >
                    {focusEntry.certificateLabel || 'Open Certificate'}
                  </a>
                  <a
                    href={focusEntry.certificateLink}
                    download
                    className="px-4 py-2 rounded-xl text-sm font-medium
                      bg-white/[0.04] text-navy-200 border border-white/[0.08]
                      hover:bg-white/[0.06] transition-all duration-250"
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
