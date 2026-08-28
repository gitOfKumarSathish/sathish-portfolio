import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Calendar, Building2, Layers, ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";

type Project = {
  title: string;
  client: string;
  period: string;
  role: string;
  featured?: boolean;
  href?: string;
  summary: string;
  tech: string[];
  highlights: string[];
};

const projects: Project[] = [
  {
    title: "Bst-Table",
    client: "Prasaditya Idea Private Limited",
    period: "May 2026 – Present",
    role: "Technical Lead Engineer",
    featured: true,
    href: "https://gitofkumarsathish.github.io/bst-grid/",
    summary:
      "A headless React data grid built on TanStack Table v9 with swappable Material UI and shadcn/Radix skins, designed for flexible adoption without per-seat licensing.",
    tech: [
      "React",
      "TypeScript",
      "TanStack Table v9",
      "Headless Grid Engine",
      "Material UI",
      "shadcn/Radix",
    ],
    highlights: [
      "Built a reusable headless grid engine that separates core table behavior from presentation, making it easier to adopt across different product UI stacks.",
      "Designed swappable Material UI and shadcn/Radix skins so teams can keep a consistent design system without rewriting table logic.",
      "Implemented the project in React and TypeScript with a documentation site that helps engineers evaluate, integrate, and extend the grid faster.",
      "Positioned the library for long-term product use with MIT/Apache-friendly licensing and no per-seat licensing overhead.",
    ],
  },
  {
    title: "OtoSense® SMS Platform",
    client: "Analog Devices India • Alethea",
    period: "Jan 2024 – Apr 2026",
    role: "Technical Lead Engineer",
    featured: true,
    summary:
      "Owned architecture and delivery for an enterprise multi-tenant IoT platform enabling real-time motor-health monitoring across complex deployment hierarchies.",
    tech: [
      "Angular 21",
      "TypeScript",
      "Highcharts",
      "ag-Grid",
      "NGXS",
      "RxJS",
      "Transloco",
      "SCSS",
      "Monorepo",
    ],
    highlights: [
      "Owned end-to-end platform architecture using Angular 21 and TypeScript, aligning discovery, design, and delivery across frontend, backend, and QA teams.",
      "Architected a monorepo powering 3 enterprise applications with 41+ reusable components and 20 services, reducing new feature setup effort by ~35%.",
      "Built real-time dashboards using Highcharts and ag-Grid, improving operations response time for critical events by ~30%.",
      "Implemented a white-label engine using Transloco and dynamic SCSS theming, enabling 28+ partner deployments from a unified codebase.",
      "Defined test and quality strategy with automation-first workflows, improving release confidence and reducing regression escape issues.",
    ],
  },
  {
    title: "Centralized Component Library",
    client: "Analog Devices India • Alethea",
    period: "May 2023 – Nov 2023",
    role: "Lead Engineer",
    summary:
      "Owned architecture and rollout of a shared React component platform adopted across multiple product streams for consistent UX and faster delivery.",
    tech: [
      "React",
      "TypeScript",
      "Material React Table",
      "Tanstack Query",
      "Highcharts",
      "RJSF",
      "DAG",
    ],
    highlights: [
      "Defined component architecture and ownership boundaries for five core modules (DataTable, Visualizer, Tree Viewer, DAG Builder, JSON Form).",
      "Built reusable modules using React, Material React Table, and RJSF, reducing duplicate implementation effort by ~40%.",
      "Integrated TanStack Query patterns for standardized server-state handling, improving consistency across consuming applications.",
      "Enabled cross-project adoption through documentation and integration patterns, with the library reused in multiple production products.",
    ],
  },
  {
    title: "SelfCare Portal",
    client: "Internal Product",
    period: "Oct 2022 – May 2023",
    role: "Lead Engineer",
    summary:
      "A Windows desktop application for monitoring Wi-Fi network health — running diagnostics, gathering local and AP controller metrics, and providing actionable repair suggestions.",
    tech: ["React", "Electron", "Gauge Charts", "Live Graphs"],
    highlights: [
      "Designed and built front-end from scratch using ReactJS inside an Electron shell for cross-platform desktop deployment.",
      "Integrated real-time gauge visualizations and live line graphs to surface network health metrics instantly.",
      "Implemented diagnostic workflows that gather traffic metrics locally and from the access point controller.",
      "Built an intelligent solution engine that surfaces remediation steps and provides an option to raise a support ticket when network health is degraded.",
    ],
  },
  {
    title: "Automation Framework — ReachMobile",
    client: "Internal QA Initiative",
    period: "Sep 2022 – Feb 2023",
    role: "Lead Engineer",
    summary:
      "Owned test strategy and built an end-to-end automation framework for ReachMobile using WDIO, JavaScript, and Cucumber BDD.",
    tech: ["JavaScript", "WDIO", "Cucumber", "BDD"],
    highlights: [
      "Built the complete framework from scratch using WDIO and Cucumber, establishing a scalable baseline for regression automation.",
      "Implemented and stabilized test packs for both agent and end-user portals, increasing automated regression coverage to ~80%.",
      "Applied BDD workflows with product and QA stakeholders, improving requirement clarity and reducing test rework.",
      "Integrated the suite into CI pipelines, shortening release validation cycles and improving deployment confidence.",
    ],
  },
  {
    title: "Access Point GUI",
    client: "Internal Product",
    period: "Apr 2022 – Sep 2022",
    role: "Lead Engineer",
    summary:
      "A web-based GUI for configuring access point parameters, selecting test categories, and monitoring live AP metrics through interactive charts.",
    tech: ["React", "Highcharts", "Live Graphs", "Pie Charts"],
    highlights: [
      "Led requirements gathering and translated stakeholder needs into a detailed front-end specification.",
      "Built the React application end-to-end, including configuration forms for access point parameters.",
      "Implemented live line graphs and pie charts to surface real-time access point metrics during test execution.",
      "Wrote unit tests to validate component behaviour and ensure reliability across test category selections.",
    ],
  },
  {
    title: "CloudATF — Cloud Automation Test Framework",
    client: "Internal Platform",
    period: "Feb 2021 – Apr 2022",
    role: "Senior Software Engineer",
    summary:
      "Cloud-deployed device orchestration framework enabling test execution across hundreds of devices simultaneously, with live Kibana dashboards and historical reporting.",
    tech: ["React", "Kibana", "Node.js", "Maps", "REST APIs"],
    highlights: [
      "Developed the complete front-end portal using ReactJS covering device configuration, test setup forms, and execution reports.",
      "Built a live device connectivity status dashboard with real-time map visualization of device locations.",
      "Embedded Kibana dashboards inside the portal to surface live telemetry data captured during test runs.",
      "Designed execution report pages for both current and historical test runs, supporting audit and regression workflows.",
    ],
  },
  {
    title: "Rubicon — Omni-Channel Fulfillment Platform",
    client: "Ace Turtle (August Purple)",
    period: "Feb 2018 – Feb 2021",
    role: "Software Engineer",
    summary:
      "In-house product unifying online and offline retail channels into a single distributed OMS, IMS, CMS, and LMS platform for enterprise brands.",
    tech: ["React", "Component Library", "OMS", "IMS", "CMS", "LMS"],
    highlights: [
      "Gathered requirements and built component-based React applications supporting Order, Inventory, Catalog, and Logistics management modules.",
      "Developed and maintained a reusable component library shared across the Rubicon product suite.",
      "Contributed to unit testing, documentation, and code review processes to maintain product quality.",
    ],
  },
  {
    title: "Brand Portals — PUMA, RayBan, Superdry & More",
    client: "Ace Turtle (August Purple)",
    period: "Feb 2018 – Feb 2021",
    role: "Associate Software Engineer",
    summary:
      "Seasonal e-commerce portals for global brands (PUMA, RayBan, Superdry SG, NomadX SG, Aldo) with customizable themes, catalog support, and responsive layout.",
    tech: ["React", "CMS", "XML Layouts", "PLP/PDP", "Responsive Design"],
    highlights: [
      "Engineered themed campaign portals supporting configurable product catalogs and seasonal promotions.",
      "Built and modified PLP (Product Listing), PDP (Product Detail), and Checkout pages to brand specifications.",
      "Implemented XML layouts for CMS static pages ensuring flexible content management.",
      "Ensured highly responsive layouts optimised for all device types across five brand deployments.",
    ],
  },
];

const roleColors: Record<string, string> = {
  "Technical Lead Engineer": "bg-primary/10 text-primary",
  "Lead Engineer": "bg-accent/10 text-accent",
  "Senior Software Engineer": "bg-purple-500/10 text-purple-400",
  "Software Engineer": "bg-orange-500/10 text-orange-400",
  "Associate Software Engineer": "bg-cyan-500/10 text-cyan-400",
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className={`glass hover-card-glow rounded-2xl overflow-hidden ${
        project.featured ? "ring-1 ring-primary/30" : ""
      }`}
    >
      {/* Card Header */}
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {project.featured && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20">
                  Featured
                </span>
              )}
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                  roleColors[project.role] ?? "bg-muted text-muted-foreground"
                }`}
              >
                {project.role}
              </span>
            </div>
            <h3 className="font-display text-lg font-bold text-foreground leading-tight">
              {project.title}
            </h3>
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View Docs
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Meta row */}
        <div className="mb-4 flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
          <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground/85 sm:text-base">
            <Building2 size={14} className="shrink-0 text-primary/70" />
            {project.client}
          </span>
          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
            <Calendar size={11} className="text-primary/60 shrink-0" />
            {project.period}
          </span>
        </div>

        {/* Summary */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors group"
        >
          <Layers size={13} />
          {expanded ? "Hide Details" : "View Key Contributions"}
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="inline-block"
          >
            <ChevronDown size={13} />
          </motion.span>
        </button>
      </div>

      {/* Expandable highlights */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="highlights"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Key Contributions
              </p>
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const spotlightLabel = featured.length > 1 ? "Spotlight Projects" : "Spotlight Project";

  return (
    <section id="projects" className="section-padding bg-secondary/30">
      <SectionHeading
        title="Projects"
        subtitle="Real-world enterprise work across reusable UI tooling, IoT, e-commerce, automation, and beyond"
      />

      <div className="container mx-auto space-y-10">
        {/* Featured project — full width spotlight */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full hero-gradient inline-block" />
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              {spotlightLabel}
            </p>
          </div>
          <div className="grid gap-6">
            {featured.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* All other projects — 2-col grid */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-accent inline-block" />
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              All Projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {rest.map((p, i) => (
              <ProjectCard key={p.title} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-4 pt-4 md:grid-cols-4"
        >
          {[
            { value: "9+", label: "Projects Delivered" },
            { value: "41+", label: "Reusable Components" },
            { value: "28+", label: "Global Partners" },
            { value: "8+", label: "Years of Experience" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="glass hover-card-glow rounded-xl p-4 text-center border border-border"
            >
              <div className="font-display text-2xl font-bold text-gradient mb-1">
                {value}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
