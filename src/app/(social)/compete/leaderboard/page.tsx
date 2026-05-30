"use client";

import { useState } from "react";
import { CdnImage } from "@/components/shared/CdnImage";
import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { leaderboard } from "@/data/compete";
import { getCreatorById } from "@/data/creators";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function LeaderboardPage() {
  const [explainerOpen, setExplainerOpen] = useState(false);
  const sorted = [...leaderboard].sort((a, b) => a.rank - b.rank);
  const podiumOrder: { entry: (typeof sorted)[0]; minHeight: string; borderClass: string }[] = [
    {
      entry: sorted.find((e) => e.rank === 2)!,
      minHeight: "min-h-[140px]",
      borderClass: "border-gray-300",
    },
    {
      entry: sorted.find((e) => e.rank === 1)!,
      minHeight: "min-h-[200px]",
      borderClass: "border-[var(--impact-gold)] shadow-md",
    },
    {
      entry: sorted.find((e) => e.rank === 3)!,
      minHeight: "min-h-[120px]",
      borderClass: "border-amber-700/50",
    },
  ].filter((p) => p.entry);

  return (
    <div className="min-h-screen bg-[var(--feed-bg)]">
      <TopBar title="Impact Leaderboard" breadcrumbs={["Compete", "Leaderboard"]} />
      <main className="mx-auto max-w-4xl px-4 py-8 pb-24 md:pb-8">
        <h1 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
          Impact Leaderboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Week of May 25 – May 31, 2026 · Updated every 24 hours
        </p>

        <section className="mt-10" aria-label="Top 3 podium">
          <h2 className="sr-only">Top 3</h2>
          <div className="flex items-end justify-center gap-3 sm:gap-6">
            {podiumOrder.map(({ entry, minHeight, borderClass }) => {
              const creator = getCreatorById(entry.seId);
              const isFirst = entry.rank === 1;
              return (
                <div
                  key={entry.id}
                  className="flex w-[30%] max-w-[11rem] flex-col items-stretch sm:max-w-[12rem]"
                >
                  <div
                    className={`flex flex-col rounded-t-2xl border-2 bg-white p-3 text-center sm:p-4 ${minHeight} ${borderClass}`}
                  >
                    {isFirst && <span className="text-xl leading-none">👑</span>}
                    <p
                      className="font-impact mt-1 text-xl text-[var(--ch-teal)] sm:text-2xl"
                      style={{ fontFamily: "var(--font-impact)" }}
                    >
                      #{entry.rank}
                    </p>
                    {creator && (
                    <CdnImage
                      src={creator.avatar}
                      alt=""
                      width={48}
                      height={48}
                      className="mx-auto mt-2 rounded-full"
                      cdnOptions={{ width: 96, height: 96, fit: "cover" }}
                    />
                    )}
                    <p className="mt-2 line-clamp-3 text-[10px] font-medium leading-snug text-gray-800 sm:text-xs">
                      {entry.challengeName}
                    </p>
                    <p
                      className="font-impact mt-2 text-lg text-[var(--impact-gold)] sm:text-xl"
                      style={{ fontFamily: "var(--font-impact)" }}
                    >
                      {entry.impactScore.toLocaleString()}
                    </p>
                    <p className="mt-1 text-[10px] text-gray-500">
                      ${entry.raised.toLocaleString()}
                    </p>
                  </div>
                  <div className="h-3 rounded-b-md bg-gray-200 sm:h-4" aria-hidden />
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16" aria-label="Full rankings">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Full rankings
          </h2>
          <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
          <table className="w-full min-w-[320px] text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="whitespace-nowrap px-3 py-3 text-left sm:px-4">Rank</th>
                <th className="whitespace-nowrap px-3 py-3 text-left sm:px-4">Creator</th>
                <th className="hidden whitespace-nowrap px-4 py-3 text-left sm:table-cell">
                  Event
                </th>
                <th className="hidden whitespace-nowrap px-4 py-3 text-left md:table-cell">
                  Category
                </th>
                <th className="whitespace-nowrap px-3 py-3 text-right sm:px-4">Impact</th>
                <th className="whitespace-nowrap px-3 py-3 text-center sm:px-4">Trend</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((entry) => {
                const creator = getCreatorById(entry.seId);
                return (
                  <tr key={entry.id} className="border-t border-gray-100">
                    <td className="whitespace-nowrap px-3 py-3 font-mono sm:px-4">
                      {entry.rank}
                    </td>
                    <td className="px-3 py-3 sm:px-4">
                      <span className="line-clamp-1 font-medium">{creator?.name}</span>
                    </td>
                    <td className="hidden max-w-[12rem] px-4 py-3 sm:table-cell">
                      <span className="line-clamp-2 text-gray-600">
                        {entry.challengeName}
                      </span>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3 md:table-cell">
                      {entry.category}
                    </td>
                    <td
                      className="whitespace-nowrap px-3 py-3 text-right sm:px-4"
                      style={{ fontFamily: "var(--font-impact)" }}
                    >
                      {entry.impactScore.toLocaleString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-center sm:px-4">
                      {entry.trend === "up" && (
                        <span className="text-green-600" aria-label="Trending up">
                          ↑
                        </span>
                      )}
                      {entry.trend === "down" && (
                        <span className="text-red-600" aria-label="Trending down">
                          ↓
                        </span>
                      )}
                      {entry.trend === "new" && (
                        <span className="text-amber-600" aria-label="New entry">
                          ★
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border bg-white">
          <button
            type="button"
            onClick={() => setExplainerOpen(!explainerOpen)}
            className="flex w-full items-center justify-between px-6 py-4 text-left font-semibold"
          >
            How Is Impact Score Calculated?
            {explainerOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
          {explainerOpen && (
            <div className="border-t px-6 pb-6 text-sm text-gray-600">
              <p className="pt-4">
                Impact Score measures real-world good — not attention. Factors include
                participation quality, contributions, donations triggered, community growth,
                authenticity, and measurable outcomes.
              </p>
              <p className="mt-3 italic">
                The algorithm&apos;s job is to amplify what creates the most good.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">Think you can make a bigger impact?</p>
          <Link
            href="/se/events/create"
            className="mt-4 inline-block rounded-full bg-[var(--ch-teal)] px-8 py-3 text-sm font-medium text-white"
          >
            Start a Competition →
          </Link>
        </div>
      </main>
    </div>
  );
}
