import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ScrollHighlightTextProps {
  text: string;
  className?: string;
  /** Words that should resolve in the accent colour rather than plain foreground. */
  emphasis?: string[];
}

/**
 * A statement that writes itself in as the section scrolls: each word lifts from
 * dim to solid across its own slice of the scroll range.
 */
const ScrollHighlightText = ({ text, className = "", emphasis = [] }: ScrollHighlightTextProps) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = text.split(" ");
  const highlighted = new Set(emphasis.map((word) => word.toLowerCase()));

  if (reduced) {
    return <p className={className}>{text}</p>;
  }

  return (
    <p ref={ref} className={`relative flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const stripped = word.replace(/[^a-z]/gi, "").toLowerCase();

        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            accent={highlighted.has(stripped)}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const Word = ({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) => {
  const opacity = useTransform(progress, range, [0.16, 1]);

  return (
    <span className="mr-[0.28em] mt-[0.12em]">
      <motion.span style={{ opacity }} className={accent ? "text-gradient" : ""}>
        {children}
      </motion.span>
    </span>
  );
};

export default ScrollHighlightText;
