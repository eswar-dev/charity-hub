"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { Video } from "lucide-react";
import { TopBar } from "@/components/layout/TopBar";
import { CdnImage } from "@/components/shared/CdnImage";
import { FeedPostCard } from "@/components/social/FeedPostCard";
import { ImpactMomentCard } from "@/components/social/ImpactMomentCard";
import { StoryOverlay } from "@/components/social/StoryOverlay";
import { ChallengeCard } from "@/components/social/ChallengeCard";
import { AlgorithmBadge } from "@/components/social/AlgorithmBadge";
import { ShareSheet } from "@/components/social/ShareSheet";
import { GuestEngagementBanner } from "@/components/social/GuestEngagementBanner";
import { ParticipationRewards } from "@/components/social/ParticipationRewards";
import { useIdentityGate } from "@/hooks/useIdentityGate";
import { feedTabHints } from "@/lib/feedTabs";
import { feedPosts, type FeedPost } from "@/data/feed";
import { creators } from "@/data/creators";
import { activeChallenges } from "@/data/challenges";
import { usePersona } from "@/context/PersonaContext";
import { socialEntrepreneurs } from "@/data/users";

const feedTabs = [
  { id: "all", label: "✦ For You" },
  { id: "trending", label: "🔥 Trending" },
  { id: "live", label: "⚡ Live Now" },
  { id: "stories", label: "★ Stories" },
  { id: "milestones", label: "🏆 Milestones" },
  { id: "impact", label: "🌱 Impact" },
];

const liveTicker = [
  { text: "Alex Rivera just posted a story about Knockout ALS", time: "2m ago" },
  { text: "32 people joined Green City Cleanup in the last hour", time: "1h ago" },
  { text: "Jordan Kim hit a milestone: 100 backpacks filled 🎒", time: "3h ago" },
  { text: "New challenge started: #GreenCityChallenge — 12 accepted", time: "4h ago" },
  { text: "GreenPath Foundation just published a new event", time: "5h ago" },
  { text: "5 people shared the Knockout ALS page in the last 10 mins", time: "10m ago" },
];

const storyBubbles = [
  ...creators.map((c, i) => ({
    id: c.id,
    name: i === 0 ? "Live Now" : i === 1 ? "New" : c.name.split(" ")[0],
    avatar: c.avatar,
    isLive: i === 0,
    isNew: i === 1,
    hasVideo: i === 0,
    seen: i > 2,
  })),
  { id: "se-001b", name: "Alex", avatar: "creators/se-001/avatar", seen: true, hasVideo: false, isLive: false, isNew: false },
  { id: "se-002b", name: "Jordan", avatar: "creators/se-002/avatar", seen: true, hasVideo: false, isLive: false, isNew: false },
  { id: "np-1", name: "GreenPath", avatar: "nonprofits/np-001/logo", seen: true, hasVideo: false, isLive: false, isNew: false },
  { id: "np-2", name: "Bright", avatar: "nonprofits/np-002/logo", seen: true, hasVideo: false, isLive: false, isNew: false },
  { id: "feed-1", name: "Stories", avatar: "feed/post-004", seen: true, hasVideo: false, isLive: false, isNew: false },
  { id: "feed-2", name: "Impact", avatar: "feed/post-005", seen: true, hasVideo: false, isLive: false, isNew: false },
].slice(0, 10);

function StoryRingBubble({
  bubble,
  onClick,
}: {
  bubble: (typeof storyBubbles)[0];
  onClick: () => void;
}) {
  const ringClass = bubble.isNew
    ? "bg-[var(--story-ring)]"
    : bubble.seen
      ? "bg-gray-300"
      : "bg-[var(--story-ring)]";

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-[72px] shrink-0 flex-col items-center gap-1.5"
      aria-label={`View story from ${bubble.name}`}
    >
      <div className={`relative h-[72px] w-[72px] rounded-full p-[3px] ${ringClass}`}>
        <div className="relative h-full w-full overflow-hidden rounded-full bg-gray-100">
          <CdnImage
            src={bubble.avatar}
            alt=""
            fill
            className="object-cover"
            sizes="72px"
            cdnOptions={{ width: 144, height: 144, fit: "cover" }}
          />
        </div>
        {bubble.hasVideo && (
          <Video className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded bg-black/60 p-0.5 text-white" />
        )}
      </div>
      <span
        className={`w-full truncate text-center text-[10px] leading-tight ${
          bubble.isLive ? "font-medium text-[var(--live-red)]" : bubble.isNew ? "font-medium text-[var(--ch-teal)]" : "text-gray-700"
        }`}
      >
        {bubble.isLive && (
          <span className="inline-flex items-center justify-center gap-0.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--live-red)] animate-pulse-live" />
            Live Now
          </span>
        )}
        {!bubble.isLive && bubble.name}
      </span>
    </button>
  );
}

export default function FeedPage() {
  const [tab, setTab] = useState("all");
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const [storyCreatorId, setStoryCreatorId] = useState<string | null>(null);
  const { openGate, GateModal } = useIdentityGate("/feed");
  const [shareOpen, setShareOpen] = useState(false);
  const [shareTitle, setShareTitle] = useState("");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const { persona } = usePersona();

  const alex = socialEntrepreneurs[0];

  useEffect(() => {
    const id = setInterval(() => {
      setTickerIndex((i) => (i + 1) % liveTicker.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(() => {
    let list = [...feedPosts];
    if (tagFilter) {
      list = list.filter((p) => p.tags.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase())));
    }
    switch (tab) {
      case "live":
        return list.filter((p) => p.isLive);
      case "stories":
        return list.filter((p) => p.type === "story");
      case "milestones":
        return list.filter((p) => p.type === "milestone");
      case "impact":
        return list.filter((p) => p.type === "impact_reveal" || p.type === "shoutout");
      case "trending":
        return [...list].sort((a, b) => b.likes - a.likes);
      default:
        return list;
    }
  }, [tab, tagFilter]);

  const openJoinGate = (title: string, eventId?: string) => {
    openGate({
      action: "join",
      eventTitle: title,
      returnPath: eventId ? `/events/${eventId}` : "/feed",
    });
  };

  return (
    <div className="min-h-screen bg-[var(--feed-bg)]">
      <TopBar title="Feed" breadcrumbs={["Social", "Feed"]} />

      <div className="border-b border-gray-200 bg-white px-4 py-2.5 text-sm">
        {persona === "se" ? (
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <span>
              Welcome back, <strong>{alex.name}</strong> 👋
            </span>
            <Link
              href="/se/create-story"
              className="shrink-0 rounded-full bg-[var(--ch-teal)] px-4 py-1.5 text-xs font-semibold text-white"
            >
              + Create Story
            </Link>
          </div>
        ) : (
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
            <span className="text-gray-600">
              You&apos;re exploring anonymously. Join to participate fully.
            </span>
            <button
              type="button"
              onClick={() => openGate({ action: "join", returnPath: "/feed" })}
              className="shrink-0 rounded-full bg-[var(--ch-teal)] px-4 py-1.5 text-xs font-semibold text-white"
            >
              Join
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <div className="min-w-0 flex-1 lg:w-[65%]">
          <div className="sticky top-[7.5rem] z-20 -mx-4 mb-4 overflow-x-auto border-b border-gray-200/80 bg-[var(--feed-bg)] px-4 pb-3 pt-1">
            <div className="flex gap-4">
              {persona === "se" && (
                <Link
                  href="/se/create-story"
                  className="flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                >
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-[var(--story-ring)] bg-white text-2xl text-[var(--ch-teal)]">
                    +
                  </div>
                  <span className="w-full truncate text-center text-[10px] font-medium">
                    Your Story
                  </span>
                </Link>
              )}
              {storyBubbles.map((b) => (
                <StoryRingBubble
                  key={b.id}
                  bubble={b}
                  onClick={() => setStoryCreatorId(creators.find((c) => c.id === b.id || c.avatar === b.avatar)?.id ?? "se-001")}
                />
              ))}
            </div>
          </div>

          <div className="sticky top-[13.5rem] z-20 -mx-4 mb-4 flex gap-1 overflow-x-auto border-b border-gray-200 bg-[var(--feed-bg)] px-4 py-2">
            {feedTabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTab(t.id);
                  setTagFilter(null);
                }}
                className={`shrink-0 px-3 py-2 text-sm whitespace-nowrap ${
                  tab === t.id
                    ? "border-b-2 border-[var(--ch-teal)] font-bold text-[var(--ch-teal)]"
                    : "text-gray-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tagFilter && (
            <p className="mb-4 text-sm text-gray-600">
              Filtering by #{tagFilter}{" "}
              <button type="button" className="text-[var(--ch-teal)]" onClick={() => setTagFilter(null)}>
                Clear
              </button>
            </p>
          )}

          <p className="mb-3 text-xs text-gray-500">
            {feedTabHints[tab]}{" "}
            <Link href="/about/mental-model" className="text-[var(--ch-teal)] hover:underline">
              How ranking works →
            </Link>
          </p>
          <GuestEngagementBanner />
          <ParticipationRewards compact />

          <div className="space-y-6">
            {filtered.map((post: FeedPost) =>
              post.type === "impact_reveal" ? (
                <ImpactMomentCard
                  key={post.id}
                  post={post}
                  onJoinEvent={() => openJoinGate("Impact Event")}
                />
              ) : (
                <FeedPostCard
                  key={post.id}
                  post={post}
                  onJoinEvent={(eventId, title) => openJoinGate(title, eventId)}
                  onCommentGate={() => openGate({ action: "comment", returnPath: "/feed" })}
                  onTagClick={setTagFilter}
                />
              )
            )}
          </div>
        </div>

        <aside className="space-y-6 lg:w-[35%]">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[var(--ch-navy)]">⚡ Live on Charity Hub</h3>
            <p className="mt-3 text-sm text-gray-700 transition-opacity">
              {liveTicker[tickerIndex].text}
            </p>
            <p className="mt-1 text-xs text-gray-400">{liveTicker[tickerIndex].time}</p>
            {persona === "guest" && (
              <div className="mt-4 rounded-xl bg-teal-50 p-4">
                <p className="text-sm font-medium text-[var(--ch-navy)]">
                  Join 2,847 people participating this month
                </p>
                <button
                  type="button"
                  onClick={() => openGate({ action: "join", returnPath: "/feed" })}
                  className="mt-2 text-sm font-semibold text-[var(--ch-teal)]"
                >
                  Create free account →
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[var(--compete-purple)]">Competition For Good</h3>
            <p className="mt-1 text-xs text-gray-500">Join a Challenge</p>
            <div className="mt-4 space-y-4">
              {activeChallenges.map((ch) => (
                <ChallengeCard
                  key={ch.id}
                  challenge={ch}
                  compact
                  onAccept={() => openJoinGate(ch.challengeTag)}
                  onShare={() => {
                    setShareTitle(ch.challengeTag);
                    setShareOpen(true);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">Causes gaining momentum</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {["Environment", "Education", "Health", "Arts"].map((c) => (
                <li key={c}>
                  <Link href={`/explore?cause=${c}`} className="text-[var(--ch-teal)] hover:underline">
                    {c} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <AlgorithmBadge />

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold">Top Impact Creators</h3>
            <div className="space-y-3">
              {[...creators]
                .sort((a, b) => b.impactScore - a.impactScore)
                .slice(0, 3)
                .map((c) => (
                  <Link
                    key={c.id}
                    href={`/creators/${c.id}`}
                    className="flex items-center gap-3 rounded-xl p-2 hover:bg-gray-50"
                  >
                    <CdnImage
                      src={c.avatar}
                      alt=""
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                      cdnOptions={{ width: 80, height: 80, fit: "cover" }}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <p
                        className="text-sm text-[var(--impact-gold)]"
                        style={{ fontFamily: "var(--font-impact)" }}
                      >
                        {c.impactScore.toLocaleString()} ↑
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setFollowed((f) => ({ ...f, [c.id]: !f[c.id] }));
                      }}
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                        followed[c.id]
                          ? "border border-gray-300 text-gray-600"
                          : "bg-[var(--ch-teal)] text-white"
                      }`}
                    >
                      {followed[c.id] ? "Following" : "Follow"}
                    </button>
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </div>

      {storyCreatorId && (
        <StoryOverlay
          creatorId={storyCreatorId}
          onClose={() => setStoryCreatorId(null)}
          onJoinEvent={(id, title) => {
            setStoryCreatorId(null);
            openJoinGate(title);
          }}
          onShare={(title) => {
            setShareTitle(title);
            setShareOpen(true);
          }}
        />
      )}

      {GateModal}

      <ShareSheet open={shareOpen} title={shareTitle} onClose={() => setShareOpen(false)} />
    </div>
  );
}
