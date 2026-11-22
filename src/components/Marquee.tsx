"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { marquee } from "@/lib/data";

function Row({ items, baseVelocity }: { items: string[]; baseVelocity: number }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(smooth, [-3000, 0, 3000], [6, 0, -6]);
  const x = useTransform(() => `${wrap(-50, 0, baseX.get())}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * Math.abs(f);
    baseX.set(baseX.get() + move);
  });

  const content = [...items, ...items];
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0 gap-10 pr-10" style={{ x, skewX: skew }}>
        {content.concat(content).map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-[clamp(2rem,6vw,4.5rem)] font-semibold tracking-tight">
            <span className={i % 3 === 0 ? "font-serif font-normal italic text-spring-bright" : "text-fg/90"}>{t}</span>
            <span className="text-[0.4em] text-dim">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(marquee.length / 2);
  return (
    <section aria-label="Technologies" className="relative -rotate-2 space-y-3 border-y border-line bg-surface py-8">
      <Row items={marquee.slice(0, half)} baseVelocity={-2.2} />
      <Row items={marquee.slice(half)} baseVelocity={2.2} />
    </section>
  );
}
