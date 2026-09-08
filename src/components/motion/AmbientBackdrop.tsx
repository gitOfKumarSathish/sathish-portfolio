import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const orbs = [
  { className: "left-[-12%] top-[8%] h-[38rem] w-[38rem]", tint: "hsl(var(--primary) / 0.16)", duration: 26 },
  { className: "right-[-14%] top-[42%] h-[34rem] w-[34rem]", tint: "hsl(var(--accent) / 0.14)", duration: 32 },
  { className: "left-[28%] bottom-[-10%] h-[30rem] w-[30rem]", tint: "hsl(260 80% 62% / 0.12)", duration: 38 },
];

/**
 * Slow-drifting colour fields behind the whole page. Fixed and blurred so they
 * cost one composite layer each and never trigger layout.
 */
const AmbientBackdrop = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[110px] ${orb.className}`}
          style={{ background: `radial-gradient(circle, ${orb.tint} 0%, transparent 68%)` }}
          animate={
            reduced
              ? undefined
              : { x: [0, 40, -25, 0], y: [0, -35, 25, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
};

export default AmbientBackdrop;
