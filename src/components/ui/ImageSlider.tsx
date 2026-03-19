"use client";

import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

interface SliderImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  className?: string;
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const glassStyle: React.CSSProperties = {
  background: "linear-gradient(rgba(255,255,255,0.04), transparent)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
};

function ChevronLeft() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ImageSlider({ images, className }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function go(offset: 1 | -1) {
    setDirection(offset);
    setCurrent((prev) => (prev + offset + images.length) % images.length);
  }

  function goTo(index: number) {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }

  return (
    <div className={className} role="region" aria-label="Screenshot gallery">
      {/* Slide area */}
      <div
        className="relative aspect-video overflow-hidden rounded-xl"
        style={glassStyle}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.645, 0.045, 0.355, 1.0] }}
            className="absolute inset-0"
          >
            <img
              src={images[current].src}
              alt={images[current].alt}
              className="w-full h-full object-cover"
            />
          </m.div>
        </AnimatePresence>

        {/* Prev button */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-navy/70 text-slate-light hover:text-green hover:bg-navy transition-all duration-200 backdrop-blur-sm border border-white/10"
        >
          <ChevronLeft />
        </button>

        {/* Next button */}
        <button
          onClick={() => go(1)}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-navy/70 text-slate-light hover:text-green hover:bg-navy transition-all duration-200 backdrop-blur-sm border border-white/10"
        >
          <ChevronRight />
        </button>

        {/* Counter */}
        <div className="absolute bottom-3 right-4 z-10 font-mono text-xs text-slate-light/70">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Dot indicators */}
      <div
        role="tablist"
        aria-label="Slide indicators"
        className="flex justify-center items-center gap-2 mt-4"
      >
        {images.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to screenshot ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-green"
                : "w-1.5 bg-slate/40 hover:bg-slate"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
