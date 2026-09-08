import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** `char` is for headlines; `word` keeps long strings cheap. */
  granularity?: "char" | "word";
  stagger?: number;
  /** Play immediately on mount instead of waiting for the viewport. */
  immediate?: boolean;
  /** The text is painted with a clipped background gradient. */
  gradient?: boolean;
}

type Metrics = { width: number; offsets: number[] };

/**
 * Reveals a string by sliding each glyph up from behind a clip, sharpening out
 * of blur. The full string stays on an accessible label so screen readers hear
 * it once, not letter by letter.
 *
 * Gradient headlines are the awkward case: `background-clip: text` does not
 * survive being split across transformed children, so each fragment has to
 * paint its own gradient. Giving every fragment the *same* gradient would band
 * it, so the line is measured once and each fragment gets the full-line
 * gradient shifted by its own offset — one continuous sweep across separately
 * animated glyphs.
 */
const TextReveal = ({
  text,
  className = "",
  delay = 0,
  granularity = "char",
  stagger,
  immediate = false,
  gradient = false,
}: TextRevealProps) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const step = stagger ?? (granularity === "char" ? 0.03 : 0.06);

  useLayoutEffect(() => {
    if (!gradient || reduced) return;

    const el = ref.current;
    if (!el) return;

    let alive = true;
    const measure = () => {
      if (!alive || !ref.current) return;

      const base = ref.current.getBoundingClientRect();
      if (!base.width) return;

      const units = ref.current.querySelectorAll<HTMLElement>("[data-unit]");
      setMetrics({
        width: base.width,
        offsets: Array.from(units, (u) => u.getBoundingClientRect().left - base.left),
      });
    };

    measure();

    // Web fonts land after first paint and shift every glyph, so re-measure.
    document.fonts?.ready.then(measure).catch(() => undefined);

    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => {
      alive = false;
      observer.disconnect();
    };
  }, [gradient, reduced, text]);

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  const animationProps = immediate
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: viewportOnce };

  const rise = (at: number) => ({
    hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
    visible: {
      y: "0%",
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.9, delay: at, ease: ease.expoOut },
    },
  });

  // The gradient is painted per glyph below, so drop the class that would also
  // paint (and animate) a competing background on the wrapper.
  const wrapperClass = gradient ? className.replace(/\btext-gradient\b/g, "") : className;

  const paintFor = (index: number) =>
    gradient && metrics
      ? {
          backgroundImage: "var(--text-gradient)",
          backgroundSize: `${metrics.width}px 100%`,
          backgroundPosition: `${-(metrics.offsets[index] ?? 0)}px 0`,
          backgroundRepeat: "no-repeat",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }
      : undefined;

  const words = text.split(" ");
  let index = 0;

  return (
    <motion.span
      ref={ref}
      aria-label={text}
      className={`inline-flex flex-wrap ${wrapperClass}`}
      initial="hidden"
      {...animationProps}
    >
      {words.map((word, wordIndex) => {
        const units = granularity === "char" ? Array.from(word) : [word];

        return (
          <span key={`${word}-${wordIndex}`} aria-hidden className="inline-flex whitespace-pre">
            {units.map((unit, unitIndex) => {
              const at = delay + index * step;
              const paint = paintFor(index);
              index += 1;

              return (
                <span
                  key={`${unit}-${unitIndex}`}
                  className="inline-block overflow-hidden pb-[0.14em]"
                >
                  <motion.span
                    data-unit
                    className="inline-block"
                    style={paint}
                    variants={rise(at)}
                  >
                    {unit}
                  </motion.span>
                </span>
              );
            })}
            {/* No data-unit here: the measured list must line up with the
                painted glyphs, and whitespace is never painted. */}
            {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </motion.span>
  );
};

export default TextReveal;
