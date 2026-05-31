"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getGuestEngagementSummary, getEngagementStreak } from "@/lib/guestEngagement";
import { usePersona } from "@/context/PersonaContext";

export function GuestEngagementBanner() {
  const { persona } = usePersona();
  const [summary, setSummary] = useState({ reactionCount: 0, totalActions: 0, acceptedChallengeIds: [] as string[] });
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setSummary(getGuestEngagementSummary());
    setStreak(getEngagementStreak());
  }, []);

  if (persona !== "guest" || summary.totalActions === 0) return null;

  return (
    <div className="mb-4 rounded-xl border border-teal-100 bg-teal-50/80 px-4 py-3 text-sm text-[var(--ch-navy)]">
      <p className="font-medium">
        You&apos;ve participated in {summary.totalActions} action
        {summary.totalActions === 1 ? "" : "s"} as a guest
        {summary.reactionCount > 0 && ` (${summary.reactionCount} reactions)`}
        {summary.acceptedChallengeIds.length > 0 &&
          ` · ${summary.acceptedChallengeIds.length} challenge${summary.acceptedChallengeIds.length === 1 ? "" : "s"}`}
        .
      </p>
      {streak > 1 && (
        <p className="mt-1 text-xs text-[var(--ch-teal)]">
          🔥 {streak}-day engagement streak — keep it going!
        </p>
      )}
      <Link href="/se/onboarding?from=gate" className="mt-2 inline-block text-xs font-semibold text-[var(--ch-teal)]">
        Create free account to save your impact →
      </Link>
    </div>
  );
}
