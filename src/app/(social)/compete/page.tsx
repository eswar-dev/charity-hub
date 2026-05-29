import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { FlyWheelDiagram } from "@/components/social/FlyWheelDiagram";
import { leaderboard } from "@/data/compete";
import { getCreatorById } from "@/data/creators";
import { DonationProgress } from "@/components/shared/DonationProgress";
import { getEventById } from "@/data/events";

export default function CompetePage() {
  const topThree = leaderboard.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--feed-bg)]">
      <TopBar title="Competition For Good" breadcrumbs={["Social", "Compete"]} />
      <section className="bg-[var(--ch-navy)] px-4 py-16 text-center text-white lg:px-8">
        <p className="text-3xl">⚡</p>
        <h1 className="font-display mt-4 text-4xl font-bold tracking-wide">
          COMPETITION FOR GOOD
        </h1>
        <p className="mt-4 text-lg text-teal-100">
          Purpose-led. Creative. Social. Where your participation creates real-world change.
        </p>
        <p className="mt-2 text-sm opacity-80">Not for likes. Not for ads. For the world.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/se/events/create"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--ch-navy)]"
          >
            Join the Competition →
          </Link>
          <a href="#how" className="rounded-full border border-white/40 px-8 py-3 text-sm">
            See How It Works ↓
          </a>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
        <section id="how" className="grid gap-8 md:grid-cols-3">
          {[
            {
              step: "1. CREATE",
              text: "Social Entrepreneurs create cause-driven events and experiences",
            },
            {
              step: "2. PARTICIPATE",
              text: "Join events, share stories, take challenges, contribute content",
            },
            {
              step: "3. IMPACT",
              text: "Your actions translate into measurable real-world change and donations",
            },
          ].map((col) => (
            <div key={col.step} className="rounded-2xl border bg-white p-6 text-center shadow-sm">
              <p className="font-impact text-xl text-[var(--compete-purple)]" style={{ fontFamily: "var(--font-impact)" }}>
                {col.step}
              </p>
              <p className="mt-3 text-sm text-gray-600">{col.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="font-display text-center text-2xl font-semibold">
            Competition For Good Flywheel
          </h2>
          <div className="mt-8 flex justify-center">
            <FlyWheelDiagram />
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">Active Competitions</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {topThree.map((entry) => {
              const creator = getCreatorById(entry.seId);
              const event = getEventById(entry.eventId);
              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border-2 border-[var(--compete-purple)]/20 bg-white p-6 shadow-sm"
                >
                  <p className="text-lg font-bold">🥊 {entry.challengeName.toUpperCase()}</p>
                  <p className="text-sm text-gray-500">
                    {entry.category} · {creator?.name}
                  </p>
                  <hr className="my-4" />
                  <p className="text-sm">
                    Impact Score:{" "}
                    <span className="font-impact text-lg text-[var(--impact-gold)]" style={{ fontFamily: "var(--font-impact)" }}>
                      {entry.impactScore.toLocaleString()}
                    </span>{" "}
                    📈 Trending Up
                  </p>
                  <p className="text-sm text-gray-600">
                    {entry.participants} participants · ${entry.raised.toLocaleString()} raised
                  </p>
                  {event && (
                    <div className="mt-3">
                      <DonationProgress
                        raised={event.raised}
                        goal={event.goal}
                        showLabels={false}
                      />
                    </div>
                  )}
                  <p className="mt-3 text-sm font-medium">#{entry.rank} on Leaderboard</p>
                  <Link
                    href={`/events/${entry.eventId}`}
                    className="mt-4 block rounded-full bg-[var(--compete-purple)] py-2.5 text-center text-sm text-white"
                  >
                    Join Competition →
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-[var(--ch-teal)] p-8 text-white md:p-12">
          <h2 className="font-display text-2xl font-semibold">
            What does a top Social Entrepreneur gain on Charity Hub that they cannot on Instagram?
          </h2>
          <ul className="mt-6 grid gap-2 text-sm md:grid-cols-2">
            {[
              "Verified impact reputation",
              "Measurable real-world outcomes",
              "Access to mission-aligned community",
              "Leadership status in the impact economy",
              "Tools built specifically for good",
              "Lasting legacy and societal change",
            ].map((item) => (
              <li key={item}>✅ {item}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/se/events/create"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--ch-teal)]"
            >
              Create Your First Event →
            </Link>
            <Link
              href="/compete/leaderboard"
              className="rounded-full border border-white px-6 py-3 text-sm"
            >
              Explore the Leaderboard →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
