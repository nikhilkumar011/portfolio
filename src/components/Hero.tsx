"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { profile, roles } from "@/lib/data";
import { useSmoothScroll } from "./Providers";
import { Icon, Magnetic } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tok = [string, string];
const CODE: Tok[][] = [
  [["@RestController", "text-java"]],
  [["@RequestMapping", "text-java"], ["(", "text-muted"], ['"/api/v1/nikhil"', "text-spring-bright"], [")", "text-muted"]],
  [["public class ", "text-ai"], ["DeveloperController", "text-fg"], [" {", "text-muted"]],
  [["", ""]],
  [["  private final ", "text-ai"], ["RagService", "text-web"], [" rag;", "text-fg"]],
  [["", ""]],
  [["  @GetMapping", "text-java"], ["(", "text-muted"], ['"/stack"', "text-spring-bright"], [")", "text-muted"]],
  [["  public ", "text-ai"], ["Stack", "text-web"], [" stack() {", "text-fg"]],
  [["    return ", "text-ai"], ["Stack.", "text-fg"], ["of", "text-web"], ["(", "text-muted"], ['"Java"', "text-spring-bright"], [", ", "text-muted"], ['"Spring Boot"', "text-spring-bright"], [",", "text-muted"]],
  [["      ", ""], ['"Next.js"', "text-spring-bright"], [", ", "text-muted"], ['"LLMs + RAG"', "text-spring-bright"], [");", "text-muted"]],
  [["  }", "text-muted"]],
  [["}", "text-muted"]],
];

function RoleRotator({ run }: { run: boolean }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!run) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [run]);
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          className="inline-block whitespace-nowrap text-spring-bright"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const { ready, scrollTo } = useSmoothScroll();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(8px)"]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const codeY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const orbX = useTransform(smx, [-1, 1], [-60, 60]);
  const orbY = useTransform(smy, [-1, 1], [-40, 40]);
  const orb2X = useTransform(smx, [-1, 1], [50, -50]);
  const rotY = useTransform(smx, [-1, 1], [-8, 8]);
  const rotX = useTransform(smy, [-1, 1], [6, -6]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <motion.div aria-hidden className="grid-bg absolute inset-0" style={{ y: gridY }} />
      <motion.div
        aria-hidden
        className="absolute top-[12%] left-[8%] size-[38rem] rounded-full bg-spring/20 blur-[120px]"
        style={{ x: orbX, y: orbY }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[5%] bottom-[5%] size-[30rem] rounded-full bg-java/15 blur-[120px]"
        style={{ x: orb2X }}
      />

      <motion.div
        style={{ scale, opacity, filter: blur }}
        className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-8"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-spring/30 bg-spring/10 px-3 py-1.5 font-mono text-[11px] tracking-[0.18em] text-spring-bright"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 rounded-full bg-spring-bright animate-pulse-ring" />
              <span className="relative size-1.5 rounded-full bg-spring-bright" />
            </span>
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-3 font-mono text-sm text-muted"
          >
            <span className="text-spring">nikhil@dev</span>:~$ whoami
          </motion.p>

          <h1 className="text-[clamp(2.6rem,7.4vw,6.4rem)] leading-[0.95] font-semibold tracking-[-0.04em]" aria-label={profile.name}>
            {profile.name.split(" ").map((word, wi, arr) => {
              const offset = arr.slice(0, wi).join(" ").length + (wi ? 1 : 0);
              return (
                <span key={wi} className="mr-[0.22em] inline-block whitespace-nowrap" aria-hidden>
                  {word.split("").map((ch, ci) => (
                    <span key={ci} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "115%" }}
                        animate={ready ? { y: "0%" } : {}}
                        transition={{ duration: 1, ease: EASE, delay: 0.25 + (offset + ci) * 0.03 }}
                      >
                        {ch}
                      </motion.span>
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            className="mt-5 text-[clamp(1.4rem,3vw,2.3rem)] leading-tight font-light tracking-tight text-fg/90"
          >
            builds{" "}
            <em className="font-serif text-[1.15em] text-gradient italic">reliable backends</em> &amp;{" "}
            AI-powered products.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Computer Science engineering student going deep on <span className="text-fg">Java &amp; Spring Boot</span> for
            the backend, shipping full-stack products with <span className="text-fg">React, Next.js &amp; Node.js</span>,
            and building applied AI — <span className="text-fg">LLMs, RAG pipelines and agents</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="mt-5 font-mono text-sm text-muted"
          >
            <span className="text-dim">currently → </span>
            <RoleRotator run={ready} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 1.15 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href={profile.resume}
                download
                className="group inline-flex h-12 items-center gap-2 rounded-full bg-spring px-6 font-medium text-ink transition-[filter] duration-200 hover:brightness-110"
              >
                <Icon name="download" className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                Download CV
              </a>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollTo("#projects")}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-6 font-medium transition-colors duration-200 hover:border-fg hover:bg-fg hover:text-ink"
              >
                View Projects
              </button>
            </Magnetic>
            <Magnetic>
              <button
                onClick={() => scrollTo("#contact")}
                className="group inline-flex h-12 items-center gap-2 px-3 font-medium text-muted transition-colors duration-200 hover:text-fg"
              >
                Get in Touch
                <Icon name="arrow-up-right" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-md [perspective:1200px] lg:max-w-none">
          <motion.div style={{ y: photoY, rotateX: rotX, rotateY: rotY }} className="relative">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0 round 28px)", scale: 1.1 }}
              animate={ready ? { clipPath: "inset(0% 0 0 0 round 28px)", scale: 1 } : {}}
              transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line"
            >
              <Image
                src={profile.photo}
                alt="Nikhil Kumar Tiwari"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover object-[50%_30%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-spring-bright">BACKEND · JAVA</p>
                  <p className="text-sm text-fg/90">VIT Bhopal · B.Tech CSE (AI/ML)</p>
                </div>
                <span className="rounded-full border border-line-strong bg-ink/50 px-3 py-1 font-mono text-xs backdrop-blur">
                  :8080
                </span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: codeY }}
            initial={{ opacity: 0, x: 40 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: EASE, delay: 1 }}
            className="absolute -bottom-10 -left-4 w-[min(92%,23rem)] rounded-2xl border border-line-strong bg-surface/85 p-4 shadow-2xl shadow-black/60 backdrop-blur-xl sm:-left-16 lg:-left-24"
          >
            <div className="mb-3 flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-dim">DeveloperController.java</span>
            </div>
            <pre className="overflow-hidden font-mono text-[10.5px] leading-[1.65] sm:text-[11.5px]">
              {CODE.map((line, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: -6 }}
                  animate={ready ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 1.3 + li * 0.07 }}
                  className="whitespace-pre"
                >
                  {line.map(([t, c], ti) => (
                    <span key={ti} className={c}>
                      {t || " "}
                    </span>
                  ))}
                </motion.div>
              ))}
            </pre>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-8 hidden lg:block"
      >
      <motion.button
        onClick={() => scrollTo("#about")}
        style={{ opacity }}
        className="flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-dim"
        aria-label="Scroll to about"
      >
        SCROLL
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-spring"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
      </motion.div>
    </section>
  );
}
