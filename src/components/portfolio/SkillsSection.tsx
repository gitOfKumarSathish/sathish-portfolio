import { motion } from "framer-motion";
import { Layers, Database, Laptop, ShieldCheck, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import Marquee from "@/components/motion/Marquee";
import { ease, viewportOnce } from "@/lib/motion";

type SkillCategory = {
  title: string;
  summary: string;
  icon: LucideIcon;
  accent: string;
  skills: string[];
};

const skillCategories = [
  {
    title: "Full-Stack Development",
    summary: "Builds scalable frontend and full-stack applications with modern TypeScript-first workflows.",
    icon: Layers,
    accent: "from-primary/20 to-primary/5 border-primary/30",
    skills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "Angular (11-21)",
      "ReactJS",
      "Node.js",
    ],
  },
  {
    title: "State & Data Management",
    summary: "Designs predictable data flows and analytics-ready dashboards for enterprise-grade products.",
    icon: Database,
    accent: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30",
    skills: [
      "MongoDB (Indexing & Pipelines)",
      "TanStack Query",
      "NGXS & RxJS",
      "Highcharts & ag-Grid",
      "Material React Tables",
    ],
  },
  {
    title: "Hybrid & Specialized Tools",
    summary: "Delivers desktop, mobile, and automation-enabled solutions across varied runtime environments.",
    icon: Laptop,
    accent: "from-violet-500/20 to-violet-500/5 border-violet-500/30",
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
    summary: "Architects secure, reusable, and multi-tenant platforms for long-term product scalability.",
    icon: ShieldCheck,
    accent: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30",
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
    summary: "Leads technical discovery, team execution, and quality outcomes through structured delivery.",
    icon: Users,
    accent: "from-amber-500/20 to-amber-500/5 border-amber-500/30",
    skills: [
      "Technical Discovery & Solution Design",
      "Cross-functional Team Leadership",
      "Client & Stakeholder Communication",
      "Agile Delivery & Sprint Planning",
      "Quality Engineering & Test Strategy",
    ],
  },
] satisfies SkillCategory[];

const coreStack = ["Angular", "React", "TypeScript", "Node.js", "Highcharts", "WDIO"];

const SkillsSection = () => (
  <section id="skills" className="section-padding relative overflow-hidden bg-secondary/30">
    <SectionHeading
      eyebrow="What I Work With"
      title="Skills & Expertise"
      subtitle="Technologies and tools I work with daily"
    />

    <div className="container mx-auto space-y-6 md:space-y-8">
      <Reveal>
        <SpotlightCard className="glass rounded-2xl border border-border/60 p-5 sm:p-6" lift={false}>
          <div className="grid gap-5 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Core Capability Stack
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl">
                Enterprise Frontend Platforms & Delivery Leadership
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Hands-on across architecture, implementation, and release strategy for multi-tenant
                applications, analytics dashboards, and high-quality engineering delivery.
              </p>
            </div>

            {/* Core stack cycles past on a loop, pausing when the pointer rests on it */}
            <Marquee
              speed={26}
              items={coreStack.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center rounded-xl border border-border bg-muted/55 px-4 py-2 text-sm font-semibold text-foreground"
                >
                  {item}
                </span>
              ))}
            />
          </div>
        </SpotlightCard>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 md:gap-8">
        {skillCategories.map((cat, catIdx) => (
          <Reveal
            key={cat.title}
            delay={catIdx * 0.08}
            className={cat.title === "Leadership & Process" ? "md:col-span-2" : ""}
          >
            <SpotlightCard className="glass h-full rounded-2xl border border-border/60 p-5 sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.summary}</p>
                </div>
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: 0.12, ease: ease.backOut }}
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${cat.accent}`}
                >
                  <cat.icon size={18} className="text-foreground" />
                </motion.div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: 0.04 * i, ease: ease.expoOut }}
                    whileHover={{ y: -3 }}
                    className="cursor-default rounded-xl border border-border/80 bg-muted/55 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-primary sm:text-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
