import type { ReactNode } from "react";
import { motion, useTransform } from "framer-motion";
import { useSceneRange } from "./sceneContext";

interface ScrubInProps {
  children: ReactNode;
  /** Scene progress at which this element starts arriving. */
  from?: number;
  /** Scene progress at which it has fully arrived. */
  to?: number;
  y?: number;
  x?: number;
  blur?: number;
  className?: string;
}

/**
 * Arrives across a window of the scene's timeline rather than on a trigger, so
 * the viewer can scrub it back and forth like a playhead.
 */
export const ScrubIn = ({
  children,
  from = 0.12,
  to = 0.34,
  y = 34,
  x = 0,
  blur = 8,
  className,
}: ScrubInProps) => {
  const opacity = useSceneRange([from, to], [0, 1]);
  const ty = useSceneRange([from, to], [y, 0]);
  const tx = useSceneRange([from, to], [x, 0]);
  const blurred = useSceneRange([from, to], [blur, 0]);
  const filter = useTransform(blurred, (v) => (v < 0.05 ? "none" : `blur(${v.toFixed(2)}px)`));

  return (
    <motion.div style={{ opacity, y: ty, x: tx, filter }} className={className}>
      {children}
    </motion.div>
  );
};

interface ScrubLinesProps {
  lines: string[];
  /** Window of the scene timeline the whole block occupies. */
  from?: number;
  to?: number;
  className?: string;
  lineClassName?: string;
}

/** A paragraph that writes itself in line by line as the scene plays. */
export const ScrubLines = ({
  lines,
  from = 0.14,
  to = 0.6,
  className = "",
  lineClassName = "",
}: ScrubLinesProps) => {
  const span = (to - from) / lines.length;

  return (
    <div className={className}>
      {lines.map((line, i) => (
        <ScrubIn
          key={line}
          from={from + i * span}
          to={from + (i + 1) * span}
          y={26}
          className={lineClassName}
        >
          {line}
        </ScrubIn>
      ))}
    </div>
  );
};

interface LayerProps {
  children: ReactNode;
  /** Pixels of counter-travel across the scene. Higher = closer to camera. */
  depth?: number;
  className?: string;
}

/** Moves at its own rate across the scene, putting distance between planes. */
export const Layer = ({ children, depth = 60, className }: LayerProps) => {
  const y = useSceneRange([0, 1], [depth, -depth]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

/** Scales gently across the scene — a slow camera push on a single element. */
export const Push = ({
  children,
  from = 1.12,
  to = 1,
  className,
}: {
  children: ReactNode;
  from?: number;
  to?: number;
  className?: string;
}) => {
  const scale = useSceneRange([0, 1], [from, to]);

  return (
    <motion.div style={{ scale }} className={className}>
      {children}
    </motion.div>
  );
};

/** A rule that draws itself across the scene's window. */
export const ScrubRule = ({
  from = 0.1,
  to = 0.45,
  className = "",
}: {
  from?: number;
  to?: number;
  className?: string;
}) => {
  const scaleX = useSceneRange([from, to], [0, 1]);

  return (
    <motion.div
      style={{ scaleX }}
      className={`h-px w-full origin-left bg-[hsl(var(--chapter-accent)/0.55)] ${className}`}
    />
  );
};
