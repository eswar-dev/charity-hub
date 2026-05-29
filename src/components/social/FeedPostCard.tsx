"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { FeedPost } from "@/data/feed";
import { getCreatorById } from "@/data/creators";
import { getNonprofitById } from "@/data/nonprofits";
import { getEventById } from "@/data/events";
import { DonationProgress } from "@/components/shared/DonationProgress";
import { useToast } from "@/context/ToastContext";

const typeBadge: Record<
  FeedPost["type"],
  { label: string; className: string }
> = {
  event_update: { label: "EVENT UPDATE", className: "bg-teal-100 text-teal-800" },
  story: { label: "STORY", className: "bg-purple-100 text-purple-800" },
  milestone: { label: "MILESTONE", className: "bg-amber-100 text-amber-800" },
  challenge: { label: "CHALLENGE", className: "bg-red-100 text-red-800" },
  impact_reveal: { label: "IMPACT REVEAL", className: "bg-green-100 text-green-800" },
  shoutout: { label: "SHOUTOUT", className: "bg-indigo-100 text-indigo-800" },
};

function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

interface FeedPostCardProps {
  post: FeedPost;
  compact?: boolean;
}

export function FeedPostCard({ post, compact = false }: FeedPostCardProps) {
  const creator = getCreatorById(post.seId);
  const nonprofit = getNonprofitById(post.nonprofitId);
  const event = post.eventId ? getEventById(post.eventId) : undefined;
  const badge = typeBadge[post.type];
  const { showToast } = useToast();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComment, setShowComment] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const contentPreview =
    post.content.length > 180 && !expanded
      ? `${post.content.slice(0, 180)}…`
      : post.content;

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm ${
        post.isFeatured
          ? "border-[var(--impact-gold)]/40 ring-1 ring-[var(--impact-gold)]/30"
          : "border-gray-100"
      } ${compact ? "text-sm" : ""}`}
    >
      {post.isFeatured && (
        <span className="absolute left-3 top-3 z-10 rounded bg-[var(--impact-gold)] px-2 py-0.5 text-[10px] font-bold text-white">
          ★ Featured
        </span>
      )}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {creator && (
            <Link href={`/creators/${creator.id}`}>
              <Image
                src={creator.avatar}
                alt=""
                width={40}
                height={40}
                className="rounded-full ring-2 ring-[var(--story-ring)]"
              />
            </Link>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/creators/${post.seId}`}
                className="font-semibold text-[var(--ch-navy)] hover:underline"
              >
                {creator?.name}
              </Link>
              <span className="text-gray-400">{creator?.handle}</span>
              <span className="text-gray-400">· {formatTime(post.timestamp)}</span>
            </div>
            {nonprofit && (
              <p className="mt-0.5 text-xs text-gray-600">
                {nonprofit.name} ✓ Verified
              </p>
            )}
            <span
              className={`mt-1 inline-block rounded px-1.5 py-0.5 text-[10px] font-bold ${badge.className}`}
            >
              {badge.label}
            </span>
          </div>
        </div>
      </div>

      <div className="relative aspect-video w-full">
        <Image
          src={post.mediaUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 65vw"
        />
        {post.isLive && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white">
            <span className="h-2 w-2 rounded-full bg-[var(--live-red)] animate-pulse-live" />
            LIVE
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <p className="text-sm leading-relaxed text-gray-800">
          {contentPreview}
          {post.content.length > 180 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="ml-1 text-[var(--ch-teal)]"
            >
              {expanded ? "less" : "more"}
            </button>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="text-xs font-medium text-[var(--ch-teal)]">
              #{t}
            </span>
          ))}
        </div>
        {event && (
          <DonationProgress raised={event.raised} goal={event.goal} daysLeft={23} />
        )}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-3">
          <div className="flex gap-4 text-sm text-gray-600">
            <button
              type="button"
              onClick={() => {
                setLiked(!liked);
                setLikes(liked ? likes - 1 : likes + 1);
              }}
              className="flex items-center gap-1 hover:text-red-500"
              aria-label="Like post"
            >
              <Heart
                className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
              {likes}
            </button>
            <button
              type="button"
              onClick={() => setShowComment(!showComment)}
              className="flex items-center gap-1 hover:text-[var(--ch-teal)]"
              aria-label="Comment"
            >
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </button>
            <button
              type="button"
              onClick={() => showToast("Link copied!", "success")}
              className="flex items-center gap-1 hover:text-[var(--ch-teal)]"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
              {post.shares}
            </button>
          </div>
          {post.eventId && (
            <Link
              href={`/events/${post.eventId}`}
              className="rounded-full bg-[var(--ch-teal)] px-4 py-2 text-xs font-medium text-white"
            >
              Join Event →
            </Link>
          )}
        </div>
        {showComment && (
          <input
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Add a comment…"
            aria-label="Comment on post"
          />
        )}
      </div>
    </article>
  );
}
