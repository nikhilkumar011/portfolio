"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSmoothScroll } from "./Providers";

const LINES = [
  { t: "$ ./mvnw spring-boot:run", c: "text-fg" },
  { t: "  .   ____          _", c: "text-spring" },
  { t: " /\\\\ / ___'_ __ _ _(_)_ __  __ _", c: "text-spring" },
  { t: "( ( )\\___ | '_ | '_| | '_ \\/ _` |", c: "text-spring" },
  { t: " \\\\/  ___)| |_)| | | | | || (_| |", c: "text-spring" },
  { t: "  '  |____| .__|_| |_|_| |_\\__, |", c: "text-spring" },
  { t: "INFO  Starting PortfolioApplication using Java 21", c: "text-muted" },
  { t: "INFO  Loaded beans: java, springBoot, react, nextJs, rag", c: "text-muted" },
  { t: "INFO  Tomcat started on port 8080 (http)", c: "text-muted" },
  { t: "INFO  Started PortfolioApplication in 1.42 seconds", c: "text-spring-bright" },
];

export default function Preloader() {
  const { setReady } = useSmoothScroll();
  const [shown, setShown] = useState(0);
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      setReady(true);
      return;
    }
    const timers: number[] = [];
    LINES.forEach((_, i) => timers.push(window.setTimeout(() => setShown(i + 1), 90 + i * 150)));
    const start = performance.now();
    const total = 1750;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    timers.push(
      window.setTimeout(() => {
        setDone(true);
        window.setTimeout(() => setReady(true), 500);
      }, total + 350),
    );
    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
    };
  }, [setReady]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 sm:px-10 sm:py-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          role="status"
          aria-label="Loading portfolio"
        >
          <div className="flex items-center justify-between font-mono text-xs text-dim">
            <span>nikhil@dev:~/portfolio</span>
            <span>v2.0 · java 21</span>
          </div>
          <pre className="overflow-hidden font-mono text-[11px] leading-relaxed sm:text-sm">
            {LINES.slice(0, shown).map((l, i) => (
              <motion.div
                key={i}
                className={l.c}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                {l.t}
              </motion.div>
            ))}
            <span className="inline-block h-4 w-2 translate-y-0.5 bg-spring animate-blink" />
          </pre>
          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 overflow-hidden bg-line">
              <motion.div className="h-full origin-left bg-spring" style={{ scaleX: pct / 100 }} />
            </div>
            <span className="font-mono text-5xl font-semibold tabular-nums text-fg sm:text-7xl">
              {String(pct).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
