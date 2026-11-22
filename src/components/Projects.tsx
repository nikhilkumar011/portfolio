"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { projects, type Project } from "@/lib/data";
import { FadeUp, Icon, RevealWords, SectionLabel } from "./ui";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function Visual({ p, i, grow }: { p: Project; i: number; grow?: boolean }) {
  const repo = p.github.replace("https://github.com/", "");
  const c1 = `hsl(${p.hue} 70% 60%)`;
  const c2 = `hsl(${(p.hue + 40) % 360} 80% 55%)`;
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line ${grow ? "min-h-44 flex-1" : "h-44 sm:h-52"}`} aria-hidden>
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
        style={{
          background: `radial-gradient(120% 90% at 85% 10%, ${c1}55, transparent 55%), radial-gradient(90% 80% at 10% 100%, ${c2}40, transparent 60%), #0b1017`,
        }}
      />
      <svg className="absolute inset-0 size-full opacity-50" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={`d${i}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.22)" />
          </pattern>
        </defs>
        <rect width="400" height="200" fill={`url(#d${i})`} />
        {[40, 70, 100, 130].map((r, k) => (
          <circle
            key={r}
            cx="330"
            cy="40"
            r={r}
            fill="none"
            stroke={c1}
            strokeOpacity={0.5 - k * 0.1}
            className="origin-[330px_40px] transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ))}
      </svg>
      <span className="absolute -bottom-6 -left-2 font-mono text-[7.5rem] leading-none font-bold tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)]">
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/30 px-2.5 py-1 font-mono text-[10px] tracking-[0.15em] text-white/85 uppercase backdrop-blur">
        {p.kind}
      </span>
      <span className="absolute right-4 bottom-4 max-w-[70%] truncate font-mono text-[10px] text-white/60">{repo}</span>
    </div>
  );
}

function Card({ p, i, wide }: { p: Project; i: number; wide?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col rounded-[28px] border border-line bg-card p-4 transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-line-strong sm:p-5 ${
        wide ? "h-full w-[min(84vw,30rem)] shrink-0" : ""
      }`}
    >
      <Visual p={p} i={i} grow={wide} />
      <div className={`flex flex-col px-1 pt-5 ${wide ? "" : "flex-1"}`}>
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">{p.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{p.description}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-fg/80">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {p.live && (
            <a
              href={p.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-spring px-4 text-sm font-medium text-ink transition-[filter] duration-200 hover:brightness-110"
              aria-label={`${p.title} live site`}
            >
              Live
              <Icon name="arrow-up-right" className="size-4" />
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium transition-colors duration-200 hover:border-fg hover:bg-fg hover:text-ink"
            aria-label={`${p.title} on GitHub`}
          >
            <Icon name="github" className="size-4" /> View on GitHub
            <Icon name="arrow-up-right" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
}

function Intro() {
  return (
    <>
      <SectionLabel index="04">Projects</SectionLabel>
      <RevealWords
        text="Things I've built & shipped."
        className="mt-6 text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.035em]"
      />
      <p className="mt-6 max-w-md text-lg text-muted">
        From multi-agent AI platforms and code judges to real-time MERN apps — {projects.length} projects, each with its source on GitHub.
      </p>
    </>
  );
}

function HorizontalProjects() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const distance = useMotionValue(0);
  const [index, setIndex] = useState(1);

  useIsoLayoutEffect(() => {
    const measure = () => {
      if (!track.current) return;
      const d = Math.max(0, track.current.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.35 });
  const x = useTransform(() => -smooth.get() * distance.get());
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndex(Math.min(projects.length, Math.max(1, Math.round(v * (projects.length - 1)) + 1)));
  });

  return (
    <section id="projects" ref={section} className="relative" style={{ height: height ?? "500vh" }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex h-[78svh] max-h-[46rem] items-stretch gap-6 pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          <div className="flex w-[min(80vw,30rem)] shrink-0 flex-col justify-center pr-6">
            <Intro />
            <p className="mt-10 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-dim">
              SCROLL
              <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
                →
              </motion.span>
            </p>
          </div>
          {projects.map((p, i) => (
            <Card key={p.github} p={p} i={i} wide />
          ))}
          <div aria-hidden className="w-[6vw] shrink-0" />
        </motion.div>

        <div className="mx-auto mt-8 flex w-full max-w-7xl items-center gap-4 px-8 font-mono text-xs text-muted">
          <span className="tabular-nums text-fg">{String(index).padStart(2, "0")}</span>
          <div className="h-px flex-1 bg-line">
            <motion.div className="h-full origin-left bg-spring" style={{ scaleX: bar }} />
          </div>
          <span className="tabular-nums">{String(projects.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}

function StackedProjects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <Intro />
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <FadeUp key={p.github} delay={(i % 2) * 0.08}>
            <Card p={p} i={i} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

export default function Projects() {
  const [desktop, setDesktop] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const set = () => setDesktop(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  if (desktop) return <HorizontalProjects />;
  return <StackedProjects />;
}
