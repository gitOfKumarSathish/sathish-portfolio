import Scene from "../components/Scene";
import { ScrubIn, ScrubRule, Layer } from "../components/Scrub";
import { roles } from "../content";

/**
 * The career, one post per shot, newest first. Each scene holds the period as a
 * standing headline while the detail assembles beside it.
 */
const WorkChapter = () => (
  <>
    {roles.map((role, i) => (
      <Scene key={`${role.company}-${role.period}`} length={1.7}>
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16">
            {/* Standing head */}
            <Layer depth={44}>
              <ScrubIn from={0.06} to={0.28} y={46}>
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-muted-foreground/70">
                  {String(i + 1).padStart(2, "0")} / {String(roles.length).padStart(2, "0")}
                </p>

                <p className="mt-5 font-serif text-[clamp(1.8rem,4.4vw,3.2rem)] leading-[1.05] text-[hsl(var(--chapter-accent))]">
                  {role.period}
                </p>

                <ScrubRule from={0.14} to={0.42} className="mt-7 max-w-[12rem]" />

                <p className="mt-7 text-lg font-medium text-foreground">{role.company}</p>
                {role.client && (
                  <p className="mt-1 text-sm text-muted-foreground">{role.client}</p>
                )}
                {role.location && (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground/70">
                    {role.location}
                  </p>
                )}

                {role.current && (
                  <p className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[hsl(var(--chapter-accent))]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--chapter-accent))]" />
                    Present day
                  </p>
                )}
              </ScrubIn>
            </Layer>

            <div>
              <ScrubIn from={0.1} to={0.32} y={44}>
                <h3 className="font-serif text-[clamp(1.9rem,4.4vw,3rem)] leading-[1.06] text-foreground">
                  {role.role}
                </h3>
              </ScrubIn>

              <ScrubIn from={0.18} to={0.42} y={30}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {role.summary}
                </p>
              </ScrubIn>

              <ul className="mt-9 space-y-4">
                {role.highlights.map((highlight, h) => {
                  const start = 0.3 + h * 0.09;

                  return (
                    <ScrubIn key={highlight} from={start} to={start + 0.13} y={26} x={14}>
                      <li className="flex gap-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                        <span className="mt-2.5 h-px w-5 shrink-0 bg-[hsl(var(--chapter-accent)/0.7)]" />
                        <span>{highlight}</span>
                      </li>
                    </ScrubIn>
                  );
                })}
              </ul>

              <ScrubIn from={0.68} to={0.86}>
                <p className="mt-9 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {role.focus.join("   ·   ")}
                </p>
              </ScrubIn>
            </div>
          </div>
        </div>
      </Scene>
    ))}
  </>
);

export default WorkChapter;
