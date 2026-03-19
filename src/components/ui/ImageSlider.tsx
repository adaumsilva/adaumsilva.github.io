"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "framer-motion";

interface SliderImage {
  src: string;
  alt: string;
}

interface ImageSliderProps {
  images: SliderImage[];
  className?: string;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const EASE = [0.645, 0.045, 0.355, 1.0] as const;

function ChevronLeft({ size = 5 }: { size?: number }) {
  return (
    <svg className={`w-${size} h-${size}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRight({ size = 5 }: { size?: number }) {
  return (
    <svg className={`w-${size} h-${size}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

interface GalleryViewProps {
  images: SliderImage[];
  current: number;
  direction: 1 | -1;
  onGo: (offset: 1 | -1) => void;
  onGoTo: (index: number) => void;
  compact?: boolean;
}

function GalleryView({ images, current, direction, onGo, onGoTo, compact }: GalleryViewProps) {
  const thumbHeight = compact ? "h-12 sm:h-14" : "h-20 sm:h-24";

  return (
    <div className="flex flex-col w-full">
      {/* Main image */}
      <div className="relative w-full bg-black overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <AnimatePresence mode="wait" custom={direction}>
          <m.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
            className="absolute inset-0"
          >
            <img
              src={images[current].src}
              alt={images[current].alt}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </m.div>
        </AnimatePresence>

        {/* Gradient overlays for controls readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }}
        />

        {/* Prev arrow */}
        <button
          onClick={() => onGo(-1)}
          aria-label="Previous screenshot"
          className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center px-4 text-white/60 hover:text-white transition-colors duration-200 group"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm group-hover:border-white/40 group-hover:bg-black/50 transition-all duration-200">
            <ChevronLeft />
          </span>
        </button>

        {/* Next arrow */}
        <button
          onClick={() => onGo(1)}
          aria-label="Next screenshot"
          className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center px-4 text-white/60 hover:text-white transition-colors duration-200 group"
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm group-hover:border-white/40 group-hover:bg-black/50 transition-all duration-200">
            <ChevronRight />
          </span>
        </button>

        {/* Counter — bottom left */}
        <div className="absolute bottom-3 left-4 z-10 font-mono text-xs text-white/50 tracking-widest select-none">
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </div>
      </div>

      {/* Thumbnail filmstrip */}
      <div
        className="flex gap-1.5 mt-1.5"
        role="tablist"
        aria-label="Screenshot thumbnails"
      >
        {images.map((img, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`View screenshot ${i + 1}`}
            onClick={() => onGoTo(i)}
            className={`relative flex-1 overflow-hidden transition-all duration-300 ${thumbHeight} ${
              i === current ? "opacity-100" : "opacity-40 hover:opacity-70"
            }`}
          >
            <img
              src={img.src}
              alt={`Thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
              draggable={false}
            />
            {/* Active indicator bar */}
            {i === current && (
              <span
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: "var(--color-green)" }}
                aria-hidden="true"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ImageSlider({ images, className }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function go(offset: 1 | -1) {
    setDirection(offset);
    setCurrent((prev) => (prev + offset + images.length) % images.length);
  }

  function goTo(index: number) {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }

  // Keyboard navigation + escape when fullscreen
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "Escape" && fullscreen) setFullscreen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreen, current]);

  // Lock body scroll in fullscreen
  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  const fullscreenModal = mounted
    ? createPortal(
        <AnimatePresence>
          {fullscreen && (
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="fixed inset-0 z-[9999] flex flex-col bg-black"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4 shrink-0">
                <span className="font-mono text-xs text-white/40 tracking-widest">
                  {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => setFullscreen(false)}
                  aria-label="Close fullscreen"
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-200 font-mono text-xs"
                >
                  <CloseIcon />
                  <span>ESC</span>
                </button>
              </div>

              {/* Main image — fills remaining height */}
              <div className="relative flex-1 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <m.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <img
                      src={images[current].src}
                      alt={images[current].alt}
                      className="w-full h-full object-contain"
                      draggable={false}
                    />
                  </m.div>
                </AnimatePresence>

                {/* Gradient overlays */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.3) 100%)",
                  }}
                />

                {/* Prev arrow */}
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                  className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center px-6 text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm group-hover:border-white/40 group-hover:bg-black/50 transition-all duration-200">
                    <ChevronLeft size={6} />
                  </span>
                </button>

                {/* Next arrow */}
                <button
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center px-6 text-white/60 hover:text-white transition-colors duration-200 group"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm group-hover:border-white/40 group-hover:bg-black/50 transition-all duration-200">
                    <ChevronRight size={6} />
                  </span>
                </button>
              </div>

              {/* Thumbnail filmstrip */}
              <div
                className="flex gap-2 px-6 pt-3 pb-5 shrink-0"
                role="tablist"
                aria-label="Screenshot thumbnails"
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`View screenshot ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`relative flex-1 h-16 sm:h-20 overflow-hidden transition-all duration-300 ${
                      i === current ? "opacity-100" : "opacity-30 hover:opacity-60"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {i === current && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-0.5"
                        style={{ backgroundColor: "var(--color-green)" }}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                ))}
              </div>
            </m.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;

  return (
    <>
      <div className={className} role="region" aria-label="Screenshot gallery">
        <div className="relative">
          <GalleryView
            images={images}
            current={current}
            direction={direction}
            onGo={go}
            onGoTo={goTo}
            compact
          />

          {/* Maximize button — top-right of main image */}
          <button
            onClick={() => setFullscreen(true)}
            aria-label="View fullscreen"
            className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded font-mono text-xs text-white/60 hover:text-white border border-white/15 bg-black/40 hover:bg-black/60 backdrop-blur-sm transition-all duration-200"
          >
            <ExpandIcon />
            <span className="hidden sm:inline">Expand</span>
          </button>
        </div>
      </div>

      {fullscreenModal}
    </>
  );
}
