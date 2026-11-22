"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { stats } from "@/lib/data";
import { FadeUp, SectionLabel } from "./ui";

const PARAGRAPH: { t: string; hl?: boolean }[] = [
  { t: "I'm Nikhil Kumar Tiwari, a Computer Science engineering student who enjoys taking ideas from concept to deployment." },
  { t: "My focus is shifting deeper into the backend —" },
  { t: "Java and Spring Boot,", hl: true },
  { t: "clean layered APIs, data modelling and the systems that keep products reliable. I still ship full-stack with" },
  { t: "React, Next.js and Node.js,", hl: true },
  { t: "and I build" },
  { t: "applied AI — LLMs, RAG pipelines and agentic apps", hl: true },
  { t: "that make software feel intelligent." },
];

function Word({ children, progress, range, hl }: { children: string; progress: MotionValue<number>; range: [number, number]; hl?: boolean }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity, y }} className={`inline-block ${hl ? "font-serif text-[1.08em] italic text-spring-bright" : ""}`}>
        {children}
      </motion.span>
    </span>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const c = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  const words: { w: string; hl?: boolean }[] = [];
  for (const seg of PARAGRAPH) for (const w of seg.t.split(" ")) words.push({ w, hl: seg.hl });
  const n = words.length;

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-44">
      <SectionLabel index="01">About</SectionLabel>

      <div ref={ref} className="mt-10">
        <p className="sr-only">{PARAGRAPH.map((p) => p.t).join(" ")}</p>
        <p aria-hidden className="text-[clamp(1.6rem,3.6vw,3.1rem)] leading-[1.25] font-medium tracking-tight">
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / n, Math.min(1, (i + 4) / n)]} hl={w.hl}>
              {w.w}
            </Word>
          ))}
        </p>
      </div>

      <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <FadeUp className="space-y-5 text-lg leading-relaxed text-muted">
          <p>
            That&apos;s shown up in projects ranging from a <span className="text-fg">LeetCode-style coding platform</span> to a{" "}
            <span className="text-fg">visitor management system</span> with QR-based entry and workflow automation, and a{" "}
            <span className="text-fg">multi-agent AI platform</span> running across microservices.
          </p>
          <p>
            Right now I&apos;m going deeper into <span className="text-fg">Java, Spring Boot, AI/ML fundamentals, retrieval systems, data structures and system design</span>{" "}
            — the foundations behind robust software and intelligent experiences.
          </p>
        </FadeUp>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              className="group relative bg-ink p-6 sm:p-8"
            >
              <div className="text-5xl font-semibold tracking-tight sm:text-6xl">
                {"value" in s && typeof s.value === "number" ? (
                  <Counter to={s.value} suffix={s.suffix} />
                ) : (
                  <span className={i === 1 ? "text-java" : i === 2 ? "text-ai" : ""}>{s.text}</span>
                )}
              </div>
              <p className="mt-2 font-mono text-xs tracking-widest text-muted uppercase">{s.label}</p>
              <span className="absolute right-6 bottom-6 size-1.5 rounded-full bg-line-strong transition-colors duration-300 group-hover:bg-spring" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
