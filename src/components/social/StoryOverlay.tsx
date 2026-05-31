"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { CdnImage } from "@/components/shared/CdnImage";
import { CdnVideo } from "@/components/shared/CdnVideo";
import { getCreatorById } from "@/data/creators";
import { getNonprofitById } from "@/data/nonprofits";
import { feedPosts, type FeedPost } from "@/data/feed";
import { getEventById } from "@/data/events";
import { X, Heart, MessageCircle, Share2, Video } from "lucide-react";
import { useRouter } from "next/navigation";

const STORY_DURATION_MS = 5000;

interface StoryOverlayProps {
  creatorId: string;
  initialIndex?: number;
  onClose: () => void;
  onJoinEvent?: (eventId: string, title: string) => void;
  onShare?: (title: string) => void;
}

export function StoryOverlay({
  creatorId,
  initialIndex = 0,
  onClose,
  onJoinEvent,
  onShare,
}: StoryOverlayProps) {
  const router = useRouter();
  const stories = useMemo(
    () =>
      feedPosts.filter(
        (p) => p.seId === creatorId && (p.type === "story" || p.type === "event_update")
      ),
    [creatorId]
  );
  const slides: FeedPost[] =
    stories.length > 0
      ? stories
      : feedPosts.filter((p) => p.seId === creatorId).slice(0, 1);

  const [index, setIndex] = useState(initialIndex);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const post = slides[index] ?? slides[0];
  const creator = getCreatorById(creatorId);
  const nonprofit = post ? getNonprofitById(post.nonprofitId) : undefined;
  const event = post?.eventId ? getEventById(post.eventId) : undefined;

  const goNext = useCallback(() => {
    if (index < slides.length - 1) setIndex((i) => i + 1);
    else onClose();
  }, [index, slides.length, onClose]);

  const goPrev = useCallback(() => {
    if (index > 0) setIndex((i) => i - 1);
  }, [index]);

  useEffect(() => {
    setProgress(0);
    if (paused || !post) return;
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / STORY_DURATION_MS);
      setProgress(p);
      if (p >= 1) {
        clearInterval(tick);
        goNext();
      }
    }, 50);
    return () => clearInterval(tick);
  }, [index, paused, post, goNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  if (!post || !creator) return null;

  const isVideo = post.mediaType === "video_thumb" && post.videoUrl;

  return (
    <div className="fixed inset-0 z-[95] flex flex-col bg-[var(--ch-navy)] text-white">
      <div className="flex gap-1 px-3 pt-3">
        {slides.map((_, i) => (
          <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30">
            <div
              className="h-full bg-white transition-all duration-75"
              style={{
                width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <CdnImage
            src={creator.avatar}
            alt=""
            width={40}
            height={40}
            className="rounded-full object-cover ring-2 ring-white/30"
            cdnOptions={{ width: 80, height: 80, fit: "cover" }}
          />
          <div className="min-w-0">
            <p className="truncate font-semibold">{creator.name}</p>
            <p className="truncate text-xs text-white/70">{creator.handle}</p>
          </div>
          {nonprofit && (
            <span className="hidden text-xs text-white/80 sm:inline">
              {nonprofit.name} ✓
            </span>
          )}
        </div>
        <button type="button" onClick={onClose} aria-label="Close story">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        className="relative mx-auto flex min-h-0 w-full max-w-3xl flex-1 flex-col px-2"
        onMouseDown={() => setPaused(true)}
        onMouseUp={() => setPaused(false)}
        onMouseLeave={() => setPaused(false)}
      >
        <button
          type="button"
          className="absolute left-0 top-0 z-10 h-full w-1/3"
          aria-label="Previous story"
          onClick={goPrev}
        />
        <button
          type="button"
          className="absolute right-0 top-0 z-10 h-full w-1/3"
          aria-label="Next story"
          onClick={goNext}
        />

        <div className="relative mx-auto aspect-[9/16] w-full max-h-[60vh] overflow-hidden rounded-2xl bg-black md:aspect-video md:max-h-none md:flex-1">
          {isVideo ? (
            <CdnVideo
              src={post.videoUrl!}
              poster={post.mediaUrl}
              className="h-full w-full object-cover"
              controls
              autoPlay
              muted
              playsInline
            />
          ) : (
            <CdnImage
              src={post.mediaUrl}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              cdnOptions={{ width: 1080, height: 1920, fit: "cover" }}
            />
          )}
          {isVideo && (
            <>
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-xs font-bold">
                <Video className="h-3.5 w-3.5" /> LIVE
              </span>
              {event && (
                <button
                  type="button"
                  onClick={() => router.push(`/events/${event.id}`)}
                  className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-[var(--ch-navy)]"
                >
                  Watch live event →
                </button>
              )}
            </>
          )}
        </div>
        <p className="mt-2 text-center text-[10px] text-white/50 md:hidden">
          Swipe up on event page for full details · Tap sides to navigate
        </p>

        <div className="relative mt-auto bg-gradient-to-t from-[var(--ch-navy)] via-[var(--ch-navy)]/90 to-transparent px-4 pb-6 pt-12">
          <p className="text-base leading-relaxed">{post.content}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="text-sm text-[var(--ch-teal-light)]">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-4">
        <div className="flex gap-4">
          <button type="button" aria-label="React" className="flex items-center gap-1">
            <Heart className="h-5 w-5" /> React
          </button>
          <button
            type="button"
            aria-label="Reply"
            className="flex items-center gap-1"
            onClick={() => setShowReply(!showReply)}
          >
            <MessageCircle className="h-5 w-5" /> Reply
          </button>
          <button
            type="button"
            aria-label="Share"
            className="flex items-center gap-1"
            onClick={() => onShare?.(event?.title ?? post.content.slice(0, 40))}
          >
            <Share2 className="h-5 w-5" /> Share
          </button>
        </div>
        {event && (
          <button
            type="button"
            onClick={() => onJoinEvent?.(event.id, event.title)}
            className="rounded-full bg-[var(--ch-teal)] px-5 py-2 text-sm font-semibold"
          >
            Join Event →
          </button>
        )}
      </div>
      {showReply && (
        <div className="border-t border-white/10 px-4 py-3">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Reply to this story..."
            className="w-full rounded-lg border-0 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50"
          />
        </div>
      )}
      {event && (
        <button
          type="button"
          onClick={() => router.push(`/events/${event.id}`)}
          className="w-full border-t border-white/10 py-3 text-center text-xs text-white/70 hover:bg-white/5"
        >
          ↑ Open full event page
        </button>
      )}
    </div>
  );
}
