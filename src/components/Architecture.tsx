"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { SectionLabel } from "./ui";

const STEPS = [
  {
    layer: "Client",
    tech: "React · Next.js",
    color: "var(--color-web)",
    title: "A request leaves the UI",
    body: "A Next.js frontend fires a typed request. Fast, accessible interfaces are where my full-stack work started — and they still matter.",
    log: "GET /api/v1/projects  →  Authorization: Bearer ••••",
  },
  {
    layer: "Controller",
    tech: "@RestController",
    color: "var(--color-java)",
    title: "Spring Boot takes the route",
    body: "A REST controller maps the endpoint, validates the incoming DTO and sits behind Spring Security filters.",
    log: "DispatcherServlet → ProjectController#list()",
  },
  {
    layer: "Service",
    tech: "@Service · @Transactional",
    color: "var(--color-spring-bright)",
    title: "Business logic, cleanly layered",
    body: "Services own the rules. Dependency injection keeps them small, testable and easy to reason about.",
    log: "ProjectService.list(page=0, size=9) — tx begin",
  },
  {
    layer: "AI layer",
    tech: "LLM · RAG · Embeddings",
    color: "var(--color-ai)",
    title: "Intelligence when it’s needed",
    body: "Embed the query, retrieve context from a vector store and ground the LLM’s answer — RAG as a backend capability, not a gimmick.",
    log: "rag.retrieve(k=5) → llm.generate(grounded=true)",
  },
  {
    layer: "Repository",
    tech: "Spring Data JPA · Hibernate",
    color: "var(--color-java)",
    title: "Typed data access",
    body: "Repositories over Hibernate map entities to tables, so queries stay declarative and the domain stays clean.",
    log: "select p from Project p order by p.id",
  },
  {
    layer: "Database",
    tech: "PostgreSQL · Redis",
    color: "var(--color-spring)",
    title: "Persist, cache, respond",
    body: "PostgreSQL for truth, Redis for speed — then a clean JSON response flies back up the stack.",
    log: "200 OK  ·  application/json  ·  38 ms",
  },
];

export default function Architecture() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [step, setStep] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length * 0.999)));
    setStep(s);
  });

  const N = STEPS.length;
  const lineScale = useTransform(p, [0.5 / N, 1 - 0.5 / N], [0, 1]);
  const packetTop = useTransform(p, [0.5 / N, 1 - 0.5 / N], ["0%", "100%"]);

  return (
    <section id="stack" ref={ref} className="relative" style={{ height: `${STEPS.length * 70 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div aria-hidden className="grid-bg absolute inset-0 opacity-60" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-24 pb-8 sm:px-8 lg:pt-28">
          <SectionLabel index="02">How I think about a backend</SectionLabel>

          <div className="mt-6 grid flex-1 items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <h2 className="text-[clamp(1.9rem,4.4vw,3.8rem)] leading-[1.02] font-semibold tracking-[-0.03em]">
                Follow a request through <span className="font-serif font-normal italic text-spring-bright">the stack.</span>
              </h2>

              <div className="relative mt-6 min-h-[11rem] sm:mt-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-mono text-xs tracking-[0.2em] uppercase" style={{ color: STEPS[step].color }}>
                      {String(step + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} · {STEPS[step].layer}
                    </p>
                    <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{STEPS[step].title}</h3>
                    <p className="mt-3 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{STEPS[step].body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 hidden rounded-xl border border-line bg-surface/80 p-4 font-mono text-[12px] leading-relaxed backdrop-blur sm:block">
                {STEPS.slice(0, step + 1).slice(-4).map((s, i, arr) => (
                  <motion.div
                    key={s.layer}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: i === arr.length - 1 ? 1 : 0.45, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="truncate"
                  >
                    <span style={{ color: s.color }}>[{s.layer.padEnd(10, " ")}]</span>{" "}
                    <span className="text-fg/85">{s.log}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative ml-3 sm:ml-6">
                <div className="absolute top-3 bottom-3 left-[11px] w-px bg-line" />
                <motion.div
                  className="absolute top-3 bottom-3 left-[11px] w-px origin-top bg-gradient-to-b from-web via-spring-bright to-spring"
                  style={{ scaleY: lineScale }}
                />
                <div className="absolute top-3 bottom-3 left-0 w-6">
                  <motion.div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: packetTop }}>
                    <span className="block size-3 rounded-full bg-spring-bright shadow-[0_0_24px_6px_rgba(143,214,98,0.55)]" />
                  </motion.div>
                </div>

                <ol className="space-y-2.5 sm:space-y-3">
                  {STEPS.map((s, i) => {
                    const on = i <= step;
                    const current = i === step;
                    return (
                      <li key={s.layer} className="relative flex items-center gap-4 pl-10 sm:gap-5">
                        <motion.span
                          className="absolute left-[5px] size-[13px] rounded-full border-2"
                          animate={{
                            borderColor: on ? s.color : "rgba(255,255,255,0.16)",
                            backgroundColor: current ? s.color : "#06080c",
                            scale: current ? 1.25 : 1,
                          }}
                          transition={{ duration: 0.35 }}
                        />
                        <motion.div
                          animate={{
                            opacity: on ? 1 : 0.35,
                            x: current ? 10 : 0,
                            borderColor: current ? s.color : "rgba(255,255,255,0.08)",
                          }}
                          transition={{ type: "spring", bounce: 0.15, visualDuration: 0.45 }}
                          className={`flex flex-1 items-center justify-between gap-3 rounded-2xl border bg-card/80 px-4 py-2.5 backdrop-blur sm:px-5 sm:py-3.5 ${
                            i === 3 ? "lg:ml-10" : ""
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium sm:text-base">{s.layer}</p>
                            <p className="truncate font-mono text-[11px] text-muted sm:text-xs">{s.tech}</p>
                          </div>
                          {current && (
                            <motion.span
                              layoutId="arch-active"
                              className="shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] text-ink"
                              style={{ backgroundColor: s.color }}
                            >
                              ACTIVE
                            </motion.span>
                          )}
                        </motion.div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
