import React, { useMemo, useState } from 'react';
import CompactRing from '../components/navigation/CompactRing';
import ParticleField from '../components/ui/ParticleField';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PreviewPanel from '../components/ui/PreviewPanel';
import FocusPanel from '../components/ui/FocusPanel';
import ImageLightbox from '../components/ui/ImageLightbox';
import ProjectMediaCarousel from '../components/ui/ProjectMediaCarousel';
import { getProjectsForTier2 } from '../data';
import { buildProjectSlides, type ProjectMediaSlide } from '../lib/projects/buildProjectSlides';
import type { ProjectRecord } from '../types';

const TABS = ['Featured', 'DS/ML', 'Full Stack', 'Archive'];
const MAX_MINI_CARD_TECHS = 4;
const CARD_SURFACE_TAG_CLASS = 'theme-tag-accent text-[10px] px-2 py-0.5 rounded-md';
const CARD_META_CLASS = 'theme-meta-pill text-[11px] px-2 py-0.5 rounded-md inline-flex items-center';
const CARD_SLIDESHOW_INTERVAL_MS = 3200;
const PREVIEW_SLIDESHOW_INTERVAL_MS = 3600;

const miniCardTechPriority: Partial<Record<ProjectRecord['slug'], string[]>> = {
  agrifore: ['XGBoost', 'DuckDB', 'FastAPI', 'SQL', 'Next.js', 'Streamlit', 'Python'],
  signchat: ['MediaPipe', 'TensorFlow', 'Keras', 'streamlit-webrtc', 'OpenCV', 'Streamlit', 'Python'],
  'flightfinder-ai': ['Amadeus API', 'OpenRouter', 'OpenCV', 'MediaPipe', 'TensorFlow', 'FastAPI', 'React', 'TypeScript'],
  surgemedi: ['Product Catalog UI', 'React Router', 'Tailwind CSS', 'React', 'TypeScript'],
  'priority-based-csv-sampler': ['Quota Balancing', 'CSV Sampling Logic', 'Streamlit', 'Pandas', 'PyYAML', 'Altair', 'Python'],
  cropiq: ['Rule-Based Advisory Logic', 'Context-Aware Chat State', 'OpenRouter', 'Zustand', 'React', 'TypeScript'],
  'loanone-ai': ['Guided Onboarding Flow', 'Product Workflow UI', 'React', 'Tailwind CSS', 'TypeScript'],
  'rstyled-forecast-tool': ['Prophet', 'ARIMA', 'Forecasting Workflows', 'Pandas', 'Random Forest', 'Streamlit', 'Python'],
  'movie-recommendation-engine': ['Collaborative Filtering', 'Content-Based Filtering', 'Recommendation Logic', 'Interactive Filtering', 'React', 'TypeScript'],
};

const getMiniCardTechStack = (project: ProjectRecord): string[] => {
  const priorityOrder = miniCardTechPriority[project.slug];

  if (!priorityOrder) {
    return project.techStack.slice(0, MAX_MINI_CARD_TECHS);
  }

  const prioritized = priorityOrder.filter((tech) => project.techStack.includes(tech));
  const remaining = project.techStack.filter((tech) => !prioritized.includes(tech));

  return [...prioritized, ...remaining].slice(0, MAX_MINI_CARD_TECHS);
};

const getProjectBuckets = (project: ProjectRecord) =>
  project.workBuckets?.length ? project.workBuckets : [project.category];

const getProjectTaxonomyLabel = (project: ProjectRecord) => getProjectBuckets(project).join(' + ');

const getProjectDisciplineTags = (project: ProjectRecord) =>
  project.disciplineTags?.length ? project.disciplineTags.slice(0, 3) : [];

const getProjectSurfaceLabel = (project: ProjectRecord) => {
  if (project.featured) return 'Featured project';
  if (project.subcategories.includes('Archive')) return 'Archive project';
  if (project.status === 'Prototype') return 'Working prototype';
  return 'Project record';
};

const WorkPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Featured');
  const [previewProject, setPreviewProject] = useState<ProjectRecord | null>(null);
  const [focusProject, setFocusProject] = useState<ProjectRecord | null>(null);
  const [lightboxState, setLightboxState] = useState<{
    images: ProjectMediaSlide[];
    initialIndex: number;
  } | null>(null);

  const filtered = [...getProjectsForTier2(activeTab)].sort((a, b) => a.priority - b.priority);
  const previewSlides = useMemo(
    () => (previewProject ? buildProjectSlides(previewProject, 'preview') : []),
    [previewProject]
  );
  const focusSlides = useMemo(
    () => (focusProject ? buildProjectSlides(focusProject, 'preview') : []),
    [focusProject]
  );

  const openImageLightbox = (images: ProjectMediaSlide[], initialIndex: number) => {
    if (!images.length) return;
    setLightboxState({ images, initialIndex });
  };

  return (
    <div className="bg-page min-h-screen relative">
      <ParticleField />
      <CompactRing />

      <div className="relative z-10 page-shell-standard py-20 lg:py-28">
        <SectionHeading
          heading="Projects"
          description="This page is dedicated to summarizing my portfolio projects. This page contains information about my projects, organized by the tech stack used."
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-7">
          {filtered.map((project, i) => {
            const miniCardTechStack = getMiniCardTechStack(project);
            const cardSlides = buildProjectSlides(project, 'card');
            const taxonomyLabel = getProjectTaxonomyLabel(project);
            const disciplineTags = getProjectDisciplineTags(project);

            return (
              <GlowCard
                key={project.id}
                onClick={() => setPreviewProject(project)}
                delay={i * 60}
                className="flex h-full flex-col !p-7"
              >
                {cardSlides.length > 0 && (
                  <ProjectMediaCarousel
                    slides={cardSlides}
                    mode="card"
                    intervalMs={CARD_SLIDESHOW_INTERVAL_MS}
                    debugLabel={project.title}
                    containerClassName="theme-media-frame w-full h-44 rounded-[20px] overflow-hidden mb-5 -mt-1 relative"
                    imageClassName="w-full h-full object-contain p-2.5 opacity-92 group-hover:opacity-100"
                  />
                )}

                <div className="mb-3 flex items-start justify-between gap-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-navy-500">
                    {getProjectSurfaceLabel(project)}
                  </p>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium shrink-0
                    ${project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400'
                      : project.status === 'Completed' ? 'bg-accent-blue/10 text-accent-blue'
                      : 'bg-amber-500/10 text-amber-400'
                    }`}>
                    {project.status}
                  </span>
                </div>

                <h3 className="font-heading text-[17px] font-semibold text-navy-50 mb-2">
                  {project.title}
                </h3>

                <p className="text-navy-300 text-sm leading-relaxed line-clamp-4 mb-4 flex-1">
                  {project.summary}
                </p>

                <span className={`${CARD_META_CLASS} mb-3`}>
                  {taxonomyLabel}
                </span>

                {disciplineTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {disciplineTags.map((tag) => (
                      <span key={tag} className={CARD_SURFACE_TAG_CLASS}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="theme-divider-soft flex flex-wrap gap-1.5 mt-auto pt-4 border-t">
                  {miniCardTechStack.map((tech) => (
                    <span key={tech} className={CARD_SURFACE_TAG_CLASS}>
                      {tech}
                    </span>
                  ))}
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>

      <PreviewPanel
        isOpen={!!previewProject}
        onClose={() => setPreviewProject(null)}
        onDeepen={() => {
          if (previewProject) {
            setFocusProject(previewProject);
            setPreviewProject(null);
          }
        }}
        title={previewProject?.title || ''}
        deepenLabel="View Full Case Study"
      >
        {previewProject && (
          <>
            {previewSlides.length > 0 && (
              <ProjectMediaCarousel
                slides={previewSlides}
                mode="preview"
                intervalMs={PREVIEW_SLIDESHOW_INTERVAL_MS}
                debugLabel={previewProject.title}
                containerClassName="theme-media-frame w-full h-56 sm:h-64 rounded-xl mb-4 overflow-hidden relative"
                imageClassName="w-full h-full object-contain p-3 sm:p-4 opacity-96"
                onSlideActivate={(index) => openImageLightbox(previewSlides, index)}
              />
            )}
            <p className="text-navy-100 text-sm font-medium mb-2">
              {previewProject.previewSummary}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-navy-400 mb-3">
              <span>{getProjectTaxonomyLabel(previewProject)}</span>
              <span>{previewProject.status}</span>
            </div>
            {getProjectDisciplineTags(previewProject).length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {getProjectDisciplineTags(previewProject).map((tag) => (
                  <span
                    key={tag}
                    className="theme-tag-accent text-[10px] px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {previewProject.techStack.map((tech) => (
                <span key={tech} className="theme-tag text-[10px] px-2 py-0.5 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-navy-300 text-sm">{previewProject.overview}</p>
            <div className="flex gap-3 mt-4">
              {previewProject.links.live && (
                <a href={previewProject.links.live} target="_blank" rel="noopener noreferrer"
                  className="theme-link-inline text-xs transition-colors">
                  Live Demo
                </a>
              )}
              {previewProject.links.github && (
                <a href={previewProject.links.github} target="_blank" rel="noopener noreferrer"
                  className="theme-link-inline text-xs transition-colors">
                  GitHub
                </a>
              )}
            </div>
          </>
        )}
      </PreviewPanel>

      <FocusPanel
        isOpen={!!focusProject}
        onClose={() => setFocusProject(null)}
        title={focusProject?.title || ''}
      >
        {focusProject && (
          <>
            {focusSlides.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {focusSlides.map((img, i) => (
                  <button
                    key={`${img.src}-${i}`}
                    type="button"
                    onClick={() => openImageLightbox(focusSlides, i)}
                    className="theme-media-frame overflow-hidden rounded-xl p-2 text-left transition-all duration-220"
                    aria-label={`Open image preview for ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-full max-h-72 w-full rounded-lg object-contain opacity-95"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Overview</h4>
                <p className="text-navy-200 text-sm leading-relaxed">{focusProject.overview}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Problem</h4>
                <p className="text-navy-200 text-sm leading-relaxed">{focusProject.problem}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Approach</h4>
                <div className="space-y-2">
                  {focusProject.approach.map((item, i) => (
                    <p key={i} className="text-navy-200 text-sm leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-2">Outcomes</h4>
                <div className="space-y-2">
                  {focusProject.outcomes.map((item, i) => (
                    <p key={i} className="text-navy-200 text-sm leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-navy-100 uppercase tracking-wider mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {focusProject.techStack.map((tech) => (
                    <span key={tech} className="theme-tag-accent text-xs px-3 py-1 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="theme-divider flex gap-4 pt-4 border-t">
                {focusProject.links.live && (
                  <a href={focusProject.links.live} target="_blank" rel="noopener noreferrer"
                    className="theme-button-accent px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250">
                    Live Demo
                  </a>
                )}
                {focusProject.links.github && (
                  <a href={focusProject.links.github} target="_blank" rel="noopener noreferrer"
                    className="theme-button-muted px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </FocusPanel>

      <ImageLightbox
        isOpen={!!lightboxState}
        images={lightboxState?.images || []}
        initialIndex={lightboxState?.initialIndex || 0}
        onClose={() => setLightboxState(null)}
      />
    </div>
  );
};

export default WorkPage;
