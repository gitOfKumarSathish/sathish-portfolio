import { motion } from "framer-motion";
import { ease, viewportOnce } from "@/lib/motion";
import TextReveal from "@/components/motion/TextReveal";
import Reveal from "@/components/motion/Reveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Small mono label above the title. */
  eyebrow?: string;
  align?: "center" | "left";
}

const SectionHeading = ({ title, subtitle, eyebrow, align = "center" }: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <div
      className={`mb-12 px-4 sm:px-5 md:mb-16 md:px-6 ${centered ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <Reveal
          delay={0.05}
          distance={14}
          className={`mb-5 flex ${centered ? "justify-center" : "justify-start"}`}
        >
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}

      <h2 className="mb-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        <TextReveal text={title} className="text-gradient" gradient />
      </h2>

      {subtitle && (
        <Reveal
          delay={0.18}
          className={`text-balance text-base text-muted-foreground sm:text-lg ${
            centered ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </Reveal>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, delay: 0.3, ease: ease.expoOut }}
        className={`mt-5 h-[3px] w-16 rounded-full hero-gradient sm:mt-6 sm:w-20 ${
          centered ? "mx-auto origin-center" : "origin-left"
        }`}
      />
    </div>
  );
};

export default SectionHeading;
