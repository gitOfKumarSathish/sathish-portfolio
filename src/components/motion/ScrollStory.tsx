import { useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";

export interface ScrollStep {
  id: string;
  /** Short name shown in the index rail. */
  label: string;
  title: string;
  body: string;
  /** Optional outcome line rendered as a pill. */
  meta?: string;
  icon?: LucideIcon;
}

interface ScrollStoryProps {
  steps: ScrollStep[];
  eyebrow?: string;
  heading: string;
  intro?: string;
  /** Viewport heights of scroll distance allocated to each step. */
  pace?: number;
}

/**
 * A section that pins itself and advances through its steps as the page scrolls,
 * so the content is walked through rather than dumped all at once.
 *
 * The pin is plain `position: sticky` inside a tall spacer — no layout is cloned
 * or re-measured, which keeps it stable alongside smooth scrolling. Below the
 * desktop breakpoint (and under reduced motion) it falls back to a plain list,
 * because hijacking scroll on a phone is worse than not doing it at all.
 */
const ScrollStory = ({ steps, eyebrow, heading, intro, pace = 0.9 }: ScrollStoryProps) => {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Steps advance on equal slices of the section's scroll range.
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(value * steps.length)));
    setActive((current) => (current === next ? current : next));
  });

  const railScale = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const stepped = isDesktop && !reduced;

  if (!stepped) {
    return (
      <div className="container mx-auto">
        <StoryIntro eyebrow={eyebrow} heading={heading} intro={intro} />

        <div className="mt-10 space-y-4">
          {steps.map((step, i) => (
            <motion.article
              key={step.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: i * 0.06, ease: ease.expoOut }}
              className="glass rounded-2xl border border-border/60 p-5"
            >
              <StepIndex index={i} total={steps.length} />
              <h3 className="mt-3 font-display text-xl font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              {step.meta && <MetaPill>{step.meta}</MetaPill>}
            </motion.article>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: `${steps.length * pace * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container mx-auto grid w-full grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-16">
          {/* Index rail — the map of where you are in the section */}
          <div>
            <StoryIntro eyebrow={eyebrow} heading={heading} intro={intro} />

            {/* Spine and markers are both centred on x = 0 of this container,
                so they line up whatever the dot size or list padding. The
                `pl-8` here and the `-left-8` on each marker are a matched pair. */}
            <div className="relative mt-10 pl-8">
              <div className="absolute bottom-1 left-0 top-1 -translate-x-1/2">
                <div className="h-full w-px bg-border" />
                <motion.div
                  style={{ scaleY: railScale }}
                  className="absolute inset-y-0 left-0 w-px origin-top hero-gradient"
                />
              </div>

              <ul className="space-y-4">
                {steps.map((step, i) => {
                  const isActive = i === active;

                  return (
                    <li key={step.id} className="relative">
                      {/* The wrapper owns the centring; the animated scale sits
                          on the child so it cannot overwrite the translate. */}
                      <div className="absolute -left-8 top-2 -translate-x-1/2">
                        <motion.span
                          aria-hidden
                          animate={{
                            scale: isActive ? 1 : 0.55,
                            opacity: isActive ? 1 : 0.35,
                          }}
                          transition={{ duration: 0.45, ease: ease.expoOut }}
                          className="block h-2.5 w-2.5 rounded-full bg-primary"
                        />
                      </div>
                      <motion.p
                        animate={{
                          opacity: isActive ? 1 : 0.42,
                          x: isActive ? 6 : 0,
                        }}
                        transition={{ duration: 0.45, ease: ease.expoOut }}
                        className={`font-display text-base font-semibold ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <span className="mr-2 font-mono text-xs text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {step.label}
                      </motion.p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Stage — only the active step is mounted, so entrances stay crisp */}
          <div className="relative min-h-[26rem]">
            <AnimatePresence mode="wait">
              {steps.map((step, i) =>
                i === active ? (
                  <motion.article
                    key={step.id}
                    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -28, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: ease.expoOut }}
                    className="glass relative flex min-h-[26rem] flex-col justify-center overflow-hidden rounded-3xl border border-border/60 p-8 xl:min-h-[30rem] xl:p-12"
                  >
                    {/* Oversized index sitting behind the copy, for scale */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-14 -right-6 select-none font-display text-[13rem] font-bold leading-none text-foreground/[0.035] xl:text-[16rem]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="relative flex items-center justify-between gap-6">
                      <StepIndex index={i} total={steps.length} />

                      {step.icon && (
                        <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-card/80">
                          <span className="absolute inset-0 rounded-2xl hero-gradient opacity-20" />
                          <step.icon size={24} className="relative text-primary" />
                        </span>
                      )}
                    </div>

                    <h3 className="relative mt-8 font-display text-3xl font-bold leading-tight text-foreground xl:text-5xl">
                      {step.title}
                    </h3>

                    <p className="relative mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground xl:text-xl">
                      {step.body}
                    </p>

                    {step.meta && <MetaPill>{step.meta}</MetaPill>}
                  </motion.article>
                ) : null,
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryIntro = ({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow?: string;
  heading: string;
  intro?: string;
}) => (
  <div>
    {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
    <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl xl:text-5xl">
      <span className="text-gradient">{heading}</span>
    </h2>
    {intro && (
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{intro}</p>
    )}
  </div>
);

const StepIndex = ({ index, total }: { index: number; total: number }) => (
  <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
    <span className="text-primary">{String(index + 1).padStart(2, "0")}</span>
    {" / "}
    {String(total).padStart(2, "0")}
  </span>
);

const MetaPill = ({ children }: { children: React.ReactNode }) => (
  <p className="relative mt-8 inline-flex w-fit rounded-full border border-primary/25 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
    {children}
  </p>
);

export default ScrollStory;
