import Reveal from "@/components/motion/Reveal";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import Counter from "@/components/motion/Counter";

const figures = [
  { value: 8, suffix: "+", label: "Years shipping production software" },
  { value: 41, suffix: "+", label: "Reusable components in the platform library" },
  { value: 28, suffix: "+", label: "Branded deployments from one codebase" },
  { value: 7, suffix: "", label: "Engineers led across a delivery squad" },
];

/**
 * The beat between the hero and the detail: one claim that resolves word by word
 * as it scrolls, then the numbers that back it up.
 */
const StatementSection = () => (
  <section className="relative py-28 sm:py-36">
    <div className="container mx-auto max-w-5xl">
      <Reveal distance={14}>
        <span className="eyebrow mb-8">The Short Version</span>
      </Reveal>

      <ScrollHighlightText
        text="I turn tangled enterprise requirements into platforms teams can actually build on — multi-tenant architecture, real-time analytics, and white-label delivery that survives contact with production."
        emphasis={["platforms", "architecture", "analytics", "production"]}
        className="font-display text-2xl font-bold leading-[1.35] tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-[2.75rem]"
      />

      <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border/70 pt-12 lg:grid-cols-4">
        {figures.map((figure, i) => (
          <Reveal key={figure.label} delay={i * 0.08}>
            <Counter
              value={figure.value}
              suffix={figure.suffix}
              className="block font-display text-4xl font-bold text-gradient sm:text-5xl"
            />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{figure.label}</p>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default StatementSection;
