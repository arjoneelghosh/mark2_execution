import { ProjectRecord } from '../types';
import { projectRecords } from './projects';

function isArchiveProject(project: ProjectRecord): boolean {
  return project.subcategories.includes('Archive');
}

function getProjectBuckets(project: ProjectRecord): ProjectRecord['category'][] {
  return project.workBuckets?.length ? project.workBuckets : [project.category];
}

function normalizeFilter(filter: string) {
  return filter === 'ML/Data' ? 'DS/ML' : filter;
}

export function getProjectsForTier2(filter: string): ProjectRecord[] {
  const normalizedFilter = normalizeFilter(filter);

  switch (normalizedFilter) {
    case 'Featured':
      return projectRecords.filter((project) => project.featured);
    case 'Full Stack':
    case 'Research':
    case 'DS/ML':
      return projectRecords.filter(
        (project) => getProjectBuckets(project).includes(normalizedFilter as ProjectRecord['category']) && !isArchiveProject(project)
      );
    case 'Archive':
      return projectRecords.filter((project) => isArchiveProject(project));
    default:
      return projectRecords;
  }
}

export function getFeaturedProjects(): ProjectRecord[] {
  return projectRecords.filter((project) => project.featured);
}
