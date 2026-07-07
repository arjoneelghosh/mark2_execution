/**
 * Build-time SEO/readability generator (Industrial_Pass).
 *
 * Runs AFTER `vite build` as an SSR-bundled script:
 *   vite build --ssr scripts/generate-static-seo.ts --outDir .seo-build
 *   node .seo-build/generate-static-seo.js
 *
 * It imports the exact same data modules the React app renders from,
 * so the machine-readable output can never drift from the visible site.
 *
 * Outputs (all inside dist/, zero impact on the client bundle or animations):
 *   - Per-route static HTML (dist/index.html, dist/work/index.html, ...) with:
 *       * route-specific <title> / meta description / canonical / Open Graph
 *       * JSON-LD structured data
 *       * full semantic content injected as a hidden block inside #root
 *         (crawlers and LLMs read raw HTML text; React replaces it on mount)
 *   - dist/llms.txt        (markdown digest of the whole portfolio for LLMs)
 *   - dist/sitemap.xml
 *   - dist/robots.txt
 */

import fs from 'node:fs';
import path from 'node:path';

import { profileRecord, educationRecords } from '../src/data/profile';
import { projectRecords } from '../src/data/projects';
import { experiencePageEntries } from '../src/data/experience';
import {
  globalCertificationRecords,
  certificateRecords,
  publicationRecords,
  labKnowledgeEntries,
} from '../src/data/records';

const SITE_URL = 'https://arjoneelghoshportfolio.vercel.app';
const DIST = path.resolve(process.cwd(), 'dist');

/* ---------------------------------- utils --------------------------------- */

const esc = (value: unknown): string =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const jsonLd = (data: object): string =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;

const list = (items: readonly string[]): string =>
  `<ul>${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;

const absolute = (url: string): string => (url.startsWith('http') ? url : `${SITE_URL}${url}`);

/* ------------------------------ shared content ---------------------------- */

const PERSON_ID = `${SITE_URL}/#person`;

const GITHUB_URL = 'https://github.com/arjoneelghosh';
const LINKEDIN_URL = 'https://www.linkedin.com/in/arjoneel-ghosh-7195142a1/';
const EMAIL = 'arjoneelghosh03@gmail.com';

const allSkillNames = profileRecord.skillGroups.flatMap((group) =>
  group.skills.map((skill) => skill.name),
);

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profileRecord.name,
  jobTitle: profileRecord.headline,
  description: profileRecord.shortBio,
  email: `mailto:${EMAIL}`,
  url: SITE_URL,
  sameAs: [GITHUB_URL, LINKEDIN_URL],
  knowsAbout: allSkillNames,
  alumniOf: educationRecords.map((edu) => ({
    '@type': 'EducationalOrganization',
    name: edu.institution,
  })),
};

/* ------------------------------ route sections ---------------------------- */

interface RouteSeo {
  route: string;
  title: string;
  description: string;
  html: string;
  structuredData: object[];
}

const projectHtml = (project: (typeof projectRecords)[number]): string => `
<article>
  <h2>${esc(project.title)}</h2>
  <p><strong>Category:</strong> ${esc(project.category)} · <strong>Status:</strong> ${esc(project.status)} · <strong>Tech:</strong> ${esc(project.techStack.join(', '))}</p>
  <p>${esc(project.summary)}</p>
  <p>${esc(project.overview)}</p>
  <h3>Problem</h3>
  <p>${esc(project.problem)}</p>
  <h3>Approach</h3>
  ${list(project.approach)}
  <h3>Outcomes</h3>
  ${list(project.outcomes)}
  ${project.links?.live ? `<p><a href="${esc(project.links.live)}">Live project</a></p>` : ''}
</article>`;

const experienceHtml = (entry: (typeof experiencePageEntries)[number]): string => `
<article>
  <h2>${esc(entry.role)} — ${esc(entry.organization)}</h2>
  <p><strong>Period:</strong> ${esc(entry.period)} · <strong>Location:</strong> ${esc(entry.location)} · <strong>Type:</strong> ${esc(entry.type)}</p>
  <p>${esc(entry.summary)}</p>
  ${list(entry.bullets)}
  <p><strong>Tech and focus areas:</strong> ${esc(entry.tech.join(', '))}</p>
</article>`;

const routes: RouteSeo[] = [
  {
    route: '/',
    title: 'Arjoneel Ghosh — Machine Learning Engineer and Full-Stack Developer',
    description: profileRecord.shortBio,
    html: `
<h1>${esc(profileRecord.name)} — ${esc(profileRecord.headline)}</h1>
<p>${esc(profileRecord.shortBio)}</p>
${profileRecord.longBio.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
<h2>Current focus</h2>
${list(profileRecord.currentFocus)}
<h2>Explore this portfolio</h2>
<ul>
  <li><a href="/work">Projects</a> — ${projectRecords.length} machine learning, forecasting, and full-stack builds</li>
  <li><a href="/experience">Experience</a> — internships at KPMG India and Sopra Steria India</li>
  <li><a href="/profile">Profile</a> — skills, bio, and education</li>
  <li><a href="/lab">Lab</a> — publications and research concepts</li>
  <li><a href="/connect">Connect</a> — contact channels</li>
  <li><a href="/ask">Ask</a> — chat with an assistant about this portfolio</li>
</ul>`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Arjoneel Ghosh — Portfolio',
        url: SITE_URL,
        author: { '@id': PERSON_ID },
      },
      personJsonLd,
    ],
  },
  {
    route: '/work',
    title: 'Projects — Arjoneel Ghosh',
    description: `Portfolio of ${projectRecords.length} projects by Arjoneel Ghosh spanning machine learning, forecasting, computer vision, and full-stack product delivery.`,
    html: `<h1>Projects by ${esc(profileRecord.name)}</h1>${projectRecords.map(projectHtml).join('')}`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Projects by Arjoneel Ghosh',
        itemListElement: projectRecords.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            description: project.summary,
            keywords: [...project.tags, ...project.techStack].join(', '),
            author: { '@id': PERSON_ID },
            ...(project.links?.live ? { url: project.links.live } : {}),
          },
        })),
      },
    ],
  },
  {
    route: '/experience',
    title: 'Experience — Arjoneel Ghosh',
    description:
      'Professional experience of Arjoneel Ghosh, including data science and analytics internships at KPMG India Services LLP and Sopra Steria India Limited.',
    html: `<h1>Experience of ${esc(profileRecord.name)}</h1>${experiencePageEntries.map(experienceHtml).join('')}`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Professional experience of Arjoneel Ghosh',
        itemListElement: experiencePageEntries.map((entry, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'OrganizationRole',
            roleName: entry.role,
            description: `${entry.role} at ${entry.organization} (${entry.period}). ${entry.summary}`,
          },
        })),
      },
    ],
  },
  {
    route: '/profile',
    title: 'Profile — Arjoneel Ghosh',
    description: profileRecord.shortBio,
    html: `
<h1>About ${esc(profileRecord.name)}</h1>
<p>${esc(profileRecord.headline)}</p>
${profileRecord.longBio.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}
<h2>Skills</h2>
${profileRecord.skillGroups
  .map(
    (group) => `
<h3>${esc(group.label)}</h3>
<p>${esc(group.description)}</p>
${list(group.skills.map((skill) => `${skill.name} (${skill.emphasis})`))}`,
  )
  .join('')}
<h2>Education</h2>
${educationRecords
  .map(
    (edu) => `
<article>
  <h3>${esc(edu.institution)}</h3>
  <p>${esc(edu.qualification)} · ${esc(edu.period)} · ${esc(edu.score.label)}: ${esc(edu.score.value)}</p>
</article>`,
  )
  .join('')}`,
    structuredData: [personJsonLd],
  },
  {
    route: '/lab',
    title: 'Lab — Publications and Research — Arjoneel Ghosh',
    description:
      'Research publications, papers, and applied concepts explored by Arjoneel Ghosh, including IEEE-published work.',
    html: `
<h1>Lab — publications and research concepts</h1>
<h2>Publications</h2>
${publicationRecords
  .map(
    (record) => `
<article>
  <h3>${esc(record.title)}</h3>
  <p>${esc(record.issuer)} · ${esc(record.date)}</p>
  <p>${esc(record.note)}</p>
</article>`,
  )
  .join('')}
<h2>Knowledge and concepts</h2>
${labKnowledgeEntries
  .map(
    (entry: any) => `
<article>
  <h3>${esc(entry.title ?? entry.name ?? '')}</h3>
  <p>${esc(entry.summary ?? entry.description ?? entry.note ?? '')}</p>
</article>`,
  )
  .join('')}`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Publications by Arjoneel Ghosh',
        itemListElement: publicationRecords.map((record, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'ScholarlyArticle',
            name: record.title,
            description: record.note,
            publisher: record.issuer,
            author: { '@id': PERSON_ID },
          },
        })),
      },
    ],
  },
  {
    route: '/connect',
    title: 'Connect — Arjoneel Ghosh',
    description: 'Contact Arjoneel Ghosh via email, LinkedIn, or GitHub.',
    html: `
<h1>Connect with ${esc(profileRecord.name)}</h1>
<ul>
  <li>Email: <a href="mailto:${EMAIL}">${EMAIL}</a></li>
  <li>LinkedIn: <a href="${LINKEDIN_URL}">${LINKEDIN_URL}</a></li>
  <li>GitHub: <a href="${GITHUB_URL}">${GITHUB_URL}</a></li>
</ul>`,
    structuredData: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Connect with Arjoneel Ghosh',
        url: `${SITE_URL}/connect`,
        about: { '@id': PERSON_ID },
      },
      personJsonLd,
    ],
  },
  {
    route: '/ask',
    title: 'Ask — Chat about this portfolio — Arjoneel Ghosh',
    description:
      'Ask questions about Arjoneel Ghosh’s projects, experience, and skills through the portfolio assistant.',
    html: `
<h1>Ask about this portfolio</h1>
<p>This page hosts an interactive assistant that answers questions about ${esc(
      profileRecord.name,
    )}’s projects, experience, education, and skills. For a machine-readable summary of the full portfolio, see <a href="/llms.txt">/llms.txt</a>.</p>`,
    structuredData: [],
  },
];

/* --------------------------------- llms.txt -------------------------------- */

const buildLlmsTxt = (): string => {
  const lines: string[] = [];
  lines.push(`# ${profileRecord.name} — ${profileRecord.headline}`);
  lines.push('');
  lines.push(`> ${profileRecord.shortBio}`);
  lines.push('');
  lines.push(`Portfolio website: ${SITE_URL}`);
  lines.push(`Email: ${EMAIL}`);
  lines.push(`GitHub: ${GITHUB_URL}`);
  lines.push(`LinkedIn: ${LINKEDIN_URL}`);
  lines.push('');
  lines.push('## About');
  lines.push('');
  profileRecord.longBio.forEach((paragraph) => {
    lines.push(paragraph);
    lines.push('');
  });
  lines.push('## Current focus');
  lines.push('');
  profileRecord.currentFocus.forEach((item) => lines.push(`- ${item}`));
  lines.push('');
  lines.push('## Skills');
  lines.push('');
  profileRecord.skillGroups.forEach((group) => {
    lines.push(`### ${group.label}`);
    lines.push('');
    lines.push(group.description);
    lines.push('');
    lines.push(group.skills.map((skill) => `${skill.name} (${skill.emphasis})`).join(', '));
    lines.push('');
  });
  lines.push(`## Projects (${SITE_URL}/work)`);
  lines.push('');
  projectRecords.forEach((project) => {
    lines.push(`### ${project.title}`);
    lines.push('');
    lines.push(`- Category: ${project.category} | Status: ${project.status}`);
    lines.push(`- Tech stack: ${project.techStack.join(', ')}`);
    if (project.links?.live) lines.push(`- Live: ${project.links.live}`);
    lines.push('');
    lines.push(project.summary);
    lines.push('');
    lines.push(project.overview);
    lines.push('');
    lines.push(`Problem: ${project.problem}`);
    lines.push('');
    lines.push('Approach:');
    project.approach.forEach((step) => lines.push(`- ${step}`));
    lines.push('');
    lines.push('Outcomes:');
    project.outcomes.forEach((outcome) => lines.push(`- ${outcome}`));
    lines.push('');
  });
  lines.push(`## Experience (${SITE_URL}/experience)`);
  lines.push('');
  experiencePageEntries.forEach((entry) => {
    lines.push(`### ${entry.role} — ${entry.organization}`);
    lines.push('');
    lines.push(`- Period: ${entry.period} | Location: ${entry.location} | Type: ${entry.type}`);
    lines.push('');
    lines.push(entry.summary);
    lines.push('');
    entry.bullets.forEach((bullet) => lines.push(`- ${bullet}`));
    lines.push('');
    lines.push(`Tech and focus areas: ${entry.tech.join(', ')}`);
    lines.push('');
  });
  lines.push('## Education');
  lines.push('');
  educationRecords.forEach((edu) => {
    lines.push(`- ${edu.qualification}, ${edu.institution} (${edu.period}) — ${edu.score.label}: ${edu.score.value}`);
  });
  lines.push('');
  lines.push('## Certifications');
  lines.push('');
  [...globalCertificationRecords, ...certificateRecords].forEach((record) => {
    lines.push(`- ${record.title} — ${record.issuer} (${record.date}). ${record.note}`);
  });
  lines.push('');
  lines.push(`## Publications (${SITE_URL}/lab)`);
  lines.push('');
  publicationRecords.forEach((record) => {
    lines.push(`- ${record.title} — ${record.issuer} (${record.date}). ${record.note}`);
  });
  lines.push('');
  lines.push('## Site pages');
  lines.push('');
  routes.forEach((routeDef) => {
    lines.push(`- ${absolute(routeDef.route)} — ${routeDef.title}`);
  });
  lines.push('');
  return lines.join('\n');
};

/* ------------------------------- html injection ---------------------------- */

const injectRoute = (template: string, routeDef: RouteSeo): string => {
  const canonical = absolute(routeDef.route === '/' ? '/' : routeDef.route);
  let html = template;

  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(routeDef.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[\s\S]*?"\s*\/>/,
    `<meta name="description" content="${esc(routeDef.description)}" />`,
  );

  const headExtras = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${esc(routeDef.title)}" />`,
    `<meta property="og:description" content="${esc(routeDef.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary" />`,
    ...routeDef.structuredData.map(jsonLd),
  ].join('\n    ');
  html = html.replace('</head>', `    ${headExtras}\n  </head>`);

  const seoBlock = `<div id="seo-static-content" hidden aria-hidden="true" data-generated="build">${routeDef.html}</div>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${seoBlock}</div>`);

  return html;
};

/* ----------------------------------- main ---------------------------------- */

const main = (): void => {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found — run \`vite build\` first (looked in ${DIST})`);
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  routes.forEach((routeDef) => {
    const output = injectRoute(template, routeDef);
    const outPath =
      routeDef.route === '/'
        ? templatePath
        : path.join(DIST, routeDef.route.replace(/^\//, ''), 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output, 'utf8');
    console.log(`[seo] wrote ${path.relative(DIST, outPath)}`);
  });

  fs.writeFileSync(path.join(DIST, 'llms.txt'), buildLlmsTxt(), 'utf8');
  console.log('[seo] wrote llms.txt');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((routeDef) => `  <url><loc>${absolute(routeDef.route)}</loc></url>`).join('\n')}
</urlset>
`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');
  console.log('[seo] wrote sitemap.xml');

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST, 'robots.txt'), robots, 'utf8');
  console.log('[seo] wrote robots.txt');
};

main();
