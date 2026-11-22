"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { certifications, education, journey } from "@/lib/data";
import { FadeUp, Icon, RevealWords, SectionLabel } from "./ui";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const glowTop = useTransform(draw, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-5 pt-32 pb-12 sm:px-8 sm:pt-40 sm:pb-16">
      <SectionLabel index="05">Journey</SectionLabel>
      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-end">
        <RevealWords
          text="From MERN to the JVM."
          className="text-[clamp(2.4rem,5.6vw,5rem)] leading-[0.98] font-semibold tracking-[-0.035em]"
        />
        <FadeUp>
          <p className="max-w-lg text-lg text-muted lg:ml-auto">
            Every stack taught me something the next one needed. Here&apos;s the path — and where I&apos;m heading.
          </p>
        </FadeUp>
      </div>

      <div ref={ref} className="relative mt-20">
        <div className="absolute top-0 bottom-0 left-4 w-px bg-line md:left-1/2" aria-hidden />
        <motion.div
          aria-hidden
          className="absolute top-0 bottom-0 left-4 w-px origin-top bg-gradient-to-b from-web via-ai to-spring-bright md:left-1/2"
          style={{ scaleY: draw }}
        />
        <motion.div aria-hidden className="absolute left-4 -translate-x-1/2 -translate-y-1/2 md:left-1/2" style={{ top: glowTop }}>
          <span className="block size-3 rounded-full bg-spring-bright shadow-[0_0_30px_8px_rgba(143,214,98,0.5)]" />
        </motion.div>

        <ol className="space-y-14 md:space-y-24">
          {journey.map((j, i) => {
            const left = i % 2 === 0;
            return (
              <li key={j.phase} className="relative md:grid md:grid-cols-2 md:gap-16">
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-35% 0px" }}
                  transition={{ type: "spring", bounce: 0.4, visualDuration: 0.5 }}
                  className={`absolute top-2 left-4 z-10 size-4 -translate-x-1/2 rounded-full border-2 md:left-1/2 ${
                    j.current ? "border-spring-bright bg-spring" : "border-line-strong bg-ink"
                  }`}
                />
                <motion.div
                  initial={{ opacity: 0, x: left ? -50 : 50, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-20% 0px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`ml-12 md:ml-0 ${left ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4"}`}
                >
                  <div className={`flex items-center gap-3 ${left ? "md:justify-end" : ""}`}>
                    <span className="font-mono text-xs text-dim">{j.phase}</span>
                    {j.current && (
                      <span className="rounded-full bg-spring px-2 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-ink">
                        NOW
                      </span>
                    )}
                  </div>
                  <h3 className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${j.current ? "text-gradient" : ""}`}>
                    {j.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs tracking-wide text-spring">{j.period}</p>
                  <p className={`mt-3 max-w-md leading-relaxed text-muted ${left ? "md:ml-auto" : ""}`}>{j.body}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-28 grid gap-4 md:grid-cols-[1.3fr_1fr]">
        <FadeUp className="relative overflow-hidden rounded-3xl border border-line bg-card p-7 sm:p-9">
          <div aria-hidden className="absolute -right-16 -bottom-16 size-56 rounded-full bg-web/15 blur-3xl" />
          <div className="relative flex items-center gap-3 text-web">
            <Icon name="grad" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Education</span>
          </div>
          <h3 className="relative mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">{education.school}</h3>
          <p className="relative mt-2 text-muted">{education.degree}</p>
          <div className="relative mt-6 flex flex-wrap gap-3 font-mono text-xs">
            <span className="rounded-full border border-line px-3 py-1.5">{education.period}</span>
            <span className="rounded-full border border-spring/40 bg-spring/10 px-3 py-1.5 text-spring-bright">{education.detail}</span>
          </div>
        </FadeUp>
        <FadeUp delay={0.1} className="relative overflow-hidden rounded-3xl border border-line bg-card p-7 sm:p-9">
          <div aria-hidden className="absolute -top-16 -right-16 size-56 rounded-full bg-java/15 blur-3xl" />
          <div className="relative flex items-center gap-3 text-java">
            <Icon name="badge" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase">Certifications</span>
          </div>
          <ul className="relative mt-5 space-y-4">
            {certifications.map((c) => (
              <li key={c} className="flex gap-3 leading-snug">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-java" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
