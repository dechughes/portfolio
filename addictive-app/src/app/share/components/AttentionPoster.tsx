interface PosterProps {
  time?: string | null;
  presses?: string | null;
  attempts?: string | null;
}

export default function AttentionPoster({ time, presses, attempts }: PosterProps) {
  const t = time ?? "0";
  const p = presses ?? "0";
  const a = attempts ?? "0";

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Caught in a behavioural loop. Held for ${t}s by artificial progress, variable reward, and almost-finished bars.`;

    if (navigator.share && navigator.canShare?.({ title: "The Addictive App", text, url })) {
      try {
        await navigator.share({ title: "The Addictive App", text, url });
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        alert("Link copied to clipboard");
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-8 font-sans bg-cover bg-center transition-opacity duration-700 opacity-0 animate-[fadeIn_0.7s_ease_forwards]"
     style={{
       backgroundImage:
         "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80')",
     }}>


      {/* Poster frame */}
      <div className="relative w-full max-w-[1080px] aspect-[16/9] overflow-hidden rounded-lg">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center grayscale brightness-[0.75] contrast-[1.05]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80')",
          }}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.15)_55%,rgba(0,0,0,0.25)_100%)]" />

                {/* Foreground container with padding so the mountain shows around it */}
        <div className="relative z-10 h-full p-6">
          <div className="grid grid-cols-[28px_1fr] h-full bg-white/95 backdrop-blur-sm">

            {/* Sidebar */}
            <div className="flex items-center justify-center bg-[#2563EB]">
              <span className="vertical-label text-[8px] font-semibold tracking-[0.22em] uppercase text-white whitespace-nowrap">
                System Logic - Attention Retained
              </span>
            </div>

            {/* Main panel */}
            <div className="grid grid-rows-[auto_1fr_auto_auto]">


            {/* Top strip */}
            <div className="flex items-start justify-between px-4 pt-2">
              <span className="text-[8px] font-semibold tracking-[0.22em] uppercase text-[#2563EB]">
                The Addictive App
              </span>

              <span className="text-[8px] font-medium tracking-[0.18em] uppercase text-[#888] text-right leading-[1.6]">
                Behavioural<br />Audit<br />Vol. 24 / Seq. 012
              </span>
            </div>

            {/* Headline */}
            <div className="px-4 pt-1">
              <h1 className="font-serif font-black text-[#2563EB] uppercase leading-[0.92] tracking-[-0.02em] text-[clamp(48px,8vw,88px)]">
                I Didn't<br />Mean To<br />Stay.
              </h1>
            </div>

            {/* Mid row */}
            <div className="grid grid-cols-[160px_1fr] items-start pr-4">

              {/* Metrics */}
              <div className="bg-[#2563EB] p-4 flex flex-col justify-center">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 mb-1">
                  Session Metrics
                </div>
                <div className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white leading-[1.7]">
                  Time: {t}s
                </div>
                <div className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white leading-[1.7]">
                  Presses: {p}
                </div>
                <div className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white leading-[1.7]">
                  Attempts: {a}
                </div>
              </div>

              {/* Body copy */}
              <div className="pl-3 py-2">
                <p className="text-[10px] font-normal text-[#2a2a2a] leading-[1.7] max-w-[250px]">
                  This page used behavioural design patterns to keep you here.
                  Interfaces built on these patterns reliably extend user engagement
                  far beyond initial intent.
                </p>
              </div>
            </div>

            {/* Patterns strip */}
            <div className="flex items-center border-t border-[#d4d4d4] min-h-[22px] pr-4 py-1">
              <div className="w-[110px] shrink-0" />
              <span className="text-[8px] font-medium tracking-[0.2em] uppercase text-[#555] pl-3">
                Artificial Progress · Variable Reward · False Endings · Timed Lockouts · Escalating Punishment · Visual Urgency Cues
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-1.5 border-t border-[#d4d4d4] bg-[rgba(248,248,246,0.9)]">
              <span className="font-serif italic text-[10px] text-[#666] tracking-[0.01em]">
                "Not everything that keeps you here has your best interests in mind."
              </span>
              <span className="text-[8px] font-medium tracking-[0.15em] uppercase text-[#aaa]">
                107 / Rev-A
              </span>
            </div>

          </div>
          </div>
        </div>
      </div>

      {/* Floating action buttons */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        <button
          onClick={handleShare}
          className="px-4 py-2 rounded-full border border-white/40 text-white text-xs font-sans tracking-wide backdrop-blur-sm bg-white/10 hover:bg-white/20 transition"
        >
          Share
        </button>

        <button
          onClick={() => window.location.href = "/"}
          className="px-4 py-2 rounded-full border border-white/40 text-white text-xs font-sans tracking-wide backdrop-blur-sm bg-white/10 hover:bg-white/20 transition"
        >
          Restart
        </button>
      </div>

    </div>
  );
}
