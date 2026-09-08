import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Send, Linkedin, Github } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SpotlightCard from "@/components/motion/SpotlightCard";
import Magnetic from "@/components/motion/Magnetic";
import TextReveal from "@/components/motion/TextReveal";
import ScrollHighlightText from "@/components/motion/ScrollHighlightText";
import { ease, viewportOnce } from "@/lib/motion";

const EMAIL = "sathish7845kumar@gmail.com";

const socials = [
  { icon: Github, href: "https://github.com/gitOfKumarSathish", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/sathish7845kumar", label: "LinkedIn" },
];

const openRoles = ["Technical Lead", "Lead Frontend Engineer", "Full-Stack Engineer"];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  // No backend sits behind this form, so submitting hands the draft to the
  // visitor's mail client rather than pretending the message was delivered.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      form.subject || `Portfolio enquiry from ${form.name || "a visitor"}`,
    );
    const body = encodeURIComponent(
      [form.message, "", "—", form.name, form.email].filter(Boolean).join("\n"),
    );

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const field = (name: string) =>
    `w-full rounded-xl border bg-muted/70 px-4 py-3 text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/70 ${
      focused === name ? "border-primary bg-muted shadow-lg shadow-primary/10" : "border-border"
    }`;

  return (
    <section id="contact" className="section-padding relative">
      <div className="container mx-auto max-w-6xl">
        <Reveal distance={14}>
          <span className="eyebrow mb-6">Say Hello</span>
        </Reveal>

        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          <TextReveal text="Let's build something" className="text-gradient" gradient />
        </h2>

        <ScrollHighlightText
          text="Open to technical leadership and senior engineering roles — in Bengaluru or fully remote."
          emphasis={["leadership", "remote"]}
          className="mt-6 max-w-3xl font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl"
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            {/* Availability badge — the pulse signals this is current, not stale */}
            <Reveal direction="right">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    animate={{ scale: [1, 2.4], opacity: [0.7, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full bg-accent"
                  />
                  <span className="relative h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for new opportunities
              </span>
            </Reveal>

            {/* The email is the real call to action, so it gets headline weight */}
            <Reveal direction="right" delay={0.08} className="mt-9">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Write to me
              </p>
              <Magnetic strength={10} className="mt-3 w-fit">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group inline-flex items-center gap-3 font-display text-xl font-bold text-foreground transition-colors hover:text-primary sm:text-2xl lg:text-[1.75rem]"
                >
                  <span className="link-underline break-all">{EMAIL}</span>
                  <ArrowUpRight
                    size={26}
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </a>
              </Magnetic>
            </Reveal>

            <Reveal direction="right" delay={0.14} className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Open to
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {openRoles.map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.5, delay: 0.05 * i, ease: ease.expoOut }}
                    whileHover={{ y: -3 }}
                    className="cursor-default rounded-xl border border-border bg-card/60 px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/45 hover:text-primary"
                  >
                    {role}
                  </motion.span>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.2} className="mt-8">
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <MapPin size={19} className="text-primary" />
                </span>
                <span className="font-medium">Bengaluru, India — open to remote</span>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.26} className="mt-8">
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <Magnetic key={href} strength={10}>
                    <motion.a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-2.5 rounded-xl border border-border bg-secondary px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Icon size={18} />
                      {label}
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" distance={30}>
            <SpotlightCard className="glass rounded-3xl p-6 sm:p-8" lift={false}>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { key: "name" as const, label: "Name", placeholder: "John Doe", type: "text" },
                    { key: "email" as const, label: "Email", placeholder: "john@example.com", type: "email" },
                  ].map((f, i) => (
                    <motion.div
                      key={f.key}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.6, delay: 0.06 * i, ease: ease.expoOut }}
                    >
                      <label htmlFor={f.key} className="mb-2 block text-sm font-medium text-foreground">
                        {f.label}
                      </label>
                      <input
                        id={f.key}
                        type={f.type}
                        value={form[f.key]}
                        onChange={update(f.key)}
                        onFocus={() => setFocused(f.key)}
                        onBlur={() => setFocused(null)}
                        placeholder={f.placeholder}
                        className={field(f.key)}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: 0.12, ease: ease.expoOut }}
                >
                  <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={form.subject}
                    onChange={update("subject")}
                    onFocus={() => setFocused("subject")}
                    onBlur={() => setFocused(null)}
                    placeholder="Project Inquiry"
                    className={field("subject")}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, delay: 0.18, ease: ease.expoOut }}
                >
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project..."
                    className={`${field("message")} resize-none`}
                  />
                </motion.div>

                <Magnetic strength={8}>
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    className="hero-gradient group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/35"
                  >
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                    <Send size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    Send Message
                  </motion.button>
                </Magnetic>

                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                  <Mail size={13} />
                  Opens in your mail app, addressed to {EMAIL}.
                </p>
              </form>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
