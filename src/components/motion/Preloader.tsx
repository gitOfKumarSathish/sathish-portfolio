import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const SESSION_KEY = "preloader-shown";

/**
 * First-paint curtain: a counter runs to 100, the wordmark settles, then the
 * panel wipes away. Shown once per tab so repeat navigation stays instant.
 */
const Preloader = ({ onComplete }: { onComplete?: () => void }) => {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(
    () => typeof window !== "undefined" && !sessionStorage.getItem(SESSION_KEY),
  );
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setActive(false);
      return;
    }

    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1500;
    let frame = 0;

    const tick = (now: number) => {
      // easeOutExpo so the number sprints early and eases into 100.
      const t = Math.min(1, (now - start) / duration);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      setCount(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setTimeout(() => setActive(false), 320);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced]);

  useEffect(() => {
    if (active) return;
    document.body.style.overflow = "";
    onComplete?.();
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: ease.expoOut }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <motion.span
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: ease.expoOut }}
            className="font-display text-3xl font-bold text-gradient sm:text-4xl"
          >
            Sathish Kumar
          </motion.span>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-3 font-mono text-[11px] uppercase tracking-[0.42em] text-muted-foreground"
          >
            Technical Lead
          </motion.span>

          <div className="mt-10 h-px w-56 overflow-hidden bg-border sm:w-72">
            <motion.div
              className="h-full hero-gradient"
              style={{ width: `${count}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <span className="mt-4 font-mono text-xs tabular-nums text-muted-foreground">
            {String(count).padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
