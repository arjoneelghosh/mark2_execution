import { NavNode, TierOneId, TierTwoDefinition } from '../types';

export const tierTwoNavigationMap: Record<TierOneId, TierTwoDefinition[]> = {
  work: [
    { id: 'featured', label: 'Featured', description: 'Featured projects and strongest entry points.' },
    { id: 'ml-data', label: 'DS/ML', description: 'Data science, machine-learning, and forecasting work.' },
    { id: 'full-stack', label: 'Full Stack', description: 'Systems, product, and application work.' },
    { id: 'research', label: 'Research', description: 'Research-led projects and concepts.' },
    { id: 'archive', label: 'Archive', description: 'Older but still relevant work.' },
  ],
  profile: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'resume', label: 'Resume' },
    { id: 'achievements', label: 'Achievements' },
  ],
  experience: [
    { id: 'internships', label: 'Internships' },
    { id: 'research', label: 'Research' },
    { id: 'leadership', label: 'Leadership' },
  ],
  lab: [
    { id: 'papers', label: 'Papers' },
    { id: 'concepts', label: 'Concepts' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'prototypes', label: 'Prototypes' },
  ],
  connect: [
    { id: 'contact', label: 'Contact' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'github', label: 'GitHub' },
    { id: 'resume', label: 'Resume' },
  ],
  ask: [
    { id: 'recruiter-mode', label: 'Recruiter Mode' },
    { id: 'project-guide', label: 'Project Guide' },
    { id: 'summarize-me', label: 'Summarize Me' },
  ],
};

export const navNodes: NavNode[] = [
  {
    id: 'work',
    path: '/work',
    label: 'Projects',
    position: { x: -35, y: -80 },
    compactPosition: { x: -12, y: -30 },
    tier2Nav: tierTwoNavigationMap.work.map((item) => item.label),
  },
  {
    id: 'profile',
    path: '/profile',
    label: 'Profile',
    position: { x: 35, y: -80 },
    compactPosition: { x: 12, y: -30 },
    tier2Nav: tierTwoNavigationMap.profile.map((item) => item.label),
  },
  {
    id: 'experience',
    path: '/experience',
    label: 'Experience',
    position: { x: 100, y: 0 },
    compactPosition: { x: 34, y: 0 },
    tier2Nav: tierTwoNavigationMap.experience.map((item) => item.label),
  },
  {
    id: 'connect',
    path: '/connect',
    label: 'Connect',
    position: { x: 35, y: 80 },
    compactPosition: { x: 12, y: 30 },
    tier2Nav: tierTwoNavigationMap.connect.map((item) => item.label),
  },
  {
    id: 'ask',
    path: '/ask',
    label: 'Ask',
    position: { x: -35, y: 80 },
    compactPosition: { x: -12, y: 30 },
    tier2Nav: tierTwoNavigationMap.ask.map((item) => item.label),
  },
  {
    id: 'lab',
    path: '/lab',
    label: 'Lab',
    position: { x: -100, y: 0 },
    compactPosition: { x: -34, y: 0 },
    tier2Nav: tierTwoNavigationMap.lab.map((item) => item.label),
  },
];

export const tierOneLookup: Record<TierOneId, NavNode> = navNodes.reduce(
  (accumulator, node) => {
    accumulator[node.id] = node;
    return accumulator;
  },
  {} as Record<TierOneId, NavNode>
);
