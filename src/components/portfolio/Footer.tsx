import { motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";

const Footer = () => (
  <footer className="relative border-t border-border px-4 py-10 sm:px-6">
    {/* Hairline that fades out toward both edges */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
    />

    <Reveal distance={16}>
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <Magnetic strength={8}>
          <a href="#hero" className="font-display text-lg font-bold text-gradient">
            {"<Dev />"}
          </a>
        </Magnetic>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          Built with
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Heart size={14} className="fill-destructive text-destructive" />
          </motion.span>
          by Sathish Kumar
        </p>

        <div className="flex items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 All rights reserved.</p>

          <Magnetic strength={10}>
            <motion.a
              href="#hero"
              whileHover={{ y: -3 }}
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
            >
              <ArrowUp size={16} />
            </motion.a>
          </Magnetic>
        </div>
      </div>
    </Reveal>
  </footer>
);

export default Footer;
