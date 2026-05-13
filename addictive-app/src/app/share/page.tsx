'use client';

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AttentionPoster from "@/src/app/share/components/AttentionPoster";

function ShareContent() {
  const params = useSearchParams();

  const t = params.get("t");
  const p = params.get("p");
  const a = params.get("a");

  return (
    <AttentionPoster
      time={t}
      presses={p}
      attempts={a}
    />
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ShareContent />
    </Suspense>
  );
}
