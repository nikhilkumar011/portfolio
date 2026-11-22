"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { profile, socials } from "@/lib/data";
import { useSmoothScroll } from "./Providers";
import { Icon, Magnetic } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const { scrollTo } = useSmoothScroll();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.82, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
  const radius = useTransform(scrollYProgress, [0, 0.6], [80, 32]);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const headline = "Let's build something.".split(" ");

  return (
    <section id="contact" ref={ref} className="relative px-3 pt-10 pb-3 sm:px-4">
      <motion.div
        style={{ scale, y, borderRadius: radius }}
        className="relative mx-auto max-w-[96rem] overflow-hidden border border-line bg-surface"
      >
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div aria-hidden className="absolute -top-40 left-1/2 size-[44rem] -translate-x-1/2 rounded-full bg-spring/20 blur-[140px]" />

        <div className="relative px-6 pt-24 pb-10 sm:px-12 sm:pt-32 lg:px-20">
          <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
            <span className="text-spring">// 06</span> &nbsp;Contact
          </p>

          <h2 className="mt-6 text-[clamp(3rem,10vw,9.5rem)] leading-[0.92] font-semibold tracking-[-0.05em]" aria-label="Let's build something.">
            {headline.map((w, i) => (
              <span key={i} className="mr-[0.2em] inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
                <motion.span
                  className={`inline-block ${i === 2 ? "font-serif font-normal italic text-gradient" : ""}`}
                  initial={{ y: "110%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
            className="mt-8 max-w-xl text-lg text-muted sm:text-xl"
          >
            Open to internships, collaborations, and interesting problems — especially Java / Spring Boot backends and
            applied-AI products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.25}>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-14 items-center gap-3 rounded-full bg-spring px-7 text-lg font-medium text-ink transition-[filter] duration-200 hover:brightness-110"
              >
                <Icon name="mail" /> Say hello
              </a>
            </Magnetic>
            <button
              onClick={copy}
              className="inline-flex h-14 items-center gap-3 rounded-full border border-line-strong px-5 font-mono text-sm transition-colors duration-200 hover:border-fg"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "ok" : "copy"}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.18 }}
                  className={copied ? "text-spring-bright" : "text-muted"}
                >
                  <Icon name={copied ? "check" : "copy"} className="size-4" />
                </motion.span>
              </AnimatePresence>
              <span className="hidden sm:inline">{copied ? "Copied to clipboard" : profile.email}</span>
              <span className="sm:hidden">{copied ? "Copied" : "Copy email"}</span>
            </button>
          </motion.div>

          <ul className="mt-20 border-t border-line">
            {socials.map((s, i) => (
              <motion.li
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="border-b border-line"
              >
                <a
                  href={s.href}
                  target={s.icon === "mail" ? undefined : "_blank"}
                  rel={s.icon === "mail" ? undefined : "noopener noreferrer"}
                  className="group relative flex items-center justify-between gap-4 overflow-hidden py-5 sm:py-6"
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-fg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                  <span className="relative flex items-center gap-4 transition-[color,transform] duration-500 group-hover:translate-x-4 group-hover:text-ink sm:gap-6">
                    <Icon name={s.icon} className="size-5 sm:size-6" />
                    <span className="text-2xl font-medium tracking-tight sm:text-4xl">{s.label}</span>
                  </span>
                  <span className="relative flex items-center gap-3 pr-1 transition-[color,transform] duration-500 group-hover:-translate-x-4 group-hover:text-ink">
                    <span className="hidden font-mono text-sm text-muted transition-colors duration-500 group-hover:text-ink/70 md:inline">
                      {s.handle}
                    </span>
                    <Icon name="arrow-up-right" className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>

          <footer className="mt-16 flex flex-col gap-4 font-mono text-xs text-dim sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Nikhil Kumar Tiwari — built with Next.js, Tailwind CSS &amp; Motion</p>
            <button onClick={() => scrollTo(0)} className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              Back to top
              <Icon name="arrow-down" className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </footer>
        </div>
      </motion.div>
    </section>
  );
}
