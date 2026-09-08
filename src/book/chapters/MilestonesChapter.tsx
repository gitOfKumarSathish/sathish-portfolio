import Marquee from "@/components/motion/Marquee";
import Scene from "../components/Scene";
import { ScrubIn, ScrubRule, Layer } from "../components/Scrub";
import { milestones, credentials } from "../content";

/** What the years actually produced, set as a numbered list of outcomes. */
const MilestonesChapter = () => (
  <>
    <Scene length={2.3}>
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <ScrubIn from={0.04} to={0.16}>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            What came of it
          </p>
        </ScrubIn>

        <div className="mt-12 divide-y divide-border/60">
          {milestones.map((item, i) => {
            const start = 0.1 + i * 0.12;

            return (
              <ScrubIn key={item.title} from={start} to={start + 0.16} y={38} className="py-7">
                <div className="grid gap-3 md:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] md:gap-10">
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-2xl leading-none text-[hsl(var(--chapter-accent))]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-xl leading-tight text-foreground sm:text-2xl">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </ScrubIn>
            );
          })}
        </div>
      </div>
    </Scene>

    <Scene length={1.3}>
      <div className="w-full">
        <div className="mx-auto mb-10 w-full max-w-5xl px-6 sm:px-10">
          <ScrubIn from={0.08} to={0.3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              Credentials
            </p>
          </ScrubIn>
          <ScrubRule from={0.12} to={0.4} className="mt-6" />
        </div>

        <Layer depth={22}>
          <Marquee
            speed={40}
            fade
            items={credentials.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-4 px-2 font-serif text-[clamp(1.2rem,2.8vw,2rem)] leading-none text-foreground/65"
              >
                {cert}
                <span className="h-1 w-1 rounded-full bg-[hsl(var(--chapter-accent))]" />
              </span>
            ))}
          />
        </Layer>
      </div>
    </Scene>
  </>
);

export default MilestonesChapter;
