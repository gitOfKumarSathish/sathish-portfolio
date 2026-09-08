/**
 * Every word the book renders, in reading order.
 *
 * Chapters carry an `accent` hue that the page grades toward as you enter it,
 * so the palette travels with the narrative instead of staying fixed.
 */

export type ChapterId =
  | "cover"
  | "origins"
  | "craft"
  | "work"
  | "works"
  | "milestones"
  | "epilogue";

export interface ChapterMeta {
  id: ChapterId;
  /** Roman-ish folio number shown on the cover card. */
  index: number;
  title: string;
  kicker: string;
  summary: string;
  /** HSL hue the ambient grade shifts toward for this chapter. */
  accent: number;
}

export const chapters: ChapterMeta[] = [
  {
    id: "cover",
    index: 0,
    title: "Sathish Kumar",
    kicker: "A Portfolio",
    summary: "Technical Lead & Full-Stack Engineer",
    accent: 220,
  },
  {
    id: "origins",
    index: 1,
    title: "Origins",
    kicker: "Chapter One",
    summary: "Where the engineering started — Salem, then Villupuram.",
    accent: 192,
  },
  {
    id: "craft",
    index: 2,
    title: "The Craft",
    kicker: "Chapter Two",
    summary: "The tools, and what they are actually for.",
    accent: 265,
  },
  {
    id: "work",
    index: 3,
    title: "The Work",
    kicker: "Chapter Three",
    summary: "Eight years, five chapters, one direction.",
    accent: 158,
  },
  {
    id: "works",
    index: 4,
    title: "Selected Works",
    kicker: "Chapter Four",
    summary: "Platforms that went to production and stayed there.",
    accent: 28,
  },
  {
    id: "milestones",
    index: 5,
    title: "Milestones",
    kicker: "Chapter Five",
    summary: "The outcomes behind the job titles.",
    accent: 338,
  },
  {
    id: "epilogue",
    index: 6,
    title: "Epilogue",
    kicker: "The End, For Now",
    summary: "Still writing. Come and add a chapter.",
    accent: 220,
  },
];

/* ── Prologue ─────────────────────────────────────────────────────────── */

export const prologue = {
  opening:
    "I build enterprise platforms for IoT, telecom and e-commerce products — the kind that carry real operational weight and cannot afford to fall over.",
  lines: [
    "Over eight years I have architected multi-tenant monorepos, reusable platform layers and analytics-rich dashboards.",
    "I lead cross-functional teams from discovery through architecture, execution and release.",
    "And I stay the client-facing technical contact throughout, because the hard part is rarely the code.",
  ],
  figures: [
    { value: 8, suffix: "+", label: "Years shipping production software" },
    { value: 41, suffix: "+", label: "Reusable components in the platform library" },
    { value: 28, suffix: "+", label: "Branded deployments from one codebase" },
    { value: 7, suffix: "", label: "Engineers led across a delivery squad" },
  ],
};

/* ── Chapter One — Origins ────────────────────────────────────────────── */

export const education = [
  {
    period: "2013 – 2017",
    degree: "B.E. Computer Science",
    institution: "University College of Engineering, Villupuram",
    location: "Tamil Nadu",
    badge: "Bachelor's Degree",
    details:
      "Bachelor of Engineering in Computer Science from Anna University. Strong foundation in software engineering, data structures and web technologies.",
  },
  {
    period: "2011 – 2013",
    degree: "Higher Secondary Certificate",
    institution: "Vedhha Vikass Higher Secondary School",
    location: "Salem",
    badge: "Higher Secondary",
    details:
      "Higher secondary education focused on mathematics and science. Built the analytical and problem-solving habits everything else rests on.",
  },
  {
    period: "2010 – 2011",
    degree: "Secondary School Leaving Certificate",
    institution: "Gugai Higher Secondary School",
    location: "Salem",
    badge: "Secondary",
    details:
      "Secondary school education establishing foundational knowledge across core subjects.",
  },
];

/* ── Chapter Two — The Craft ──────────────────────────────────────────── */

export const craft = [
  {
    title: "Full-Stack Development",
    summary:
      "Scalable frontend and full-stack applications with modern TypeScript-first workflows.",
    skills: ["JavaScript (ES6+)", "TypeScript", "Angular (11–21)", "ReactJS", "Node.js"],
  },
  {
    title: "State & Data",
    summary:
      "Predictable data flows and analytics-ready dashboards for enterprise-grade products.",
    skills: [
      "MongoDB (Indexing & Pipelines)",
      "TanStack Query",
      "NGXS & RxJS",
      "Highcharts & ag-Grid",
      "Material React Tables",
    ],
  },
  {
    title: "Hybrid & Specialised",
    summary:
      "Desktop, mobile and automation-enabled solutions across varied runtime environments.",
    skills: [
      "Electron (Desktop Apps)",
      "Ionic (iOS/Android)",
      "WDIO & Cucumber Testing",
      "Docker & DevOps",
      "Multi-tenant Monorepos",
    ],
  },
  {
    title: "Enterprise & Architecture",
    summary:
      "Secure, reusable, multi-tenant platforms built for long-term product scalability.",
    skills: [
      "White-label Branding Engines",
      "RBAC & Security",
      "Component Libraries (41+)",
      "Real-time Data Visualization",
      "Micro-frontend Architecture",
    ],
  },
  {
    title: "Leadership & Process",
    summary:
      "Technical discovery, team execution and quality outcomes through structured delivery.",
    skills: [
      "Technical Discovery & Solution Design",
      "Cross-functional Team Leadership",
      "Client & Stakeholder Communication",
      "Agile Delivery & Sprint Planning",
      "Quality Engineering & Test Strategy",
    ],
  },
];

export const coreStack = [
  "React",
  "Angular",
  "TypeScript",
  "Node.js",
  "Highcharts",
  "ag-Grid",
  "Electron",
  "WDIO",
  "Docker",
  "MongoDB",
];

/* ── Chapter Three — The Work ─────────────────────────────────────────── */

export interface Role {
  period: string;
  role: string;
  company: string;
  client?: string;
  location?: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  focus: string[];
}

export const roles: Role[] = [
  {
    period: "May 2026 — Present",
    role: "Technical Lead Engineer",
    company: "Prasaditya Idea Private Limited",
    current: true,
    summary:
      "Building reusable frontend infrastructure, with a focus on headless, design-system-friendly table experiences.",
    highlights: [
      "Built Bst-Table, a headless React data grid engine powered by TanStack Table v9 for teams that need flexible enterprise-grade table foundations.",
      "Designed the architecture to support swappable Material UI and shadcn/Radix skins, keeping product teams free from single-library lock-in.",
      "Implemented the library in React and TypeScript with a dedicated documentation experience.",
      "Positioned the solution around MIT/Apache-friendly usage with no per-seat licensing.",
    ],
    focus: ["React", "TypeScript", "TanStack Table v9", "Headless UI", "shadcn/Radix"],
  },
  {
    period: "Jan 2024 — Apr 2026",
    role: "Technical Lead Engineer",
    company: "Alethea",
    client: "Client: Analog Devices India",
    location: "Bengaluru",
    summary:
      "Led the OtoSense SMS platform end-to-end, from discovery and workflow design to a multi-tenant Angular monorepo used across enterprise operations.",
    highlights: [
      "Led a 7-member cross-functional squad using Angular 21 and TypeScript, reducing feature delivery cycle time by ~30%.",
      "Designed real-time monitoring dashboards using Highcharts and ag-Grid, improving fault-triage response by ~35%.",
      "Implemented white-label theming and localization, enabling 28+ partner-specific deployments from one codebase.",
      "Drove technical discovery with stakeholders, reducing requirement churn during sprints by ~25%.",
    ],
    focus: ["Angular 21", "TypeScript", "Highcharts", "ag-Grid", "NGXS", "SCSS"],
  },
  {
    period: "2022 — 2024",
    role: "Lead Engineer",
    company: "Alethea",
    client: "Client: Analog Devices India",
    location: "Bengaluru",
    summary:
      "Expanded into cross-product engineering leadership across desktop applications, automation systems and reusable frontend platforms.",
    highlights: [
      "Led a 5-engineer delivery pod using React and Electron, shipping two desktop/web products with shared UI foundations.",
      "Built an end-to-end automation framework using WDIO and Cucumber, raising regression coverage to ~80% and cutting manual QA effort by ~45%.",
      "Owned shared component-platform architecture, accelerating onboarding of new modules by ~40%.",
      "Standardised reusable UI patterns with design, QA and product, reducing duplicate implementation work.",
    ],
    focus: ["React", "Electron", "WDIO", "Cucumber", "TanStack Query"],
  },
  {
    period: "2021 — 2022",
    role: "Senior Software Engineer",
    company: "Alethea",
    location: "Bengaluru",
    summary:
      "Built cloud device-orchestration experiences that made large-scale Wi-Fi validation workflows observable and actionable.",
    highlights: [
      "Developed device orchestration portals using React and Node.js for configuration, test setup and live connectivity workflows.",
      "Integrated Kibana dashboards and reporting modules, improving telemetry visibility for hundreds of concurrent devices.",
      "Implemented map-based observability, reducing time to identify failing device clusters by ~30%.",
      "Aligned API contracts and reporting flows with backend and test teams, improving release stability.",
    ],
    focus: ["React", "Node.js", "Kibana", "REST APIs", "Maps"],
  },
  {
    period: "2018 — 2021",
    role: "Software Engineer",
    company: "Ace Turtle (August Purple)",
    location: "Bengaluru",
    summary:
      "Started the journey building omni-channel commerce systems and brand storefront experiences across high-traffic retail products.",
    highlights: [
      "Built reusable modules using React across OMS, IMS, CMS and LMS workflows.",
      "Delivered responsive PLP, PDP and checkout journeys for 5+ global brands, improving campaign launch turnaround by ~25%.",
      "Contributed to a shared component-driven system used by multiple product teams.",
      "Shipped high-traffic seasonal storefront releases on schedule with product, QA and operations.",
    ],
    focus: ["React", "E-commerce", "CMS", "XML Layouts", "Responsive UI"],
  },
];

/* ── Chapter Four — Selected Works ────────────────────────────────────── */

export interface Work {
  title: string;
  client: string;
  period: string;
  role: string;
  href?: string;
  summary: string;
  tech: string[];
  highlights: string[];
}

export const works: Work[] = [
  {
    title: "Bst-Table",
    client: "Prasaditya Idea Private Limited",
    period: "May 2026 – Present",
    role: "Technical Lead Engineer",
    href: "https://gitofkumarsathish.github.io/bst-grid/",
    summary:
      "A headless React data grid built on TanStack Table v9 with swappable Material UI and shadcn/Radix skins, designed for flexible adoption without per-seat licensing.",
    tech: ["React", "TypeScript", "TanStack Table v9", "Material UI", "shadcn/Radix"],
    highlights: [
      "Built a reusable headless grid engine that separates core table behaviour from presentation.",
      "Designed swappable skins so teams keep their design system without rewriting table logic.",
      "Shipped a documentation site that helps engineers evaluate, integrate and extend the grid faster.",
    ],
  },
  {
    title: "OtoSense® SMS Platform",
    client: "Analog Devices India • Alethea",
    period: "Jan 2024 – Apr 2026",
    role: "Technical Lead Engineer",
    summary:
      "Enterprise multi-tenant IoT platform enabling real-time motor-health monitoring across complex deployment hierarchies.",
    tech: ["Angular 21", "TypeScript", "Highcharts", "ag-Grid", "NGXS", "Transloco"],
    highlights: [
      "Architected a monorepo powering 3 enterprise applications with 41+ reusable components and 20 services.",
      "Built real-time dashboards improving operations response time for critical events by ~30%.",
      "Implemented a white-label engine enabling 28+ partner deployments from a unified codebase.",
    ],
  },
  {
    title: "Centralized Component Library",
    client: "Analog Devices India • Alethea",
    period: "May 2023 – Nov 2023",
    role: "Lead Engineer",
    summary:
      "A shared React component platform adopted across multiple product streams for consistent UX and faster delivery.",
    tech: ["React", "TypeScript", "Material React Table", "TanStack Query", "RJSF"],
    highlights: [
      "Defined component architecture for five core modules: DataTable, Visualizer, Tree Viewer, DAG Builder, JSON Form.",
      "Reduced duplicate implementation effort by ~40% across consuming applications.",
      "Drove cross-project adoption through documentation and integration patterns.",
    ],
  },
  {
    title: "SelfCare Portal",
    client: "Internal Product",
    period: "Oct 2022 – May 2023",
    role: "Lead Engineer",
    summary:
      "A Windows desktop application for monitoring Wi-Fi network health, running diagnostics and surfacing actionable repair suggestions.",
    tech: ["React", "Electron", "Gauge Charts", "Live Graphs"],
    highlights: [
      "Built the frontend from scratch in React inside an Electron shell.",
      "Integrated real-time gauges and live line graphs to surface network health instantly.",
      "Built a solution engine that surfaces remediation steps and can raise a support ticket.",
    ],
  },
  {
    title: "Automation Framework — ReachMobile",
    client: "Internal QA Initiative",
    period: "Sep 2022 – Feb 2023",
    role: "Lead Engineer",
    summary:
      "End-to-end automation framework for ReachMobile using WDIO, JavaScript and Cucumber BDD.",
    tech: ["JavaScript", "WDIO", "Cucumber", "BDD"],
    highlights: [
      "Built the complete framework from scratch, establishing a scalable regression baseline.",
      "Raised automated regression coverage to ~80% across agent and end-user portals.",
      "Integrated the suite into CI, shortening release validation cycles.",
    ],
  },
  {
    title: "CloudATF — Cloud Automation Test Framework",
    client: "Internal Platform",
    period: "Feb 2021 – Apr 2022",
    role: "Senior Software Engineer",
    summary:
      "Cloud-deployed device orchestration enabling test execution across hundreds of devices simultaneously, with live dashboards and historical reporting.",
    tech: ["React", "Kibana", "Node.js", "Maps", "REST APIs"],
    highlights: [
      "Built the portal covering device configuration, test setup and execution reports.",
      "Built a live connectivity dashboard with real-time map visualization of device locations.",
      "Embedded Kibana dashboards to surface live telemetry captured during test runs.",
    ],
  },
  {
    title: "Rubicon — Omni-Channel Fulfillment",
    client: "Ace Turtle (August Purple)",
    period: "Feb 2018 – Feb 2021",
    role: "Software Engineer",
    summary:
      "In-house product unifying online and offline retail channels into a single distributed OMS, IMS, CMS and LMS platform for enterprise brands.",
    tech: ["React", "Component Library", "OMS", "IMS", "CMS"],
    highlights: [
      "Built component-based React applications across Order, Inventory, Catalog and Logistics modules.",
      "Developed and maintained a reusable component library shared across the product suite.",
    ],
  },
  {
    title: "Brand Portals — PUMA, RayBan, Superdry",
    client: "Ace Turtle (August Purple)",
    period: "Feb 2018 – Feb 2021",
    role: "Associate Software Engineer",
    summary:
      "Seasonal e-commerce portals for global brands with customizable themes, catalog support and responsive layouts.",
    tech: ["React", "CMS", "XML Layouts", "PLP/PDP"],
    highlights: [
      "Engineered themed campaign portals supporting configurable catalogs and seasonal promotions.",
      "Built PLP, PDP and checkout pages to brand specifications across five deployments.",
    ],
  },
];

/* ── Chapter Five — Milestones ────────────────────────────────────────── */

export const milestones = [
  {
    title: "AI-Accelerated Delivery",
    desc: "Improved developer throughput by introducing AI-assisted coding workflows that shortened prototyping and implementation cycles.",
  },
  {
    title: "Discovery-to-Delivery Ownership",
    desc: "Led technical discovery with stakeholders and converted ambiguous requirements into delivery-ready architecture plans.",
  },
  {
    title: "Angular Modernization",
    desc: "Executed an Angular 11 → 21 migration with controlled rollout, preserving release continuity and minimising operational risk.",
  },
  {
    title: "ETL Effort Reduction",
    desc: "Automated ETL workflows to reduce manual processing effort by ~90%, improving turnaround for engineering teams.",
  },
  {
    title: "Cross-Functional Leadership",
    desc: "Coordinated frontend, backend and QA execution for multi-tenant platform initiatives across enterprise programs.",
  },
  {
    title: "White-Label Platform Scale",
    desc: "Built partner-ready customization architecture that enabled 28+ branded experiences from a single product platform.",
  },
];

export const credentials = [
  "Technical Project Leadership",
  "Stakeholder & Client Management",
  "Cross-functional Team Management",
  "Architectural Discovery & Design",
  "Agile & SDLC Management",
  "Enterprise Architecture Expertise",
  "Automation Testing (WDIO & Cucumber)",
  "DevOps & Cloud Infrastructure",
];

/* ── Epilogue ─────────────────────────────────────────────────────────── */

export const contact = {
  email: "sathish7845kumar@gmail.com",
  location: "Bengaluru, India — open to remote",
  openTo: ["Technical Lead", "Lead Frontend Engineer", "Full-Stack Engineer"],
  github: "https://github.com/gitOfKumarSathish",
  linkedin: "https://linkedin.com/in/sathish7845kumar",
  closing:
    "That is the story so far. If you have a chapter that needs writing, I would like to hear about it.",
};
