import { useRef } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import type { ChapterMeta } from "../content";

/**
 * The leaf that opens each chapter, and then turns.
 *
 * The card pins, holds long enough to be read, then rotates away around its
 * left edge on a perspective parent — a page lifting off the spine. Shading
 * deepens toward the gutter as it swings, which is what stops it reading as a
 * flat rectangle spinning.
 *
 * Rotation stops short of 90° and fades out: past square-on, the face points
 * away from the viewer and there is nothing meaningful left to show.
 */
const ChapterTurn = ({ chapter }: { chapter: ChapterMeta }) => {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const turning = isDesktop && !reduced;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: turning ? ["start start", "end end"] : ["start 85%", "end 20%"],
  });
  const constant = useMotionValue(0.35);
  const progress = reduced ? constant : scrollYProgress;

  const rotateY = useTransform(progress, [0.34, 1], [0, -96]);
  const pageOpacity = useTransform(progress, [0, 0.1, 0.78, 0.97], [0, 1, 1, 0]);
  const gutter = useTransform(progress, [0.34, 1], [0, 0.72]);
  const lift = useTransform(progress, [0.34, 1], [0, -80]);

  // The card composes itself before it begins to turn.
  const numberY = useTransform(progress, [0, 0.22], [70, 0]);
  const numberOpacity = useTransform(progress, [0, 0.2], [0, 1]);
  const titleY = useTransform(progress, [0.06, 0.3], [50, 0]);
  const titleOpacity = useTransform(progress, [0.06, 0.28], [0, 1]);
  const ruleScale = useTransform(progress, [0.12, 0.36], [0, 1]);
  const summaryOpacity = useTransform(progress, [0.16, 0.4], [0, 1]);

  const card = (
    <motion.div
      style={
        turning
          ? { rotateY, opacity: pageOpacity, x: lift, transformOrigin: "left center" }
          : { opacity: pageOpacity }
      }
      className="relative flex h-full w-full items-center justify-center [backface-visibility:hidden]"
    >
      <div className="relative w-full max-w-3xl px-6 text-center sm:px-10">
        <motion.p
          style={turning || reduced ? { y: numberY, opacity: numberOpacity } : undefined}
          className="font-serif text-[clamp(5rem,18vw,13rem)] leading-[0.8] text-[hsl(var(--chapter-accent))]"
        >
          {chapter.index === 0 ? "—" : String(chapter.index).padStart(2, "0")}
        </motion.p>

        <motion.p
          style={{ opacity: summaryOpacity }}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.45em] text-muted-foreground"
        >
          {chapter.kicker}
        </motion.p>

        <motion.h2
          style={{ y: titleY, opacity: titleOpacity }}
          className="mt-4 font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-foreground"
        >
          {chapter.title}
        </motion.h2>

        <motion.div
          style={{ scaleX: ruleScale }}
          className="mx-auto mt-8 h-px w-40 origin-center bg-[hsl(var(--chapter-accent)/0.6)]"
        />

        <motion.p
          style={{ opacity: summaryOpacity }}
          className="mx-auto mt-8 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {chapter.summary}
        </motion.p>
      </div>

      {/* Shading toward the spine, deepening through the swing */}
      {turning && (
        <motion.div
          aria-hidden
          style={{ opacity: gutter }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/90 via-black/25 to-transparent"
        />
      )}
    </motion.div>
  );

  if (!turning) {
    return (
      <div ref={ref} className="relative flex min-h-[86vh] items-center px-5 py-24 sm:px-6">
        {card}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative" style={{ height: "150vh" }}>
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ perspective: "1800px", perspectiveOrigin: "0% 50%" }}
      >
        {/* The leaf underneath, so the turn reveals a stack rather than a void */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-transparent via-[hsl(var(--chapter-accent)/0.04)] to-transparent"
        >
          <span className="font-serif text-[clamp(8rem,30vw,24rem)] leading-none text-foreground/[0.025]">
            {chapter.index === 0 ? "" : String(chapter.index).padStart(2, "0")}
          </span>
        </div>

        {card}
      </div>
    </div>
  );
};

export default ChapterTurn;
