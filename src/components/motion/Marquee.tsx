import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface MarqueeProps {
  items: ReactNode[];
  /** Seconds for one full pass. Larger is slower. */
  speed?: number;
  reverse?: boolean;
  className?: string;
  /** Fades the strip into the page at both ends. */
  fade?: boolean;
}

/**
 * Seamless ticker. The list is rendered twice and translated by exactly -50%,
 * so the loop point lands on an identical frame.
 */
const Marquee = ({ items, speed = 32, reverse = false, className = "", fade = true }: MarqueeProps) => {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`marquee group relative overflow-hidden ${fade ? "marquee--fade" : ""} ${className}`}
    >
      <div
        className="marquee__track flex w-max gap-3"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-3 pr-3">
            {items.map((item, i) => (
              <div key={i} className="shrink-0">
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
