'use client';

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const MECHANICS = [
  "artificial progress",
  "variable reward",
  "false endings",
  "timed lockouts",
  "escalating punishment",
  "visual urgency cues",
];

const EXPLANATIONS = [
  { term: "Artificial progress",   body: "Early movement in progress indicators creates a sense of momentum and makes people less likely to stop." },
  { term: "Variable reward",       body: "Unpredictable outcomes increase anticipation and keep people engaged for longer periods of time." },
  { term: "False endings",         body: "Near‑completion cues encourage people to continue even when they originally planned to stop." },
  { term: "Timed lockouts",        body: "Forced delays increase the desire to act and make the next interaction feel more valuable." },
  { term: "Escalating punishment", body: "Increasing friction after repeated attempts discourages rapid disengagement." },
  { term: "Visual urgency cues",   body: "Motion, colour, and micro-copy create subtle pressure to continue." },
];

// Interference Pattern — two offset overlapping ellipses with radial spokes
function InterferenceWheel({ active }: { active: boolean }) {
  const cx1 = 88;  const cy1 = 88;
  const cx2 = 118; const cy2 = 78;
  const rx = 52;   const ry = 36;

  // Six intersection/perimeter points distributed around both circles
  const spokeOrigins = [
    { x: cx1, y: cy1 - ry - 4 },
    { x: cx2 + rx - 4, y: cy2 },
    { x: cx1 + rx - 8, y: cy1 + ry - 2 },
    { x: cx2, y: cy2 + ry + 2 },
    { x: cx1 - rx + 6, y: cy1 + ry - 6 },
    { x: cx1 - rx + 2, y: cy1 - 8 },
  ];

  const spokeTargets = [
    { x: cx2 - 10, y: cy2 - ry + 8 },
    { x: cx1 + 14, y: cy1 - 10 },
    { x: cx2 - 8, y: cy2 + ry - 4 },
    { x: cx1 - 12, y: cy1 + 6 },
    { x: cx2 - rx + 4, y: cy2 - 4 },
    { x: cx1 + 8, y: cy1 + 14 },
  ];

  return (
    <div
      className={`transition-opacity duration-700 ease-out
                  ${active ? "opacity-70" : "opacity-0"}`}
    >
      <svg width="200" height="160" viewBox="0 0 200 160" fill="none" aria-hidden="true">
        {/* Circle 1 */}
        <ellipse cx={cx1} cy={cy1} rx={rx} ry={ry}
          stroke="#4A4A4A" strokeWidth="0.8" opacity="0.7" />
        {/* Circle 2 — offset for interference */}
        <ellipse cx={cx2} cy={cy2} rx={rx} ry={ry}
          stroke="#4A4A4A" strokeWidth="0.8" opacity="0.7" />
        {/* Circle 3 — third overlap for the cluster seen in mockup */}
        <ellipse cx={cx1 + 16} cy={cy1 - 14} rx={rx - 8} ry={ry - 4}
          stroke="#4A4A4A" strokeWidth="0.6" opacity="0.45" />

        {/* Radial spokes between intersection zones */}
        {spokeOrigins.map((o, i) => (
          <line
            key={i}
            x1={o.x} y1={o.y}
            x2={spokeTargets[i].x} y2={spokeTargets[i].y}
            stroke="#4A4A4A" strokeWidth="0.6" opacity="0.5"
          />
        ))}

        {/* Small arrowhead dots at spoke ends */}
        {spokeTargets.map((t, i) => (
          <circle key={`dot-${i}`} cx={t.x} cy={t.y} r="1.2"
            fill="#4A4A4A" opacity="0.6" />
        ))}
      </svg>
    </div>
  );
}

function RevealContent() {
  const params   = useSearchParams();
  const elapsed  = params.get("t") ?? "0";
  const presses  = parseInt(params.get("p") ?? "0", 10);
  const attempts = parseInt(params.get("a") ?? "0", 10);
  const isImmune = params.get("immune") === "true";

  const headlineCopy = isImmune ? "You resisted the nudges." : "Your behaviour was influenced.";

  const lineTexts = [
    headlineCopy,
    "This page used behavioural design patterns known to influence decision-making.",
    "These techniques shaped your experience:",
  ];

  const [visible, setVisible]             = useState(false);
  const [shown, setShown]                 = useState<number[]>([]);
  const [showMechanics, setShowMechanics] = useState(false);
  const [showFinal, setShowFinal]         = useState(false);
  const [showStats, setShowStats]         = useState(false);
  const [showCTA, setShowCTA]             = useState(false);
  const [showInfo, setShowInfo]           = useState(false);

  // All timing preserved exactly
  useEffect(() => {
    setVisible(true);
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setShown(s => [...s, 0]), 1200));
    timers.push(setTimeout(() => setShown(s => [...s, 1]), 2400));
    timers.push(setTimeout(() => setShown(s => [...s, 2]), 3400));
    timers.push(setTimeout(() => setShowMechanics(true), 4200));
    timers.push(setTimeout(() => setShowFinal(true),     5200));
    timers.push(setTimeout(() => setShowStats(true),     5800));
    timers.push(setTimeout(() => setShowCTA(true),       6400));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <main
      className={`h-screen overflow-hidden flex items-center justify-center px-8 md:px-14
                  transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="grain-overlay" />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[1fr_220px] gap-14 z-10">

        {/* ── LEFT COLUMN ── */}
        <div className="flex flex-col space-y-5">

          {/* Headline — large serif, bold, matches mockup weight */}
          <h1
            className={`font-serif font-bold text-[clamp(32px,4.5vw,58px)] tracking-tight text-primary leading-tight
                        transition-opacity duration-700 ease-out
                        ${shown.includes(0) ? "opacity-100" : "opacity-0"}`}
          >
            {lineTexts[0]}
          </h1>

          {/* Sub-headline */}
          <p
            className={`font-sans text-sm text-secondary max-w-xl leading-relaxed
                        transition-opacity duration-700 ease-out
                        ${shown.includes(1) ? "opacity-100" : "opacity-0"}`}
          >
            {lineTexts[1]}
          </p>

          {/* Techniques intro + info toggle */}
          <div
            className={`font-sans text-[10px] uppercase tracking-[0.2em] text-secondary flex items-center gap-3
                        transition-opacity duration-700 ease-out
                        ${shown.includes(2) ? "opacity-100" : "opacity-0"}`}
          >
            <span>{lineTexts[2]}</span>
            <button
              type="button"
              onClick={() => setShowInfo(v => !v)}
              aria-label="Show behavioural explanations"
              className={`h-5 w-5 flex items-center justify-center rounded-full border border-secondary/40
                          text-[10px] font-sans text-secondary hover:border-primary hover:text-primary transition-colors shrink-0
                          ${showInfo ? "bg-secondary/10" : ""}`}
            >
              i
            </button>
          </div>

          {/*
            Techniques list — positioned relatively so the texture sits behind it.
            Mockup shows: serif name left, number right, divider line between each row.
          */}
          <div className="relative">
            {/* B&W texture — behind list, low opacity, slightly off-centre */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-1000
                          ${showMechanics ? "opacity-100" : "opacity-0"}`}
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1642285230613-eb47120b4a63?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                backgroundSize: "cover",
                backgroundPosition: "80% 20%",
                filter: "grayscale(100%) contrast(1.1)",
                opacity: 0.1,
                borderRadius: "6px",
              }}
            />

            <ul
              className={`relative space-y-0 w-full
                          transition-opacity duration-700 ${showMechanics ? "opacity-100" : "opacity-0"}`}
            >
              {MECHANICS.map((item, index) => (
                <li
                  key={item}
                  className="flex justify-between items-baseline py-3 border-b border-secondary/20 last:border-b-0"
                >
                  <span className="font-serif text-base md:text-lg tracking-tight text-primary">
                    {item}
                  </span>
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-secondary ml-4 shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Info panel */}
          <div
            className={`border-l border-secondary/20 pl-4
                        font-sans text-xs text-secondary space-y-3
                        transition-all duration-300 overflow-hidden
                        ${showInfo && showMechanics ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
          >
            {EXPLANATIONS.map((item) => (
              <p key={item.term} className="leading-relaxed">
                <span className="font-medium text-primary">{item.term}</span>
                <span>: {item.body}</span>
              </p>
            ))}
          </div>

          {/* Final paragraph */}
          <p
            className={`font-sans text-sm text-secondary max-w-xxl leading-relaxed
                        transition-opacity duration-700 ${showFinal ? "opacity-100" : "opacity-0"}`}
          >
           This experiment was built to show how small interface choices can guide behaviour without people realising it. Every time you pressed the button, the system added a delay to shift your rhythm. When you paused, the interface responded with movement or subtle visual cues. These are the same patterns used in games, social platforms and everyday tools. They extend engagement, influence timing and shape decisions in ways that feel natural even though they are engineered. The aim of this version was simply to make these mechanisms visible so you can recognise them in the products you use.
            
           This is version one. In future versions I want to compare how different people respond to each technique so I can see which patterns are most effective and how behaviour changes across sessions.
          </p>

        </div>

        {/* ── RIGHT COLUMN — wheel + stats + CTAs, bottom-aligned ── */}
        <div className="flex flex-col justify-end h-full space-y-4">

          {/* Interference Pattern wheel — fades in with stats */}
          <InterferenceWheel active={showStats} />

          {/* Session stats */}
          <div
            className={`space-y-3 transition-opacity duration-700
                        ${showStats ? "opacity-100" : "opacity-0"}`}
          >
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary">
              Your session
            </p>
            <ul className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary space-y-2">
              <li>Time spent: {elapsed}s</li>
              <li>Button presses: {presses}</li>
              <li>Attempts during lockout: {attempts}</li>
            </ul>
          </div>

          {/* CTAs */}
          <div
            className={`flex flex-col gap-3 pt-2
                        transition-opacity duration-700 ${showCTA ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <Link
              href={`/share?t=${elapsed}&p=${presses}&a=${attempts}`}
              className="inline-flex items-center justify-center rounded-full border border-primary
                         px-5 py-2 font-sans text-sm
                         hover:bg-primary hover:text-background transition-colors"
            >
              Share
            </Link>
            <Link
              href="/"
              className="font-sans text-xs text-secondary underline underline-offset-4 hover:text-primary transition-colors"
            >
              Restart
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default function RevealPage() {
  return (
    <Suspense>
      <RevealContent />
    </Suspense>
  );
}