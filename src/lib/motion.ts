import type { Variants } from "framer-motion";

type Cubic = [number, number, number, number];

/**
 * House easing curves. `expoOut` is the default for entrances — quick to leave,
 * long to settle, which is what reads as "expensive" rather than merely fast.
 */
export const ease: Record<"expoOut" | "quintOut" | "softInOut" | "backOut", Cubic> = {
  expoOut: [0.16, 1, 0.3, 1],
  quintOut: [0.22, 1, 0.36, 1],
  softInOut: [0.65, 0, 0.35, 1],
  backOut: [0.34, 1.4, 0.64, 1],
};

/** Spring used by cursor, magnetic and tilt interactions. */
export const spring = { stiffness: 150, damping: 20, mass: 0.6 } as const;

/** Parent that staggers its children. Pair with `fadeUp` on each child. */
export const stagger = (amount = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: amount, delayChildren: delay } },
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: ease.expoOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: ease.expoOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: ease.expoOut },
  },
};

/** Viewport config shared by every scroll-triggered reveal. */
export const viewportOnce = { once: true, margin: "-12% 0px -8% 0px" } as const;
