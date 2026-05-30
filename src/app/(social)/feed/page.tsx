"use client";

import { CdnImage } from "@/components/shared/CdnImage";
import Link from "next/link";
import { useMemo, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { FeedPostCard } from "@/components/social/FeedPostCard";
import { feedPosts, type FeedPost, type FeedPostType } from "@/data/feed";
import { creators } from "@/data/creators";
import { usePersona } from "@/context/PersonaContext";
import { X } from "lucide-react";

const tabs: { id: string; label: string; types?: FeedPostType[] }[] = [
  { id: "all", label: "All" },
  { id: "events", label: "Events", types: ["event_update"] },
  { id: "stories", label: "Stories", types: ["story"] },
  { id: "milestones", label: "Milestones", types: ["milestone"] },
  { id: "challenges", label: "Challenges", types: ["challenge"] },
  { id: "impact", label: "Impact", types: ["impact_reveal", "shoutout"] },
];

export default function FeedPage() {
  const [tab, setTab] = useState("all");
  const [storyOpen, setStoryOpen] = useState<typeof creators[0] | null>(null);
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const { persona } = usePersona();

  const filtered = useMemo(() => {
    const t = tabs.find((x) => x.id === tab);
    if (!t?.types) return feedPosts;
    return feedPosts.filter((p) => t.types?.includes(p.type));
  }, [tab]);

  const topCreators = [...creators].sort((a, b) => b.impactScore - a.impactScore).slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--feed-bg)]">
      <TopBar title="Feed" breadcrumbs={["Social", "Feed"]} />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
        <div className="min-w-0 flex-1 lg:w-[65%]">
          <div className="mb-4 overflow-x-auto pb-2">
            <div className="flex gap-4">
              {persona === "se" && (
                <Link
                  href="/se/create-story"
                  className="flex shrink-0 flex-col items-center gap-1"
                >
                  <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-dashed border-[var(--story-ring)] bg-white text-2xl text-[var(--ch-teal)]">
                    +
                  </div>
                  <span className="max-w-[72px] truncate text-center text-[10px] font-medium">
                    Create Story
                  </span>
                </Link>
              )}
              {creators.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setStoryOpen(c)}
                  className="flex shrink-0 flex-col items-center gap-1"
                  aria-label={`View story from ${c.name}`}
                >
                  <div className="rounded-full p-[3px] ring-2 ring-[var(--story-ring)]">
                    <CdnImage
                      src={c.avatar}
                      alt=""
                      width={72}
                      height={72}
                      className="rounded-full"
                      cdnOptions={{ width: 144, height: 144, fit: "cover" }}
                    />
                  </div>
                  <span className="max-w-[72px] truncate text-center text-[10px]">
                    {i === 0 ? (
                      <span className="flex items-center justify-center gap-0.5 text-[var(--live-red)]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--live-red)] animate-pulse-live" />
                        Live Now
                      </span>
                    ) : i === 1 ? (
                      <span className="text-[var(--ch-teal)]">New</span>
                    ) : (
                      c.name.split(" ")[0]
                    )}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="sticky top-16 z-20 -mx-4 mb-4 flex gap-1 overflow-x-auto border-b border-gray-200 bg-[var(--feed-bg)] px-4 py-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`shrink-0 px-4 py-2 text-sm ${
                  tab === t.id
                    ? "border-b-2 border-[var(--ch-teal)] font-bold text-[var(--ch-teal)]"
                    : "text-gray-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {filtered.map((post: FeedPost) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        <aside className="space-y-6 lg:w-[35%]">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[var(--ch-navy)]">⚡ How Charity Hub is Different</h3>
            <p className="mt-3 text-sm text-gray-600">
              Other platforms optimize for: 👁 Engagement · 📺 Watch Time · 🔁 Saves
            </p>
            <p className="mt-2 text-sm text-gray-600">
              We optimize for: 🌱 Participation · ✅ Quality · 🛡 Trust · 📊 Outcomes · 🏘 Community
            </p>
            <p className="mt-3 text-sm italic text-gray-500">
              The algorithm&apos;s job is to amplify what creates the most good.
            </p>
            <Link
              href="/about/mental-model"
              className="mt-4 inline-block text-sm font-medium text-[var(--ch-teal)]"
            >
              See Full Comparison →
            </Link>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 font-semibold">Top Impact Creators</h3>
            {topCreators.map((c) => (
              <div key={c.id} className="mb-4 flex items-center gap-3 last:mb-0">
                <CdnImage src={c.avatar} alt="" width={40} height={40} className="rounded-full" cdnOptions={{ width: 80, height: 80 }} />
                <div className="min-w-0 flex-1">
                  <Link href={`/creators/${c.id}`} className="text-sm font-medium hover:underline">
                    {c.name}
                  </Link>
                  <p className="text-xs text-gray-500">{c.handle}</p>
                  <p className="font-impact text-sm text-[var(--impact-gold)]" style={{ fontFamily: "var(--font-impact)" }}>
                    {c.impactScore.toLocaleString()} ↑
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFollowed((f) => ({ ...f, [c.id]: !f[c.id] }))
                  }
                  className={`rounded-full px-3 py-1 text-xs ${
                    followed[c.id]
                      ? "bg-gray-100 text-gray-600"
                      : "bg-[var(--ch-teal)] text-white"
                  }`}
                >
                  {followed[c.id] ? "Following" : "Follow"}
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-semibold">Trending Causes</h3>
            {[
              ["#KnockoutALS", 847],
              ["#GreenCity", 631],
              ["#BackToSchool", 412],
              ["#EducationForAll", 298],
              ["#CompetitionForGood", 189],
            ].map(([tag, count]) => (
              <p key={tag as string} className="flex justify-between py-1 text-sm">
                <span className="text-[var(--ch-teal)]">{tag as string}</span>
                <span className="text-gray-500">{count as number} posts</span>
              </p>
            ))}
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-3 font-semibold">Upcoming Live Events</h3>
            {[
              { title: "Knockout ALS Boxing Night", np: "GreenPath", days: 17 },
              { title: "Green City Cleanup", np: "GreenPath", days: 4 },
            ].map((e) => (
              <div key={e.title} className="mb-3 rounded-xl bg-gray-50 p-3 last:mb-0">
                <p className="text-sm font-medium">{e.title}</p>
                <p className="text-xs text-gray-500">{e.np} · {e.days}d countdown</p>
                <button type="button" className="mt-2 text-xs font-medium text-[var(--ch-teal)]">
                  Set Reminder
                </button>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {storyOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/95 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <CdnImage src={storyOpen.avatar} alt="" width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-semibold">{storyOpen.name}</p>
                <p className="text-sm opacity-70">{storyOpen.handle}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStoryOpen(null)}
              aria-label="Close story"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <p className="mt-8 max-w-lg text-lg leading-relaxed">{storyOpen.bio}</p>
          <Link
            href={`/events/evt-001`}
            className="mt-auto rounded-full bg-[var(--ch-teal)] px-6 py-3 text-center text-sm font-medium"
          >
            View linked event →
          </Link>
        </div>
      )}
    </div>
  );
}
