import React, { useState } from 'react';
import CompactRing from '../components/navigation/CompactRing';
import ParticleField from '../components/ui/ParticleField';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PreviewPanel from '../components/ui/PreviewPanel';
import { profileContent, profileRecord } from '../data';
import type { ContentCard } from '../types';

const TABS = ['About', 'Tech Stack', 'Resume', 'Achievements'];
const TECH_STACK_GROUPS = [
  {
    label: 'Languages',
    values: 'Python, SQL, JavaScript, TypeScript, C++',
  },
  {
    label: 'Frameworks',
    values: 'FastAPI, Django, React, Next.js, Node.js, Express, Streamlit',
  },
  {
    label: 'ML and DS',
    values:
      'scikit-learn, XGBoost, LightGBM, CatBoost, Prophet, AutoARIMA, Feature Engineering',
  },
  {
    label: 'DL, NLP, CV',
    values: 'PyTorch, TensorFlow, Keras, Hugging Face, OpenCV, YOLOv8, DeepLabV3+',
  },
  {
    label: 'Data Systems',
    values: 'MySQL, PostgreSQL, MongoDB, Pinecone, AWS, Docker',
  },
  {
    label: 'Development Practices',
    values: 'Agile, Scrum, REST APIs, Git, CI/CD, Unit Testing, Version Control',
  },
  {
    label: 'Visualization and Platforms',
    values: 'Power BI, Tableau, Plotly, Seaborn, ServiceNow, Microsoft 365',
  },
];

const getEducationScoreLabel = (education: (typeof profileRecord.education)[number]) =>
  education.score ? `${education.score.label} ${education.score.value}` : null;

const PREVIEW_TAG_CLASS = 'theme-tag text-[10px] px-2 py-0.5 rounded-md';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('About');
  const [previewCard, setPreviewCard] = useState<ContentCard | null>(null);
  const [previewKind, setPreviewKind] = useState<
    'skills' | 'education' | 'resume' | 'achievement' | null
  >(null);

  const currentSection = profileContent[activeTab === 'Tech Stack' ? 'Skills' : activeTab];
  if (!currentSection) return null;

  return (
    <div className="bg-page min-h-screen relative">
      <ParticleField />
      <CompactRing />

      <div className="relative z-10 page-shell-standard py-20 lg:py-28">
        <SectionHeading
          heading="Profile"
          description=" This is the Profile page, this page contain information about my Profile summary, skill architecture and certificate-backed records tied to the current portfolio."
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'About' && (
          <div className="space-y-8">
            <div className="glass-panel profile-about-panel p-8 animate-fade-in">
              <h3 className="font-heading text-lg font-semibold text-navy-50 mb-2">
                {profileRecord.headline}
              </h3>
              <p className="text-navy-300 text-xs mb-6">{profileRecord.name}</p>
              <div className="space-y-4">
                {profileRecord.longBio.map((paragraph, index) => (
                  <p key={index} className="text-navy-200 text-sm leading-[1.75]">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="theme-divider mt-8 border-t pt-6">
                <h4 className="font-heading text-base font-medium text-navy-100 mb-5">Skills</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileRecord.skillGroups.map((group, index) => (
                    <GlowCard
                      key={group.id}
                      delay={index * 80}
                      onClick={() => {
                        setPreviewCard({
                          title: group.label,
                          body: group.description || 'Skill group.',
                          tags: group.skills.map((skill) =>
                            skill.emphasis ? `${skill.name} (${skill.emphasis})` : skill.name
                          ),
                        });
                        setPreviewKind('skills');
                      }}
                    >
                      <h3 className="font-heading text-base font-semibold text-navy-50 mb-2">
                        {group.label}
                      </h3>
                      <p className="text-navy-300 text-sm leading-relaxed">
                        {group.description}
                      </p>
                    </GlowCard>
                  ))}
                </div>
              </div>

              <div className="theme-divider mt-8 border-t pt-6">
                <h4 className="font-heading text-base font-medium text-navy-100 mb-5">
                  Education
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileRecord.education.map((education, index) => {
                    const scoreLabel = getEducationScoreLabel(education);

                    return (
                      <GlowCard
                        key={education.id}
                        delay={index * 80}
                        onClick={() => {
                          setPreviewCard({
                            title: education.institution,
                            body: education.summary,
                            meta: `${education.period} | ${education.qualification}`,
                            tags: [
                              ...(scoreLabel ? [scoreLabel] : []),
                              ...(education.tags ?? []),
                            ],
                          });
                          setPreviewKind('education');
                        }}
                      >
                        <h3 className="font-heading text-base font-semibold text-navy-50 mb-2">
                          {education.institution}
                        </h3>
                        <p className="text-navy-200 text-sm leading-relaxed">
                          {education.qualification}
                        </p>
                        <p className="mt-1 text-navy-400 text-xs">{education.period}</p>
                      </GlowCard>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Tech Stack' && (
          <GlowCard delay={100}>
            <h4 className="font-heading text-base font-medium text-navy-100 mb-5">Tech Stack</h4>
            <div className="space-y-4">
              {TECH_STACK_GROUPS.map((group) => (
                <div
                  key={group.label}
                  className="theme-divider-soft border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <p className="text-sm leading-relaxed text-navy-300">
                    <span className="font-heading font-semibold text-navy-50">
                      {group.label}:
                    </span>{' '}
                    {group.values}
                  </p>
                </div>
              ))}
            </div>
          </GlowCard>
        )}

        {activeTab === 'Resume' && (
          <div className="max-w-md">
            {currentSection.cards.map((card, index) => (
              <GlowCard
                key={index}
                delay={index * 80}
                onClick={() => {
                  setPreviewCard(card);
                  setPreviewKind('resume');
                }}
              >
                <h3 className="font-heading text-base font-semibold text-navy-50 mb-2">
                  {card.title}
                </h3>
                <p className="text-navy-300 text-sm leading-relaxed mb-3">{card.body}</p>
                {card.meta && <p className="text-navy-500 text-xs">{card.meta}</p>}
                {card.link && (
                  <div className="mt-4 flex gap-3">
                    <a
                      href={card.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="theme-link-inline text-xs font-medium transition-colors"
                    >
                      Open
                    </a>
                    <a
                      href={card.link}
                      download
                      className="theme-link-inline text-xs font-medium transition-colors"
                    >
                      Download
                    </a>
                  </div>
                )}
              </GlowCard>
            ))}
          </div>
        )}

        {activeTab === 'Achievements' && (
          <div className="space-y-10">
            {(currentSection.cardGroups || []).map((group, groupIndex) => (
              <div key={group.label} className="space-y-5">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-navy-50">
                    {group.label}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {group.cards.map((card, cardIndex) => (
                    <GlowCard
                      key={`${group.label}-${card.title}`}
                      delay={(groupIndex * 4 + cardIndex) * 60}
                      onClick={() => {
                        setPreviewCard(card);
                        setPreviewKind('achievement');
                      }}
                    >
                      <h3 className="font-heading text-sm font-semibold text-navy-50 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-navy-300 text-xs leading-relaxed mb-2">{card.body}</p>
                      {card.meta && <p className="text-navy-500 text-[11px]">{card.meta}</p>}
                      {card.link && (
                        <div className="mt-3 flex gap-3">
                          <a
                            href={card.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-link-inline text-[11px] font-medium transition-colors"
                          >
                            {card.linkLabel || 'View'}
                          </a>
                          <a
                            href={card.link}
                            download
                            className="theme-link-inline text-[11px] font-medium transition-colors"
                          >
                            Download
                          </a>
                        </div>
                      )}
                    </GlowCard>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PreviewPanel
        isOpen={!!previewCard}
        onClose={() => {
          setPreviewCard(null);
          setPreviewKind(null);
        }}
        title={previewCard?.title || ''}
      >
        {previewCard && (
          <>
            {(previewKind === 'resume' || previewKind === 'achievement') && previewCard.link && (
              <div className="theme-media-frame w-full rounded-xl overflow-hidden mb-4">
                <iframe
                  src={previewCard.link}
                  title={`${previewCard.title} preview`}
                  className="w-full h-[360px]"
                />
              </div>
            )}
            <p className="text-navy-200 text-sm">{previewCard.body}</p>
            {previewCard.meta && <p className="text-navy-400 text-xs mt-2">{previewCard.meta}</p>}
            {previewCard.tags && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {previewCard.tags.map((tag) => (
                  <span
                    key={tag}
                    className={PREVIEW_TAG_CLASS}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {(previewKind === 'resume' || previewKind === 'achievement') && previewCard.link && (
              <div className="theme-divider flex gap-3 pt-3 border-t">
                <a
                  href={previewCard.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-button-accent px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250"
                >
                  {previewCard.linkLabel || 'Open'}
                </a>
                <a
                  href={previewCard.link}
                  download
                  className="theme-button-muted px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250"
                >
                  Download
                </a>
              </div>
            )}
          </>
        )}
      </PreviewPanel>
    </div>
  );
};

export default ProfilePage;
