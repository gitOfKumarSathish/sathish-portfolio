import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { Trophy, Mic, BookOpen, Award, Users, Globe } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import TiltCard from "@/components/motion/TiltCard";
import Marquee from "@/components/motion/Marquee";
import TextReveal from "@/components/motion/TextReveal";
import { ease, viewportOnce } from "@/lib/motion";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const achievements = [
  { icon: Trophy, title: "AI-Accelerated Delivery", desc: "Improved developer throughput by introducing AI-assisted coding workflows that shortened prototyping and implementation cycles.", color: "text-yellow-500", ring: "border-yellow-500/30 bg-yellow-500/10" },
  { icon: Mic, title: "Discovery-to-Delivery Ownership", desc: "Led technical discovery with stakeholders and converted ambiguous requirements into delivery-ready architecture plans.", color: "text-blue-500", ring: "border-blue-500/30 bg-blue-500/10" },
  { icon: BookOpen, title: "Angular Modernization", desc: "Executed Angular 11 → 21 migration with controlled rollout, preserving release continuity and minimizing operational risk.", color: "text-green-500", ring: "border-green-500/30 bg-green-500/10" },
  { icon: Award, title: "ETL Effort Reduction", desc: "Automated ETL workflows to reduce manual processing effort by ~90%, improving turnaround for engineering teams.", color: "text-purple-500", ring: "border-purple-500/30 bg-purple-500/10" },
  { icon: Users, title: "Cross-Functional Team Leadership", desc: "Coordinated frontend, backend, and QA execution for multi-tenant platform initiatives across enterprise programs.", color: "text-orange-500", ring: "border-orange-500/30 bg-orange-500/10" },
  { icon: Globe, title: "White-Label Platform Scale", desc: "Built partner-ready customization architecture that enabled 28+ branded experiences from a single product platform.", color: "text-cyan-500", ring: "border-cyan-500/30 bg-cyan-500/10" },
];

const certificationGroups = [
  {
    title: "Leadership",
    items: [
      "Technical Project Leadership",
      "Stakeholder & Client Management",
      "Cross-functional Team Management",
      "Architectural Discovery & Design",
      "Agile & SDLC Management",
    ],
  },
  {
    title: "Delivery & Quality",
    items: [
      "Enterprise Architecture Expertise",
      "Automation Testing (WDIO & Cucumber)",
      "DevOps & Cloud Infrastructure",
    ],
  },
];

const AchievementsSection = () => {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 90%"],
  });

  // The counter in the pinned column tracks which card is level with the eye.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(achievements.length, Math.max(1, Math.ceil(value * achievements.length) || 1));
    setCurrent((prev) => (prev === next ? prev : next));
  });

  const railScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="achievements" className="section-padding relative bg-secondary/30">
      <div className="container mx-auto">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          {/* Heading column holds its place while the list travels past it */}
          <div className={isDesktop && !reduced ? "lg:sticky lg:top-28 lg:h-fit" : ""}>
            <Reveal distance={14}>
              <span className="eyebrow mb-5">Milestones</span>
            </Reveal>

            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
              <TextReveal text="Achievements" className="text-gradient" gradient />
            </h2>

            <Reveal delay={0.12}>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
                Recognition and milestones throughout my career — the outcomes behind the job titles.
              </p>
            </Reveal>

            <div className="mt-10 flex items-center gap-4">
              <span className="font-display text-5xl font-bold tabular-nums text-foreground">
                {String(current).padStart(2, "0")}
              </span>
              <span className="font-mono text-sm text-muted-foreground">
                / {String(achievements.length).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-5 h-px w-full max-w-xs bg-border">
              <motion.div style={{ scaleX: railScale }} className="h-full origin-left hero-gradient" />
            </div>
          </div>

          <div ref={listRef} className="grid gap-5 sm:grid-cols-2">
            {achievements.map((item, i) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={(i % 2) * 0.08} className="h-full">
                  <TiltCard max={6} className="h-full">
                    <SpotlightCard className="glass h-full rounded-2xl border border-border/60 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-xl border ${item.ring}`}
                        >
                          <Icon size={22} className={item.color} />
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="mt-5 font-display text-lg font-bold leading-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </SpotlightCard>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Certifications ride past on two opposing tickers */}
        <div className="mt-20 border-t border-border/70 pt-12">
          <Reveal distance={14}>
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="eyebrow mb-3">Credentials</span>
                <h3 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
                  Certifications
                </h3>
              </div>
              <p className="max-w-sm text-sm text-muted-foreground">
                Practices I lead with day to day, across delivery management and engineering quality.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {certificationGroups.map((group, groupIndex) => (
              <div key={group.title}>
                <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
                  {group.title}
                </p>
                <Marquee
                  speed={groupIndex === 0 ? 34 : 28}
                  reverse={groupIndex === 1}
                  items={group.items.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-2.5 rounded-xl border border-border bg-card/70 px-4 py-2.5 text-sm font-medium text-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {cert}
                    </span>
                  ))}
                />
              </div>
            ))}
          </div>

          {/* Static fallback keeps the full list readable when motion is off */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: ease.expoOut }}
            className="sr-only"
          >
            {certificationGroups.flatMap((g) => g.items).join(", ")}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
