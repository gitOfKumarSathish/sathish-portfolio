import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Elements that should make the ring swell. */
const INTERACTIVE = 'a, button, input, textarea, select, [role="button"], [data-cursor]';

/**
 * Two-part cursor: a dot that tracks the pointer exactly and a ring that trails
 * it on a spring. Rendered only for fine pointers, so touch devices are untouched.
 */
const CustomCursor = () => {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setHovering(Boolean((event.target as HTMLElement | null)?.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    document.documentElement.classList.add("has-custom-cursor");
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0, scale: pressed ? 0.6 : 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary"
      />
      <motion.div
        aria-hidden
        style={{ x, y }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.85 : hovering ? 1.9 : 1,
          borderColor: hovering ? "hsl(var(--accent) / 0.9)" : "hsl(var(--primary) / 0.55)",
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none fixed left-0 top-0 z-[100] -ml-4 -mt-4 h-8 w-8 rounded-full border"
      />
    </>
  );
};

export default CustomCursor;
