"use client";

import { useEffect, useState } from "react";
import { getEngagementStreak } from "@/lib/guestEngagement";

const badges = [
  { id: "first-like", label: "First Reaction", minStreak: 1 },
  { id: "streak-3", label: "3-Day Streak", minStreak: 3 },
  { id: "community", label: "Community Voice", minStreak: 2 },
];

export function ParticipationRewards({ compact = false }: { compact?: boolean }) {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStreak(getEngagementStreak());
  }, []);

  const earned = badges.filter((b) => streak >= b.minStreak);

  if (earned.length === 0 && compact) return null;

  return (
    <div
      className={`rounded-xl border border-amber-100 bg-amber-50/60 ${compact ? "px-3 py-2" : "px-4 py-3"}`}
    >
      {!compact && (
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
          Your participation rewards
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        {earned.map((b) => (
          <span
            key={b.id}
            className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-amber-900 shadow-sm"
          >
            ✨ {b.label}
          </span>
        ))}
        {streak > 0 && (
          <span className="rounded-full bg-[var(--ch-teal)] px-2.5 py-1 text-[10px] font-medium text-white">
            🔥 {streak}d streak
          </span>
        )}
      </div>
    </div>
  );
}
