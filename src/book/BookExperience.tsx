import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import BookHUD from "./components/BookHUD";
import FilmOverlay from "./components/FilmOverlay";
import ChapterSection from "./components/ChapterSection";
import ChapterTurn from "./components/ChapterTurn";
import CoverChapter from "./chapters/CoverChapter";
import OriginsChapter from "./chapters/OriginsChapter";
import CraftChapter from "./chapters/CraftChapter";
import WorkChapter from "./chapters/WorkChapter";
import WorksChapter from "./chapters/WorksChapter";
import MilestonesChapter from "./chapters/MilestonesChapter";
import EpilogueChapter from "./chapters/EpilogueChapter";
import { chapters } from "./content";

const byId = (id: string) => chapters.find((c) => c.id === id)!;

/**
 * The portfolio as a book: a cover, six chapters, and an epilogue.
 *
 * There is deliberately no persistent navigation bar. The reader moves through
 * it in one direction, the way a book is read; the chapter spine in the HUD is
 * the only way to skip, and the page grades to a new hue as each chapter opens.
 */
const BookExperience = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <FilmOverlay />
      <BookHUD />

      {/* Colophon mark, fixed like a running head */}
      <div className="pointer-events-none fixed left-5 top-5 z-50 hidden sm:left-7 sm:top-7 sm:block">
        <p className="font-serif text-lg leading-none text-foreground/80">SK</p>
      </div>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleMode}
        aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
        className="fixed right-5 top-5 z-50 overflow-hidden rounded-full border border-border/70 bg-background/50 p-2.5 text-muted-foreground backdrop-blur-md transition-colors hover:text-foreground sm:right-7 sm:top-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            initial={{ y: 12, rotate: -60, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -12, rotate: 60, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <main>
        <ChapterSection chapter={byId("cover")}>
          <CoverChapter />
        </ChapterSection>

        <ChapterSection chapter={byId("origins")}>
          <ChapterTurn chapter={byId("origins")} />
          <OriginsChapter />
        </ChapterSection>

        <ChapterSection chapter={byId("craft")}>
          <ChapterTurn chapter={byId("craft")} />
          <CraftChapter />
        </ChapterSection>

        <ChapterSection chapter={byId("work")}>
          <ChapterTurn chapter={byId("work")} />
          <WorkChapter />
        </ChapterSection>

        <ChapterSection chapter={byId("works")}>
          <ChapterTurn chapter={byId("works")} />
          <WorksChapter />
        </ChapterSection>

        <ChapterSection chapter={byId("milestones")}>
          <ChapterTurn chapter={byId("milestones")} />
          <MilestonesChapter />
        </ChapterSection>

        <ChapterSection chapter={byId("epilogue")}>
          <ChapterTurn chapter={byId("epilogue")} />
          <EpilogueChapter />
        </ChapterSection>
      </main>
    </div>
  );
};

export default BookExperience;
