import { motion } from "framer-motion";
import { Code2, Users, Rocket, Award } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import ScrollStory, { type ScrollStep } from "@/components/motion/ScrollStory";
import { ease, viewportOnce } from "@/lib/motion";

const capabilitySteps: ScrollStep[] = [
  {
    id: "architecture",
    label: "Platform Architecture",
    title: "Platform Architecture",
    body: "Designs scalable multi-tenant frontend systems with shared components, shared services, and clean domain boundaries.",
    meta: "41+ reusable components across enterprise applications",
    icon: Code2,
  },
  {
    id: "leadership",
    label: "Delivery Leadership",
    title: "Delivery Leadership",
    body: "Leads cross-functional engineering execution from technical discovery through sprint delivery and production rollout.",
    meta: "Trusted client-facing technical lead for global stakeholders",
    icon: Users,
  },
  {
    id: "performance",
    label: "Performance Engineering",
    title: "Performance Engineering",
    body: "Builds analytics-heavy interfaces and real-time operational dashboards optimized for high-volume enterprise data.",
    meta: "Improved release velocity and operational response outcomes",
    icon: Rocket,
  },
  {
    id: "quality",
    label: "Quality & Scale",
    title: "Quality & Scale",
    body: "Applies automation-first quality practices with WDIO and Cucumber to sustain reliable releases across products.",
    meta: "Stable delivery across IoT, telecom, and e-commerce platforms",
    icon: Award,
  },
];

const leadershipThemes = [
  "Technical Discovery",
  "Solution Architecture",
  "Team Mentoring",
  "Stakeholder Alignment",
  "Quality Governance",
  "Delivery Ownership",
];

const aboutLeftHighlights = [
  "Enterprise frontend architecture",
  "Cross-functional delivery leadership",
  "Client-facing technical communication",
  "Automation-led release quality",
];

const paragraphs = [
  "I build enterprise platforms for IoT, telecom, and e-commerce products, with strong depth in modern frontend and full-stack engineering.",
  "Over the last 8+ years, I have architected multi-tenant monorepos, reusable platform layers, and analytics-rich dashboards using Angular, React, Highcharts, and ag-Grid.",
  "I lead cross-functional teams through discovery, architecture, execution, and release while serving as a primary client-facing technical contact for enterprise programs.",
  "I specialize in converting complex enterprise requirements into scalable platform solutions with clear architecture boundaries and reusable engineering patterns.",
  "My focus is to deliver maintainable, high-quality products by aligning engineering velocity, stakeholder expectations, and long-term platform sustainability.",
  "I consistently drive execution clarity through structured planning, risk identification, and transparent communication across engineering and business teams.",
];

const AboutSection = () => (
  <section id="about" className="relative">
    <div className="section-padding">
      <SectionHeading
        eyebrow="Who I Am"
        title="About Me"
        subtitle="Technical Lead specializing in scalable frontend platforms and full-stack product delivery."
      />

      <div className="container mx-auto grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          {paragraphs.map((copy, i) => (
            <Reveal
              key={copy}
              direction="right"
              distance={22}
              delay={i * 0.05}
              className={i === 0 ? "" : "mt-6"}
            >
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{copy}</p>
            </Reveal>
          ))}
        </div>

        <div className="space-y-6">
          <Reveal direction="left" delay={0.08}>
            <SpotlightCard
              className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm"
              lift={false}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Core Strengths
              </p>
              <div className="mt-3 grid gap-2">
                {aboutLeftHighlights.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: ease.expoOut }}
                    className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          <Reveal direction="left" delay={0.14}>
            <SpotlightCard
              className="rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm"
              lift={false}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Leadership Focus
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {leadershipThemes.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.45, delay: 0.04 * i, ease: ease.expoOut }}
                    className="rounded-lg border border-border bg-muted/60 px-2.5 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent sm:text-xs"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </div>

    {/* Pinned walkthrough: one capability at a time, advanced by scroll */}
    <ScrollStory
      eyebrow="How I Work"
      heading="Four things I own"
      intro="Scroll through the way a platform actually gets built — from the architecture underneath to the quality practices that keep it shipping."
      steps={capabilitySteps}
    />
  </section>
);

export default AboutSection;
