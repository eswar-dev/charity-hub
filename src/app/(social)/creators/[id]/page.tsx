"use client";

import { CdnImage } from "@/components/shared/CdnImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { getCreatorById } from "@/data/creators";
import { getPostsBySeId } from "@/data/feed";
import { events } from "@/data/events";
import { getNonprofitById } from "@/data/nonprofits";
import { FeedPostCard } from "@/components/social/FeedPostCard";
import { ImpactScoreMeter } from "@/components/social/ImpactScoreMeter";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function CreatorProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const creator = getCreatorById(params.id);
  const [tab, setTab] = useState<"posts" | "events" | "impact" | "about">("posts");
  const [following, setFollowing] = useState(false);

  if (!creator) notFound();

  const posts = getPostsBySeId(creator.id);
  const creatorEvents = events.filter((e) => e.seId === creator.id);
  const np = getNonprofitById(creator.linkedNonprofitIds[0] ?? "");
  const timeline = [
    { date: "Sep 2025", text: "Joined Charity Hub" },
    { date: "Oct 2025", text: "First Event Created" },
    { date: "Nov 2025", text: "$5,000 milestone reached" },
    { date: "Jan 2026", text: "100 Participants badge earned" },
    { date: "Apr 2026", text: `$${Math.floor(creator.totalRaised / 2).toLocaleString()} total raised` },
    { date: "May 2026", text: "Top Creator badge earned" },
  ];
  const tabCounts = {
    posts: posts.length,
    events: creatorEvents.length,
    impact: timeline.length,
    about: 1,
  };
  const tabs = [
    { id: "posts" as const, label: "Posts" },
    { id: "events" as const, label: "Events" },
    { id: "impact" as const, label: "Impact" },
    { id: "about" as const, label: "About" },
  ] as const;

  const monthlyImpact = Math.round(creator.impactScore * 0.12);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ch-follow-creators");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      setFollowing(ids.includes(creator.id));
    } catch {
      /* ignore */
    }
  }, [creator.id]);

  const toggleFollow = () => {
    try {
      const raw = localStorage.getItem("ch-follow-creators");
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const next = following
        ? ids.filter((id) => id !== creator.id)
        : [...ids.filter((id) => id !== creator.id), creator.id];
      localStorage.setItem("ch-follow-creators", JSON.stringify(next));
      setFollowing(!following);
    } catch {
      setFollowing(!following);
    }
  };

  const monthlyBars = [40, 55, 70, 65, 90, 100];

  return (
    <div className="min-h-screen bg-[var(--feed-bg)]">
      <TopBar title={creator.name} breadcrumbs={["Creators", creator.name]} />

      <div className="relative h-40 shrink-0 overflow-hidden bg-[var(--ch-navy)] sm:h-48 md:h-52">
        <CdnImage
          src={creator.bannerKey}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          cdnOptions={{ width: 1200, height: 400, fit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        <div className="relative -mt-14 sm:-mt-16 md:-mt-[4.5rem]">
          <div className="rounded-2xl border border-gray-100 bg-white p-4 pb-5 pt-24 shadow-sm sm:p-6 sm:pb-6 md:pt-6">
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 md:left-6 md:translate-x-0">
              <CdnImage
                src={creator.avatar}
                cdnOptions={{ width: 240, height: 240, fit: "cover" }}
                alt=""
                width={112}
                height={112}
                className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg md:h-32 md:w-32"
              />
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0 text-center md:pl-36 md:text-left">
                <h1 className="font-display text-2xl font-semibold text-[var(--ch-navy)] sm:text-3xl">
                  {creator.name}
                </h1>
                <p className="text-gray-500">{creator.handle}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {creator.badges.map((b) => (
                    <span
                      key={b}
                      className="rounded-full bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-800"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden shrink-0 md:block md:pt-1">
                <ImpactScoreMeter
                  score={creator.impactScore}
                  percentile="Top 5% of Social Entrepreneurs on Charity Hub"
                />
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="text-sm text-gray-600">
                {creator.eventsCreated} Events · {creator.totalParticipants} Participants ·
                Impact Score: {creator.impactScore.toLocaleString()} · $
                {creator.totalRaised.toLocaleString()} raised
              </p>
              <p className="mt-2 text-sm font-medium text-[var(--ch-teal)]">
                +{monthlyImpact.toLocaleString()} impact this month
              </p>
              <p className="mt-4 max-w-2xl text-gray-700">{creator.bio}</p>
              {np && (
                <Link
                  href="/nonprofit/launchpad"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--ch-teal)]"
                >
                  <CdnImage
                    src={np.logo}
                    alt=""
                    width={24}
                    height={24}
                    className="rounded object-cover"
                    cdnOptions={{ width: 48, height: 48, fit: "cover" }}
                  />
                  {np.name} ✓
                </Link>
              )}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={toggleFollow}
                  className={`rounded-full px-6 py-2.5 text-sm font-medium ${
                    following ? "border bg-white" : "bg-[var(--ch-teal)] text-white"
                  }`}
                >
                  {following ? "Following" : "Follow"}
                </button>
                <button type="button" className="rounded-full border bg-white px-6 py-2.5 text-sm">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 md:hidden">
          <ImpactScoreMeter
            score={creator.impactScore}
            percentile="Top 5% of Social Entrepreneurs on Charity Hub"
          />
        </div>

        <div className="mt-8 flex gap-6 border-b border-gray-200 bg-[var(--feed-bg)]">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`pb-3 text-sm font-medium ${
                tab === t.id
                  ? "border-b-2 border-[var(--ch-teal)] text-[var(--ch-teal)]"
                  : "text-gray-500"
              }`}
            >
              {t.label}
              <span className="ml-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600">
                {tabCounts[t.id]}
              </span>
            </button>
          ))}
        </div>

        <div className="pb-12 pt-8">
          {tab === "posts" && (
            <div className="space-y-6">
              {posts.length > 0 ? (
                posts.map((p) => <FeedPostCard key={p.id} post={p} />)
              ) : (
                <p className="text-gray-500">No posts yet.</p>
              )}
            </div>
          )}
          {tab === "events" && (
            <ul className="space-y-3">
              {creatorEvents.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/events/${e.id}`}
                    className="flex items-center justify-between rounded-xl border bg-white p-4"
                  >
                    <span className="font-medium">{e.title}</span>
                    <StatusBadge status={e.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {tab === "impact" && (
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-semibold">Impact Timeline</h3>
                <ul className="mt-4 space-y-4 border-l-2 border-[var(--ch-teal)] pl-4">
                  {timeline.map((t) => (
                    <li key={t.date}>
                      <p className="text-xs text-gray-500">{t.date}</p>
                      <p className="text-sm">{t.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold">Monthly donations raised</h3>
                <div className="mt-4 flex h-40 items-end gap-2">
                  {monthlyBars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-[var(--ch-teal)]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          {tab === "about" && (
            <div className="max-w-xl space-y-4">
              <p>{creator.bio}</p>
              <p>
                <strong>Causes:</strong> {creator.causeCategories.join(", ")}
              </p>
              <p>
                <strong>Joined:</strong> {creator.joinedDate}
              </p>
              <h3 className="font-semibold">Why I do this</h3>
              <p className="text-gray-600">
                I believe participation should create measurable good — not just likes.
                Charity Hub gives me the tools to turn community energy into real outcomes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
