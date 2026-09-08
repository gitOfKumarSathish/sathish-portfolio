import { createContext, useContext } from "react";
import { useMotionValue, useTransform, type MotionValue } from "framer-motion";

export interface SceneState {
  /** 0 → 1 across the scene's whole pass through the viewport. */
  progress: MotionValue<number>;
  /** False when the scene is showing statically (reduced motion). */
  scrubbed: boolean;
}

export const SceneContext = createContext<SceneState | null>(null);

/**
 * The scene's own scroll progress. Everything inside a scene animates off this
 * rather than firing on an in-view trigger — that is the difference between a
 * page that pops and one that plays.
 */
export const useScene = (): SceneState => {
  const ctx = useContext(SceneContext);
  const fallback = useMotionValue(0.5);

  return ctx ?? { progress: fallback, scrubbed: false };
};

/**
 * Maps the scene's progress onto a range, collapsing to the resting value when
 * the scene is not scrubbing, so reduced-motion visitors see the composed frame.
 */
export const useSceneRange = (
  input: number[],
  output: number[],
  restingAt = 0.5,
): MotionValue<number> => {
  const { progress, scrubbed } = useScene();
  const still = useMotionValue(restingAt);

  return useTransform(scrubbed ? progress : still, input, output);
};
