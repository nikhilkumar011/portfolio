"use client";

import { motion } from "motion/react";
import { skillGroups, type SkillGroup } from "@/lib/data";
import { RevealWords, SectionLabel } from "./ui";

const ACCENT: Record<SkillGroup["accent"], string> = {
  spring: "var(--color-spring-bright)",
  java: "var(--color-java)",
  ai: "var(--color-ai)",
  web: "var(--color-web)",
  neutral: "var(--color-muted)",
};

function Card({ g, i }: { g: SkillGroup; i: number }) {
  const color = ACCENT[g.accent];
  const big = g.accent === "spring";
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.07 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`spotlight group relative overflow-hidden rounded-3xl border border-line p-6 transition-colors duration-300 hover:border-line-strong sm:p-7 ${g.span ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />
      <header className="relative flex items-start justify-between gap-4">
        <div>
          <h3 className={`${big ? "text-3xl sm:text-4xl" : "text-xl"} font-semibold tracking-tight`}>{g.title}</h3>
          <p className="mt-1 font-mono text-[11px] tracking-[0.18em] uppercase" style={{ color }}>
            {g.tag}
          </p>
        </div>
        <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, "0")}</span>
      </header>

      {big && (
        <p className="relative mt-5 max-w-md text-muted">
          Java &amp; the Spring ecosystem are my primary focus right now — building REST APIs with clean controller → service →
          repository layers, backed by solid experience shipping Node.js &amp; FastAPI services.
        </p>
      )}

      <ul className={`relative flex flex-wrap gap-2 ${big ? "mt-8" : "mt-5"}`}>
        {g.items.map((s, j) => (
          <motion.li
            key={s.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25 + j * 0.035 }}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-colors duration-200 ${
              big && s.learning
                ? "border-spring/40 bg-spring/10 text-fg"
                : "border-line bg-ink/40 text-fg/85 hover:border-line-strong"
            } ${big ? "sm:px-4 sm:py-2 sm:text-base" : ""}`}
          >
            {s.learning && (
              <span className="relative flex size-1.5" aria-hidden>
                <span className="absolute inset-0 rounded-full bg-spring-bright animate-pulse-ring" />
                <span className="relative size-1.5 rounded-full bg-spring-bright" />
              </span>
            )}
            {s.name}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-40">
      <SectionLabel index="03">Skills</SectionLabel>
      <div className="mt-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <RevealWords
          text="Backend first. Full-stack fluent. AI-native."
          className="max-w-3xl text-[clamp(2.2rem,5.4vw,4.6rem)] leading-[1] font-semibold tracking-[-0.035em]"
        />
        <p className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="relative flex size-1.5" aria-hidden>
            <span className="absolute inset-0 rounded-full bg-spring-bright animate-pulse-ring" />
            <span className="relative size-1.5 rounded-full bg-spring-bright" />
          </span>
          = actively learning &amp; building with
        </p>
      </div>

      <div className="mt-14 grid auto-rows-auto gap-4 md:grid-cols-4">
        {skillGroups.map((g, i) => (
          <Card key={g.title} g={g} i={i} />
        ))}
      </div>
    </section>
  );
}
