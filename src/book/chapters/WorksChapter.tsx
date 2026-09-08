import { ArrowUpRight } from "lucide-react";
import HorizontalRail from "@/components/motion/HorizontalRail";
import Scene from "../components/Scene";
import { ScrubIn, ScrubRule } from "../components/Scrub";
import { works } from "../content";

/**
 * The plate section: the chapter pins and the works travel sideways past the
 * reader, the way an illustrated insert is flipped through rather than scrolled.
 */
const WorksChapter = () => (
  <>
    <Scene length={1.1}>
      <div className="mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
        <ScrubIn from={0.08} to={0.3}>
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Plates
          </p>
        </ScrubIn>
        <ScrubIn from={0.14} to={0.42} y={40}>
          <p className="mt-8 font-serif text-[clamp(1.5rem,3.6vw,2.6rem)] leading-[1.3] text-foreground">
            Eight platforms that reached production and stayed there.
          </p>
        </ScrubIn>
        <ScrubRule from={0.24} to={0.55} className="mx-auto mt-10 max-w-xs" />
      </div>
    </Scene>

    <HorizontalRail
      header={
        <div className="px-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-muted-foreground">
            Selected Works · keep scrolling
          </p>
        </div>
      }
      items={works.map((work, i) => (
        <article
          key={work.title}
          className="flex h-[clamp(24rem,62vh,32rem)] w-[min(86vw,27rem)] shrink-0 flex-col border border-border/60 bg-card/40 p-7 backdrop-blur-sm"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-serif text-3xl leading-none text-[hsl(var(--chapter-accent))]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              {work.period}
            </span>
          </div>

          <h3 className="mt-7 font-serif text-2xl leading-tight text-foreground">{work.title}</h3>

          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {work.client}
          </p>

          <div className="mt-5 h-px w-full bg-border/70" />

          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{work.summary}</p>

          <ul className="mt-5 flex-1 space-y-2.5 overflow-y-auto pr-1 scrollbar-hide" data-lenis-prevent>
            {work.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-[13px] leading-relaxed text-foreground/75">
                <span className="mt-2 h-px w-3 shrink-0 bg-[hsl(var(--chapter-accent)/0.7)]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-border/60 pt-4">
            <p className="font-mono text-[10px] leading-relaxed text-muted-foreground">
              {work.tech.slice(0, 4).join(" · ")}
            </p>

            {work.href && (
              <a
                href={work.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--chapter-accent))] transition-opacity hover:opacity-70"
              >
                Open
                <ArrowUpRight size={12} />
              </a>
            )}
          </div>
        </article>
      ))}
    />
  </>
);

export default WorksChapter;
