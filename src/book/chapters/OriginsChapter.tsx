import Scene from "../components/Scene";
import { ScrubIn, ScrubRule, Layer } from "../components/Scrub";
import { education } from "../content";

/**
 * The academic run, read as one descending column. It is the shortest chapter
 * on purpose — it is where the story starts, not where it lives.
 */
const OriginsChapter = () => (
  <Scene length={2.6}>
    <div className="relative mx-auto w-full max-w-5xl px-6 sm:px-10">
      {/* The full span sits oversized behind the column */}
      <Layer depth={60} className="pointer-events-none absolute inset-0 flex items-center">
        <span
          aria-hidden
          className="select-none whitespace-nowrap font-serif text-[clamp(6rem,19vw,15rem)] leading-none text-foreground/[0.035]"
        >
          2010—2017
        </span>
      </Layer>

      <div className="relative">
        <ScrubIn from={0.04} to={0.16}>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Where it started
          </p>
        </ScrubIn>

        <ScrubRule from={0.08} to={0.3} className="mt-6" />

        <div className="mt-12 divide-y divide-border/60">
          {education.map((entry, i) => {
            const start = 0.14 + i * 0.2;

            return (
              <ScrubIn key={entry.degree} from={start} to={start + 0.22} y={44} className="py-8">
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)] md:gap-10">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[hsl(var(--chapter-accent))]">
                      {entry.badge}
                    </p>
                    <p className="mt-3 font-serif text-2xl leading-none text-foreground/70 sm:text-3xl">
                      {entry.period}
                    </p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {entry.location}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-[clamp(1.5rem,3.4vw,2.4rem)] leading-[1.1] text-foreground">
                      {entry.degree}
                    </h3>
                    <p className="mt-3 text-base text-foreground/80">{entry.institution}</p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {entry.details}
                    </p>
                  </div>
                </div>
              </ScrubIn>
            );
          })}
        </div>
      </div>
    </div>
  </Scene>
);

export default OriginsChapter;
