'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setStartTime } from "@/src/lib/startTime";

export default function Home() {
  const router = useRouter();
  const [buttonVisible, setButtonVisible] = useState(false);
  const [pretension, setPretension]       = useState(false);
  const [isStarting, setIsStarting]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setButtonVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!buttonVisible) return;
    const t = setTimeout(() => setPretension(true), 500);
    return () => clearTimeout(t);
  }, [buttonVisible]);

  const handleBegin = () => {
    if (isStarting) return;
    setStartTime(Date.now());
    setIsStarting(true);
    setTimeout(() => router.push("/loop"), 300);
  };

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden">
      <div className="grain-overlay" />

      <div className="w-full max-w-[480px] flex flex-col items-center text-center space-y-20 z-10">
        <h1 className="font-serif text-[2.75rem] md:text-[3.5rem] leading-[1.1] text-primary tracking-tight">
          Give this a moment.
        </h1>

        <button
          onClick={handleBegin}
          className={`px-12 py-4 bg-primary text-background text-[11px] uppercase tracking-[0.25em] font-bold
                     hover:opacity-90 active:scale-[0.98]
                     ${buttonVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
                     ${pretension && !isStarting ? "animate-[pretensionShrink_3.5s_ease-in-out_forwards]" : ""}
                     ${isStarting ? "scale-[0.85] opacity-25 transition-all duration-300 ease-out" : ""}`}
        >
          Begin
        </button>
      </div>

      <style>{`
        @keyframes pretensionShrink {
          0%   { transform: scale(1.25); opacity: 0.7; }
          100% { transform: scale(1.0);  opacity: 1;   }
        }
      `}</style>
    </main>
  );
}