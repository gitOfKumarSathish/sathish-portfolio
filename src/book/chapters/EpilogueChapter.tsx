import { ArrowUpRight, Github, Linkedin, MapPin } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import Scene from "../components/Scene";
import { ScrubIn, ScrubRule } from "../components/Scrub";
import { contact } from "../content";

/** The closing leaf: one invitation, and the three ways to take it up. */
const EpilogueChapter = () => (
  <>
    <Scene length={1.5}>
      <div className="mx-auto w-full max-w-4xl px-6 text-center sm:px-10">
        <ScrubIn from={0.06} to={0.24}>
          <p className="font-mono text-[11px] uppercase tracking-[0.42em] text-muted-foreground">
            The end, for now
          </p>
        </ScrubIn>

        <ScrubIn from={0.12} to={0.44} y={46}>
          <p className="mt-10 font-serif text-[clamp(1.7rem,4.2vw,3.1rem)] leading-[1.28] text-foreground">
            {contact.closing}
          </p>
        </ScrubIn>

        <ScrubRule from={0.3} to={0.6} className="mx-auto mt-12 max-w-xs" />
      </div>
    </Scene>

    <Scene length={1.6}>
      <div className="mx-auto w-full max-w-4xl px-6 sm:px-10">
        <ScrubIn from={0.06} to={0.26}>
          <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
            Write to me
          </p>
        </ScrubIn>

        <ScrubIn from={0.1} to={0.34} y={40}>
          <Magnetic strength={12} className="mt-5 w-fit">
            <a
              href={`mailto:${contact.email}`}
              className="group inline-flex items-center gap-4 font-serif text-[clamp(1.5rem,4.6vw,3.2rem)] leading-tight text-foreground transition-colors hover:text-[hsl(var(--chapter-accent))]"
            >
              <span className="break-all">{contact.email}</span>
              <ArrowUpRight
                className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:translate-x-1.5"
                size={34}
              />
            </a>
          </Magnetic>
        </ScrubIn>

        <ScrubIn from={0.24} to={0.48} y={30}>
          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                Open to
              </p>
              <ul className="mt-4 space-y-2">
                {contact.openTo.map((role) => (
                  <li key={role} className="text-base text-foreground/85">
                    {role}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                Based in
              </p>
              <p className="mt-4 flex items-center gap-2.5 text-base text-foreground/85">
                <MapPin size={17} className="text-[hsl(var(--chapter-accent))]" />
                {contact.location}
              </p>
            </div>
          </div>
        </ScrubIn>

        <ScrubIn from={0.38} to={0.62} y={26}>
          <div className="mt-14 flex flex-wrap items-center gap-3">
            {[
              { icon: Github, href: contact.github, label: "GitHub" },
              { icon: Linkedin, href: contact.linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <Magnetic key={href} strength={10}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 border border-border px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:border-[hsl(var(--chapter-accent)/0.6)] hover:text-foreground"
                >
                  <Icon size={15} />
                  {label}
                </a>
              </Magnetic>
            ))}
          </div>
        </ScrubIn>

        <ScrubIn from={0.6} to={0.82}>
          <div className="mt-20 border-t border-border/60 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
              Sathish Kumar · Technical Lead &amp; Full-Stack Engineer · © 2026
            </p>
          </div>
        </ScrubIn>
      </div>
    </Scene>
  </>
);

export default EpilogueChapter;
