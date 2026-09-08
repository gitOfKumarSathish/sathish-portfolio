import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";

interface HorizontalRailProps {
  items: ReactNode[];
  header?: ReactNode;
  /** Extra scroll distance, as a fraction of the travel, to ease in and out. */
  padding?: number;
}

/**
 * Pins itself and translates a row of cards sideways as the page scrolls, so a
 * long timeline is walked through instead of being scrolled past.
 *
 * Travel is measured from the real track width, so the last card always lands
 * flush against the right edge no matter how many items or how wide the screen.
 * Falls back to an ordinary vertical stack on small screens and reduced motion.
 */
const HorizontalRail = ({ items, header, padding = 0.08 }: HorizontalRailProps) => {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const railActive = isDesktop && !reduced;

  useLayoutEffect(() => {
    if (!railActive) {
      setTravel(0);
      return;
    }

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;

      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [railActive, items.length]);

  // Hold still briefly at both ends so the first and last card can be read.
  const rawX = useTransform(scrollYProgress, [padding, 1 - padding], [0, -travel], {
    clamp: true,
  });
  const x = useSpring(rawX, { stiffness: 220, damping: 40, restDelta: 0.5 });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  // Keep the page height honest: enough scroll to cover the travel, plus the pad.
  const [viewportHeight, setViewportHeight] = useState(900);
  useEffect(() => {
    const sync = () => setViewportHeight(window.innerHeight);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  if (!railActive) {
    return (
      <div className="container mx-auto">
        {header}
        <div className="mt-10 space-y-6">{items}</div>
      </div>
    );
  }

  const scrollLength = viewportHeight + travel / (1 - padding * 2);

  return (
    <div ref={containerRef} className="relative" style={{ height: scrollLength }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {header && <div className="container mx-auto w-full shrink-0">{header}</div>}

        <motion.div ref={trackRef} style={{ x }} className="mt-10 flex w-max gap-6 px-[max(2rem,calc((100vw-1400px)/2+2rem))]">
          {items}
        </motion.div>

        {/* Travel indicator so the sideways movement reads as deliberate */}
        <div className="container mx-auto mt-10 w-full shrink-0">
          <div className="h-px w-full bg-border">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left hero-gradient" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalRail;
