import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { SceneContext } from "./sceneContext";

interface SceneProps {
  children: ReactNode;
  /** Viewport heights of scroll the scene occupies. More = slower playback. */
  length?: number;
  className?: string;
  /** Disable the camera push/pull, e.g. for scenes that stage their own motion. */
  still?: boolean;
}

/**
 * A pinned, scroll-scrubbed panel — one shot of the film.
 *
 * On desktop the scene pins with `position: sticky` and its content is driven
 * entirely by scroll position: it eases in from slightly oversize and blurred,
 * holds while you read, then recedes. Because the pin is sticky rather than a
 * cloned/re-measured layout, it stays stable under smooth scrolling.
 *
 * On smaller screens it does not pin, but still scrubs as it travels through
 * the viewport. Under reduced motion it renders as a plain, fully composed
 * block with no movement at all.
 */
const Scene = ({ children, length = 2, className = "", still = false }: SceneProps) => {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const pinned = isDesktop && !reduced;

  // Measured across the scene's whole pass — approach, hold and departure —
  // not just the pinned stretch. Scrubbing only while pinned leaves the content
  // uncomposed as it travels in and out, which shows up as a dead frame between
  // consecutive scenes.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned ? ["start end", "end start"] : ["start 85%", "end 15%"],
  });

  const constant = useMotionValue(0.5);
  const progress = reduced ? constant : scrollYProgress;

  // The scene is composed well before it lands and holds well past it, so a
  // frame is never empty during the hand-off between scenes.
  const scale = useTransform(progress, [0, 0.2, 0.82, 1], [1.05, 1, 1, 0.96]);
  const opacity = useTransform(progress, [0, 0.16, 0.86, 1], [0, 1, 1, 0]);
  const y = useTransform(progress, [0, 0.2, 0.82, 1], [40, 0, 0, -36]);
  const blur = useTransform(progress, [0, 0.18, 0.84, 1], [10, 0, 0, 9]);
  const filter = useTransform(blur, (v) => `blur(${v.toFixed(2)}px)`);

  const camera = still || reduced ? undefined : { scale, opacity, y, filter };

  const body = (
    <SceneContext.Provider value={{ progress, scrubbed: !reduced }}>
      <motion.div style={camera} className={`w-full ${className}`}>
        {children}
      </motion.div>
    </SceneContext.Provider>
  );

  if (!pinned) {
    return (
      <div ref={ref} className="relative px-5 py-24 sm:px-6">
        {body}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative" style={{ height: `${length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">{body}</div>
    </div>
  );
};

export default Scene;
