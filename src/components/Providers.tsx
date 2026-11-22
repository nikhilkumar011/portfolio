"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { MotionConfig } from "motion/react";

type ScrollTo = (target: string | number, offset?: number) => void;

const ScrollCtx = createContext<{ scrollTo: ScrollTo; ready: boolean; setReady: (v: boolean) => void }>({
  scrollTo: () => {},
  ready: false,
  setReady: () => {},
});

export const useSmoothScroll = () => useContext(ScrollCtx);

export default function Providers({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (ready) lenis.start();
    else lenis.stop();
  }, [ready]);

  const scrollTo: ScrollTo = (target, offset = 0) => {
    const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : null;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el ?? (target as number), { offset, duration: 1.6 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <ScrollCtx.Provider value={{ scrollTo, ready, setReady }}>{children}</ScrollCtx.Provider>
    </MotionConfig>
  );
}
