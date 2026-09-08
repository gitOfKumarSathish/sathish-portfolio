import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Palette, Menu, X } from "lucide-react";
import { useTheme, type ColorPalette } from "@/context/ThemeContext";
import Magnetic from "@/components/motion/Magnetic";
import { ease } from "@/lib/motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

const palettes: { id: ColorPalette; color: string; label: string }[] = [
  { id: "default", color: "bg-blue-500", label: "Default" },
  { id: "ocean", color: "bg-cyan-500", label: "Ocean" },
  { id: "sunset", color: "bg-orange-500", label: "Sunset" },
  { id: "forest", color: "bg-emerald-500", label: "Forest" },
  { id: "royal", color: "bg-purple-500", label: "Royal" },
];

const Navbar = () => {
  const { mode, toggleMode, palette, setPalette } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight whichever section currently occupies the middle band of the viewport.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Dismiss the palette popover on any outside click.
  useEffect(() => {
    if (!paletteOpen) return;

    const close = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest("[data-palette-root]")) setPaletteOpen(false);
    };

    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [paletteOpen]);

  const controlClass =
    "rounded-xl border border-border/70 bg-secondary/70 p-2.5 text-secondary-foreground backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary";

  return (
    <motion.nav
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.15, ease: ease.expoOut }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 py-2.5 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        <Magnetic strength={10}>
          <a
            href="#hero"
            className="font-display text-lg font-bold text-gradient sm:text-xl"
            aria-label="Back to top"
          >
            {"<Dev />"}
          </a>
        </Magnetic>

        {/* Desktop links share one pill that slides between the active items */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/10"
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="relative" data-palette-root>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setPaletteOpen((v) => !v)}
              className={controlClass}
              aria-label="Change colour palette"
              aria-expanded={paletteOpen}
            >
              <Palette size={17} />
            </motion.button>

            <AnimatePresence>
              {paletteOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: ease.expoOut }}
                  className="glass absolute right-0 top-14 flex min-w-[152px] flex-col gap-1 rounded-2xl p-2"
                >
                  {palettes.map((p, i) => (
                    <motion.button
                      key={p.id}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * i, duration: 0.3 }}
                      onClick={() => {
                        setPalette(p.id);
                        setPaletteOpen(false);
                      }}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors ${
                        palette === p.id
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      }`}
                    >
                      <span className={`h-3 w-3 rounded-full ${p.color}`} />
                      {p.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle: the icon rotates out and the new one rotates in */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleMode}
            className={`${controlClass} overflow-hidden`}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mode}
                initial={{ y: 14, rotate: -70, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                exit={{ y: -14, rotate: 70, opacity: 0 }}
                transition={{ duration: 0.32, ease: ease.expoOut }}
                className="block"
              >
                {mode === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileOpen((v) => !v)}
            className={`${controlClass} lg:hidden`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: ease.expoOut }}
            className="glass mx-3 mt-3 overflow-hidden rounded-2xl sm:mx-4 lg:hidden"
          >
            <div className="flex flex-col gap-1 p-3">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: ease.expoOut }}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                    active === link.href
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
