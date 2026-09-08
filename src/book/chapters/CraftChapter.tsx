import Marquee from "@/components/motion/Marquee";
import Scene from "../components/Scene";
import { ScrubIn, ScrubRule, Layer } from "../components/Scrub";
import { craft, coreStack } from "../content";

/**
 * The toolkit, read as a list rather than a grid of badges — the discipline
 * matters more than the logos, so the discipline gets the type.
 */
const CraftChapter = () => (
  <>
    <Scene length={2.4}>
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        <ScrubIn from={0.04} to={0.16}>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            What I reach for
          </p>
        </ScrubIn>

        <div className="mt-12 divide-y divide-border/60">
          {craft.map((area, i) => {
            const start = 0.1 + i * 0.13;

            return (
              <ScrubIn key={area.title} from={start} to={start + 0.16} y={40} className="py-7">
                <div className="grid gap-4 md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] md:gap-10">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] text-[hsl(var(--chapter-accent))]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-serif text-2xl leading-tight text-foreground sm:text-3xl">
                      {area.title}
                    </h3>
                  </div>

                  <div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {area.summary}
                    </p>
                    <p className="mt-3 font-mono text-xs leading-relaxed text-foreground/60">
                      {area.skills.join("  ·  ")}
                    </p>
                  </div>
                </div>
              </ScrubIn>
            );
          })}
        </div>
      </div>
    </Scene>

    <Scene length={1.3}>
      <div className="w-full">
        <div className="mx-auto mb-12 w-full max-w-5xl px-6 sm:px-10">
          <ScrubIn from={0.08} to={0.3}>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
              In rotation
            </p>
          </ScrubIn>
          <ScrubRule from={0.12} to={0.4} className="mt-6" />
        </div>

        <Layer depth={26}>
          <Marquee
            speed={44}
            fade
            items={coreStack.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-6 px-2 font-serif text-[clamp(2rem,5vw,3.6rem)] leading-none text-foreground/70"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--chapter-accent))]" />
              </span>
            ))}
          />
        </Layer>
      </div>
    </Scene>
  </>
);

export default CraftChapter;
