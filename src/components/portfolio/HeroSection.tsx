import { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, FileText } from "lucide-react";
import profilePhoto from "@/assets/sathish.jpeg";
import { useTheme } from "@/context/ThemeContext";
import TextReveal from "@/components/motion/TextReveal";
import Magnetic from "@/components/motion/Magnetic";
import TiltCard from "@/components/motion/TiltCard";
import Marquee from "@/components/motion/Marquee";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ease } from "@/lib/motion";
import HyperspaceBackground from "./HyperspaceBackground";

gsap.registerPlugin(ScrollTrigger);

type FloatingIcon = {
  label: string;
  /** Degrees: 0 = right, 90 = bottom, 180 = left, -90 = top */
  angle: number;
  floatY?: number;
  duration?: number;
  size: number;
  bg: string;
  border: string;
  svg: React.ReactNode;
};

const floatingIcons: FloatingIcon[] = [
  {
    label: "React",
    angle: -130,
    floatY: -12,
    duration: 3.2,
    size: 50,
    bg: "bg-[#20232a]/90",
    border: "border-[#61DAFB]/40",
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
        <g fill="none" stroke="#61DAFB" strokeWidth="1.1">
          <ellipse cx="12" cy="12" rx="10" ry="3.8"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)"/>
        </g>
      </svg>
    ),
  },
  {
    label: "Angular",
    angle: -50,
    floatY: -14,
    duration: 2.8,
    size: 50,
    bg: "bg-[#1a0a0a]/90",
    border: "border-[#DD0031]/40",
    svg: (
      <svg viewBox="0 0 24 24" width="26" height="26">
        <path fill="#DD0031" d="M12 2L2 6.5l1.5 13L12 22l8.5-2.5L22 6.5z"/>
        <path fill="#C3002F" d="M12 2v20l8.5-2.5L22 6.5z"/>
        <path fill="#fff" d="M12 5.5L7 16h1.9l1-2.5h4.2l1 2.5H17zm0 3.2l1.6 3.8H10.4z"/>
      </svg>
    ),
  },
  {
    label: "JavaScript",
    angle: 180,
    floatY: -16,
    duration: 3,
    size: 46,
    bg: "bg-[#1a1200]/90",
    border: "border-[#F7DF1E]/40",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22">
        <path fill="#F7DF1E" d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
      </svg>
    ),
  },
  {
    label: "Node.js",
    angle: 0,
    floatY: -8,
    duration: 4,
    size: 46,
    bg: "bg-[#0a1a0a]/90",
    border: "border-[#339933]/40",
    svg: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#339933">
        <path d="M11.998 24a1.47 1.47 0 0 1-.732-.196l-2.328-1.377c-.348-.194-.178-.263-.063-.303.464-.161.557-.198 1.052-.479a.177.177 0 0 1 .171.014l1.788 1.062a.228.228 0 0 0 .215 0l6.973-4.026a.22.22 0 0 0 .108-.19V7.497a.222.222 0 0 0-.109-.192l-6.971-4.024a.218.218 0 0 0-.214 0L5.936 7.306a.222.222 0 0 0-.109.19v8.052c0 .078.042.15.109.190l1.91 1.104c1.037.519 1.671-.092 1.671-.707V8.258a.2.2 0 0 1 .2-.2h.874a.2.2 0 0 1 .2.2v8.879c0 1.384-.755 2.178-2.068 2.178-.403 0-.72 0-1.606-.436l-1.83-1.054a1.471 1.471 0 0 1-.733-1.274V7.497c0-.526.28-1.015.733-1.274l6.972-4.027a1.527 1.527 0 0 1 1.466 0l6.973 4.027c.453.259.733.748.733 1.274v8.052c0 .526-.28 1.015-.733 1.274l-6.973 4.026a1.47 1.47 0 0 1-.732.196z"/>
      </svg>
    ),
  },
  {
    label: "TypeScript",
    angle: 130,
    floatY: -10,
    duration: 3.6,
    size: 46,
    bg: "bg-[#0d1117]/90",
    border: "border-[#3178C6]/40",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#3178C6">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
  },
  {
    label: "MongoDB",
    angle: 50,
    floatY: -12,
    duration: 3.4,
    size: 46,
    bg: "bg-[#0a1a0a]/90",
    border: "border-[#47A248]/40",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#47A248">
        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.154-1.86-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    angle: 90,
    floatY: -10,
    duration: 3.8,
    size: 46,
    bg: "bg-[#0d1117]/90",
    border: "border-white/25",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
      </svg>
    ),
  },
];

const expertiseTags = [
  "React",
  "Node",
  "TypeScript",
  "Angular",
  "MongoDB",
  "Express",
  "CucumberJs",
  "WDIO",
];

const heroTicker = [
  "Enterprise Frontend Platforms",
  "Multi-Tenant Architecture",
  "Real-Time Analytics",
  "White-Label Delivery",
  "Design Systems at Scale",
  "Delivery Leadership",
];

const targetRoles = [
  "Technical Lead",
  "Lead Frontend Engineer",
  "Full-Stack Engineer",
  "Frontend Architect",
];

const HeroSection = () => {
  const { mode } = useTheme();
  const isDarkMode = mode === "dark";
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // The hero recedes as the page leaves it, so the next section arrives over the
  // top of it rather than simply scrolling up from underneath.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const exitStyle = reduced ? undefined : { y: contentY, scale: contentScale, opacity: contentOpacity };

  // Pointer position, normalised to -1..1 from the centre of the hero. Text and
  // portrait move against each other by different amounts, which is what sells
  // the depth; the spotlight follows in raw pixels.
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const spotX = useMotionValue(-500);
  const spotY = useMotionValue(-500);
  const glide = { stiffness: 60, damping: 20, mass: 0.6 };
  const smoothX = useSpring(pointerX, glide);
  const smoothY = useSpring(pointerY, glide);
  const textX = useTransform(smoothX, [-1, 1], [12, -12]);
  const textY = useTransform(smoothY, [-1, 1], [9, -9]);
  const artX = useTransform(smoothX, [-1, 1], [-26, 26]);
  const artY = useTransform(smoothY, [-1, 1], [-18, 18]);
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${spotX}px ${spotY}px, hsl(var(--primary) / 0.14), transparent 72%)`;

  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (reduced) return;

    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    pointerX.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    spotX.set(event.clientX - rect.left);
    spotY.set(event.clientY - rect.top);
  };

  const releasePointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    spotX.set(-500);
    spotY.set(-500);
  };

  useEffect(() => {
    if (!bgRef.current || !heroRef.current) return;

    const backgroundTween = gsap.to(bgRef.current, {
      y: 180,
      opacity: 0.2,
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      backgroundTween.scrollTrigger?.kill();
      backgroundTween.kill();
    };
  }, []);

  const introTextClass = isDarkMode ? "text-white/60" : "text-muted-foreground";
  const roleTextClass = isDarkMode ? "text-white/[0.85]" : "text-foreground/80";
  const bodyTextClass = isDarkMode ? "text-white/[0.72]" : "text-muted-foreground";
  const pillClass = isDarkMode
    ? "border border-white/10 bg-white/[0.06] text-white/[0.72] backdrop-blur-sm hover:border-primary/40 hover:text-white"
    : "border border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:text-foreground";
  const secondaryButtonClass = isDarkMode
    ? "border border-white/[0.15] bg-white/[0.06] text-white backdrop-blur-sm hover:border-primary/40 hover:bg-white/[0.12]"
    : "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary";
  const socialButtonClass = isDarkMode
    ? "border border-white/[0.12] bg-white/[0.06] text-white/[0.68] hover:border-primary/30 hover:text-white"
    : "border border-border bg-secondary text-muted-foreground hover:border-primary/30 hover:text-foreground";
  const statusTextClass = isDarkMode ? "text-white/60" : "text-muted-foreground";
  const statusValueClass = isDarkMode ? "text-white/[0.78]" : "text-foreground/70";
  const imageFrameClass = isDarkMode ? "border border-white/[0.12]" : "border border-white/10";
  const scrollTextClass = isDarkMode ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const scrollBorderClass = isDarkMode ? "border border-white/20" : "border border-border";

  return (
    <section
      id="hero"
      ref={heroRef}
      onPointerMove={trackPointer}
      onPointerLeave={releasePointer}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-background"
    >
      {/* Soft light that follows the cursor across the whole banner */}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-[1]"
        />
      )}
      <div ref={bgRef} aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {isDarkMode ? (
          <HyperspaceBackground />
        ) : (
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 h-[70vh] w-[70vw] rounded-full bg-primary/6 blur-[120px]" />
            <div className="absolute bottom-0 left-0 h-[50vh] w-[50vw] rounded-full bg-accent/6 blur-[100px]" />
            <div className="absolute top-1/2 right-[22%] hidden h-[480px] w-[480px] -translate-y-1/2 rounded-full border border-primary/8 animate-rotate-slow md:block" />
            <div
              className="absolute top-1/2 right-[22%] hidden h-[600px] w-[600px] -translate-y-1/2 rounded-full border border-primary/5 animate-rotate-slow md:block"
              style={{ animationDirection: "reverse", animationDuration: "30s" }}
            />
            <div className="absolute top-32 left-[42%] h-2 w-2 rounded-full bg-primary/30 animate-pulse-glow" />
            <div
              className="absolute bottom-40 right-[48%] h-1.5 w-1.5 rounded-full bg-accent/40 animate-pulse-glow"
              style={{ animationDelay: "1s" }}
            />
          </div>
        )}
      </div>

      <motion.div style={exitStyle} className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-8 py-16 sm:gap-10 sm:py-20 md:min-h-[85vh] lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_460px]">
          <motion.div
            style={reduced ? undefined : { x: textX, y: textY }}
            className="order-2 flex flex-col items-center text-center lg:order-1 lg:items-start lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className={`mb-2 text-sm font-semibold uppercase tracking-[0.3em] sm:text-base ${introTextClass}`}
            >
              Hi, I&apos;m
            </motion.p>

            <h1 className="mb-3 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
              <TextReveal
                text="Sathish Kumar"
                className="text-gradient"
                delay={0.34}
                stagger={0.038}
                gradient
                immediate
              />
            </h1>

            <TextReveal
              text="Technical Lead & Full-Stack Engineer"
              granularity="word"
              delay={0.62}
              immediate
              className={`mb-5 justify-center font-display text-xl font-semibold leading-snug sm:text-2xl md:mb-6 md:text-3xl lg:justify-start ${roleTextClass}`}
            />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.64, duration: 0.5 }}
              className="mb-5 flex flex-wrap justify-center gap-2 lg:justify-start"
            >
              {targetRoles.map((role) => (
                <span
                  key={role}
                  className={`rounded-full px-3 py-1 text-[11px] font-semibold sm:text-xs ${pillClass}`}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className={`mx-auto mb-6 max-w-xl text-sm leading-relaxed sm:text-base md:mb-7 lg:mx-0 ${bodyTextClass}`}
            >
              8+ years across IoT, telecom, and e-commerce, leading enterprise platforms with
              multi-tenant architecture, real-time analytics, and client-ready white-label delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mb-7 flex flex-wrap justify-center gap-2 sm:mb-8 lg:justify-start"
            >
              {expertiseTags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-mono transition-colors sm:px-3 sm:text-xs ${pillClass}`}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
              className="mb-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center lg:justify-start"
            >
              <Magnetic strength={12} className="w-full sm:w-auto">
                <a
                  href="#contact"
                  className="hero-gradient group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/35 sm:w-auto"
                >
                  {/* Light sweeps across the button on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  <Mail size={16} />
                  Get In Touch
                </a>
              </Magnetic>

              <Magnetic strength={12} className="w-full sm:w-auto">
                <a
                  href="#projects"
                  className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-colors duration-300 sm:w-auto ${secondaryButtonClass}`}
                >
                  <FileText size={16} />
                  View Work
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex w-full max-w-lg flex-wrap items-center justify-center gap-3 sm:gap-4 lg:max-w-none lg:justify-start"
            >
              {[
                {
                  href: "https://github.com/gitOfKumarSathish",
                  label: "GitHub",
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                    </svg>
                  ),
                },
                {
                  href: "https://www.linkedin.com/in/sathish-kumar-arputharajan",
                  label: "LinkedIn",
                  svg: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  href: "mailto:sathish7845kumar@gmail.com",
                  label: "Email",
                  svg: <Mail size={18} />,
                },
              ].map(({ href, label, svg }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`rounded-xl p-2.5 transition-colors sm:p-3 ${socialButtonClass}`}
                  aria-label={label}
                >
                  {svg}
                </motion.a>
              ))}

              <span
                className={`hidden h-5 w-px sm:block ${isDarkMode ? "bg-white/[0.14]" : "bg-border"}`}
              />

              <div className={`flex w-full items-center justify-center gap-2 text-[11px] sm:text-xs lg:w-auto lg:justify-start ${statusTextClass}`}>
                <span className={`font-medium ${statusValueClass}`}>
                  Currently building Bst-Table at Prasaditya Idea Private Limited.
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9, ease: ease.expoOut }}
            style={reduced ? undefined : { x: artX, y: artY }}
            className="order-1 relative flex justify-center lg:order-2 lg:justify-end"
          >
            {/*
              Single square div = the circle's coordinate space.
              Image fills it; icons use angle math to sit on the circumference.
              Outer padding (p-10) gives room for icons that extend beyond the edge.
            */}
            <TiltCard max={7} className="relative p-4 sm:p-8 lg:p-12 xl:p-14">
              {/* Circle: image + glow ring */}
              <div className="relative h-[16rem] w-[16rem] sm:h-[20rem] sm:w-[20rem] lg:h-[24rem] lg:w-[24rem] xl:h-[27rem] xl:w-[27rem]">
                {/* Conic ring sweeps around the portrait like a slow lighthouse */}
                <motion.div
                  aria-hidden
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute -inset-[3px] rounded-full opacity-70 blur-[2px]"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)) 70deg, hsl(var(--accent)) 150deg, transparent 220deg, transparent 360deg)",
                  }}
                />
                {/* Ambient bloom that breathes underneath it */}
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.32, 0.55, 0.32], scale: [1, 1.04, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="pointer-events-none absolute -inset-3 rounded-full hero-gradient blur-[26px] sm:-inset-4"
                />

                {/* Photo */}
                <div className={`absolute inset-0 overflow-hidden rounded-full ${imageFrameClass}`}>
                  <img
                    src={profilePhoto}
                    alt="Sathish Kumar Technical Lead Engineer"
                    className="h-full w-full object-cover object-[center_8%]"
                    width={512}
                    height={640}
                  />
                </div>

                {/* The whole ring orbits; each badge counter-rotates by the
                    same amount so it drifts around the portrait while staying
                    upright. */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 78, repeat: Infinity, ease: "linear" }}
                >
                {floatingIcons.map((icon, i) => {
                  const rad = (icon.angle * Math.PI) / 180;
                  const orbitRadius = 46;
                  return (
                    <motion.div
                      key={icon.label}
                      className="absolute z-10 pointer-events-none"
                      style={{
                        left: `${50 + Math.cos(rad) * orbitRadius}%`,
                        top: `${50 + Math.sin(rad) * orbitRadius}%`,
                        translate: "-50% -50%",
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: [0, icon.floatY ?? -10, 0],
                      }}
                      transition={{
                        opacity: { delay: 0.8 + i * 0.12, duration: 0.5 },
                        scale: { delay: 0.8 + i * 0.12, duration: 0.5, type: "spring", stiffness: 200 },
                        y: {
                          delay: 0.8 + i * 0.12,
                          duration: icon.duration ?? 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 78, repeat: Infinity, ease: "linear" }}
                        className={`flex scale-[0.8] items-center justify-center rounded-2xl border shadow-xl backdrop-blur-md sm:scale-100 ${icon.bg} ${icon.border}`}
                        style={{ width: icon.size, height: icon.size }}
                        title={icon.label}
                      >
                        {icon.svg}
                      </motion.div>
                    </motion.div>
                  );
                })}
                </motion.div>
              </div>
            </TiltCard>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`flex flex-col items-center gap-1.5 transition-colors ${scrollTextClass}`}
          >
            <span className="text-[11px] font-medium uppercase tracking-wider">Scroll</span>
            <div className={`flex h-8 w-5 items-start justify-center rounded-full pt-1.5 ${scrollBorderClass}`}>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-1.5 w-1 rounded-full bg-primary"
              />
            </div>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Statement ticker anchors the bottom of the hero and keeps it alive
          while the visitor is still reading the headline. */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border/40 bg-background/40 py-3.5 backdrop-blur-sm">
        <Marquee
          speed={38}
          items={heroTicker.map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-3 px-1 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:text-xs"
            >
              {item}
              <span className="h-1 w-1 rounded-full bg-primary/60" />
            </span>
          ))}
        />
      </div>
    </section>
  );
};

export default HeroSection;
