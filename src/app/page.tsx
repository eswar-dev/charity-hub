"use client";

import Link from "next/link";
import { Users, Zap, Heart, ArrowRight } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHeroStack } from "@/components/landing/LandingHeroStack";
import { LandingFeaturedCreator } from "@/components/landing/LandingFeaturedCreator";
import { FeedPostCard } from "@/components/social/FeedPostCard";
import { ImpactMomentCard } from "@/components/social/ImpactMomentCard";
import { FlyWheelDiagram } from "@/components/social/FlyWheelDiagram";
import { useIdentityGate } from "@/hooks/useIdentityGate";
import { PersonaSwitcher } from "@/components/layout/PersonaSwitcher";
import { feedPosts } from "@/data/feed";
import { creators } from "@/data/creators";
import { CdnImage } from "@/components/shared/CdnImage";

const landingFeedIds = ["post-004", "post-001", "post-005"];

const causeTiles = [
  { name: "Environment", emoji: "🌱", query: "Environment", image: "events/evt-002/banner", count: 8 },
  { name: "Education", emoji: "📚", query: "Education", image: "events/evt-003/banner", count: 5 },
  { name: "Health", emoji: "❤️", query: "Health", image: "events/evt-001/banner", count: 6 },
  { name: "Arts", emoji: "🎨", query: "Arts", image: "events/evt-005/banner", count: 3 },
  { name: "Animals", emoji: "🐾", query: "Animals", image: "nonprofits/np-002/logo", count: 2 },
  { name: "Human Services", emoji: "🏘", query: "Human Services", image: "nonprofits/np-003/logo", count: 4 },
];

const steps = [
  { n: 1, title: "Discover", desc: "Browse the living feed anonymously" },
  { n: 2, title: "Feel It", desc: "Read the story behind the cause and event" },
  { n: 3, title: "Engage", desc: "Like, share, comment, and challenge your network" },
  { n: 4, title: "Participate", desc: "Join an event, create content, give if moved to" },
  { n: 5, title: "Impact", desc: "See where it all went. Come back for more." },
];

export default function LandingPage() {
  const { openGate, GateModal } = useIdentityGate("/");

  const openJoinGate = (title: string, returnPath = "/feed") => {
    openGate({ action: "join", eventTitle: title, returnPath });
  };

  const landingPosts = landingFeedIds
    .map((id) => feedPosts.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />

      <section className="relative min-h-[90vh] border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[55%_45%] lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-block rounded-full bg-teal-50 px-4 py-1 text-xs font-bold uppercase tracking-wide text-[var(--ch-teal)]">
              Competition For Good
            </span>
            <h1 className="font-display mt-6 text-4xl font-semibold leading-tight text-[var(--ch-navy)] md:text-[56px]">
              Any event can become
              <br />
              a reason to give.
            </h1>
            <p className="mt-6 max-w-[480px] text-lg text-gray-600">
              Social Entrepreneurs turn creative events, stories, and community energy into
              real-world change. Nonprofit causes come alive. Giving follows naturally.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/feed"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--ch-teal)] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:opacity-90"
              >
                Explore What&apos;s Happening
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/se/events/create"
                className="rounded-full border-2 border-[var(--ch-teal)] px-8 py-3.5 text-sm font-semibold text-[var(--ch-teal)]"
              >
                Create an Event
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              👥 2,847 participants this month · 🏛 23 verified nonprofits · 💚 $89K raised
            </p>
          </div>
          <div className="hidden lg:block">
            <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">
              Live Right Now
            </p>
            <LandingHeroStack />
          </div>
        </div>
      </section>

      <section className="bg-[var(--ch-cream)] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Participate First",
              body: "Discover causes through stories, events, and community moments. No obligation. No pitch.",
            },
            {
              icon: Zap,
              title: "Competition For Good",
              body: "Social Entrepreneurs and nonprofits compete creatively for impact. Not for likes. For change.",
            },
            {
              icon: Heart,
              title: "Giving Follows Naturally",
              body: "When a cause moves you, giving happens. Not because you were asked. Because you were part of something real.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="text-center md:text-left">
              <Icon className="mx-auto h-10 w-10 text-[var(--ch-teal)] md:mx-0" />
              <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-[var(--ch-navy)]">
                {title}
              </h3>
              <p className="mt-2 text-gray-600">{body}</p>
            </div>
          ))}
        </div>
        <p className="font-display mx-auto mt-12 max-w-2xl text-center text-xl italic text-[var(--ch-navy)]">
          &ldquo;The algorithm&apos;s job is to amplify what creates the most good.&rdquo;
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
              What&apos;s happening right now
            </h2>
            <Link href="/feed" className="text-sm font-semibold text-[var(--ch-teal)]">
              See full feed →
            </Link>
          </div>
          <div className="-mx-2 flex gap-6 overflow-x-auto pb-4">
            {landingPosts.map((post) => (
              <div key={post!.id} className="w-[min(100%,380px)] shrink-0 snap-center">
                {post!.type === "impact_reveal" ? (
                  <ImpactMomentCard
                    post={post!}
                    onJoinEvent={() => openJoinGate("Drive for Literacy")}
                  />
                ) : (
                  <FeedPostCard
                    post={post!}
                    onJoinEvent={(_, title) => openJoinGate(title)}
                    onCommentGate={() => openGate({ action: "comment", returnPath: "/" })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ch-navy)] px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Join the participation network for good
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4 md:gap-2">
            {steps.map((step, i) => (
              <div key={step.n} className="flex items-center">
                <div className="w-40 rounded-xl border border-white/10 bg-white/5 p-4 text-left backdrop-blur sm:w-44">
                  <p
                    className="text-6xl leading-none text-[var(--ch-teal)] opacity-30"
                    style={{ fontFamily: "var(--font-impact)" }}
                  >
                    {step.n}
                  </p>
                  <p className="mt-2 font-bold">{step.title}</p>
                  <p className="mt-1 text-xs text-white/70">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <span className="mx-1 hidden text-[var(--ch-teal)] md:inline">→</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/feed"
              className="rounded-full bg-[var(--ch-teal)] px-8 py-3 font-semibold text-white"
            >
              Start Exploring →
            </Link>
            <Link
              href="/about/mental-model"
              className="rounded-full border border-white/40 px-8 py-3 font-semibold"
            >
              How We&apos;re Different →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
            The creators making it happen
          </h2>
          <p className="mt-2 text-gray-600">
            Social Entrepreneurs bring creative energy to causes that matter.
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {creators.map((c) => (
              <LandingFeaturedCreator key={c.id} creator={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-50/80 px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl font-semibold text-[var(--ch-navy)]">
            Find a cause that moves you
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {causeTiles.map((c) => (
              <Link
                key={c.name}
                href={`/explore?cause=${encodeURIComponent(c.query)}`}
                className="group relative aspect-[16/10] overflow-hidden rounded-2xl"
              >
                <CdnImage
                  src={c.image}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="400px"
                  cdnOptions={{ width: 600, height: 375, fit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 text-white">
                  <p className="text-2xl">
                    {c.emoji} <span className="font-bold">{c.name}</span>
                  </p>
                  <p className="text-sm text-white/80">{c.count} active events</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--ch-teal)] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              Competition For Good
            </p>
            <h2 className="font-display mt-2 text-3xl font-semibold">
              The social participation engine powering Charity Hub.
            </h2>
            <p className="mt-4 text-teal-100">Not likes. Not ads. Real-world change.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/compete/leaderboard"
                className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[var(--ch-teal)]"
              >
                See the Leaderboard →
              </Link>
              <Link
                href="/compete"
                className="rounded-full border border-white/60 px-6 py-2.5 text-sm font-semibold"
              >
                Join a Competition →
              </Link>
            </div>
          </div>
          <div>
            <FlyWheelDiagram variant="onDark" />
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-[var(--ch-navy)] md:text-[40px]">
          Ready to turn your energy into something real?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg text-gray-600">
          Start as a guest. No account needed to discover and feel. Create when you&apos;re
          ready.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/feed"
            className="rounded-full bg-[var(--ch-teal)] px-10 py-4 text-sm font-semibold text-white"
          >
            Explore the Feed →
          </Link>
          <Link
            href="/se/events/create"
            className="rounded-full border-2 border-[var(--ch-teal)] px-10 py-4 text-sm font-semibold text-[var(--ch-teal)]"
          >
            Create an Event →
          </Link>
        </div>
        <div className="mt-16 flex flex-col items-center gap-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-medium text-gray-500">
            Prototype Mode
          </span>
          <PersonaSwitcher />
        </div>
      </section>

      {GateModal}
    </div>
  );
}
