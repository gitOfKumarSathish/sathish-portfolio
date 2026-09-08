import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  /** Radius of the cursor-following glow, in px. */
  radius?: number;
  /** Lift the card slightly while hovered. */
  lift?: boolean;
}

/**
 * Card surface with a soft light that follows the pointer and a matching border
 * highlight — the effect that makes glass panels read as physical.
 */
const SpotlightCard = ({ children, className = "", radius = 380, lift = true }: SpotlightCardProps) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, hsl(var(--primary) / 0.14), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(${radius * 0.7}px circle at ${mouseX}px ${mouseY}px, hsl(var(--accent) / 0.55), transparent 70%)`;

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  if (reduced) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      animate={lift ? { y: hovered ? -4 : 0 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative isolate ${className}`}
    >
      {/* Border highlight: a gradient ring masked down to the card's 1px edge. */}
      <motion.span
        aria-hidden
        style={{
          background: border,
          padding: 1,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute -inset-px z-10 rounded-[inherit]"
      />
      <motion.span
        aria-hidden
        style={{ background }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
      />
      {children}
    </motion.div>
  );
};

export default SpotlightCard;
