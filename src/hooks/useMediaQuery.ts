import { useEffect, useState } from "react";

/** Subscribes to a media query and re-renders when it flips. */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);

    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
};

/** Scroll-driven layouts (pinning, horizontal rails) only run at this size and up. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

export default useMediaQuery;
