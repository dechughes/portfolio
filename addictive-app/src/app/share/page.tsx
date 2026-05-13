'use client';

import { useSearchParams } from "next/navigation";
import AttentionPoster from "@/src/app/share/components/AttentionPoster";

export default function Page() {
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
