import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { chapters, type ChapterId } from "../content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The reader's place in the book: a chapter spine down one edge, the running
 * chapter title, and a folio count. It also grades the whole page toward the
 * current chapter's hue, so the palette travels with the narrative.
 */
const BookHUD = () => {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState<ChapterId>("cover");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  // Whichever chapter owns the middle band of the viewport is the one being read.
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-chapter]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const id = visible?.target.getAttribute("data-chapter") as ChapterId | null;
        if (id) setActive(id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Grade the ambient layers toward the live chapter.
  useEffect(() => {
    const meta = chapters.find((c) => c.id === active);
    if (!meta) return;

    document.documentElement.style.setProperty("--chapter-accent", `${meta.accent} 82% 62%`);
  }, [active]);

  const current = chapters.find((c) => c.id === active) ?? chapters[0];
  const folio = current.index + 1;

  return (
    <>
      {/* Reading progress along the very top */}
      <motion.div
        aria-hidden
        style={{ scaleX: reduced ? 1 : progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[hsl(var(--chapter-accent))]"
      />

      {/* Chapter spine */}
      <nav
        aria-label="Chapters"
        className="fixed left-5 top-1/2 z-50 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col gap-3.5">
          {chapters.map((chapter) => {
            const isActive = chapter.id === active;

            return (
              <li key={chapter.id}>
                <a
                  href={`#${chapter.id}`}
                  className="group flex items-center gap-3"
                  aria-current={isActive ? "true" : undefined}
                >
                  <motion.span
                    animate={{
                      width: isActive ? 30 : 14,
                      opacity: isActive ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="block h-px bg-[hsl(var(--chapter-accent))]"
                  />
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
                  >
                    {chapter.title}
                  </motion.span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Folio, bottom right, like a printed page number */}
      <div className="pointer-events-none fixed bottom-5 right-5 z-50 rounded-md bg-background/55 px-3 py-2 text-right backdrop-blur-sm sm:bottom-7 sm:right-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          {current.kicker}
        </p>
        <p className="mt-1 font-serif text-2xl leading-none text-[hsl(var(--chapter-accent))]">
          {String(folio).padStart(2, "0")}
          <span className="text-muted-foreground/50"> / {String(chapters.length).padStart(2, "0")}</span>
        </p>
      </div>
    </>
  );
};

export default BookHUD;
