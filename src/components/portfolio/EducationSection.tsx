import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import { ease, viewportOnce } from "@/lib/motion";

const education = [
  {
    degree: "B.E. Computer Science",
    institution: "University College of Engineering Villupuram",
    location: "Tamil Nadu",
    period: "2013 – 2017",
    details: "Bachelor of Engineering in Computer Science from Anna University. Strong foundation in software engineering, data structures, and web technologies.",
    badge: "Bachelor's Degree",
    badgeColor: "bg-purple-500/20 text-purple-500",
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    institution: "Vedhha Vikass Higher Secondary School",
    location: "Salem",
    period: "2011 – 2013",
    details: "Higher Secondary Education with focus on Mathematics and Science. Built strong analytical and problem-solving skills.",
    badge: "Higher Secondary",
    badgeColor: "bg-red-500/20 text-red-500",
  },
  {
    degree: "SSLC (Secondary School Leaving Certificate)",
    institution: "Gugai Higher Secondary School",
    location: "Salem",
    period: "2010 – 2011",
    details: "Secondary School Education establishing foundational knowledge in core subjects and academic excellence.",
    badge: "Secondary",
    badgeColor: "bg-orange-500/20 text-orange-500",
  },
];

const accentStyles = [
  { dotBorder: "border-cyan-500", dotFill: "bg-cyan-500" },
  { dotBorder: "border-purple-500", dotFill: "bg-purple-500" },
  { dotBorder: "border-orange-500", dotFill: "bg-orange-500" },
];

const EducationSection = () => (
  <section id="education" className="section-padding">
    <SectionHeading
      eyebrow="Foundations"
      title="Education"
      subtitle="My academic journey and continuous learning path"
    />

    <div className="container mx-auto max-w-5xl">
      <div className="relative">
        {/* The spine draws downward once the timeline enters view. Its centring
            sits on the wrapper for the same reason as the markers below: the
            animated scaleY would otherwise replace the translate. */}
        <div
          aria-hidden
          className="absolute bottom-0 left-5 top-0 w-px -translate-x-1/2 md:left-1/2"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.6, ease: ease.expoOut }}
            className="h-full w-px origin-top bg-gradient-to-b from-cyan-500 via-purple-500 to-orange-500"
          />
        </div>

        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {education.map((edu, i) => {
            const accent = accentStyles[i] ?? accentStyles[accentStyles.length - 1];
            const isEven = i % 2 === 0;

            return (
              <article key={edu.degree} className="relative pl-14 sm:pl-16 md:pl-0">
                {/* Centring lives on this wrapper, not on the animated node:
                    an animated transform would overwrite -translate-x-1/2 and
                    knock the marker off the timeline. */}
                <div className="absolute left-5 top-8 z-10 -translate-x-1/2 md:left-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.15, ease: ease.backOut }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-4 bg-background ${accent.dotBorder}`}
                  >
                    <div className={`h-4 w-4 rounded-full ${accent.dotFill}`} />
                  </motion.div>
                </div>

                <div className={`flex ${isEven ? "md:flex-row" : "md:flex-row-reverse"} md:items-start`}>
                  <div className="w-full md:w-1/2 md:px-8">
                    <Reveal
                      direction={isEven ? "right" : "left"}
                      distance={30}
                      delay={i * 0.12}
                    >
                      <span
                        className={`mb-3 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] sm:text-xs ${edu.badgeColor}`}
                      >
                        {edu.badge}
                      </span>

                      <SpotlightCard className="glass rounded-2xl border border-border/50 p-5 sm:p-6 md:p-8">
                        <div className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
                          <span>{edu.period}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                          <span>{edu.location}</span>
                        </div>

                        <h3 className="mb-2 font-display text-xl font-bold text-foreground sm:text-2xl">
                          {edu.degree}
                        </h3>

                        <p className="mb-4 text-sm font-semibold text-primary sm:text-base">
                          {edu.institution}
                        </p>

                        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                          {edu.details}
                        </p>
                      </SpotlightCard>
                    </Reveal>
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default EducationSection;
