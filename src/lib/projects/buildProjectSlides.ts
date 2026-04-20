import type { ProjectMediaItem, ProjectRecord } from '../../types';

export type ProjectMediaSlide = {
  src: string;
  alt: string;
  caption?: string;
};

const compactDistinctSlides = (items: Array<ProjectMediaItem | undefined>): ProjectMediaSlide[] => {
  const seen = new Set<string>();
  const slides: ProjectMediaSlide[] = [];

  items.forEach((item) => {
    if (!item?.src || seen.has(item.src)) return;
    seen.add(item.src);
    slides.push({
      src: item.src,
      alt: item.alt,
      caption: item.caption,
    });
  });

  return slides;
};

export const buildProjectSlides = (
  project: ProjectRecord,
  mode: 'card' | 'preview'
): ProjectMediaSlide[] => {
  const orderedMedia =
    mode === 'preview'
      ? [project.media?.cover, project.media?.preview, ...(project.media?.gallery || [])]
      : [project.media?.cover, ...(project.media?.gallery || []), project.media?.preview];

  return compactDistinctSlides(orderedMedia);
};
