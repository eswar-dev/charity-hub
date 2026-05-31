"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Challenge } from "@/data/challenges";
import {
  hasAcceptedChallenge,
  recordChallengeAccept,
} from "@/lib/guestEngagement";

export interface ChallengeCardProps {
  challenge: Challenge;
  compact?: boolean;
  onAccept?: () => void;
  onShare?: () => void;
}

export function ChallengeCard({
  challenge,
  compact = false,
  onAccept,
  onShare,
}: ChallengeCardProps) {
  const [accepted, setAccepted] = useState(false);
  const [localCount, setLocalCount] = useState(challenge.acceptedCount);

  useEffect(() => {
    setAccepted(hasAcceptedChallenge(challenge.id));
  }, [challenge.id]);

  const handleAccept = () => {
    if (!accepted) {
      recordChallengeAccept(challenge.id);
      setAccepted(true);
      setLocalCount((c) => c + 1);
    }
    onAccept?.();
  };

  return (
    <div
      className={`rounded-2xl border border-[var(--compete-purple)]/20 bg-gradient-to-br from-purple-50 to-white ${
        compact ? "p-4" : "p-5"
      }`}
    >
      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--compete-purple)]">
        ⚡ Challenge
      </p>
      <p className="mt-1 font-semibold text-[var(--ch-navy)]">{challenge.challengeTag}</p>
      <p className="mt-2 text-sm text-gray-600">{challenge.description}</p>
      <hr className="my-3 border-gray-200" />
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
        <span>
          💚 ${challenge.donationUnlocked} unlocked per acceptance
        </span>
        <span className="font-medium">{localCount} accepted</span>
        <span>👥 {challenge.friendsTagged} friends tagged</span>
        <Link
          href="/compete/leaderboard"
          className="font-medium text-[var(--compete-purple)] hover:underline"
        >
          #{challenge.leaderboardRank} on leaderboard →
        </Link>
      </div>
      {accepted && (
        <p className="mt-2 text-xs font-medium text-green-700">
          ✓ You accepted this challenge — share your moment!
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleAccept}
          disabled={accepted}
          className={`rounded-full px-4 py-2 text-xs font-semibold ${
            accepted
              ? "border border-green-200 bg-green-50 text-green-800"
              : "bg-[var(--compete-purple)] text-white"
          }`}
        >
          {accepted ? "Accepted ✓" : "Accept Challenge →"}
        </button>
        <button
          type="button"
          onClick={onShare}
          className="rounded-full border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700"
        >
          Share Challenge →
        </button>
      </div>
    </div>
  );
}
