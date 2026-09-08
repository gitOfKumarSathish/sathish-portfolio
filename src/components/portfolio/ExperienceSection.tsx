import { ArrowUpRight, BriefcaseBusiness, MapPin } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import TextReveal from "@/components/motion/TextReveal";
import HorizontalRail from "@/components/motion/HorizontalRail";

type Experience = {
  period: string;
  role: string;
  company: string;
  client?: string;
  location?: string;
  summary: string;
  highlights: string[];
  focus: string[];
  workstreams: string[];
  featuredWork?: {
    title: string;
    href: string;
    description: string;
    stack: string[];
  };
  current?: boolean;
};

const experiences: Experience[] = [
  {
    period: "May 2026 - Present",
    role: "Technical Lead Engineer",
    company: "Prasaditya Idea Private Limited",
    current: true,
    summary:
      "Since joining on May 4, 2026, I have been building reusable frontend infrastructure with a strong focus on headless, design-system-friendly table experiences.",
    highlights: [
      "Built Bst-Table, a headless React data grid engine powered by TanStack Table v9 for teams that need flexible enterprise-grade table foundations.",
      "Designed the architecture to support swappable Material UI and shadcn/Radix skins, keeping product teams free from single-library lock-in.",
      "Implemented the library in React and TypeScript with a dedicated documentation experience that clearly communicates usage patterns and adoption guidance.",
      "Positioned the solution around MIT/Apache-friendly usage with no per-seat licensing, making it practical for long-term product and platform teams.",
    ],
    focus: [
      "React",
      "TypeScript",
      "TanStack Table v9",
      "Headless UI",
      "Material UI",
      "shadcn/Radix",
    ],
    workstreams: [
      "Bst-Table headless grid engine",
      "Swappable UI skins and table composition patterns",
      "Documentation site and developer adoption experience",
    ],
    featuredWork: {
      title: "Bst-Table",
      href: "https://gitofkumarsathish.github.io/bst-grid/",
      description:
        "A headless React data grid with swappable Material UI and shadcn/Radix skins, built for flexible enterprise adoption.",
      stack: ["React", "TypeScript", "TanStack Table"],
    },
  },
  {
    period: "Jan 2024 - Apr 2026",
    role: "Technical Lead Engineer",
    company: "Alethea",
    client: "Client: Analog Devices India",
    location: "Bengaluru",
    summary:
      "Leading the OtoSense SMS platform end-to-end, from discovery and workflow design to delivery of a multi-tenant Angular monorepo used across enterprise operations.",
    highlights: [
      "Led a 7-member cross-functional squad using Angular 21 and TypeScript to deliver a multi-tenant monorepo, reducing feature delivery cycle time by ~30%.",
      "Designed real-time monitoring dashboards using Highcharts and ag-Grid, improving fault-triage response time for operations teams by ~35%.",
      "Implemented white-label theming and localization using Transloco and SCSS, enabling 28+ partner-specific deployments from one codebase.",
      "Drove technical discovery with product and client stakeholders using architecture walkthroughs, reducing requirement churn during sprints by ~25%.",
    ],
    focus: ["Angular 21", "TypeScript", "Highcharts", "ag-Grid", "NGXS", "SCSS"],
    workstreams: [
      "OtoSense SMS platform architecture",
      "Partner and operations application rollout",
      "Shared component and service library",
    ],
  },
  {
    period: "2022 - 2024",
    role: "Lead Engineer",
    company: "Alethea",
    client: "Client: Analog Devices India",
    location: "Bengaluru",
    summary:
      "Expanded into cross-product engineering leadership across desktop applications, automation systems, and reusable front-end platforms.",
    highlights: [
      "Led a 5-engineer delivery pod across product and QA teams using React and Electron, shipping two desktop/web products with shared UI foundations.",
      "Built an end-to-end automation framework using WDIO and Cucumber, increasing regression coverage to ~80% and cutting manual QA effort by ~45%.",
      "Owned shared component-platform architecture using React and TanStack Query, accelerating onboarding of new modules by ~40%.",
      "Collaborated with design, QA, and product stakeholders to standardize reusable UI patterns, reducing duplicate implementation work across teams.",
    ],
    focus: ["React", "Electron", "WDIO", "Cucumber", "TanStack Query", "Highcharts"],
    workstreams: [
      "Access Point GUI",
      "ReachMobile automation framework",
      "SelfCare Portal and shared React components",
    ],
  },
  {
    period: "2021 - 2022",
    role: "Senior Software Engineer",
    company: "Alethea",
    location: "Bengaluru",
    summary:
      "Built cloud device-orchestration experiences that made large-scale Wi-Fi validation workflows observable, actionable, and easier to manage.",
    highlights: [
      "Developed device orchestration portals using React and Node.js for configuration, test setup, and live connectivity workflows.",
      "Integrated Kibana dashboards and reporting modules, improving telemetry visibility for hundreds of concurrent test devices.",
      "Implemented map-based observability and status tracking, reducing time to identify failing device clusters by ~30%.",
      "Partnered with backend and test teams to align API contracts and reporting flows, improving release stability across sprint cycles.",
    ],
    focus: ["React", "Node.js", "Kibana", "REST APIs", "Maps"],
    workstreams: [
      "Cloud Automation Test Framework portal",
      "Execution reporting dashboards",
      "Device orchestration and live observability",
    ],
  },
  {
    period: "2018 - 2021",
    role: "Software Engineer",
    company: "Ace Turtle (August Purple)",
    location: "Bengaluru",
    summary:
      "Started the journey building omni-channel commerce systems and brand storefront experiences across high-traffic retail products.",
    highlights: [
      "Built reusable modules using React across OMS, IMS, CMS, and LMS workflows, improving consistency across core commerce applications.",
      "Delivered responsive PLP, PDP, and checkout journeys for 5+ global brands, improving campaign launch turnaround by ~25%.",
      "Contributed to a shared component-driven system used by multiple product teams, reducing duplicate UI development effort.",
      "Collaborated closely with product, QA, and operations stakeholders to ship high-traffic seasonal storefront releases on schedule.",
    ],
    focus: ["React", "E-commerce", "CMS", "XML Layouts", "Responsive UI"],
    workstreams: [
      "Rubicon omni-channel fulfillment platform",
      "Global brand commerce portals",
      "Reusable front-end component systems",
    ],
  },
];

/** One stop on the rail. Fixed width so the horizontal travel stays predictable. */
const ExperienceCard = ({ experience, index }: { experience: Experience; index: number }) => (
  <SpotlightCard className="glass flex h-[clamp(26rem,64vh,34rem)] w-[min(88vw,30rem)] shrink-0 flex-col rounded-3xl border border-border/60 p-6 lg:p-7">
    <div className="flex items-start justify-between gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground">
        <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
      </span>

      {experience.current ? (
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-semibold text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Current
        </span>
      ) : null}
    </div>

    <p className="mt-5 inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {experience.period}
    </p>

    <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-foreground">
      {experience.role}
    </h3>

    <p className="mt-1.5 text-base font-semibold text-foreground/80">{experience.company}</p>
    {experience.client ? (
      <p className="mt-1 text-xs text-muted-foreground">{experience.client}</p>
    ) : null}

    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <BriefcaseBusiness size={13} />
        {experience.role}
      </span>
      {experience.location ? (
        <span className="inline-flex items-center gap-1.5">
          <MapPin size={13} />
          {experience.location}
        </span>
      ) : null}
    </div>

    {/* Highlights scroll inside the card so every stop is the same height */}
    <div className="scrollbar-hide mt-5 flex-1 overflow-y-auto pr-1" data-lenis-prevent>
      <p className="text-sm leading-relaxed text-muted-foreground">{experience.summary}</p>

      <ul className="mt-4 space-y-2.5">
        {experience.highlights.map((highlight) => (
          <li
            key={highlight}
            className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
        Key Workstreams
      </p>
      <ul className="mt-2.5 space-y-2">
        {experience.workstreams.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {experience.featuredWork ? (
        <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Featured Work
              </p>
              <p className="mt-1.5 text-base font-semibold text-foreground">
                {experience.featuredWork.title}
              </p>
            </div>
            <a
              href={experience.featuredWork.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-background/80 px-3 py-1.5 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              Open Docs
              <ArrowUpRight size={12} />
            </a>
          </div>

          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            {experience.featuredWork.description}
          </p>
        </div>
      ) : null}
    </div>

    <div className="mt-5 shrink-0 border-t border-border/60 pt-4">
      <div className="flex flex-wrap gap-1.5">
        {experience.focus.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border/70 bg-background/70 px-2.5 py-1 text-[10px] font-mono text-foreground/80"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  </SpotlightCard>
);

const ExperienceHeader = () => (
  <div>
    <Reveal distance={14}>
      <span className="eyebrow mb-4">Career Journey</span>
    </Reveal>

    <h2 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
      <TextReveal text="Experience" />
    </h2>

    <Reveal delay={0.15}>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg">
        A progression from product engineering into platform leadership across reusable UI tooling,
        IoT, telecom, automation, and e-commerce systems.{" "}
        <span className="text-foreground/70">Keep scrolling to move along the timeline.</span>
      </p>
    </Reveal>
  </div>
);

const ExperienceSection = () => (
  <section id="experience" className="section-padding relative">
    <HorizontalRail
      header={<ExperienceHeader />}
      items={experiences.map((experience, index) => (
        <ExperienceCard
          key={`${experience.company}-${experience.role}-${experience.period}`}
          experience={experience}
          index={index}
        />
      ))}
    />
  </section>
);

export default ExperienceSection;
