"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { navLinks, profile } from "@/lib/data";
import { useSmoothScroll } from "./Providers";
import { Icon } from "./ui";

export default function Nav() {
  const { scrollTo, ready } = useSmoothScroll();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setHidden(v > prev && v > 400 && !open);
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-spring via-spring-bright to-java"
        style={{ scaleX: progress }}
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: hidden ? -90 : 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-3 z-[65] flex justify-center px-4"
      >
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-colors duration-300 ${
            scrolled ? "border border-line bg-ink/70 backdrop-blur-xl" : "border border-transparent"
          }`}
        >
          <button onClick={() => go("top")} className="group flex items-center gap-2 rounded-full px-3 py-1.5" aria-label="Back to top">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-spring animate-pulse-ring" />
              <span className="relative size-2 rounded-full bg-spring" />
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight">
              Nikhil<span className="text-spring">.</span>dev
            </span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-200 ${
                    active === l.id ? "text-ink" : "text-muted hover:text-fg"
                  }`}
                  aria-current={active === l.id ? "true" : undefined}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-fg"
                      transition={{ type: "spring", bounce: 0.18, visualDuration: 0.4 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <a
            href={profile.resume}
            download
            className="hidden items-center gap-2 rounded-full bg-spring px-4 py-2 text-sm font-medium text-ink transition-[filter,transform] duration-200 hover:brightness-110 active:scale-95 md:flex"
          >
            <Icon name="download" className="size-4" /> CV
          </a>

          <button
            className="flex size-11 items-center justify-center rounded-full border border-line md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[64] flex flex-col justify-center bg-ink/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ clipPath: "circle(0% at 92% 5%)" }}
            animate={{ clipPath: "circle(150% at 92% 5%)" }}
            exit={{ clipPath: "circle(0% at 92% 5%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button onClick={() => go(l.id)} className="flex items-baseline gap-4 py-2 text-left">
                    <span className="font-mono text-xs text-spring">0{i + 1}</span>
                    <span className="text-4xl font-medium">{l.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              href={profile.resume}
              download
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-spring px-5 py-3 font-medium text-ink"
            >
              <Icon name="download" className="size-4" /> Download CV
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
