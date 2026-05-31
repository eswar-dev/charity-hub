"use client";

import { CdnImage } from "@/components/shared/CdnImage";
import { feedPosts } from "@/data/feed";
import { getCreatorById } from "@/data/creators";
import { getEventById } from "@/data/events";

const previewPosts = [
  feedPosts.find((p) => p.id === "post-001")!,
  feedPosts.find((p) => p.id === "post-004")!,
  feedPosts.find((p) => p.id === "post-002")!,
].filter(Boolean);

export function LandingHeroStack() {
  const top = previewPosts[0];
  const creator = top ? getCreatorById(top.seId) : undefined;
  const event = top?.eventId ? getEventById(top.eventId) : undefined;

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="animate-hero-glow absolute inset-4 rounded-3xl bg-[var(--ch-teal)]/20 blur-3xl" />
      {previewPosts.map((post, i) => (
        <div
          key={post.id}
          className="absolute left-0 right-0 rounded-2xl border bg-white p-4 shadow-xl"
          style={{
            transform: `rotate(${i === 0 ? -2 : i === 1 ? 3 : 6}deg) translateY(${i * 14}px)`,
            zIndex: 3 - i,
            opacity: i === 0 ? 1 : 0.85 - i * 0.15,
          }}
        >
          {i === 0 && (
            <>
              <div className="mb-3 flex items-center gap-2">
                {creator && (
                  <CdnImage
                    src={creator.avatar}
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                    cdnOptions={{ width: 72, height: 72, fit: "cover" }}
                  />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{creator?.name}</p>
                  <span className="flex items-center gap-1 text-xs text-[var(--live-red)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--live-red)] animate-pulse-live" />
                    LIVE
                  </span>
                </div>
              </div>
              {event && (
                <p className="mb-2 text-sm font-medium text-[var(--ch-navy)]">{event.title}</p>
              )}
              <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[var(--ch-teal)]"
                  style={{
                    width: `${Math.min(100, ((event?.participants ?? 54) / 100) * 100)}%`,
                  }}
                />
              </div>
              <p className="text-[10px] text-gray-500">
                {event?.participants ?? 54} participating · Participation
              </p>
              <p className="mt-2 text-xs text-gray-500">
                ♥ {post.likes} · 💬 {post.comments} · ↗ {post.shares}
              </p>
            </>
          )}
        </div>
      ))}
      <div className="relative aspect-[4/5] w-full" aria-hidden />
    </div>
  );
}
