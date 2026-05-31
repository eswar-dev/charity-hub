"use client";

import { CdnImage } from "@/components/shared/CdnImage";
import { CdnVideo } from "@/components/shared/CdnVideo";
import Link from "next/link";
import { useState } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import type { FeedPost } from "@/data/feed";
import { getCreatorById } from "@/data/creators";
import { getNonprofitById } from "@/data/nonprofits";
import { getEventById } from "@/data/events";
import { ParticipationCounter } from "@/components/social/ParticipationCounter";
import { ShareSheet } from "@/components/social/ShareSheet";
import { usePersona } from "@/context/PersonaContext";
import { recordPostLike, recordPostShare } from "@/lib/guestEngagement";
import { useToast } from "@/context/ToastContext";

const typeBadge: Record<
  FeedPost["type"],
  { label: string; className: string }
> = {
  event_update: { label: "LIVE", className: "bg-red-100 text-red-800" },
  story: { label: "STORY", className: "bg-purple-100 text-purple-800" },
  milestone: { label: "MILESTONE", className: "bg-amber-100 text-amber-800" },
  challenge: { label: "CHALLENGE", className: "bg-red-100 text-red-800" },
  impact_reveal: { label: "IMPACT", className: "bg-green-100 text-green-800" },
  shoutout: { label: "SHOUTOUT", className: "bg-indigo-100 text-indigo-800" },
};

function formatTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export interface FeedPostCardProps {
  post: FeedPost;
  compact?: boolean;
  onJoinEvent?: (eventId: string, eventTitle: string) => void;
  onCommentGate?: () => void;
  onTagClick?: (tag: string) => void;
}

export function FeedPostCard({
  post,
  compact = false,
  onJoinEvent,
  onCommentGate,
  onTagClick,
}: FeedPostCardProps) {
  const creator = getCreatorById(post.seId);
  const nonprofit = getNonprofitById(post.nonprofitId);
  const event = post.eventId ? getEventById(post.eventId) : undefined;
  const badge = typeBadge[post.type];
  const { persona } = usePersona();
  const { showToast } = useToast();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentPosted, setCommentPosted] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const contentPreview =
    post.content.length > 280 && !expanded
      ? `${post.content.slice(0, 280)}…`
      : post.content;

  const handleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikes(nextLiked ? likes + 1 : likes - 1);
    if (nextLiked) {
      recordPostLike(post.id);
      if (post.type === "milestone") {
        showToast("Milestone celebrated — your reaction counts! 🎉", "success");
      }
    }
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    if (persona === "guest") {
      onCommentGate?.();
      return;
    }
    setCommentPosted(true);
    setCommentText("");
    setTimeout(() => setCommentPosted(false), 2000);
  };

  return (
    <>
      <article
        className={`relative overflow-hidden rounded-2xl border bg-white shadow-sm ${
          post.isFeatured
            ? "border-[var(--impact-gold)]/40 ring-1 ring-[var(--impact-gold)]/30"
            : "border-gray-100"
        } ${compact ? "text-sm" : ""}`}
      >
        <div className="flex items-start justify-between gap-2 p-4 pb-2">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            {creator && (
              <Link href={`/creators/${creator.id}`} className="shrink-0">
                <CdnImage
                  src={creator.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full object-cover ring-2 ring-[var(--story-ring)]"
                  cdnOptions={{ width: 80, height: 80, fit: "cover" }}
                />
              </Link>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
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
                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-600">
                  <CdnImage
                    src={nonprofit.logo}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded object-cover"
                    cdnOptions={{ width: 48, height: 48, fit: "cover" }}
                  />
                  <span>{nonprofit.name}</span>
                  <span className="text-[var(--ch-teal)]">✓ Verified</span>
                </div>
              )}
            </div>
          </div>
          <span
            className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold ${badge.className}`}
          >
            {post.isLive ? "LIVE" : badge.label}
          </span>
        </div>

        <div className="relative mx-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
          {post.mediaType === "video_thumb" && post.videoUrl ? (
            <CdnVideo
              src={post.videoUrl}
              poster={post.mediaUrl}
              className="h-full w-full object-cover"
              controls
              muted
              playsInline
            />
          ) : (
            <CdnImage
              src={post.mediaUrl}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 65vw"
              cdnOptions={{ width: 1200, height: 900, fit: "cover" }}
            />
          )}
          {post.isLive && (
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 text-xs font-bold text-white">
              <span className="h-2 w-2 rounded-full bg-[var(--live-red)] animate-pulse-live" />
              LIVE
            </span>
          )}
          {post.isFeatured && (
            <span className="absolute left-3 top-3 rounded bg-[var(--impact-gold)] px-2 py-0.5 text-[10px] font-bold text-white">
              ★ Featured
            </span>
          )}
        </div>

        <div className="space-y-3 p-4">
          <p className="text-[15px] leading-relaxed text-gray-800">
            {contentPreview}
            {post.content.length > 280 && (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="ml-1 text-[var(--ch-teal)]"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTagClick?.(t)}
                className="text-xs font-medium text-[var(--ch-teal)] hover:underline"
              >
                #{t}
              </button>
            ))}
          </div>

          {event && (
            <div className="rounded-xl bg-[var(--ch-cream)] p-4">
              <ParticipationCounter
                participantCount={event.participants || Math.max(12, Math.floor(event.raised / 150))}
                goalCount={100}
                label="participating"
                size="sm"
                raisedAmount={event.raised}
                raisedGoal={event.goal}
              />
              <button
                type="button"
                onClick={() => onJoinEvent?.(event.id, event.title)}
                className="mt-3 w-full rounded-full bg-[var(--ch-teal)] py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Join This Event →
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t px-4 py-3 text-sm text-gray-600">
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={handleLike}
              className={`flex items-center gap-1 transition-transform active:scale-110 ${
                liked ? "text-red-500" : "hover:text-red-500"
              }`}
              aria-label="Like post"
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
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
              onClick={() => {
                recordPostShare(post.id);
                setShareOpen(true);
              }}
              className="flex items-center gap-1 hover:text-[var(--ch-teal)]"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4" />
              {post.shares}
            </button>
          </div>
          <button type="button" className="text-gray-400" aria-label="More options">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            showComment ? "max-h-40 border-t" : "max-h-0"
          }`}
        >
          <div className="space-y-2 p-4">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Share your reaction..."
              aria-label="Comment on post"
            />
            {persona === "guest" && (
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200">
                  ?
                </span>
                <span className="flex-1">Join to comment and participate</span>
                <button
                  type="button"
                  onClick={onCommentGate}
                  className="rounded-full bg-[var(--ch-teal)] px-3 py-1 text-xs font-medium text-white"
                >
                  Join
                </button>
              </div>
            )}
            {commentPosted && (
              <p className="text-xs font-medium text-green-600">✓ Comment posted</p>
            )}
          </div>
        </div>
      </article>

      <ShareSheet
        open={shareOpen}
        title={event?.title ?? creator?.name ?? "Charity Hub"}
        onClose={() => setShareOpen(false)}
      />
    </>
  );
}
