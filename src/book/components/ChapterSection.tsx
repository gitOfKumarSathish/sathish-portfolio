import type { ReactNode } from "react";
import type { ChapterMeta } from "../content";

/**
 * Wraps a chapter and scopes its accent hue to everything inside it.
 *
 * The `data-chapter` hook is what the HUD observes to track reading position,
 * so the marker lives on the element rather than in shared state.
 */
const ChapterSection = ({
  chapter,
  children,
}: {
  chapter: ChapterMeta;
  children: ReactNode;
}) => (
  <section
    id={chapter.id}
    data-chapter={chapter.id}
    data-accent={chapter.accent}
    style={{ ["--chapter-accent" as string]: `${chapter.accent} 82% 62%` }}
    className="relative"
  >
    {children}
  </section>
);

export default ChapterSection;
