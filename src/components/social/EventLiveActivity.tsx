"use client";

import { useEffect, useState } from "react";
import { CdnImage } from "@/components/shared/CdnImage";

const defaultLines = [
  { avatar: "donations/maria", text: "@SarahK just joined", time: "now" },
  { avatar: "donations/james", text: "@TomW shared this event", time: "1m ago" },
  { avatar: "donations/elena", text: '@MikeD: "Let\'s go!"', time: "2m ago" },
  { avatar: "donations/tyler", text: "@JenL accepted the challenge", time: "4m ago" },
];

export function EventLiveActivity({ eventTitle }: { eventId: string; eventTitle: string }) {
  const [index, setIndex] = useState(0);
  const lines = defaultLines.map((l) => ({
    ...l,
    text: l.text.includes("joined") ? `${l.text} · ${eventTitle}` : l.text,
  }));

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % lines.length), 3500);
    return () => clearInterval(id);
  }, [lines.length]);

  const item = lines[index];

  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/80 px-4 py-2.5">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--live-red)] opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--live-red)]" />
      </span>
      <span className="text-xs font-bold uppercase tracking-wide text-[var(--live-red)]">
        Live activity
      </span>
      <CdnImage
        src={item.avatar}
        alt=""
        width={28}
        height={28}
        className="ml-auto rounded-full object-cover"
        cdnOptions={{ width: 56, height: 56, fit: "cover" }}
      />
      <p className="min-w-0 flex-1 truncate text-sm text-gray-800">{item.text}</p>
      <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
    </div>
  );
}
