"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { CdnImage } from "@/components/shared/CdnImage";
import { EventHeroMedia } from "@/components/shared/EventHeroMedia";
import { ShareSheet } from "@/components/social/ShareSheet";
import { EventLiveActivity } from "@/components/social/EventLiveActivity";
import { useIdentityGate } from "@/hooks/useIdentityGate";
import type { IdentityGateAction } from "@/components/shared/IdentityGate";
import { ParticipationCounter } from "@/components/social/ParticipationCounter";
import { ChallengeCard } from "@/components/social/ChallengeCard";
import { getEventById } from "@/data/events";
import { getNonprofitById } from "@/data/nonprofits";
import { getCreatorById } from "@/data/creators";
import { getDonationsForEvent } from "@/data/donations";
import { activeChallenges } from "@/data/challenges";
import { TrustSignals } from "@/components/shared/TrustSignals";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { usePersona } from "@/context/PersonaContext";

const communityPosts = [
  { author: "@MariaG", avatar: "donations/maria", text: "This is incredible. Sharing with my whole network right now.", likes: 12, time: "1h ago" },
  { author: "@TomW", avatar: "donations/james", text: "Just joined! This is exactly the kind of thing I needed to see today.", likes: 8, time: "2h ago" },
  { author: "@SarahK", avatar: "donations/elena", text: "Tagging everyone I know. Let's go 🥊💚", likes: 24, time: "3h ago" },
];

export default function PublicEventPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);
  const { persona } = usePersona();
  const { openGate, GateModal } = useIdentityGate(`/events/${params.id}`);
  const [shareOpen, setShareOpen] = useState(false);
  const [amount, setAmount] = useState(25);

  if (!event) notFound();

  const nonprofit = getNonprofitById(event.nonprofitId);
  const se = event.seId ? getCreatorById(event.seId) : null;
  const donors = getDonationsForEvent(event.id);
  const participants = event.participants || Math.max(donors.length, Math.floor(event.raised / 150));
  const eventChallenge = activeChallenges.find((c) => c.eventId === event.id);
  const eventPath = `/events/${event.id}`;

  const openEventGate = (action: IdentityGateAction) => {
    openGate({ action, eventTitle: event.title, returnPath: eventPath });
  };

  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title={event.title} breadcrumbs={["Events", event.title]} />
      <main className="mx-auto max-w-4xl px-4 py-6 pb-24">
        <Link href="/events" className="text-sm text-[var(--ch-teal)]">
          ← Back
        </Link>

        <EventLiveActivity eventId={event.id} eventTitle={event.title} />

        <section className="relative mt-4 overflow-hidden rounded-2xl">
          <EventHeroMedia
            event={event}
            className="relative aspect-[21/9] min-h-[240px] w-full"
            imageClassName="h-full min-h-[240px] w-full object-cover"
            videoClassName="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="font-display text-3xl font-semibold md:text-[40px]">{event.title}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs">{event.causeCategory}</span>
              {nonprofit && (
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                  {nonprofit.name} ✓
                </span>
              )}
              <span className="rounded-full bg-[var(--live-red)]/90 px-3 py-1 text-xs font-bold">
                {event.status === "Live" ? "Live" : "Upcoming"}
              </span>
            </div>
          </div>
        </section>

        <div className="mt-4 flex flex-wrap gap-4 rounded-xl border bg-white px-4 py-3 text-sm text-gray-600">
          <span>👥 {participants} participating</span>
          <span>♥ 342 reactions</span>
          <span>↗ 89 shares</span>
          <span>💬 47 comments</span>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-[28px] font-semibold text-[var(--ch-navy)]">
            Why this matters
          </h2>
          <p className="mt-4 text-[17px] leading-[1.8] text-gray-700">{event.story}</p>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          {se && (
            <div className="rounded-2xl border bg-white p-6">
              <CdnImage
                src={se.avatar}
                alt=""
                width={64}
                height={64}
                className="rounded-full object-cover"
                cdnOptions={{ width: 128, height: 128, fit: "cover" }}
              />
              <p className="mt-4 font-semibold">
                {se.name}{" "}
                {se.isVerified && (
                  <span className="text-xs text-[var(--ch-teal)]">✓ Verified</span>
                )}
              </p>
              <p className="text-sm text-gray-500">{se.handle}</p>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{se.bio}</p>
              <p
                className="mt-2 text-sm text-[var(--impact-gold)]"
                style={{ fontFamily: "var(--font-impact)" }}
              >
                Impact Score: {se.impactScore.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{se.followers.toLocaleString()} followers</p>
              <Link href={`/creators/${se.id}`} className="mt-4 inline-block text-sm text-[var(--ch-teal)]">
                View Profile →
              </Link>
            </div>
          )}
          {nonprofit && (
            <div className="rounded-2xl border bg-white p-6">
              <CdnImage
                src={nonprofit.logo}
                alt=""
                width={64}
                height={64}
                className="rounded-xl object-cover"
                cdnOptions={{ width: 128, height: 128, fit: "cover" }}
              />
              <p className="mt-4 font-semibold">{nonprofit.name}</p>
              <TrustSignals ein={nonprofit.ein} />
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{nonprofit.mission}</p>
              <Link href="/explore" className="mt-4 inline-block text-sm text-[var(--ch-teal)]">
                View Nonprofit →
              </Link>
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border bg-white p-6">
          <h2 className="font-display text-xl font-semibold text-[var(--ch-navy)]">
            Join the conversation
          </h2>
          {persona === "guest" ? (
            <button
              type="button"
              onClick={() => openEventGate("comment")}
              className="mt-4 w-full rounded-xl border border-dashed border-[var(--ch-teal)] py-3 text-sm text-[var(--ch-teal)]"
            >
              Sign up to join the conversation and participate →
            </button>
          ) : (
            <input
              className="mt-4 w-full rounded-lg border px-4 py-3 text-sm"
              placeholder="Share your reaction..."
              aria-label="Comment"
            />
          )}
          <div className="mt-6 space-y-4">
            {communityPosts.map((p) => (
              <div key={p.author} className="flex gap-3">
                <CdnImage
                  src={p.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                  cdnOptions={{ width: 80, height: 80, fit: "cover" }}
                />
                <div>
                  <p className="text-sm font-medium">{p.author}</p>
                  <p className="text-sm text-gray-700">{p.text}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    ♥ {p.likes} · {p.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="mt-4 text-sm text-[var(--ch-teal)]">
            Load more comments
          </button>
        </section>

        <section className="mt-10">
          <h2 className="mb-6 font-display text-xl font-semibold uppercase tracking-wide text-[var(--ch-navy)]">
            Participate in this event
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: "📢", title: "SHARE", desc: "Spread the word about this cause", cta: "Share Event →", action: () => setShareOpen(true), gate: false },
              { icon: "💬", title: "POST A STORY", desc: "Share your moment or reaction", cta: "Add Your Story →", action: () => openEventGate("create") },
              { icon: "🎯", title: "ACCEPT CHALLENGE", desc: "Tag a friend and unlock impact", cta: "Accept →", action: () => openEventGate("join") },
              { icon: "⚡", title: "JOIN THE EVENT", desc: "Be counted as a participant", cta: "Join Now →", action: () => openEventGate("join") },
            ].map((card) => (
              <div key={card.title} className="rounded-2xl border bg-white p-5">
                <p className="text-2xl">{card.icon}</p>
                <p className="mt-2 font-bold text-[var(--ch-navy)]">{card.title}</p>
                <p className="mt-1 text-sm text-gray-600">{card.desc}</p>
                <button
                  type="button"
                  onClick={card.action}
                  className="mt-4 text-sm font-semibold text-[var(--ch-teal)]"
                >
                  {card.cta}
                </button>
              </div>
            ))}
          </div>
          {eventChallenge && (
            <div className="mt-6">
              <ChallengeCard
                challenge={eventChallenge}
                onAccept={() => openEventGate("join")}
                onShare={() => setShareOpen(true)}
              />
            </div>
          )}
        </section>

        <section className="mt-10 rounded-2xl border bg-white p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-[var(--ch-navy)]">
            Where things stand
          </h2>
          <div className="relative mx-auto mt-8 flex h-48 w-48 items-center justify-center">
            <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f3f4f6" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="var(--ch-teal)"
                strokeWidth="8"
                strokeDasharray={`${Math.min(264, (participants / 100) * 264)} 264`}
                strokeLinecap="round"
              />
            </svg>
            <div>
              <p
                className="text-5xl font-bold text-[var(--ch-teal)]"
                style={{ fontFamily: "var(--font-impact)" }}
              >
                {participants}
              </p>
              <p className="text-sm text-gray-600">people participating</p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <p className="text-gray-600">
              ${event.raised.toLocaleString()} raised of ${event.goal.toLocaleString()} goal
            </p>
            <p className="text-gray-600">23 days remaining</p>
          </div>
          <div className="mt-8">
            <p className="text-sm font-medium text-gray-700">Recent participants</p>
            <ParticipationCounter
              participantCount={participants}
              showAvatars
              avatarKeys={donors.map((d) => d.avatar)}
              size="sm"
            />
            {donors.length > 0 && (
              <p className="mt-2 text-xs text-gray-500">+{Math.max(0, participants - donors.length)} others</p>
            )}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border-2 border-[var(--ch-teal)]/20 bg-white p-8">
          <h2 className="font-display text-2xl font-semibold text-[var(--ch-navy)]">
            Feel moved to give?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Completely optional. Participation matters more than the amount.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-5">
            {[10, 25, 50, 100].map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAmount(a)}
                className={`rounded-xl border py-3 text-sm font-medium ${
                  amount === a ? "border-[var(--ch-teal)] bg-teal-50 text-[var(--ch-teal)]" : ""
                }`}
              >
                ${a}
              </button>
            ))}
            <button type="button" className="rounded-xl border py-3 text-sm">
              Custom
            </button>
          </div>
          <button
            type="button"
            onClick={() => openEventGate("donate")}
            className="mt-6 w-full rounded-full bg-[var(--ch-teal)] py-4 text-sm font-semibold text-white"
          >
            Give to {nonprofit?.name ?? "this cause"} →
          </button>
          <PhaseBanner
            phase="2"
            message="Donation is a demo in Phase 2 / MMVP.0 — no real payment processing."
          />
          <Link href={`/impact/${event.id}`} className="mt-4 block text-center text-sm text-[var(--ch-teal)]">
            View impact →
          </Link>
        </section>
      </main>

      {GateModal}
      <ShareSheet open={shareOpen} title={event.title} onClose={() => setShareOpen(false)} />
    </div>
  );
}
