'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getElapsedSeconds } from "@/src/lib/startTime";

const CYCLES = [
  { copy: "Nearly.",        targetProgress: 70,  baseDuration: 10000, spark: false },
  { copy: "Alright.",       targetProgress: 82,  baseDuration: 14000, spark: false },
  { copy: "One more.",      targetProgress: 90,  baseDuration: 16000, spark: true  },
  { copy: "Stay with it.",  targetProgress: 96,  baseDuration: 16000, spark: false },
  { copy: "Just one more.", targetProgress: 98,  baseDuration: 16000, spark: true  },
];

const PRE_CYCLE_DURATION = 14000;
const PRE_CYCLE_TARGET   = 70;
const MIN_DURATION       = 4000;
const MAX_DURATION       = 20000;
const BUTTON_LOCKOUT_MS  = 5000;
const IMMUNE_ELAPSED_S   = 90;
const SPARK_DURATION_MS  = 5000;

export default function LoopPage() {
  const router = useRouter();

  const [mounted, setMounted]                   = useState(false);
  const [cycleIndex, setCycleIndex]             = useState(-1);
  const [displayCopy, setDisplayCopy]           = useState("");
  const [copyVisible, setCopyVisible]           = useState(false);
  const [progress, setProgress]                 = useState(0);
  const [buttonPhase, setButtonPhase]           = useState<'hidden' | 'filling' | 'active'>('hidden');
  const [buttonBuzzing, setButtonBuzzing]       = useState(false);
  const [showSpark, setShowSpark]               = useState(false);
  const [sparkKey, setSparkKey]                 = useState(0);
  const [pulsing, setPulsing]                   = useState(false);
  const [isTransitioning, setIsTransitioning]   = useState(false);
  const [showLossMsg, setShowLossMsg]           = useState(false);

  const progressRef          = useRef(0);
  const cycleIndexRef        = useRef(-1);
  const cycleDurationsRef    = useRef(CYCLES.map(c => c.baseDuration));
  const cycleSpeedRef        = useRef(CYCLES.map(() => 1.0));
  const rafRef               = useRef<number>(0);
  const animStartTimeRef     = useRef<number>(0);
  const animStartPctRef      = useRef<number>(0);
  const animTargetRef        = useRef<number>(0);
  const animDurRef           = useRef<number>(0);
  const animCompleteRef      = useRef<(() => void) | undefined>(undefined);
  const cycleStartRef        = useRef<number>(0);
  const buttonEnabledRef     = useRef(false);
  const cycleTimerRef        = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockoutTimerRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const adaptiveDelayRef     = useRef(0);
  const buttonPressCountRef  = useRef(0);
  const attemptPressCountRef = useRef(0);
  const immuneRef            = useRef(true);

  const setButtonState = useCallback((enabled: boolean) => {
    buttonEnabledRef.current = enabled;
    setButtonPhase(enabled ? 'active' : 'hidden');
  }, []);

  const clearCycleTimer = () => {
    if (cycleTimerRef.current !== null) { clearTimeout(cycleTimerRef.current); cycleTimerRef.current = null; }
  };
  const clearLockoutTimer = () => {
    if (lockoutTimerRef.current !== null) { clearTimeout(lockoutTimerRef.current); lockoutTimerRef.current = null; }
  };

  const triggerSpark = useCallback(() => {
    setSparkKey(k => k + 1);
    setShowSpark(true);
    setTimeout(() => setShowSpark(false), SPARK_DURATION_MS);
  }, []);

  const animateTo = useCallback((
    target: number,
    durationMs: number,
    speedMultiplier = 1.0,
    onComplete?: () => void
  ) => {
    cancelAnimationFrame(rafRef.current);
    animStartTimeRef.current = performance.now();
    animStartPctRef.current  = progressRef.current;
    animTargetRef.current    = target;
    animDurRef.current       = durationMs * speedMultiplier;
    animCompleteRef.current  = onComplete;

    const tick = (now: number) => {
      const elapsed = now - animStartTimeRef.current;
      const t       = Math.min(elapsed / animDurRef.current, 1);
      const nextPct = animStartPctRef.current + (animTargetRef.current - animStartPctRef.current) * t;
      progressRef.current = nextPct;
      setProgress(nextPct);
      if (t < 1) { rafRef.current = requestAnimationFrame(tick); }
      else { animCompleteRef.current?.(); }
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const navigateToReveal = useCallback((immune: boolean) => {
    const elapsed = getElapsedSeconds();
    const p = buttonPressCountRef.current;
    const a = attemptPressCountRef.current;
    router.push(immune
      ? `/reveal?immune=true&t=${elapsed}&p=${p}&a=${a}`
      : `/reveal?t=${elapsed}&p=${p}&a=${a}`
    );
  }, [router]);

  const startCycle = useCallback((index: number) => {
    clearCycleTimer();
    clearLockoutTimer();

    if (index >= CYCLES.length) {
      cancelAnimationFrame(rafRef.current);
      setIsTransitioning(true);
      animateTo(100, 1200, 1.0, () => {
        const isImmune =
        buttonPressCountRef.current === 0 &&
        attemptPressCountRef.current === 0;
          getElapsedSeconds() >= IMMUNE_ELAPSED_S;
        navigateToReveal(isImmune);
      });
      return;
    }

    const cycle     = CYCLES[index];
    const duration  = cycleDurationsRef.current[index];
    const speedMult = cycleSpeedRef.current[index];

    cycleIndexRef.current = index;
    setCycleIndex(index);
    cycleStartRef.current = performance.now();

    setCopyVisible(false);
    setTimeout(() => { setDisplayCopy(cycle.copy); setCopyVisible(true); }, 200);

    if (index >= 2) setShowLossMsg(true);
    if (index === 3) { setPulsing(true); setTimeout(() => setPulsing(false), 1000); }
    if (cycle.spark) triggerSpark();

    animateTo(cycle.targetProgress, duration, speedMult);

    setButtonPhase('filling');
    buttonEnabledRef.current = false;

    lockoutTimerRef.current = setTimeout(() => {
      buttonEnabledRef.current = true;
      setButtonPhase('active');
    }, BUTTON_LOCKOUT_MS);

    cycleTimerRef.current = setTimeout(() => {
      buttonEnabledRef.current = false;
      setButtonPhase('hidden');
      startCycle(index + 1);
    }, duration * speedMult);
  }, [animateTo, triggerSpark, navigateToReveal]);

  const startPreCycle = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
    animateTo(PRE_CYCLE_TARGET, PRE_CYCLE_DURATION, 1.0, () => { startCycle(0); });
  }, [animateTo, startCycle]);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(startPreCycle, 400);
    return () => { clearTimeout(t); clearCycleTimer(); clearLockoutTimer(); cancelAnimationFrame(rafRef.current); };
  }, [startPreCycle]);

  useEffect(() => {
    if (cycleIndex < 2) return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [cycleIndex]);

  const handleContinue = () => {
    const ci = cycleIndexRef.current;

    if (!buttonEnabledRef.current) {
      attemptPressCountRef.current++;
      setButtonBuzzing(true);
      setTimeout(() => setButtonBuzzing(false), 400);
      const next = ci + 1;
      if (next < CYCLES.length) {
        cycleDurationsRef.current[next] = Math.min(cycleDurationsRef.current[next] + 2000, MAX_DURATION);
        cycleSpeedRef.current[next]     = Math.min(cycleSpeedRef.current[next] * 1.1, 2.0);
      }
      return;
    }

    clearCycleTimer();
    clearLockoutTimer();
    buttonEnabledRef.current = false;
    setButtonPhase('hidden');
    buttonPressCountRef.current++;
    immuneRef.current = false;

    const elapsedSec = (performance.now() - cycleStartRef.current) / 1000;
    const next = ci + 1;
    if (next < CYCLES.length) {
      const current = cycleDurationsRef.current[next];
      if (elapsedSec < 3)      cycleDurationsRef.current[next] = Math.min(current + 2000, MAX_DURATION);
      else if (elapsedSec > 7) cycleDurationsRef.current[next] = Math.max(current - 1000, MIN_DURATION);
    }

    startCycle(ci + 1);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4
                  transition-opacity duration-1000 ease-in-out
                  ${mounted && !isTransitioning ? "opacity-100" : "opacity-0"}`}
    >
      <div className="grain-overlay" />

      <div className="max-w-xl w-full flex flex-col items-center text-center space-y-10">

        {/* Headline */}
        <div className="h-28 flex flex-col justify-end">
          <h2
            className={`font-serif text-xl md:text-2xl tracking-tight text-primary italic
                        transition-opacity duration-300 ease-out
                        ${cycleIndex >= 0 && copyVisible ? "opacity-100" : "opacity-0"}
                        ${pulsing ? "animate-[headlinePulse_0.9s_ease-in-out_1]" : ""}`}
          >
            {displayCopy}
          </h2>
        </div>

        {/* Progress section */}
        <div className="w-full space-y-3">

          {/* Spark */}
          <div className="h-14 flex items-center justify-center">
            {showSpark && (
              <span
                key={sparkKey}
                className="text-accent animate-[sparkFloat_5000ms_ease-out_forwards]"
                style={{ fontSize: "48px", lineHeight: 1, display: "block" }}
              >
                ✦
              </span>
            )}
          </div>

          {/* Track */}
          <div
            className={`w-full h-2 rounded-full bg-accent/40 overflow-hidden
                        transition-all duration-500
                        ${isTransitioning ? "opacity-0" : "opacity-100"}`}
          >
            <div
              className="h-full bg-emerald-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loss-aversion */}
          <div className="h-5">
            <p
              className={`font-sans text-[10px] uppercase tracking-[0.15em] text-secondary
                          transition-opacity duration-1000
                          ${showLossMsg ? "opacity-40" : "opacity-0"}`}
            >
              Leaving now resets your progress.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="relative">
          <button
            onClick={handleContinue}
            className={`relative inline-flex items-center justify-center rounded-full
                       px-8 py-2.5 font-sans text-sm md:text-base
                       overflow-hidden transition-opacity duration-300 ease-out
                       ${buttonBuzzing ? "animate-[buzz_0.35s_ease-in-out]" : ""}
                       ${buttonPhase === 'hidden'  ? "opacity-0 pointer-events-none" : "opacity-100"}
                       ${buttonPhase === 'filling' ? "bg-secondary/10 text-secondary cursor-not-allowed" : "bg-primary text-background hover:bg-primary/90 transition-colors"}`}
          >
            {buttonPhase === 'filling' && (
              <span
                className="absolute inset-0 bg-primary origin-left animate-[buttonFill_5000ms_linear_forwards] pointer-events-none rounded-full"
              />
            )}
            <span className="relative z-10">Go on</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes sparkFloat {
          0%   { opacity: 1; transform: translateY(0)     scale(1);   }
          15%  { opacity: 1; transform: translateY(-6px)  scale(1.3); }
          100% { opacity: 0; transform: translateY(-20px) scale(1.1); }
        }
        @keyframes headlinePulse {
          0%, 100% { opacity: 1;    }
          40%       { opacity: 0.45; }
        }
        @keyframes buzz {
          0%   { transform: translateX(0);    }
          20%  { transform: translateX(-5px); }
          40%  { transform: translateX(5px);  }
          60%  { transform: translateX(-4px); }
          80%  { transform: translateX(4px);  }
          100% { transform: translateX(0);    }
        }
        @keyframes buttonFill {
          0%   { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}