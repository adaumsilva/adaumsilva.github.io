"use client";

import { useState } from "react";
import type { DemoType } from "@/types/content";

interface DemoIframeProps {
  type: DemoType;
  url: string;
  height: number;
  title: string;
}

const DEMO_LABELS: Record<DemoType, string> = {
  huggingface: "HuggingFace Space",
  streamlit: "Streamlit App",
  gradio: "Gradio Demo",
  netron: "Netron Model Viewer",
  none: "Demo",
};

export function DemoIframe({ type, url, height, title }: DemoIframeProps) {
  const [activated, setActivated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!activated) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 bg-navy-light rounded border border-navy-lighter"
        style={{ height: `${Math.min(height, 400)}px` }}
      >
        <p className="text-slate text-sm text-center px-4">
          Interactive {DEMO_LABELS[type]} available
        </p>
        <button
          onClick={() => setActivated(true)}
          className="btn-outline text-sm"
          aria-label={`Launch interactive demo: ${title}`}
        >
          ▶ Launch Demo
        </button>
      </div>
    );
  }

  return (
    <div className="relative rounded overflow-hidden border border-navy-lighter bg-navy-light">
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="flex items-center gap-2 text-slate text-sm">
            <svg className="w-4 h-4 animate-spin text-green" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading…
          </div>
        </div>
      )}
      <iframe
        src={url}
        title={`Live demo: ${title}`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        className="w-full border-0"
        style={{ height: `${height}px` }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
