import React, { useState } from 'react';
import CompactRing from '../components/navigation/CompactRing';
import ParticleField from '../components/ui/ParticleField';
import SectionHeading from '../components/ui/SectionHeading';
import GlowCard from '../components/ui/GlowCard';
import PreviewPanel from '../components/ui/PreviewPanel';
import FocusPanel from '../components/ui/FocusPanel';
import { publicationRecords } from '../data';

type LabLane = 'Papers' | 'Concepts' | 'Working Prototypes';

interface LabEntry {
  title: string;
  summary: string;
  detail: string[];
  meta?: string;
  tags?: string[];
  link?: string;
  linkLabel?: string;
}

interface LabLaneContent {
  heading: string;
  description: string;
  cards: LabEntry[];
}

const TABS: LabLane[] = ['Papers', 'Concepts', 'Working Prototypes'];
const LAB_META_CLASS = 'theme-meta-pill inline-block rounded-md px-2 py-0.5 text-[11px]';
const LAB_TAG_CLASS = 'theme-tag-accent rounded-md px-2 py-0.5 text-[10px]';
const LAB_PREVIEW_TAG_CLASS = 'theme-tag rounded-md px-2 py-0.5 text-[10px]';

const paperLink = publicationRecords[0]?.link;

const LAB_CONTENT: Record<LabLane, LabLaneContent> = {
  Papers: {
    heading: 'Papers',
    description:
      'Research paper under review that contains records that document systems thinking, data engineering, model framing, and deployment boundaries with publication-style rigor.',
    cards: [
      {
        title:
          'AgriFore Data-Driven Agricultural Market and Yield Modeling for Kamareddy District, Telangana',
        summary:
          'Research manuscript built around the AgriFore forecasting system, combining weather, crop production, and market transaction data into a full-stack agricultural analytics and prediction workflow for Telangana, with Kamareddy used as the district-level yield modeling case.',
        detail: [
          'AgriFore is presented in the manuscript as a data-centered agricultural prediction system designed to bring together district-level crop production records, daily weather observations, and Agricultural Market Committee transaction data into one structured forecasting pipeline. The core contribution is not just a single model, but a full analytical system that links raw heterogeneous agricultural data to cleaned feature tables, predictive models, descriptive visualizations, and an interactive deployment layer. The paper frames this as a practical decision-support system for Telangana agriculture, with Kamareddy serving as the district-level yield modeling focus.',
          'The manuscript describes two principal modeling directions. The first is a weather-to-yield XGBoost artifact for Kamareddy that estimates a yield per acre proxy from seasonal rainfall, humidity, and anomaly features. The second, and primary served component, is a market price XGBoost model that predicts monthly modal prices using lag features, rolling statistics, weather indicators, seasonal encodings, and arrivals data. The paper explicitly separates deployed inference from offline experimentation, which is important to how the project should be presented publicly because it shows system discipline rather than overclaiming deployed capabilities.',
          'Another important part of the manuscript is the engineering layer behind the modeling. The system uses a DuckDB-based ETL pipeline with staged SQL transformations to ingest and standardize horticulture, weather, and market data before building model-ready datasets. On top of that, the repository connects the data and model layers to a FastAPI backend and a Next.js dashboard, allowing users to explore trends, analyze arrival and price relationships, and use the served price model through an operational interface instead of treating the work as notebook-only research.',
          'In the Lab context, this paper should be shown as a manuscript-level systems record rather than just another project card. It represents the research expression of the wider AgriFore system, where data engineering, model design, evaluation framing, and deployment boundaries are all documented together. That makes it valuable not only as a publication-style output, but also as a structured explanation of how the system was designed, what is truly served, what remains experimental, and how the full forecasting stack is intended to work in practice.',
        ],
        meta: `${publicationRecords[0]?.issuer || 'IEEE-format manuscript'} | ${publicationRecords[0]?.date || 'Undated manuscript'}`,
        tags: ['Manuscript', 'AgriFore', 'Forecasting System'],
        link: paperLink,
        linkLabel: 'View Paper',
      },
    ],
  },
  Concepts: {
    heading: 'Concepts',
    description:
      'Conceptual system directions where architectural thinking, balancing logic, and future-use intelligence layers matter more than polished deployment.',
    cards: [
      {
        title: 'Quota-Based Iterative Balancing Sampler',
        summary:
          'Conceptual evolution of a quota-aware CSV sampling engine for ServiceNow-style case datasets, combining hierarchical priority enforcement, iterative balancing, fallback logic, and configuration-driven workflow design.',
        detail: [
          'This concept captures the evolution of a quota-based data sampling engine designed for structured ServiceNow-style incident datasets where simple random sampling is not enough. The core problem was to produce smaller representative datasets while preserving business-critical quota distributions across multiple categorical layers such as priority, category, and organizational grouping. Instead of treating sampling as a basic utility, the work evolved into a structured system for multi-priority constrained selection, deficit handling, and reproducible workflow execution.',
          'The concept is best understood as the mature design direction behind the Sopra Steria sampling work rather than as a single early implementation snapshot. Earlier stages established hierarchical quota allocation, fallback handling, and strict priority control, while the later conceptual direction pushed toward a stronger hybrid design. In this framing, the later version should be described as a Version 10 or Mark8-style conceptual completion, combining the precision-oriented selection logic associated with Mark4 and the stronger structural guarantees and layered quota handling associated with Mark6, with iterative balancing thinking carried forward from the Mark7 phase.',
          'From a systems perspective, the important idea is not just that rows are sampled, but that the engine behaves like a controlled balancing workflow. It supports hierarchical priorities, exact or tolerance-based quota satisfaction, strict and extended execution modes, logging, reproducible configuration, and user-facing validation through an interactive frontend. That makes it more meaningful than a one-off internal script, because it represents a broader design for explainable, configurable, and enterprise-usable constrained sampling.',
          'In the Lab context, this entry should be presented as a concept because its value lies in the algorithmic architecture and the model evolution itself. It shows how the problem moved from simple quota sampling toward a more deliberate balancing engine with strong structural rules, iterative refinement, and production-minded interface thinking. This is exactly the kind of concept that belongs in Lab rather than in the main Work section.',
        ],
        meta: 'Applied systems concept',
        tags: ['Data Systems', 'Sampling Logic', 'Quota Balancing', 'Streamlit', 'Configuration-Driven Workflow'],
      },
      {
        title: 'CropIQ',
        summary:
          'Prototype agricultural intelligence layer intended to become the reasoning and conversational brain behind the broader AgriFore agentic system, presented here as a future-facing mock version rather than a proof of concept.',
        detail: [
          'CropIQ should be presented as a strategic concept-prototype rather than as a finished standalone product. Its role is to act as the reasoning and interaction layer that could eventually power the broader agentic intelligence side of AgriFore. That framing is important because it positions the work correctly. This is not just a chatbot mockup and not a throwaway proof of concept. It is a forward-facing concept for how the forecasting and market intelligence stack could evolve into a more guided agricultural assistant.',
          'The frontend side of CropIQ is best understood as an interface for agricultural reasoning, not just data display. The user-facing value is in turning raw forecasting outputs, crop context, seasonal patterns, and advisory logic into something navigable and understandable. That means the concept should be explained through what kind of guided interaction it is trying to enable, and how it can sit above the rest of the AgriFore system as a decision-oriented conversational layer.',
          'On the backend and intelligence side, the important idea is future integration. CropIQ is meant to serve as the brain-like layer that could eventually orchestrate retrieval, interpretation, and response generation across the broader AgriFore ecosystem. Even in mock form, that makes it meaningful. It represents the architectural direction in which the forecasting platform becomes more agentic, more query-driven, and more capable of surfacing relevant agricultural reasoning instead of only charts and direct predictions.',
          'In the detailed view, emphasize that CropIQ is a future-use concept with a system role. It should be shown as the intended intelligence layer behind AgriFore, designed to translate complex agricultural signals into guided interaction. That is a stronger and more accurate framing than calling it a simple mock chatbot or a lightweight proof of concept.',
        ],
        meta: 'Future-use concept',
        tags: ['AgriFore', 'Agentic Direction', 'Agricultural Reasoning'],
      },
    ],
  },
  'Working Prototypes': {
    heading: 'Working Prototypes',
    description:
      'Working prototype interfaces and system layers that show how forecasting, accessibility, and intelligence-driven interaction are translated into product-facing technical surfaces.',
    cards: [
      {
        title: 'Agricultural Market Intelligence Dashboard',
        summary:
          'Working prototype dashboard layer for AgriFore that turns the underlying forecasting and market analysis pipeline into an interactive exploration surface for prices, arrivals, and prediction workflows.',
        detail: [
          'This working prototype represents the interactive dashboard layer of the broader AgriFore system. The frontend is designed to expose structured agricultural analytics in a way that is easier to explore than raw datasets or model notebooks, especially for users who want to move between descriptive analysis, market history, and predictive outputs in one interface. Rather than acting as a single static dashboard, it is intended as the usable product surface of the forecasting stack.',
          'The frontend presents market trends, crop-level exploration, and prediction-oriented views that sit on top of a backend serving processed agricultural data. On the backend side, the workflow connects model-ready datasets and forecasting logic to API endpoints, so the dashboard is not just visual decoration but an operational layer over real preprocessing and model artifacts. The dashboard therefore matters as a working prototype because it demonstrates how the forecasting system would actually be consumed.',
          'What should be emphasized in the detailed view is the translation from analytical backend to usable interface. The important point is not every modeling detail, but the fact that the frontend makes the system legible. Users are shown trends, relationships, and prediction outputs in a guided way, which turns a technically strong backend into a product-like experience.',
          'This working prototype should therefore be explained as the visible intelligence layer of AgriFore, where forecasting, descriptive analytics, and model-backed decision support are presented as one coherent interface rather than a scattered collection of scripts and charts.',
        ],
        meta: 'Working prototype system layer',
        tags: ['AgriFore', 'Dashboard', 'Market Intelligence'],
        link: 'https://github.com/arjoneelghosh/AgriFore',
        linkLabel: 'View GitHub',
      },
      {
        title: 'FlightFinder AI',
        summary:
          'Accessibility-oriented adaptive flight booking working prototype that combines role-based interfaces, sign language support, voice interaction, conversational search, and real-time flight retrieval into one guided booking experience.',
        detail: [
          'FlightFinder AI is a working prototype built around the idea that a booking system should adapt to the user rather than forcing every user into the same interface. The frontend is designed as an accessibility-first flight search surface that changes how users interact depending on whether they are using the system as a deaf or mute user, a blind user, or a standard user. This makes the working prototype valuable not only as a travel interface, but as a product exploration into adaptive accessibility.',
          'On the frontend side, the system brings together multiple interaction modes including chat-driven search, sign-language-based input, and voice-based interaction. The user is shown a guided interface rather than a traditional dense booking form, and the visible surface is organized around understanding intent and helping the user complete a search in the most natural way available to them. The role-adaptive UI is one of the most important parts of the working prototype because it changes the product experience itself, not just the input method.',
          'On the backend and intelligence side, the project combines conversational interpretation with structured flight retrieval. The system is intended to use a GPT-4 style conversational agent to interpret travel intent and pair that with external flight search through the Amadeus API, while the sign-language flow is supported through real-time detection and recognition logic. In other words, the working prototype is not just a frontend shell and not just a computer vision demo either. It is a joined interaction stack where accessibility-aware input, conversational understanding, and live travel data all meet in one product path.',
          'In the detailed view, the emphasis should stay on what is visible and what it means. The user sees an adaptive interface, input-specific interaction modes, and a guided result flow that turns accessibility support into a practical booking assistant. That makes FlightFinder AI a strong working prototype because it demonstrates how AI, APIs, and accessibility-driven UI design can work together inside a product that has clear real-world use.',
        ],
        meta: 'Accessibility working prototype',
        tags: ['Accessibility', 'Conversational Search', 'Computer Vision'],
        link: 'https://github.com/arjoneelghosh/Disable_Friendly_Flight_Booking',
        linkLabel: 'View GitHub',
      },
      {
        title: 'R-Style Forecast Tool for Business Metric Analysis',
        summary:
          'Business forecasting working prototype shaped by real internship work, combining automated analytical workflows, Prophet-based forecasting, and dashboard-style reporting into a productized analytics surface.',
        detail: [
          'This working prototype comes out of internship work focused on data mining, pattern recognition, and forecasting pipelines for business-facing analytical use cases. It should be described as the product-facing expression of that work rather than as a raw internship task. The frontend is meant to present a forecasting workflow that feels like a usable analytical tool, where data exploration, forecast generation, and reporting outputs can be consumed in a structured interface.',
          'The most important system idea behind this working prototype is workflow reduction. Instead of treating forecasting as an isolated notebook activity, the tool reflects an approach where repeated reporting and client-specific analytical steps are turned into a more streamlined process. The forecasting core was built using Prophet-based modeling, and the surrounding product layer is there to make those results easier to run, inspect, and present. That is why this working prototype matters. It shows the move from model-building into repeatable analytics delivery.',
          'On the backend and analytical side, the project is grounded in forecasting pipelines, automated reporting logic, and business data processing rather than only generic dashboards. The value is in combining model generation with reusable reporting structure so that analytical work can scale more cleanly across recurring use cases. In the detailed view, this should be framed as a workflow intelligence working prototype that reduces manual analytical overhead rather than just a visual forecasting demo.',
          'What the user sees should be explained in clear practical terms. They are looking at a forecasting tool designed to make business metric analysis more direct, where historical patterns, predicted trajectories, and dashboard outputs are shown in a way that supports decision-making and recurring reporting. That makes the working prototype relevant because it connects analytical rigor with product usefulness.',
        ],
        meta: 'Forecasting workflow working prototype',
        tags: ['Prophet', 'Analytics Workflow', 'Reporting'],
        link: 'https://github.com/arjoneelghosh/R-studio_replica',
        linkLabel: 'View GitHub',
      },
    ],
  },
};

const LabPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabLane>('Papers');
  const [previewCard, setPreviewCard] = useState<LabEntry | null>(null);
  const [focusCard, setFocusCard] = useState<LabEntry | null>(null);

  const currentSection = LAB_CONTENT[activeTab];
  if (!currentSection) return null;

  return (
    <div className="bg-page min-h-screen relative">
      <ParticleField />
      <CompactRing />

      <div className="relative z-10 max-w-5xl mx-auto pl-9 pr-8 py-20 lg:pl-14 lg:pr-14 lg:py-28">
        <SectionHeading
          heading="Lab"
          description="This page contains my Research Paper, Concept I have worked on, and a few working prototypes as Proof of Concept demonstration of existing concepts"
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as LabLane)}
        />

        <div className="mb-10 glass-panel p-6 animate-fade-in">
          <h3 className="font-heading text-base font-medium text-navy-100 mb-1">
            {currentSection.heading}
          </h3>
          <p className="text-navy-400 text-sm leading-relaxed">
            {currentSection.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentSection.cards.map((card, i) => (
            <GlowCard
              key={card.title}
              delay={i * 80}
              onClick={() => setPreviewCard(card)}
              className="flex flex-col"
            >
              <p className="text-navy-500 text-[10px] uppercase tracking-wider mb-2">
                {activeTab === 'Papers'
                  ? 'Manuscript record'
                  : activeTab === 'Concepts'
                    ? `Concept ${i + 1}`
                    : `Working Prototype ${i + 1}`}
              </p>

              <h3 className="font-heading text-sm font-semibold text-navy-50 mb-2">
                {card.title}
              </h3>

              <p className="text-navy-300 text-sm leading-relaxed line-clamp-4 mb-4 flex-1">
                {card.summary}
              </p>

              {card.meta && (
                <span className={`${LAB_META_CLASS} mb-3`}>
                  {card.meta}
                </span>
              )}

              {card.tags && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className={LAB_TAG_CLASS}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </GlowCard>
          ))}
        </div>
      </div>

      <PreviewPanel
        isOpen={!!previewCard}
        onClose={() => setPreviewCard(null)}
        onDeepen={() => {
          if (previewCard) {
            setFocusCard(previewCard);
            setPreviewCard(null);
          }
        }}
        title={previewCard?.title || ''}
        deepenLabel={
          activeTab === 'Papers'
            ? 'View Full Manuscript Record'
              : activeTab === 'Concepts'
                ? 'View Full Concept Detail'
              : 'View Full Working Prototype Detail'
        }
      >
        {previewCard && (
          <>
            <p className="text-navy-100 text-sm font-medium mb-2">
              {previewCard.summary}
            </p>
            {previewCard.meta && (
              <p className="text-navy-400 text-xs mb-3">{previewCard.meta}</p>
            )}
            {previewCard.tags && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {previewCard.tags.map((tag) => (
                  <span
                    key={tag}
                    className={LAB_PREVIEW_TAG_CLASS}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-navy-300 text-sm">
              {previewCard.detail[0]}
            </p>
            {previewCard.link && (
              <div className="mt-8 flex items-center gap-4">
                <a
                  href={previewCard.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-button-muted px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-250 inline-flex items-center justify-center"
                >
                  {previewCard.linkLabel || 'Open'}
                </a>
              </div>
            )}
          </>
        )}
      </PreviewPanel>

      <FocusPanel
        isOpen={!!focusCard}
        onClose={() => setFocusCard(null)}
        title={focusCard?.title || ''}
      >
        {focusCard && (
          <div className="space-y-6">
            {focusCard.detail.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-navy-200 leading-relaxed">
                {paragraph}
              </p>
            ))}
            {(focusCard.meta || focusCard.tags) && (
              <div className="theme-divider pt-4 border-t space-y-4">
                {focusCard.meta && <p className="text-navy-400 text-sm">{focusCard.meta}</p>}
                {focusCard.tags && (
                  <div className="flex flex-wrap gap-2">
                    {focusCard.tags.map((tag) => (
                      <span
                        key={tag}
                        className="theme-tag-accent text-xs px-3 py-1 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            {focusCard.link && (
              <div className="theme-divider pt-4 border-t">
                <a
                  href={focusCard.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-button-accent px-4 py-2 rounded-xl text-sm font-medium transition-all duration-250 w-fit inline-block"
                >
                  {focusCard.linkLabel || 'Open'}
                </a>
              </div>
            )}
          </div>
        )}
      </FocusPanel>
    </div>
  );
};

export default LabPage;
