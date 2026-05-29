"use client";

import { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { SESidebar } from "@/components/layout/SESidebar";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { FeedPostCard } from "@/components/social/FeedPostCard";
import type { FeedPost } from "@/data/feed";
import { events } from "@/data/events";

const postTypes = [
  { id: "event_update", label: "📝 Update", emoji: "📝" },
  { id: "story", label: "📖 Story", emoji: "📖" },
  { id: "milestone", label: "🏆 Milestone", emoji: "🏆" },
  { id: "challenge", label: "🎯 Challenge", emoji: "🎯" },
  { id: "shoutout", label: "⚡ Shoutout", emoji: "⚡" },
] as const;

type PostTypeId = (typeof postTypes)[number]["id"];

export default function CreateStoryPage() {
  const [type, setType] = useState<PostTypeId>("event_update");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [eventId, setEventId] = useState("evt-001");
  const [published, setPublished] = useState(false);
  const seEvents = events.filter((e) => e.seId === "se-001");

  const maxChars = type === "story" ? 600 : 280;

  const previewPost: FeedPost = {
    id: "preview",
    type,
    seId: "se-001",
    nonprofitId: "np-001",
    eventId,
    content: content || "Your post preview will appear here…",
    mediaUrl: "https://picsum.photos/seed/preview/800/500",
    mediaType: "image",
    likes: 0,
    comments: 0,
    shares: 0,
    timestamp: new Date().toISOString(),
    tags: tags.length ? tags : ["Preview"],
  };

  if (published) {
    return (
      <PortalLayout
        title="Create Story"
        roleBadge="Social Entrepreneur"
        roleColor="#7C3AED"
        sidebar={<SESidebar />}
      >
        <div className="relative mx-auto max-w-lg text-center animate-fade-up">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="confetti-dot absolute left-1/2 h-2 w-2 rounded-full"
              style={{
                background: ["#7C3AED", "#0D7377", "#F59E0B"][i % 3],
                left: `${35 + (i % 5) * 6}%`,
              }}
            />
          ))}
          <h1 className="font-display text-2xl font-semibold">Posted!</h1>
          <p className="mt-2 text-gray-600">View in Feed</p>
          <Link href="/feed" className="mt-6 inline-block rounded-full bg-purple-600 px-8 py-3 text-sm text-white">
            Go to Feed →
          </Link>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout
      title="Create Story"
      roleBadge="Social Entrepreneur"
      roleColor="#7C3AED"
      sidebar={<SESidebar />}
    >
      <PhaseBanner
        phase="2"
        message="Story content is stored locally for prototype demo. In Phase 3/SOW-2, posts are persisted and moderated."
      />
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
        <div className="max-w-xl">
          <div className="flex flex-wrap gap-2">
            {postTypes.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setType(t.id)}
                className={`rounded-full px-3 py-1.5 text-sm ${
                  type === t.id ? "bg-purple-600 text-white" : "border bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
            <label className="block text-sm">
              Linked Event
              <select
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={eventId}
                onChange={(e) => setEventId(e.target.value)}
                aria-label="Linked event"
              >
                {seEvents.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.title}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Content
              <textarea
                className="mt-1 w-full rounded-lg border px-3 py-2"
                rows={5}
                maxLength={maxChars}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening for good?"
              />
              <span className="text-xs text-gray-400">
                {content.length}/{maxChars}
              </span>
            </label>
            <button
              type="button"
              className="w-full rounded-xl border-2 border-dashed py-6 text-sm text-gray-500"
            >
              Upload media (placeholder)
            </button>
            <div>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm"
                placeholder="Add tag + Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && tagInput.trim()) {
                    e.preventDefault();
                    setTags([...tags, tagInput.trim()]);
                    setTagInput("");
                  }
                }}
                aria-label="Tags"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span key={t} className="rounded-full bg-teal-50 px-2 py-0.5 text-xs">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            {type === "challenge" && (
              <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Tag 3 friends to challenge" />
            )}
            {type === "milestone" && (
              <input type="number" className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Milestone amount reached" />
            )}
            {type === "shoutout" && (
              <input className="w-full rounded-lg border px-3 py-2 text-sm" placeholder="Who are you shouting out? @mention" />
            )}
            <button
              type="button"
              onClick={() => setPublished(true)}
              className="w-full rounded-full bg-purple-600 py-3 text-sm font-medium text-white"
            >
              Post to Feed
            </button>
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm font-medium text-gray-500">Live preview</p>
          <FeedPostCard post={previewPost} compact />
        </div>
      </div>
    </PortalLayout>
  );
}
