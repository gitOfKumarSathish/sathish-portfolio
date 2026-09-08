import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import profilePhoto from "@/assets/sathish.jpeg";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Counter from "@/components/motion/Counter";
import Scene from "../components/Scene";
import { ScrubIn, ScrubLines, ScrubRule, Layer } from "../components/Scrub";
import { prologue } from "../content";

/**
 * The cover plate. Everything is driven by the page's own scroll from the first
 * pixel, so the book is already in motion before the reader has done anything.
 */
const CoverPlate = () => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const constant = useMotionValue(0);
  const progress = reduced ? constant : scrollYProgress;

  const plateScale = useTransform(progress, [0, 1], [1, 1.16]);
  const plateOpacity = useTransform(progress, [0, 0.75], [1, 0]);
  const plateY = useTransform(progress, [0, 1], [0, -90]);
  const portraitY = useTransform(progress, [0, 1], [0, 140]);
  const arch = useTransform(progress, [0, 1], [0, -60]);

  return (
    <div ref={ref} className="relative h-[100svh] min-h-[600px]">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div
          style={reduced ? undefined : { scale: plateScale, opacity: plateOpacity, y: plateY }}
          className="relative mx-auto w-full max-w-6xl px-6 sm:px-10"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div className="order-2 text-center lg:order-1 lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[11px] uppercase tracking-[0.5em] text-muted-foreground"
              >
                A Portfolio
              </motion.p>

              <h1 className="mt-6 font-serif text-[clamp(3.2rem,10vw,8rem)] leading-[0.86] text-foreground">
                {["Sathish", "Kumar"].map((word, i) => (
                  <span key={word} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "115%" }}
                      animate={{ y: "0%" }}
                      transition={{
                        delay: 0.5 + i * 0.12,
                        duration: 1.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.95, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 h-px w-full max-w-sm origin-left bg-[hsl(var(--chapter-accent)/0.6)] lg:mx-0"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15, duration: 1 }}
                className="mt-7 text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Technical Lead &amp; Full-Stack Engineer
                <span className="mx-3 text-muted-foreground/40">·</span>
                Bengaluru
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.35, duration: 1 }}
                className="mt-2 font-mono text-xs uppercase tracking-[0.32em] text-muted-foreground/70"
              >
                2018 — 2026
              </motion.p>
            </div>

            {/* Arched plate, the way a frontispiece sits in a printed book */}
            <motion.div
              style={reduced ? undefined : { y: portraitY }}
              className="order-1 flex justify-center lg:order-2"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[15rem] sm:w-[19rem] lg:w-[23rem]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-foreground/10">
                  <img
                    src={profilePhoto}
                    alt="Sathish Kumar"
                    className="h-full w-full object-cover object-[center_12%] contrast-[1.05] saturate-[0.9]"
                    width={512}
                    height={640}
                  />
                  <div
                    className="absolute inset-0 mix-blend-soft-light"
                    style={{ backgroundColor: "hsl(var(--chapter-accent) / 0.35)" }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
                </div>
                <motion.div
                  style={reduced ? undefined : { y: arch }}
                  className="absolute -inset-4 -z-10 rounded-t-full border border-[hsl(var(--chapter-accent)/0.25)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          style={reduced ? undefined : { opacity: plateOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-muted-foreground">
            Scroll to open
          </p>
          <motion.div
            animate={reduced ? undefined : { y: [0, 9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="mx-auto mt-3 h-8 w-px bg-gradient-to-b from-[hsl(var(--chapter-accent))] to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
};

const CoverChapter = () => (
  <>
    <CoverPlate />

    <Scene length={1.8}>
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-10">
        <ScrubIn from={0.06} to={0.24}>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Prologue
          </p>
        </ScrubIn>

        <ScrubRule from={0.1} to={0.36} className="mt-6" />

        <ScrubIn from={0.12} to={0.4} y={40}>
          {/* Drop cap, because this is where the book actually starts */}
          <p className="mt-10 font-serif text-[clamp(1.6rem,3.6vw,2.9rem)] leading-[1.3] text-foreground [&>span:first-child]:float-left [&>span:first-child]:mr-4 [&>span:first-child]:mt-2 [&>span:first-child]:font-serif [&>span:first-child]:text-[4.2em] [&>span:first-child]:leading-[0.72] [&>span:first-child]:text-[hsl(var(--chapter-accent))]">
            <span>I</span>
            {prologue.opening.slice(1)}
          </p>
        </ScrubIn>

        <ScrubLines
          lines={prologue.lines}
          from={0.4}
          to={0.78}
          className="mt-10 max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg"
        />
      </div>
    </Scene>

    <Scene length={1.3}>
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <Layer depth={40}>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {prologue.figures.map((figure, i) => (
              <ScrubIn key={figure.label} from={0.1 + i * 0.09} to={0.34 + i * 0.09} y={40}>
                <Counter
                  value={figure.value}
                  suffix={figure.suffix}
                  className="block font-serif text-[clamp(2.8rem,6vw,4.5rem)] leading-none text-[hsl(var(--chapter-accent))]"
                />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{figure.label}</p>
              </ScrubIn>
            ))}
          </div>
        </Layer>
      </div>
    </Scene>
  </>
);

export default CoverChapter;
