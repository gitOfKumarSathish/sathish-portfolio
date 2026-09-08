import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The atmosphere the book sits in: two slow colour fields graded to the live
 * chapter, a vignette, and film grain over the top.
 *
 * The fields use `background-color` rather than a gradient because colour
 * transitions and gradients do not — that is what lets the palette drift
 * smoothly from one chapter's hue to the next instead of cutting.
 */
const FilmOverlay = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={reduced ? undefined : { x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-[14%] top-[6%] h-[42rem] w-[42rem] rounded-full blur-[130px]"
          style={{
            backgroundColor: "hsl(var(--chapter-accent) / 0.17)",
            transition: "background-color 1.4s ease",
          }}
        />
        <motion.div
          animate={reduced ? undefined : { x: [0, -50, 30, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[12%] top-[45%] h-[38rem] w-[38rem] rounded-full blur-[130px]"
          style={{
            backgroundColor: "hsl(var(--chapter-accent) / 0.13)",
            transition: "background-color 1.4s ease",
          }}
        />
      </div>

      {/* Vignette and grain ride above the page, below the HUD */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 50%, transparent 42%, hsl(var(--vignette) / 0.55) 100%)",
        }}
      />
      <div aria-hidden className="noise-overlay pointer-events-none fixed inset-0 z-40" />
    </>
  );
};

export default FilmOverlay;
