import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Where the element travels in from. */
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  /** Adds a blur-to-sharp pass on top of the translate. */
  blur?: boolean;
}

const offsetFor = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/** Scroll-triggered entrance used by every section. Collapses to a plain fade under reduced motion. */
const Reveal = ({
  children,
  className,
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.85,
  blur = true,
}: RevealProps) => {
  const reduced = usePrefersReducedMotion();

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3, delay } },
      }
    : {
        hidden: { opacity: 0, ...offsetFor(direction, distance), ...(blur ? { filter: "blur(8px)" } : {}) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          ...(blur ? { filter: "blur(0px)" } : {}),
          transition: { duration, delay, ease: ease.expoOut },
        },
      };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
