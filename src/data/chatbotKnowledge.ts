/**
 * Normalized Knowledge File for Chatbot Retrieval
 * Grounded strictly in local portfolio data.
 * No unsupported claims, links, or statuses.
 */

export const chatbotKnowledge = {
  site: {
    ownerName: "Arjoneel Ghosh",
    headline: "Machine Learning Engineer and Full-Stack Developer",
    shortBio: "I build machine learning systems and full stack products, with a focus on forecasting, computer vision, and data driven tools that turn complex technical work into usable and credible experiences.",
    sections: ["Projects", "Profile", "Experience", "Connect", "Ask", "Lab"],
    ringNavigationLabels: ["Projects", "Profile", "Experience", "Connect", "Ask", "Lab"],
  },
  siteMeta: {
    portfolioWebsite: {
      id: "portfolio-website",
      label: "Portfolio Website",
      summary: "This website is Arjoneel Ghosh's portfolio. It brings together project work, profile context, experience records, Lab material, contact routes, and a dedicated Ask page for grounded portfolio questions.",
      bullets: [
        "Projects is the main project shelf, covering DS/ML systems, full-stack product work, research-led work, and archive entries.",
        "Profile explains positioning, grouped skills, education, resume context, achievements, and public record layers.",
        "Experience holds internships, research, leadership, and related certificate-backed evidence.",
        "Lab extends the portfolio with papers, concepts, and working prototypes that complement the main project shelf.",
        "Ask is the dedicated local assistant surface, while Connect holds the published public destinations."
      ],
      related: ["Projects", "Profile", "Experience", "Lab", "Connect", "Ask"]
    },
    portfolioSummary: {
      id: "portfolio-summary",
      label: "Portfolio Summary",
      summary: "Arjoneel Ghosh's portfolio presents him as a machine learning engineer and full-stack developer, with emphasis on forecasting systems, assistive computer vision, data tooling, and product-oriented technical delivery.",
      bullets: [
        "The strongest visible work spans DS/ML systems, full-stack product workflows, and applied AI with evidence-backed project summaries.",
        "Profile and Experience add education, grouped skills, internships, leadership, and supporting record layers.",
        "Lab captures paper-backed work, concept-stage ideas, and prototype material that does not sit on the main project shelf in the same way.",
        "Ask provides a grounded way to explore the same portfolio corpus through guided prompts and typed questions."
      ],
      related: ["Projects", "Profile", "Experience", "Lab", "Ask"]
    },
    portfolioStrengths: {
      id: "portfolio-strengths",
      label: "Portfolio Strengths",
      summary: "The strongest signals in this portfolio are evidence-backed DS/ML depth, credible product-facing execution, and practical tooling work rather than one narrow single-project story.",
      bullets: [
        "Forecasting and DS/ML depth is strongly evidenced through AgriFore, the R Styled Forecast Tool for Business Metrics, and the Priority-Based CSV Sampler.",
        "Applied AI and accessibility work are clearly represented through SignChat and FlightFinder AI, which makes the portfolio broader than a pure forecasting-only profile.",
        "The project set is supported by education, internship records, grouped skills, certifications, and Lab material, so the portfolio does not rely on project screenshots alone.",
        "There is also a useful balance between model-led work, internal-style tooling, and full-stack product surfaces."
      ],
      related: ["Projects", "Profile", "Experience", "Lab"]
    },
    portfolioWeaknesses: {
      id: "portfolio-weaknesses",
      label: "Portfolio Gaps",
      summary: "The weaker signals in this portfolio are mostly evidence and packaging gaps rather than a lack of technical range.",
      bullets: [
        "Some projects are stronger as prototypes, guided demos, or concept-backed systems than as fully evidenced production deployments.",
        "Breadth is high across DS/ML, accessibility, tooling, and product work, but depth can look uneven unless the viewer studies the stronger case-study details.",
        "Public production evidence, long-running deployed proof, or externally validated usage signals are not equally visible across the whole project set.",
        "Recruiters may still need help separating mature delivery signals from exploratory or Lab-stage work."
      ],
      related: ["Projects", "Lab", "Profile"]
    },
    portfolioSwot: {
      id: "portfolio-swot",
      label: "Portfolio SWOT Analysis",
      summary: "This SWOT view stays grounded in what the portfolio actually shows rather than making generic MBA-style claims.",
      bullets: [
        "Strengths: strong forecasting and DS/ML evidence, practical data tooling, accessibility-oriented AI work, and enough full-stack delivery to show product thinking.",
        "Weaknesses: some portfolio signals are still prototype or concept-led, and not every project shows the same level of production maturity or external proof.",
        "Opportunities: stronger recruiter packaging, deeper case-study framing, clearer production-vs-prototype labeling, and more public demo or deployment evidence would raise clarity.",
        "Risks / Threats: reviewers may misread breadth as lack of focus, or may blur together Lab-stage exploration and production-ready work if the evidence hierarchy is not obvious."
      ],
      related: ["Projects", "Profile", "Experience", "Lab"]
    },
    portfolioStructure: {
      id: "portfolio-structure",
      label: "Portfolio Structure",
      summary: "The website is organized around the main portfolio sections Projects, Profile, Experience, Connect, Ask, and Lab.",
      bullets: [
        "Projects holds the main project records and case-study flow.",
        "Profile covers positioning, skills, education, grouped tech stack, and public links.",
        "Experience holds internships, leadership, and related evidence.",
        "Lab is organized into Papers, Concepts, and Working Prototypes.",
        "Ask is the dedicated chatbot surface for guided and typed portfolio questions."
      ],
      related: ["Projects", "Profile", "Experience", "Lab", "Ask"]
    },
    askPageWorkflow: {
      id: "ask-page-workflow",
      label: "Ask Page Workflow",
      summary: "The Ask page is a split assistant workspace with a guided FAQ rail on the left and the conversation area on the right.",
      bullets: [
        "The left FAQ rail acts as a guided question bank.",
        "Clicking a FAQ sends that prompt into the same answer pipeline used by typed chat input.",
        "The right side shows the conversation, keeps the composer pinned at the bottom, and can carry short follow-up context within the current chat session."
      ],
      related: ["Ask", "FAQ rail", "Chat"]
    },
    chatbotBehavior: {
      id: "chatbot-behavior",
      label: "Chatbot Behavior",
      summary: "This portfolio assistant is scoped to portfolio questions rather than general-purpose chat.",
      bullets: [
        "It answers portfolio questions about projects, experience, Lab, records, skills, education, navigation, and Ask-page workflow.",
        "FAQ clicks and typed prompts both go through the same grounded answer path.",
        "Short follow-up questions can reuse current session context when the prior subject is clear.",
        "Unsupported questions are refused instead of being guessed."
      ],
      related: ["Ask", "Projects", "Experience", "Lab"]
    },
    chatbotGrounding: {
      id: "chatbot-grounding",
      label: "Chatbot Grounding",
      summary: "The assistant is grounded in the local portfolio knowledge loaded into this site.",
      bullets: [
        "Retrieval happens against the local portfolio data, bundled content, and bundled docs that ship with this site.",
        "Broader portfolio questions can use local knowledge-search when direct matching is not enough.",
        "If retrieved context is weak or unsupported, the assistant falls back to a grounded refusal.",
        "The assistant does not claim external facts, hidden metrics, or unsupported project details."
      ],
      related: ["Ask", "Local knowledge only"]
    },
    faqVsChat: {
      id: "faq-vs-chat",
      label: "FAQ Rail and Chat",
      summary: "The FAQ rail is a guided prompt layer, while the chat input lets the user ask custom portfolio questions.",
      bullets: [
        "The FAQ rail is not a separate answer system.",
        "Clicking a FAQ prompt sends that question into the same pipeline used by typed chat.",
        "Both routes render answers in the same conversation area."
      ],
      related: ["FAQ rail", "Chat", "Ask"]
    },
    chatbotScope: {
      id: "chatbot-scope",
      label: "Chatbot Scope",
      summary: "Only the Ask page has chatbot capability in the current portfolio implementation.",
      bullets: [
        "Other pages do not expose a chatbot launcher or open a chatbot panel.",
        "Ask is the dedicated chatbot-enabled workspace.",
        "That keeps the assistant scoped to one page instead of making it a global site widget."
      ],
      related: ["Ask", "Portfolio Structure"]
    },
    navigationSystem: {
      id: "navigation-system",
      label: "Navigation System",
      summary: "The ring is the persistent navigation system for moving between the major sections of the portfolio.",
      bullets: [
        "The outer ring nodes map to the main portfolio sections Projects, Profile, Experience, Connect, Ask, and Lab.",
        "On the landing page the ring acts as the main section-switching surface, while inner pages keep a compact version available.",
        "On inner pages, the AG or Home center returns to the landing page.",
        "The ring is separate from the Ask chatbot and stays available as site navigation."
      ],
      related: ["Navigation ring", "Portfolio Structure"]
    },
    chatbotPowering: {
      id: "chatbot-powering",
      label: "What Powers the Chatbot",
      summary: "The Ask assistant runs on local intent routing, local portfolio retrieval, and bundled knowledge-search inside this site.",
      bullets: [
        "The runtime source of truth is the local portfolio corpus bundled into this site.",
        "Questions are matched across projects, profile, education, experience, Lab, records, site-meta, and Ask workflow topics.",
        "Follow-up questions can reuse short in-session context from the current chat without leaving the local grounded pipeline."
      ],
      related: ["Chatbot Grounding", "Ask Page Workflow"]
    }
  },
  projects: [
    {
      id: "proj-01",
      slug: "agrifore",
      title: "AgriFore",
      shortTitle: "AgriFore",
      section: "projects",
      category: "DS/ML",
      workBuckets: ["DS/ML"],
      disciplineTags: ["DS", "ML", "Forecasting"],
      subcategories: ["Featured", "Forecasting", "Agricultural Intelligence"],
      status: "Completed",
      featured: true,
      priority: 1,
      summary: "Agricultural market-intelligence and forecasting system with dashboard analytics, commodity-level trend analysis, and API-backed price prediction workflows.",
      previewSummary: "Forecasting platform with real dashboard analytics, cluster views, commodity trends, and prediction output.",
      overview: "AgriFore is an agricultural market-intelligence project built around DuckDB ETL, forecasting experiments, FastAPI endpoints, and a dashboard that supports market exploration, cluster analysis, and point prediction.",
      problem: "Agricultural market and weather data are noisy, seasonal, and region-sensitive, so useful forecasting requires a repeatable pipeline instead of isolated notebooks or one-off charts.",
      approach: [
        "Prepare mandi and weather data through an explicit DuckDB SQL pipeline before model training.",
        "Use a staged market-price workflow with a base model and a residual adjustment layer rather than a single-pass forecast.",
        "Expose analytics and prediction paths through FastAPI, then consume them from a dashboard and forecast form."
      ],
      outcomes: [
        "Shows a real split between offline data work and online analytics delivery.",
        "Makes the forecasting workflow concrete through API-backed dashboard views and a prediction form.",
        "Remains portfolio-safe with conservative wording because deployment maturity and artifact freshness are still treated as uncertain."
      ],
      techStack: ["Python", "DuckDB", "SQL", "FastAPI", "Next.js", "XGBoost", "Streamlit"],
      links: { live: "https://kamareddyprojectionfrontend.vercel.app" },
      tags: ["DuckDB", "FastAPI", "Next.js", "XGBoost"],
      roleHints: [
        { audience: "ml", note: "Strongest evidence-backed ML and data-systems project in the current set." },
        { audience: "full-stack", note: "Useful when discussing backend-serving and dashboard integration alongside modeling." }
      ],
      archive: false
    },
    {
      id: "proj-02",
      slug: "signchat",
      title: "SignChat",
      shortTitle: "SignChat",
      section: "projects",
      category: "DS/ML",
      workBuckets: ["DS/ML"],
      disciplineTags: ["ML", "CV"],
      subcategories: ["Assistive Tech", "Computer Vision"],
      status: "Prototype",
      featured: false,
      priority: 2,
      summary: "Thread-based sign-recognition prototype that turns webcam hand landmarks into transcript text with per-language model loading and buffered smoothing.",
      previewSummary: "Assistive CV prototype with a clear webcam-to-transcript workflow and conservative model-loading design.",
      overview: "SignChat is a chat-style sign-recognition interface built with Streamlit, streamlit-webrtc, MediaPipe Hands, and per-language Keras model loading.",
      problem: "A sign-recognition interface is more usable when webcam inference, transcript state, and language selection live inside a conversation workflow instead of a raw classifier demo.",
      approach: [
        "Organize the experience around conversation threads with language context rather than a single static prediction screen.",
        "Convert MediaPipe hand landmarks into a fixed 68-dimensional feature vector before model inference.",
        "Stabilize predictions through thresholding and buffered smoothing, with a mock-safe fallback when a language model is absent."
      ],
      outcomes: [
        "Makes the real-time recognition pipeline legible through a user-facing threaded interface.",
        "Demonstrates CV preprocessing, model loading, and session-aware UX in one prototype.",
        "Stays conservative by describing the app as a sign-recognition prototype rather than a complete multilingual translator."
      ],
      techStack: ["Python", "Streamlit", "streamlit-webrtc", "MediaPipe", "TensorFlow", "Keras", "OpenCV"],
      links: {},
      tags: ["Streamlit", "MediaPipe", "TensorFlow", "Computer Vision"],
      roleHints: [
        { audience: "ml", note: "Strongest assistive computer-vision project in the current portfolio set." },
        { audience: "research", note: "Useful when explaining real-time inference, feature engineering, and prototype scoping limits." }
      ],
      archive: false
    },
    {
      id: "proj-03",
      slug: "flightfinder-ai",
      title: "FlightFinder AI",
      shortTitle: "FlightFinder AI",
      section: "projects",
      category: "Full Stack",
      workBuckets: ["DS/ML", "Full Stack"],
      disciplineTags: ["DS/ML", "Full Stack", "Accessibility"],
      subcategories: ["Featured", "Accessibility", "Full Stack Product"],
      status: "Completed",
      featured: true,
      priority: 3,
      summary: "Accessibility focused flight search and booking assistant with role-aware workflows, conversational search, structured flight retrieval, and sign or voice supported interaction paths.",
      previewSummary: "Accessibility-aware travel assistant that combines guided booking, conversational interpretation, and structured flight retrieval in a product-style workflow.",
      overview: "FlightFinder AI is an accessibility focused travel workflow prototype that brings together chat based search, voice support, sign language support, and trip history into one product style interface.",
      problem: "Travel interfaces are often built for a single interaction style, which makes booking harder for users who need voice support, sign based interaction, or other accessibility aware input paths.",
      approach: [
        "Design the product around separate accessibility modes rather than a single generic booking surface.",
        "Use chat based interaction as the main workflow while supporting voice and sign oriented input paths where relevant.",
        "Keep booking and trip history visible so the system feels like a guided product rather than a disconnected demo."
      ],
      outcomes: [
        "Shows accessibility aware product design beyond a standard chat interface.",
        "Combines multimodal interaction ideas with a clearer end user workflow.",
        "Should still be framed as a prototype because production level booking integration and backend depth are not fully evidenced in the current material."
      ],
      techStack: ["React", "TypeScript", "FastAPI", "OpenRouter", "Amadeus API", "TensorFlow", "OpenCV", "MediaPipe"],
      links: {},
      tags: ["React", "TypeScript", "Conversational Search", "Accessibility Workflows"],
      roleHints: [
        { audience: "ml", note: "Relevant when discussing AI-assisted interpretation, multimodal interaction, and structured flight retrieval inside a product surface." },
        { audience: "full-stack", note: "Best positioned as an accessibility-focused product workflow rather than as a backend depth story." },
        { audience: "recruiter", note: "Strong featured piece for discussing user-centered design and guided product flow." }
      ],
      archive: false
    },
    {
      id: "proj-04",
      slug: "surgemedi",
      title: "SurgeMedi",
      shortTitle: "SurgeMedi",
      section: "projects",
      category: "Full Stack",
      workBuckets: ["Full Stack"],
      disciplineTags: ["Full Stack", "Catalog UI"],
      subcategories: ["Catalog UI"],
      status: "Completed",
      featured: false,
      priority: 4,
      summary: "Business-facing medical supplies catalog and inquiry website built for a real shop context, with structured product browsing, product-detail presentation, and contact-driven conversion flow.",
      previewSummary: "Real deployed catalog website with product discovery, business identity, and inquiry workflow.",
      overview: "SurgeMedi is a deployed medical supplies catalog website built to support a real shop presence, helping users browse products, view business information, and submit inquiries within the broader ExportersIndia platform context.",
      problem: "Catalog sites need structured discovery and detail views so users can move from broad category browsing to specification-heavy product review without getting lost.",
      approach: [
        "Model the inventory in a structured frontend data file rather than scattering product content across pages.",
        "Support category filtering and text search directly in the catalog experience.",
        "Reuse the same product dataset in detailed route views with specifications, related items, and a quote-request call to action."
      ],
      outcomes: [
        "Provides a coherent browse-filter-detail flow that is easy to explain in a portfolio.",
        "Shows frontend information architecture and reusable product-data modeling.",
        "Avoids overclaiming backend or client context, which is still unverified in the source evidence."
      ],
      techStack: ["React", "TypeScript", "React Router", "Tailwind CSS", "Product Catalog UI"],
      links: { live: "https://surgemedi.vercel.app" },
      tags: ["React", "Catalog Design", "Product Data"],
      roleHints: [
        { audience: "full-stack", note: "Best read as a frontend catalog build unless backend evidence is added later." },
        { audience: "recruiter", note: "A straightforward archive project that shows product UI structure and implementation discipline." }
      ],
      archive: true
    },
    {
      id: "proj-05",
      slug: "priority-based-csv-sampler",
      title: "Priority-Based CSV Sampler",
      shortTitle: "CSV Sampler",
      section: "projects",
      category: "DS/ML",
      workBuckets: ["DS/ML"],
      disciplineTags: ["DS", "Data Tooling"],
      subcategories: ["Featured", "Data Tooling"],
      status: "Completed",
      featured: true,
      priority: 5,
      summary: "Config-driven CSV sampling utility that applies priority buckets, quota allocation, fallback logic, and export in a Streamlit workflow.",
      previewSummary: "Practical internal-style data utility with quota-aware sampling and YAML-backed repeatability.",
      overview: "Priority-Based CSV Sampler is a Streamlit utility for drawing controlled samples from CSV data while preserving priority rules and reusable configuration.",
      problem: "Simple random sampling is often not enough when teams need repeatable subsets that respect category priorities and quota targets.",
      approach: [
        "Let users upload a CSV and optionally restore prior sampling rules from YAML.",
        "Expose multiple priority levels, value-based allocation, and sample preview inside one Streamlit workflow.",
        "Handle quota shortfalls through backfill and fallback logic instead of silently failing or returning misleading samples."
      ],
      outcomes: [
        "Shows a concrete data-operations workflow rather than a generic dashboard shell.",
        "Demonstrates configuration persistence, preview, export, and edge-case handling in one tool.",
        "Keeps the business context intentionally general because the professional usage setting is still unconfirmed."
      ],
      techStack: ["Python", "Pandas", "Streamlit", "PyYAML", "Altair", "CSV Sampling Logic", "Quota Balancing"],
      links: {},
      tags: ["Streamlit", "Pandas", "YAML", "Sampling"],
      roleHints: [
        { audience: "ml", note: "Useful for showing practical data tooling beyond modeling demos." },
        { audience: "recruiter", note: "Best framed as an internal-style utility with strong edge-case handling." }
      ],
      archive: false
    },
    {
      id: "proj-06",
      slug: "cropiq",
      title: "CropIQ",
      shortTitle: "CropIQ",
      section: "projects",
      category: "Full Stack",
      workBuckets: ["Full Stack"],
      disciplineTags: ["Full Stack", "Domain Assistant"],
      subcategories: ["Archive", "Agriculture Assistant"],
      status: "Prototype",
      featured: false,
      priority: 6,
      summary: "Conversational crop planning prototype with chat state, crop specific context, and rule based advisory flows for harvest timing, pricing, and pesticide related questions.",
      previewSummary: "A narrower and more structured assistant than a generic chatbot, because each conversation is tied to crop plans, local context, and predefined advisory pathways.",
      overview: "CropIQ is a crop advisory chat workspace built around practical questions such as harvest timing, expected pricing, and pesticide related decisions.",
      problem: "Generic chat interfaces are weak for agricultural decision support because useful guidance depends on crop context, local conditions, and a constrained advisory flow rather than open ended conversation alone.",
      approach: [
        "Create crop specific conversations from a harvest planning flow rather than a generic empty chat interface.",
        "Bind each conversation to domain context such as crop, subdistrict, sow date, and acreage.",
        "Use rule based advisory and retrieval logic to handle focused agricultural prompts while keeping future retrieval grounded expansion open."
      ],
      outcomes: [
        "Demonstrates productized conversational state inside a domain specific agricultural interface.",
        "Shows a rule based advisory workflow with clear prompt pathways and handled edge cases.",
        "Should be framed conservatively because the current version is still constrained in prompt coverage and the stronger long term direction would be a broader retrieval grounded system."
      ],
      techStack: ["React", "TypeScript", "Zustand", "Rule-Based Advisory Logic", "OpenRouter", "Context-Aware Chat State"],
      links: {},
      tags: ["React", "TypeScript", "Zustand", "Rule Based Advisory Logic"],
      roleHints: [
        { audience: "full-stack", note: "Good archive piece for structured product flow in a domain-specific assistant." },
        { audience: "research", note: "Useful when discussing constrained conversational systems and domain state handling." }
      ],
      archive: true
    },
    {
      id: "proj-07",
      slug: "loanone-ai",
      title: "LoanOne AI",
      shortTitle: "LoanOne AI",
      section: "projects",
      category: "Full Stack",
      workBuckets: ["Full Stack"],
      disciplineTags: ["Full Stack", "Fintech Product"],
      subcategories: ["Fintech Product"],
      status: "Prototype",
      featured: false,
      priority: 7,
      summary: "Guided loan advisory and onboarding prototype built around structured application flows, product style lending screens, and assisted user onboarding.",
      previewSummary: "Cleaner than a generic loan landing page because it combines product style browsing, application flow, and guided onboarding support inside one lending prototype.",
      overview: "LoanOne AI is a lending workflow prototype that brings together a public landing surface, application steps, and guided onboarding elements inside a product style finance experience.",
      problem: "Financial onboarding is often intimidating and fragmented, so a more guided lending interface can make application steps feel clearer and more accessible.",
      approach: [
        "Design a product style public landing page that explains the offering and application process clearly.",
        "Add structured onboarding and progress based application steps instead of a single static form.",
        "Layer in guided support elements so the workflow feels more assisted than a standard brochure site."
      ],
      outcomes: [
        "Shows a fuller fintech product flow rather than a simple marketing page.",
        "Makes onboarding, application, and guidance part of one coherent prototype.",
        "Should still be framed as a prototype because production grade backend, lending compliance, and operational depth are not fully evidenced in the current material."
      ],
      techStack: ["React", "TypeScript", "Tailwind CSS", "Product Workflow UI", "Guided Onboarding Flow"],
      links: {},
      tags: ["React", "TypeScript", "Product Workflow UI", "Fintech Prototype"],
      roleHints: [
        { audience: "full-stack", note: "Useful for discussing product workflow design and onboarding structure in a finance context." },
        { audience: "recruiter", note: "Best framed as a guided fintech prototype, not a production lending system." }
      ],
      archive: true
    },
    {
      id: "proj-08",
      slug: "rstyled-forecast-tool",
      title: "R Styled Forecast Tool for Business Metrics",
      shortTitle: "R Styled Forecast Tool",
      section: "projects",
      category: "DS/ML",
      workBuckets: ["DS/ML"],
      disciplineTags: ["DS", "ML", "Forecasting"],
      subcategories: ["Featured", "Forecasting Workflow"],
      status: "Prototype",
      featured: true,
      priority: 8,
      summary: "Configurable forecasting workbench that supports CSV upload, preprocessing, model training, evaluation, and time series forecasting across multiple analytical workflows.",
      previewSummary: "Broader than a single domain dashboard because the workflow supports reusable forecasting steps, flexible input data, and multiple analysis paths from preprocessing to model output.",
      overview: "R Styled Forecast Tool for Business Metrics is a multi model forecasting workbench designed for exploratory analysis, preprocessing, supervised learning, and time series forecasting inside one technical interface.",
      problem: "Analytical forecasting work often stays scattered across notebooks and one off scripts, which makes it harder to reuse workflows across different datasets and forecasting tasks.",
      approach: [
        "Support CSV based input so the workflow is not limited to one hardcoded dataset.",
        "Expose preprocessing, encoding, exploratory analysis, model training, and time series forecasting as connected steps.",
        "Allow the same base workflow to support narrower domain specific variants such as AQI oriented forecasting without defining the entire project around that variant."
      ],
      outcomes: [
        "Shows a real forecasting workflow from dataset input to evaluation and time series analysis.",
        "Makes the technical workbench visible as a reusable product style analytical surface.",
        "Should be treated as an archive prototype rather than a polished end user product because the current UI is still dense and experimentation oriented."
      ],
      techStack: ["Python", "Streamlit", "Pandas", "Prophet", "ARIMA", "Random Forest", "Data Preprocessing", "Forecasting Workflows"],
      links: {},
      tags: ["Python", "Streamlit", "ARIMA", "Prophet"],
      roleHints: [
        { audience: "ml", note: "Useful for discussing reusable forecasting workflows rather than a single hardcoded domain demo." },
        { audience: "research", note: "Good archive piece for exploratory model workflow and analytical interface design." }
      ],
      archive: false
    },
    {
      id: "proj-09",
      slug: "movie-recommendation-engine",
      title: "Movie Recommendation Engine",
      shortTitle: "Movie Recommendation Engine",
      section: "projects",
      category: "DS/ML",
      workBuckets: ["DS/ML"],
      disciplineTags: ["DS/ML", "Recommendation"],
      subcategories: ["Archive", "Recommendation System"],
      status: "Prototype",
      featured: false,
      priority: 9,
      summary: "Hybrid movie recommendation prototype that combines watched history, preference based matching, and explanation oriented recommendation flow inside a product style interface.",
      previewSummary: "More legible than a raw recommender demo because it turns recommendation logic into a watched history surface, ranked suggestion flow, and explanation driven user journey.",
      overview: "Movie Recommendation Engine is a recommendation prototype that layers a user facing discovery interface on top of matching logic inspired by collaborative and preference based recommendation patterns.",
      problem: "Recommender projects often stop at backend similarity output, which makes it hard to understand how recommendations are surfaced, explained, and explored by a user.",
      approach: [
        "Build a browse layer with movie cards and watched history instead of only exposing the recommendation result.",
        "Use recommendation panels and ranked matches to make the output easier to interpret.",
        "Keep explanation cues such as same actor or same genre visible so the system feels more understandable to a user."
      ],
      outcomes: [
        "Shows recommendation logic translated into an actual product flow.",
        "Combines watched history, recommendation ranking, and explanation oriented UI in one prototype.",
        "Should be framed conservatively as a hybrid recommendation prototype unless stronger backend evidence confirms a stricter collaborative filtering implementation."
      ],
      techStack: ["React", "TypeScript", "Collaborative Filtering", "Content-Based Filtering", "Recommendation Logic", "Interactive Filtering"],
      links: {},
      tags: ["React", "TypeScript", "Recommendation Logic", "Interactive Filtering"],
      roleHints: [
        { audience: "ml", note: "Best explained as a hybrid recommendation prototype with a stronger user-facing flow than a raw model demo." },
        { audience: "recruiter", note: "Useful archive item for showing recommendation logic translated into an interface people can actually read." }
      ],
      archive: true
    }
  ],
  experience: {
    internships: [
      {
        id: "exp-kpmg",
        section: "experience",
        type: "Internships",
        organization: "KPMG India Services LLP",
        role: "Intern",
        period: "02-Dec-24 to 28-Feb-25",
        location: "Noida, India",
        summary: "Worked on data mining, pattern recognition, forecasting workflows, and analytics automation in a structured internship environment, contributing to business-facing analytical delivery rather than a standalone personal project.",
        bullets: [
          "Worked on real-world datasets with a focus on extracting patterns, building forecasting workflows, and supporting analytical interpretation.",
          "Built automation-oriented reporting and analytics flows that helped reduce repeated manual effort in client-specific workflows.",
          "Developed Prophet-based forecasting work and dashboard-style analytical surfaces that strengthened the bridge between modeling and delivery.",
          "This experience is best represented as a structured internship record tied to professional workflow exposure rather than as an isolated independent build."
        ],
        tech: ["Python", "Prophet", "Data Mining", "Pattern Recognition", "Forecasting Workflows", "Analytics Automation", "Dashboarding"],
        certificateLink: true,
        certificateLabel: "View Internship Certificate"
      },
      {
        id: "exp-sopra-steria",
        section: "experience",
        type: "Internships",
        organization: "Sopra Steria India Limited",
        role: "Project Intern",
        period: "01-07-2025 to 01-11-2025",
        location: "Noida, India",
        summary: "Worked on a quota-driven CSV sampling engine for ServiceNow-style case datasets, focusing on hierarchical sampling logic, iterative balancing, configuration-driven execution, and a Streamlit-based interface for practical workflow use.",
        bullets: [
          "Built around a formal project titled 'Quota-Based Three-Phase Iterative Balancing Sampler for ServiceNow Cases' inside a company setting rather than as a purely personal utility.",
          "The system was designed to preserve multi-priority quota distributions across structured incident-style datasets while supporting fallback handling, constrained balancing, and reproducible configuration.",
          "The workflow combined algorithm design, configurable execution logic, and a user-facing Streamlit interface for sampling, validation, export, and result inspection.",
          "This internship record should stay grounded in the professional project context while still clearly connecting to the portfolio’s CSV sampler and balancing engine work."
        ],
        tech: ["Python", "Streamlit", "Pandas", "YAML", "JSON", "Configuration-Driven Workflow", "Quota Balancing", "ServiceNow"],
        relatedProjectSlugs: ["priority-based-csv-sampler"],
        certificateLink: true,
        certificateLabel: "View Internship Certificate"
      },
      {
        id: "exp-digisys-innosol",
        section: "experience",
        type: "Internships",
        organization: "DigiSys InnoSol Pvt. Ltd.",
        role: "Intern",
        period: "01-Jan-26 to 31-May-26",
        location: "Chennai, India",
        summary: "Worked on AI governance and compliance automation in the Artificial Intelligence department, focusing on preprocessing pipelines for multi-regional vendor risk data, multi-agent orchestration for artifact-to-question matching, and evidence-bound retrieval flows for draft compliance responses.",
        bullets: [
          "Engineered pandas preprocessing pipelines that standardized multi-regional vendor risk data using structural sanity checks, dynamic feature imputation, and Min-Max normalization to keep metric evaluation reliable.",
          "Contributed to a multi-agent AI orchestrator that automated artifact-to-question matching, streamlining sector-specific GRC workflows toward evidence-backed draft compliance responses.",
          "Worked on the design and validation of evidence-bound RAG flows, guardrail mechanisms, reliable state propagation, batch document processing, and retrieval-backed answer generation.",
          "This internship record is certificate-backed and best represented as structured professional AI-engineering exposure inside a company setting rather than as an independent personal build."
        ],
        tech: ["Python", "Pandas", "Multi-Agent Orchestration", "RAG Workflows", "Guardrails", "GRC Automation", "Data Preprocessing"],
        certificateLink: true,
        certificateLabel: "View Internship Certificate"
      }
    ],
    leadership: [
      {
        id: "exp-munsoc",
        section: "experience",
        type: "Leadership",
        organization: "SRMMUN Society",
        role: "Council Affairs",
        period: "Certificate-backed campus role",
        location: "SRM campus",
        summary: "Certificate-backed campus leadership entry kept conservative because the supporting context is narrower than the internship records.",
        bullets: [
          "Included as a formal leadership signal rather than expanded into a detailed role narrative.",
          "Detailed responsibilities and timeline remain intentionally limited until stronger supporting context is added."
        ],
        tech: ["Event Coordination", "Public Speaking"]
      },
      {
        id: "exp-dsa-2022-23",
        section: "experience",
        type: "Leadership",
        organization: "SRM Directorate of Student Affairs",
        role: "Committee Head",
        period: "2022-23",
        location: "SRM campus",
        summary: "Year-wise committee leadership record under the SRM Directorate of Student Affairs, kept concise and aligned with the broader leadership evidence style used on the page.",
        bullets: [
          "Presented as a formal year-specific committee leadership entry.",
          "Kept conservative because this section emphasizes role clarity over expanded narrative detail."
        ],
        tech: ["Committee Leadership", "Event Coordination"]
      },
      {
        id: "exp-dsa-2023-24",
        section: "experience",
        type: "Leadership",
        organization: "SRM Directorate of Student Affairs",
        role: "Committee Head",
        period: "2023-24",
        location: "SRM campus",
        summary: "Year-wise committee leadership record under the SRM Directorate of Student Affairs, maintained as a separate entry for clearer period-specific representation.",
        bullets: [
          "Presented as a formal year-specific committee leadership entry.",
          "Kept concise to remain uniform with the current Experience page evidence style."
        ],
        tech: ["Committee Leadership", "Event Coordination"]
      },
      {
        id: "exp-srmmunsoc-2022-23",
        section: "experience",
        type: "Leadership",
        organization: "SRMMUN Society",
        role: "Committee Head",
        period: "2022-23",
        location: "SRM campus",
        summary: "Year-wise SRMMUN Society committee leadership record added to make the leadership section reflect the full sequence of committee-head responsibilities.",
        bullets: [
          "Maintained as a period-specific leadership entry rather than folded into a single range.",
          "Kept evidence-backed and concise to match the rest of the Experience page."
        ],
        tech: ["Committee Leadership", "Public Speaking"]
      },
      {
        id: "exp-srmmunsoc-2023-24",
        section: "experience",
        type: "Leadership",
        organization: "SRMMUN Society",
        role: "Committee Head",
        period: "2023-24",
        location: "SRM campus",
        summary: "Year-wise SRMMUN Society committee leadership record continuing the period-specific representation of committee-head roles.",
        bullets: [
          "Maintained as a separate year entry for clarity.",
          "Presented conservatively in line with the rest of the leadership section."
        ],
        tech: ["Committee Leadership", "Public Speaking"]
      },
      {
        id: "exp-srmmunsoc-2024-25",
        section: "experience",
        type: "Leadership",
        organization: "SRMMUN Society",
        role: "Committee Head",
        period: "2024-25",
        location: "SRM campus",
        summary: "Year-wise SRMMUN Society committee leadership record for the latest committee-head period represented in the current local evidence set.",
        bullets: [
          "Maintained as a separate year entry for clearer period coverage.",
          "Kept aligned with the current Experience page style rather than expanded into a narrative-heavy role card."
        ],
        tech: ["Committee Leadership", "Public Speaking"]
      }
    ],
    research: []
  },
  lab: {
    papers: [
      {
        id: "lab-paper-agrifore",
        section: "lab",
        lane: "papers",
        title: "AgriFore Data-Driven Agricultural Market and Yield Modeling for Kamareddy District, Telangana",
        summary: "Research manuscript built around the AgriFore forecasting system, combining weather, crop production, and market transaction data into a full-stack agricultural analytics and prediction workflow for Telangana, with Kamareddy used as the district-level yield modeling case.",
        detail: [
          "AgriFore is presented in the manuscript as a data-centered agricultural prediction system designed to bring together district-level crop production records, daily weather observations, and Agricultural Market Committee transaction data into one structured forecasting pipeline. The core contribution is not just a single model, but a full analytical system that links raw heterogeneous agricultural data to cleaned feature tables, predictive models, descriptive visualizations, and an interactive deployment layer. The paper frames this as a practical decision-support system for Telangana agriculture, with Kamareddy serving as the district-level yield modeling focus.",
          "The manuscript describes two principal modeling directions. The first is a weather-to-yield XGBoost artifact for Kamareddy that estimates a yield per acre proxy from seasonal rainfall, humidity, and anomaly features. The second, and primary served component, is a market price XGBoost model that predicts monthly modal prices using lag features, rolling statistics, weather indicators, seasonal encodings, and arrivals data. The paper explicitly separates deployed inference from offline experimentation, which is important to how the project should be presented publicly because it shows system discipline rather than overclaiming deployed capabilities.",
          "Another important part of the manuscript is the engineering layer behind the modeling. The system uses a DuckDB-based ETL pipeline with staged SQL transformations to ingest and standardize horticulture, weather, and market data before building model-ready datasets. On top of that, the repository connects the data and model layers to a FastAPI backend and a Next.js dashboard, allowing users to explore trends, analyze arrival and price relationships, and use the served price model through an operational interface instead of treating the work as notebook-only research.",
          "In the Lab context, this paper should be shown as a manuscript-level systems record rather than just another project card. It represents the research expression of the wider AgriFore system, where data engineering, model design, evaluation framing, and deployment boundaries are all documented together. That makes it valuable not only as a publication-style output, but also as a structured explanation of how the system was designed, what is truly served, what remains experimental, and how the full forecasting stack is intended to work in practice."
        ],
        meta: "IEEE-format manuscript | Undated manuscript",
        tags: ["Manuscript", "AgriFore", "Forecasting System"],
        link: true,
        linkLabel: "View Paper"
      }
    ],
    concepts: [
      {
        id: "lab-concept-quota-sampler",
        section: "lab",
        lane: "concepts",
        title: "Quota-Based Iterative Balancing Sampler",
        summary: "Conceptual evolution of a quota-aware CSV sampling engine for ServiceNow-style case datasets, combining hierarchical priority enforcement, iterative balancing, fallback logic, and configuration-driven workflow design.",
        detail: [
          "This concept captures the evolution of a quota-based data sampling engine designed for structured ServiceNow-style incident datasets where simple random sampling is not enough. The core problem was to produce smaller representative datasets while preserving business-critical quota distributions across multiple categorical layers such as priority, category, and organizational grouping. Instead of treating sampling as a basic utility, the work evolved into a structured system for multi-priority constrained selection, deficit handling, and reproducible workflow execution.",
          "The concept is best understood as the mature design direction behind the Sopra Steria sampling work rather than as a single early implementation snapshot. Earlier stages established hierarchical quota allocation, fallback handling, and strict priority control, while the later conceptual direction pushed toward a stronger hybrid design. In this framing, the later version should be described as a Version 10 or Mark8-style conceptual completion, combining the precision-oriented selection logic associated with Mark4 and the stronger structural guarantees and layered quota handling associated with Mark6, with iterative balancing thinking carried forward from the Mark7 phase.",
          "From a systems perspective, the important idea is not just that rows are sampled, but that the engine behaves like a controlled balancing workflow. It supports hierarchical priorities, exact or tolerance-based quota satisfaction, strict and extended execution modes, logging, reproducible configuration, and user-facing validation through an interactive frontend. That makes it more meaningful than a one-off internal script, because it represents a broader design for explainable, configurable, and enterprise-usable constrained sampling.",
          "In the Lab context, this entry should be presented as a concept because its value lies in the algorithmic architecture and the model evolution itself. It shows how the problem moved from simple quota sampling toward a more deliberate balancing engine with strong structural rules, iterative refinement, and production-minded interface thinking. This is exactly the kind of concept that belongs in Lab rather than in the main Work section."
        ],
        meta: "Applied systems concept",
        tags: ["Data Systems", "Sampling Logic", "Quota Balancing", "Streamlit", "Configuration-Driven Workflow"]
      },
      {
        id: "lab-concept-cropiq",
        section: "lab",
        lane: "concepts",
        title: "CropIQ",
        summary: "Prototype agricultural intelligence layer intended to become the reasoning and conversational brain behind the broader AgriFore agentic system, presented here as a future-facing mock version rather than a proof of concept.",
        detail: [
          "CropIQ should be presented as a strategic concept-prototype rather than as a finished standalone product. Its role is to act as the reasoning and interaction layer that could eventually power the broader agentic intelligence side of AgriFore. That framing is important because it positions the work correctly. This is not just a chatbot mockup and not a throwaway proof of concept. It is a forward-facing concept for how the forecasting and market intelligence stack could evolve into a more guided agricultural assistant.",
          "The frontend side of CropIQ is best understood as an interface for agricultural reasoning, not just data display. The user-facing value is in turning raw forecasting outputs, crop context, seasonal patterns, and advisory logic into something navigable and understandable. That means the concept should be explained through what kind of guided interaction it is trying to enable, and how it can sit above the rest of the AgriFore system as a decision-oriented conversational layer.",
          "On the backend and intelligence side, the important idea is future integration. CropIQ is meant to serve as the brain-like layer that could eventually orchestrate retrieval, interpretation, and response generation across the broader AgriFore ecosystem. Even in mock form, that makes it meaningful. It represents the architectural direction in which the forecasting platform becomes more agentic, more query-driven, and more capable of surfacing relevant agricultural reasoning instead of only charts and direct predictions.",
          "In the detailed view, emphasize that CropIQ is a future-use concept with a system role. It should be shown as the intended intelligence layer behind AgriFore, designed to translate complex agricultural signals into guided interaction. That is a stronger and more accurate framing than calling it a simple mock chatbot or a lightweight proof of concept."
        ],
        meta: "Future-use concept",
        tags: ["AgriFore", "Agentic Direction", "Agricultural Reasoning"]
      }
    ],
    workingPrototypes: [
      {
        id: "lab-proto-dashboard",
        section: "lab",
        lane: "working-prototypes",
        title: "Agricultural Market Intelligence Dashboard",
        summary: "Working prototype dashboard layer for AgriFore that turns the underlying forecasting and market analysis pipeline into an interactive exploration surface for prices, arrivals, and prediction workflows.",
        detail: [
          "This working prototype represents the interactive dashboard layer of the broader AgriFore system. The frontend is designed to expose structured agricultural analytics in a way that is easier to explore than raw datasets or model notebooks, especially for users who want to move between descriptive analysis, market history, and predictive outputs in one interface. Rather than acting as a single static dashboard, it is intended as the usable product surface of the forecasting stack.",
          "The frontend presents market trends, crop-level exploration, and prediction-oriented views that sit on top of a backend serving processed agricultural data. On the backend side, the workflow connects model-ready datasets and forecasting logic to API endpoints, so the dashboard is not just visual decoration but an operational layer over real preprocessing and model artifacts. The dashboard therefore matters as a working prototype because it demonstrates how the forecasting system would actually be consumed.",
          "What should be emphasized in the detailed view is the translation from analytical backend to usable interface. The important point is not every modeling detail, but the fact that the frontend makes the system legible. Users are shown trends, relationships, and prediction outputs in a guided way, which turns a technically strong backend into a product-like experience.",
          "This working prototype should therefore be explained as the visible intelligence layer of AgriFore, where forecasting, descriptive analytics, and model-backed decision support are presented as one coherent interface rather than a scattered collection of scripts and charts."
        ],
        meta: "Working prototype system layer",
        tags: ["AgriFore", "Dashboard", "Market Intelligence"],
        link: "https://github.com/arjoneelghosh/AgriFore",
        linkLabel: "View GitHub"
      },
      {
        id: "lab-proto-flightfinder",
        section: "lab",
        lane: "working-prototypes",
        title: "FlightFinder AI",
        summary: "Accessibility-oriented adaptive flight booking working prototype that combines role-based interfaces, sign language support, voice interaction, conversational search, and real-time flight retrieval into one guided booking experience.",
        detail: [
          "FlightFinder AI is a working prototype built around the idea that a booking system should adapt to the user rather than forcing every user into the same interface. The frontend is designed as an accessibility-first flight search surface that changes how users interact depending on whether they are using the system as a deaf or mute user, a blind user, or a standard user. This makes the working prototype valuable not only as a travel interface, but as a product exploration into adaptive accessibility.",
          "On the frontend side, the system brings together multiple interaction modes including chat-driven search, sign-language-based input, and voice-based interaction. The user is shown a guided interface rather than a traditional dense booking form, and the visible surface is organized around understanding intent and helping the user complete a search in the most natural way available to them. The role-adaptive UI is one of the most important parts of the working prototype because it changes the product experience itself, not just the input method.",
          "On the backend and intelligence side, the project combines conversational interpretation with structured flight retrieval. The system is intended to use a GPT-4 style conversational agent to interpret travel intent and pair that with external flight search through the Amadeus API, while the sign-language flow is supported through real-time detection and recognition logic. In other words, the working prototype is not just a frontend shell and not just a computer vision demo either. It is a joined interaction stack where accessibility-aware input, conversational understanding, and live travel data all meet in one product path.",
          "In the detailed view, the emphasis should stay on what is visible and what it means. The user sees an adaptive interface, input-specific interaction modes, and a guided result flow that turns accessibility support into a practical booking assistant. That makes FlightFinder AI a strong working prototype because it demonstrates how AI, APIs, and accessibility-driven UI design can work together inside a product that has clear real-world use."
        ],
        meta: "Accessibility working prototype",
        tags: ["Accessibility", "Conversational Search", "Computer Vision"],
        link: "https://github.com/arjoneelghosh/Disable_Friendly_Flight_Booking",
        linkLabel: "View GitHub"
      },
      {
        id: "lab-proto-rstyled",
        section: "lab",
        lane: "working-prototypes",
        title: "R-Style Forecast Tool for Business Metric Analysis",
        summary: "Business forecasting working prototype shaped by real internship work, combining automated analytical workflows, Prophet-based forecasting, and dashboard-style reporting into a productized analytics surface.",
        detail: [
          "This working prototype comes out of internship work focused on data mining, pattern recognition, and forecasting pipelines for business-facing analytical use cases. It should be described as the product-facing expression of that work rather than as a raw internship task. The frontend is meant to present a forecasting workflow that feels like a usable analytical tool, where data exploration, forecast generation, and reporting outputs can be consumed in a structured interface.",
          "The most important system idea behind this working prototype is workflow reduction. Instead of treating forecasting as an isolated notebook activity, the tool reflects an approach where repeated reporting and client-specific analytical steps are turned into a more streamlined process. The forecasting core was built using Prophet-based modeling, and the surrounding product layer is there to make those results easier to run, inspect, and present. That is why this working prototype matters. It shows the move from model-building into repeatable analytics delivery.",
          "On the backend and analytical side, the project is grounded in forecasting pipelines, automated reporting logic, and business data processing rather than only generic dashboards. The value is in combining model generation with reusable reporting structure so that analytical work can scale more cleanly across recurring use cases. In the detailed view, this should be framed as a workflow intelligence working prototype that reduces manual analytical overhead rather than just a visual forecasting demo.",
          "What the user sees should be explained in clear practical terms. They are looking at a forecasting tool designed to make business metric analysis more direct, where historical patterns, predicted trajectories, and dashboard outputs are shown in a way that supports decision-making and recurring reporting. That makes the working prototype relevant because it connects analytical rigor with product usefulness."
        ],
        meta: "Forecasting workflow working prototype",
        tags: ["Prophet", "Analytics Workflow", "Reporting"],
        link: "https://github.com/arjoneelghosh/R-studio_replica",
        linkLabel: "View GitHub"
      }
    ]
  },
  records: {
    globalCertifications: [
      {
        id: "cert-servicenow-cad",
        section: "records",
        type: "Certification",
        title: "ServiceNow Certified Application Developer (CAD)",
        issuer: "ServiceNow",
        date: "2025",
        note: "ServiceNow certification for Certified Application Developer, issued May 03, 2025, certification number 27087361.",
        link: true
      },
      {
        id: "cert-servicenow-csa",
        section: "records",
        type: "Certification",
        title: "ServiceNow Certified System Administrator (CSA)",
        issuer: "ServiceNow",
        date: "2025",
        note: "ServiceNow certification for Certified System Administrator, issued January 23, 2025, certification number 26606029.",
        link: true
      }
    ],
    certificates: [
      {
        id: "cert-aws-academy-ml-foundations",
        section: "records",
        type: "Certification",
        title: "AWS Academy Machine Learning Foundations",
        issuer: "AWS Academy",
        date: "2024",
        note: "AWS Academy certificate asset for Machine Learning Foundations. The PDF text shows a 20-hour certificate dated 02/12/2024.",
        link: true
      },
      {
        id: "cert-isro-geodata",
        section: "records",
        type: "Certification",
        title: "Geo-data Sharing and Cyber Security",
        issuer: "IIRS / ISRO",
        date: "2023",
        note: "Online course certificate with 100% attendance recorded on the certificate.",
        link: true
      },
      {
        id: "cert-matlab-dl",
        section: "records",
        type: "Certification",
        title: "Deep Learning Onramp",
        issuer: "MathWorks",
        date: "2024",
        note: "MathWorks training certificate for Deep Learning Onramp.",
        link: true
      },
      {
        id: "cert-matlab-fundamentals",
        section: "records",
        type: "Certification",
        title: "Machine Learning Onramp",
        issuer: "MathWorks",
        date: "2024",
        note: "MathWorks training certificate for Machine Learning Onramp.",
        link: true
      },
      {
        id: "cert-matlab-onramp",
        section: "records",
        type: "Certification",
        title: "MATLAB Onramp",
        issuer: "MathWorks",
        date: "2024",
        note: "MathWorks introductory MATLAB training certificate.",
        link: true
      },
      {
        id: "cert-computer-vision-essential-course",
        section: "records",
        type: "Certification",
        title: "Computer Vision Essential Course",
        issuer: "Provider not specified in current repo data",
        date: "2024",
        note: "Course certificate asset present in the achievements folder. The current repo data does not safely identify the provider, so the wording stays conservative.",
        link: true
      },
      {
        id: "ach-hackathon-genesis",
        section: "records",
        type: "Achievement",
        title: "Hackathon GENESIS 1.0",
        issuer: "GENESIS 1.0",
        date: "2024",
        note: "Participation certificate for Hackathon GENESIS 1.0.",
        link: true
      },
      {
        id: "ach-hackathon-certificate",
        section: "records",
        type: "Achievement",
        title: "Hackathon Certificate",
        issuer: "Event issuer not specified in current repo data",
        date: "Undated asset",
        note: "Hackathon certificate asset present in the achievements folder. The current repo data does not safely identify the issuing event, so the wording stays conservative.",
        link: true
      },
      {
        id: "ach-munsoc",
        section: "records",
        type: "Achievement",
        title: "SRMMUN Society Certificate",
        issuer: "SRMMUN Society",
        date: "2024",
        note: "Certificate-backed university society record used as supporting leadership evidence.",
        link: true
      }
    ],
    certifications: [
      {
        id: "cert-servicenow-cad",
        section: "records",
        type: "Certification",
        title: "ServiceNow Certified Application Developer (CAD)",
        issuer: "ServiceNow",
        date: "2025",
        note: "ServiceNow certification for Certified Application Developer, issued May 03, 2025, certification number 27087361.",
        link: true
      },
      {
        id: "cert-servicenow-csa",
        section: "records",
        type: "Certification",
        title: "ServiceNow Certified System Administrator (CSA)",
        issuer: "ServiceNow",
        date: "2025",
        note: "ServiceNow certification for Certified System Administrator, issued January 23, 2025, certification number 26606029.",
        link: true
      },
      {
        id: "cert-aws-academy-ml-foundations",
        section: "records",
        type: "Certification",
        title: "AWS Academy Machine Learning Foundations",
        issuer: "AWS Academy",
        date: "2024",
        note: "AWS Academy certificate asset for Machine Learning Foundations. The PDF text shows a 20-hour certificate dated 02/12/2024.",
        link: true
      },
      {
        id: "cert-isro-geodata",
        section: "records",
        type: "Certification",
        title: "Geo-data Sharing and Cyber Security",
        issuer: "IIRS / ISRO",
        date: "2023",
        note: "Online course certificate with 100% attendance recorded on the certificate.",
        link: true
      },
      {
        id: "cert-matlab-dl",
        section: "records",
        type: "Certification",
        title: "Deep Learning Onramp",
        issuer: "MathWorks",
        date: "2024",
        note: "MathWorks training certificate for Deep Learning Onramp.",
        link: true
      },
      {
        id: "cert-matlab-fundamentals",
        section: "records",
        type: "Certification",
        title: "Machine Learning Onramp",
        issuer: "MathWorks",
        date: "2024",
        note: "MathWorks training certificate for Machine Learning Onramp.",
        link: true
      },
      {
        id: "cert-matlab-onramp",
        section: "records",
        type: "Certification",
        title: "MATLAB Onramp",
        issuer: "MathWorks",
        date: "2024",
        note: "MathWorks introductory MATLAB training certificate.",
        link: true
      },
      {
        id: "cert-computer-vision-essential-course",
        section: "records",
        type: "Certification",
        title: "Computer Vision Essential Course",
        issuer: "Provider not specified in current repo data",
        date: "2024",
        note: "Course certificate asset present in the achievements folder. The current repo data does not safely identify the provider, so the wording stays conservative.",
        link: true
      }
    ],
    achievements: [
      {
        id: "ach-hackathon-genesis",
        section: "records",
        type: "Achievement",
        title: "Hackathon GENESIS 1.0",
        issuer: "GENESIS 1.0",
        date: "2024",
        note: "Participation certificate for Hackathon GENESIS 1.0.",
        link: true
      },
      {
        id: "ach-hackathon-certificate",
        section: "records",
        type: "Achievement",
        title: "Hackathon Certificate",
        issuer: "Event issuer not specified in current repo data",
        date: "Undated asset",
        note: "Hackathon certificate asset present in the achievements folder. The current repo data does not safely identify the issuing event, so the wording stays conservative.",
        link: true
      },
      {
        id: "ach-munsoc",
        section: "records",
        type: "Achievement",
        title: "SRMMUN Society Certificate",
        issuer: "SRMMUN Society",
        date: "2024",
        note: "Certificate-backed university society record used as supporting leadership evidence.",
        link: true
      }
    ],
    publications: [
      {
        id: "pub-agrifore-ieee",
        section: "records",
        type: "Publication",
        title: "AgriFore: Data-Driven Agricultural Market and Yield Modeling for Kamareddy District, Telangana",
        issuer: "IEEE-format manuscript",
        date: "Undated manuscript",
        note: "IEEE-format research manuscript listing Arjoneel Ghosh among the authors. The paper focuses on agricultural market and yield modeling for Kamareddy District, Telangana. This record is intentionally framed as a manuscript rather than a confirmed publication.",
        link: true
      }
    ]
  },
  ask: {
    faqQuestions: [
      {
        id: "navigation-ring",
        label: "How do I use the navigation ring?",
        description: "Understand how the persistent ring navigation works across the portfolio."
      },
      {
        id: "education",
        label: "What is Arjoneel's education?",
        description: "Get the grounded education record including institution, period, qualification, and score."
      },
      {
        id: "project-overview",
        label: "Show project overview",
        description: "A grouped overview of the portfolio's project work across DS/ML and Full Stack."
      }
    ],
    faqReplies: {
      "navigation-ring": {
        title: "How do I use the navigation ring?",
        summary: "The ring is the portfolio’s persistent navigation system rather than a decorative visual.",
        bullets: [
          "Use the outer ring nodes to move between the main sections of the portfolio.",
          "On inner pages, click AG in the center of the ring to return to the landing page."
        ]
      },
      "education": {
        title: "Education",
        summary: "Arjoneel's published education record includes a B.Tech in Computer Science and Engineering at SRM Institute of Science and Technology, plus CBSE Class XII and Class X school records.",
        bullets: [
          "SRM Institute of Science and Technology | Aug 2022 - May 2026 | B.Tech in Computer Science and Engineering | CGPA 8.2 (graduated May 2026)",
          "Navyug Convent Sr. Secondary School | Apr 2021 - Mar 2022 | CBSE Class XII | Percentage 70.8%",
          "Amity International School, Sector 46 | Feb 2019 - Mar 2020 | CBSE Class X | Percentage 89.8%"
        ]
      },
      "project-overview": {
        title: "Project Overview",
        summary: "The portfolio covers DS/ML systems, full-stack product delivery, and applied AI across a set of featured and archive projects.",
        bullets: [
          "DS/ML lane: AgriFore, SignChat, Priority-Based CSV Sampler, R Styled Forecast Tool for Business Metrics.",
          "Full Stack lane: FlightFinder AI, SurgeMedi, LoanOne AI. FlightFinder AI spans both DS/ML and Full Stack.",
          "Lab holds supporting prototypes and the AgriFore manuscript alongside concept-stage work."
        ]
      }
    },
    actionQuestions: [
      {
        id: "best-ml",
        label: "Show DS/ML work",
        description: "Surface the strongest DS/ML, forecasting, computer-vision, and data-tooling work first."
      },
      {
        id: "recruiter-summary",
        label: "Summarize for recruiter",
        description: "Generate a concise overview grounded in the current portfolio structure and evidence."
      },
      {
        id: "full-stack",
        label: "Show full-stack work",
        description: "Focus on product workflows, interfaces, API-connected delivery, and real portfolio context."
      },
      {
        id: "guide",
        label: "Guide me through this portfolio",
        description: "Explain how the site is organized now across Work, Profile, Experience, and Lab."
      }
    ],
    actionReplies: {
      "best-ml": {
        title: "Best DS/ML Projects",
        summary: "The strongest DS/ML work here combines forecasting systems, assistive computer vision, data tooling, and AI-assisted product workflows with clear delivery surfaces.",
        bullets: [
          "AgriFore, SignChat, Priority-Based CSV Sampler, R Styled Forecast Tool for Business Metrics, and FlightFinder AI are the clearest DS/ML-facing projects in the current portfolio set.",
          "Together they cover forecasting workflows, applied computer vision, quota-aware data tooling, structured retrieval, and reusable analytical workbench design."
        ]
      },
      "recruiter-summary": {
        title: "Recruiter Summary",
        summary: "Arjoneel Ghosh is positioned as a machine learning engineer and full-stack developer with work spanning forecasting systems, assistive computer vision, accessibility-first product workflows, and practical internal-style data tooling.",
        bullets: [
          "Featured work now centers on AgriFore, FlightFinder AI, Priority-Based CSV Sampler, R Styled Forecast Tool for Business Metrics.",
          "Published education record includes a B.Tech in Computer Science and Engineering at SRM Institute of Science and Technology (Aug 2022 - May 2026, CGPA 8.2), completed in May 2026.",
          "The portfolio also includes richer internship records, consolidated leadership evidence, and a Lab section organized around papers, concepts, and prototypes."
        ]
      },
      "full-stack": {
        title: "Full Stack Work",
        summary: "The strongest full-stack work now centers on guided product flow, accessibility-aware interaction, catalog delivery, and API-connected interfaces.",
        bullets: [
          "FlightFinder AI, SurgeMedi, and LoanOne AI are the clearest full-stack product-facing projects in the current Work structure.",
          "FlightFinder AI now also appears in DS/ML because the project combines an accessibility-first product surface with conversational interpretation and structured flight retrieval.",
          "CropIQ is still relevant, but it is now positioned in Lab Concepts as a future-facing agricultural intelligence concept rather than a Work shelf entry."
        ]
      },
      "guide": {
        title: "Portfolio Guide",
        summary: "Use Work for project narratives, Profile for positioning and skills, Experience for role history, Lab for manuscript and concept exploration, and Connect for direct public destinations.",
        bullets: [
          "Work covers the main project narratives, with Featured allowed to overlap and the non-Featured sections kept mutually exclusive.",
          "Profile holds the long-form bio, detailed Skills under About, Education beneath Skills, and a separate grouped Tech Stack section, while Lab is organized into Papers, Concepts, and Prototypes."
        ]
      }
    }
  },
  profile: {
    skillGroups: [
      {
        id: "ml-forecasting",
        label: "Machine Learning and Forecasting",
        description: "I work on practical machine learning systems with a strong focus on forecasting, structured experimentation, feature engineering, model evaluation, and turning analytical workflows into usable applications.",
        skills: [
          { name: "Python", emphasis: "Core" },
          { name: "scikit-learn", emphasis: "Strong" },
          { name: "XGBoost", emphasis: "Strong" },
          { name: "LightGBM", emphasis: "Working" },
          { name: "CatBoost", emphasis: "Working" },
          { name: "Random Forest", emphasis: "Strong" },
          { name: "Prophet", emphasis: "Strong" },
          { name: "ARIMA / AutoARIMA", emphasis: "Strong" },
          { name: "Forecasting Workflows", emphasis: "Strong" },
          { name: "Feature Engineering", emphasis: "Strong" },
          { name: "Model Evaluation", emphasis: "Strong" },
          { name: "Time-Series Analysis", emphasis: "Strong" }
        ]
      },
      {
        id: "cv-applied-ml",
        label: "Computer Vision and Applied ML",
        description: "I am especially interested in applied computer vision work where live input, model inference, assistive interaction, and usable interface design need to work together as one system.",
        skills: [
          { name: "OpenCV", emphasis: "Strong" },
          { name: "MediaPipe", emphasis: "Strong" },
          { name: "TensorFlow", emphasis: "Working" },
          { name: "Keras", emphasis: "Working" },
          { name: "PyTorch", emphasis: "Working" },
          { name: "YOLOv8", emphasis: "Working" },
          { name: "DeepLabV3+", emphasis: "Working" },
          { name: "Computer Vision", emphasis: "Strong" },
          { name: "Real-Time Inference", emphasis: "Strong" },
          { name: "Assistive Interfaces", emphasis: "Strong" }
        ]
      },
      {
        id: "full-stack-product",
        label: "Full Stack and Product Delivery",
        description: "I like building technical products end to end, especially when the work involves connecting data, APIs, interfaces, model-backed logic, and clear user-facing workflows.",
        skills: [
          { name: "React", emphasis: "Core" },
          { name: "TypeScript", emphasis: "Strong" },
          { name: "JavaScript", emphasis: "Strong" },
          { name: "Next.js", emphasis: "Working" },
          { name: "FastAPI", emphasis: "Strong" },
          { name: "Django", emphasis: "Working" },
          { name: "Node.js", emphasis: "Working" },
          { name: "Express", emphasis: "Working" },
          { name: "REST APIs", emphasis: "Strong" },
          { name: "Product Workflow Design", emphasis: "Strong" },
          { name: "Dashboard Interfaces", emphasis: "Strong" }
        ]
      },
      {
        id: "data-tooling",
        label: "Data and Tooling",
        description: "A lot of my work depends on shaping messy information into reliable workflows, whether that means preprocessing, SQL pipelines, sampling logic, internal tools, dashboard utilities, or configuration-driven execution.",
        skills: [
          { name: "Pandas", emphasis: "Core" },
          { name: "DuckDB", emphasis: "Strong" },
          { name: "SQL", emphasis: "Strong" },
          { name: "Streamlit", emphasis: "Strong" },
          { name: "MySQL", emphasis: "Working" },
          { name: "PostgreSQL", emphasis: "Working" },
          { name: "MongoDB", emphasis: "Working" },
          { name: "Pinecone", emphasis: "Working" },
          { name: "YAML / JSON Config Workflows", emphasis: "Strong" },
          { name: "Sampling and Balancing Logic", emphasis: "Strong" },
          { name: "Data Pipelines", emphasis: "Strong" },
          { name: "Internal Tooling", emphasis: "Strong" }
        ]
      }
    ],
    education: [
      {
        id: "edu-srm-btech-cse",
        institution: "SRM Institute of Science and Technology",
        period: "Aug 2022 - May 2026",
        qualification: "B.Tech in Computer Science and Engineering",
        summary: "Published higher-education record for SRM Institute of Science and Technology, where Arjoneel completed his B.Tech in Computer Science and Engineering, graduating in May 2026.",
        score: {
          kind: "cgpa",
          label: "CGPA",
          value: "8.2"
        },
        tags: ["Computer Science and Engineering"]
      },
      {
        id: "edu-navyug-class-xii",
        institution: "Navyug Convent Sr. Secondary School",
        period: "Apr 2021 - Mar 2022",
        qualification: "CBSE Class XII",
        summary: "Published school record for CBSE Class XII at Navyug Convent Sr. Secondary School.",
        score: {
          kind: "percentage",
          label: "Percentage",
          value: "70.8%"
        },
        tags: ["CBSE Class XII"]
      },
      {
        id: "edu-amity-class-x",
        institution: "Amity International School, Sector 46",
        period: "Feb 2019 - Mar 2020",
        qualification: "CBSE Class X",
        summary: "Published school record for CBSE Class X at Amity International School, Sector 46.",
        score: {
          kind: "percentage",
          label: "Percentage",
          value: "89.8%"
        },
        tags: ["CBSE Class X"]
      }
    ],
    contactLinks: [
      { label: "Email", link: "mailto:arjoneelghosh03@gmail.com" },
      { label: "LinkedIn Profile", link: "https://www.linkedin.com/in/arjoneel-ghosh-7195142a1/" },
      { label: "GitHub Profile", link: "https://github.com/arjoneelghosh" }
    ]
  }
};
