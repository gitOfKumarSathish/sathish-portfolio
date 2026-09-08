import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsDesktop } from "@/hooks/useMediaQuery";

interface StackedCardsProps {
  items: ReactNode[];
  /** Distance from the top of the viewport the first card settles at. */
  offset?: number;
  /** How far each successive card sits below the one before it. */
  step?: number;
}

/**
 * Cards that pin one after another, each settling slightly below the last so the
 * read-through builds a visible deck rather than scrolling away into nothing.
 */
const StackedCards = ({ items, offset = 104, step = 16 }: StackedCardsProps) => {
  const reduced = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const stacked = isDesktop && !reduced;

  if (!stacked) {
    return <div className="grid gap-6">{items}</div>;
  }

  return (
    <div className="relative">
      {items.map((item, i) => (
        <StackItem key={i} top={offset + i * step} isLast={i === items.length - 1}>
          {item}
        </StackItem>
      ))}
    </div>
  );
};

const StackItem = ({
  children,
  top,
  isLast,
}: {
  children: ReactNode;
  top: number;
  isLast: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 20%", "end 20%"],
  });

  // The card recedes as the next slides over it, so only its top edge stays
  // visible. Opacity is deliberately left alone: fading an opaque card would let
  // the whole deck underneath show through and turn the stack into a smear.
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.94]);

  return (
    <div ref={ref} className={`sticky ${isLast ? "" : "mb-8"}`} style={{ top }}>
      <motion.div style={{ scale, transformOrigin: "center top" }}>{children}</motion.div>
    </div>
  );
};

export default StackedCards;
