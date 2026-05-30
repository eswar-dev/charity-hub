"use client";

import { CdnImage } from "@/components/shared/CdnImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
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
  const tabs = [
    { id: "posts" as const, label: "Posts" },
    { id: "events" as const, label: "Events" },
    { id: "impact" as const, label: "Impact" },
    { id: "about" as const, label: "About" },
  ];

  const timeline = [
    { date: "Sep 2025", text: "Joined Charity Hub" },
    { date: "Oct 2025", text: "First Event Created" },
    { date: "Nov 2025", text: "$5,000 milestone reached" },
    { date: "Jan 2026", text: "100 Participants badge earned" },
    { date: "Apr 2026", text: `$${Math.floor(creator.totalRaised / 2).toLocaleString()} total raised` },
    { date: "May 2026", text: "Top Creator badge earned" },
  ];

  const monthlyBars = [40, 55, 70, 65, 90, 100];

  return (
    <div className="min-h-screen bg-[var(--feed-bg)]">
      <TopBar title={creator.name} breadcrumbs={["Creators", creator.name]} />
      <div className="relative h-48 bg-gradient-to-r from-[var(--ch-navy)] to-[var(--ch-teal)] md:h-56">
        <CdnImage
          src={creator.bannerKey}
          alt=""
          fill
          className="object-cover opacity-60"
          cdnOptions={{ width: 1200, height: 300, fit: "cover" }}
        />
      </div>
      <div className="mx-auto max-w-4xl px-4 pb-12">
        <div className="-mt-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex gap-4">
            <CdnImage
              src={creator.avatar}
              cdnOptions={{ width: 240, height: 240, fit: "cover" }}
              alt=""
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-lg"
            />
            <div className="pt-14 md:pt-16">
              <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
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
          </div>
          <div className="hidden md:block">
            <ImpactScoreMeter
              score={creator.impactScore}
              percentile="Top 5% of Social Entrepreneurs on Charity Hub"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          {creator.eventsCreated} Events · {creator.totalParticipants} Participants · $
          {creator.totalRaised.toLocaleString()} Raised · Impact Score:{" "}
          {creator.impactScore.toLocaleString()}
        </p>
        <p className="mt-4 max-w-2xl text-gray-700">{creator.bio}</p>
        {np && (
          <Link
            href="/nonprofit/launchpad"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--ch-teal)]"
          >
            <CdnImage src={np.logo} alt="" width={24} height={24} className="rounded" cdnOptions={{ width: 48, height: 48 }} />
            {np.name} ✓
          </Link>
        )}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setFollowing(!following)}
            className={`rounded-full px-6 py-2.5 text-sm font-medium ${
              following ? "border" : "bg-[var(--ch-teal)] text-white"
            }`}
          >
            {following ? "Following" : "Follow"}
          </button>
          <button type="button" className="rounded-full border px-6 py-2.5 text-sm">
            Message
          </button>
        </div>

        <div className="mt-8 flex gap-6 border-b">
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
            </button>
          ))}
        </div>

        <div className="py-8">
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
