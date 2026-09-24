"use client";

import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import { Pause, Play, MoveUpRight } from "lucide-react";

export default function AnimatedHero() {
  const scene = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  function tilt(e: PointerEvent<HTMLDivElement>) {
    if (
      e.pointerType === "touch" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      paused
    ) {
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--rotate-x",
      `${-(e.clientY - rect.top - rect.height / 2) / 45}deg`,
    );
    scene.current?.style.setProperty(
      "--rotate-y",
      `${(e.clientX - rect.left - rect.width / 2) / 45}deg`,
    );
  }

  function reset() {
    scene.current?.style.setProperty("--rotate-x", "0deg");
    scene.current?.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <div
      className={`hero-scene ${paused ? "is-paused" : ""}`}
      onPointerMove={tilt}
      onPointerLeave={reset}
      ref={scene}
      style={
        {
          "--rotate-x": "0deg",
          "--rotate-y": "0deg",
        } as CSSProperties
      }
    >
      <div className="hero-tilt">
        <div className="hero-float">
          {imgOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/primenova-3d.webp"
              width={1100}
              height={1100}
              fetchPriority="high"
              alt="3D mobile app with floating teal glass dashboard tiles and amber accents"
              className="hero-image"
              onError={() => setImgOk(false)}
            />
          ) : (
            <HeroVisualFallback />
          )}
        </div>
      </div>

      <div className="hero-tag hero-tag-top">
        <span className="tag-icon">
          <MoveUpRight size={18} />
        </span>
        <span>
          From idea to impact
          <small>Thoughtfully engineered</small>
        </span>
      </div>

      <div className="hero-tag hero-tag-bottom">
        <span className="tag-accent">✳</span>
        <span>
          Made for what&apos;s next
          <small>Designed around you</small>
        </span>
      </div>

      <button
        className="motion-toggle"
        type="button"
        aria-pressed={paused}
        onClick={() => {
          setPaused(!paused);
          reset();
        }}
        aria-label={paused ? "Play hero animation" : "Pause hero animation"}
      >
        {paused ? <Play size={13} /> : <Pause size={13} />}
        <span>{paused ? "Play motion" : "Pause motion"}</span>
      </button>
    </div>
  );
}

/** CSS stand-in when primenova-3d.webp is not in /public/images */
function HeroVisualFallback() {
  return (
    <div className="hero-fallback" aria-hidden>
      <div className="hf-glow" />
      <div className="hf-orb hf-orb-gold" />
      <div className="hf-ring" />
      <div className="hf-tile hf-tile-chart">
        <span />
        <span />
        <span />
      </div>
      <div className="hf-tile hf-tile-donut" />
      <div className="hf-tile hf-tile-wallet" />
      <div className="hf-phone">
        <div className="hf-notch" />
        <div className="hf-screen">
          <div className="hf-banner" />
          <svg className="hf-graph" viewBox="0 0 120 48" fill="none">
            <path
              d="M4 40 C20 38 28 28 40 24 C55 18 60 30 75 22 C90 14 100 10 116 8"
              stroke="#02a5af"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M4 40 C20 38 28 28 40 24 C55 18 60 30 75 22 C90 14 100 10 116 8 V48 H4 Z"
              fill="url(#hfGrad)"
              opacity="0.35"
            />
            <defs>
              <linearGradient id="hfGrad" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#02a5af" />
                <stop offset="1" stopColor="#02a5af" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="hf-rows">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
