"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInWhenVisible({ children, delay = 0, className }: FadeInWhenVisibleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.645, 0.045, 0.355, 1.0],
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}
