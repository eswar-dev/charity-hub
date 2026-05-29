import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { platformAlgorithmComparison } from "@/data/compete";

function PlatformIcon({ logo }: { logo: string }) {
  const icons: Record<string, string> = {
    ig: "IG",
    tt: "TT",
    yt: "YT",
    ch: "♥",
  };
  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white ${
        logo === "ig"
          ? "bg-[var(--platform-ig)]"
          : logo === "tt"
            ? "bg-[var(--platform-tt)]"
            : logo === "yt"
              ? "bg-[var(--platform-yt)]"
              : "bg-[var(--platform-ch)]"
      }`}
    >
      {icons[logo]}
    </span>
  );
}

export default function MentalModelPage() {
  const { platforms } = platformAlgorithmComparison;

  return (
    <div className="min-h-screen bg-white">
      <TopBar title="Mental Model" breadcrumbs={["About", "Mental Model"]} />
      <header className="border-b px-4 py-12 text-center lg:px-8">
        <h1 className="font-display text-3xl font-bold text-[var(--ch-navy)] md:text-4xl">
          THE MENTAL MODEL WE EXPLORE
        </h1>
        <p className="mt-4 text-gray-600">
          Different Inputs. Different Algorithms. Different Outcomes. Different Value.
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p) => {
            const isCH = p.logo === "ch";
            return (
              <div
                key={p.name}
                className={`rounded-2xl border p-6 ${
                  isCH
                    ? "border-2 border-[var(--ch-teal)] shadow-lg lg:scale-105"
                    : "border-gray-200"
                }`}
              >
                <PlatformIcon logo={p.logo} />
                <h2
                  className="mt-4 text-xl font-bold"
                  style={{ color: p.color }}
                >
                  {p.name}
                </h2>
                <div className="mt-4 space-y-1">
                  {p.stack.map((step, i) => (
                    <div key={step} className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">{i > 0 ? "↓" : ""}</span>
                      <span className={isCH ? "font-medium" : ""}>{step}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs font-semibold uppercase text-gray-500">
                  Goal
                </p>
                <p className="text-sm">{p.goal}</p>
                <p className="mt-4 text-xs font-semibold uppercase text-gray-500">
                  Algorithm Optimizes For
                </p>
                <ul className="mt-1 space-y-1 text-sm">
                  {p.optimizesFor.map((o) => (
                    <li key={o} className={isCH ? "text-[var(--ch-teal)]" : ""}>
                      {isCH ? "✓ " : "• "}
                      {o}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  <strong>Outcome:</strong> {p.outcome}
                </p>
                <p
                  className={`mt-2 text-sm font-bold ${
                    isCH ? "text-xl text-[var(--ch-teal)]" : ""
                  }`}
                >
                  {p.valueCreated}
                </p>
                <p className="mt-3 text-xs italic text-gray-500">{p.algorithm}</p>
              </div>
            );
          })}
        </div>

        <section className="mt-16 grid gap-8 md:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-2xl bg-red-50 p-6">
            <h3 className="font-bold text-red-900">Other Platforms Optimize For ENGAGEMENT</h3>
            <p className="mt-4 text-sm text-red-800">
              ♥ Likes · 💬 Comments · ↗ Shares · 🔖 Saves · 👁 Watch Time
            </p>
            <p className="mt-4 text-sm italic text-red-700">
              &quot;The algorithm&apos;s job is to keep you on the platform longer. More
              engagement = more ads shown.&quot;
            </p>
          </div>
          <div className="flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-200 text-xl font-bold">
              VS.
            </span>
          </div>
          <div className="rounded-2xl bg-green-50 p-6">
            <h3 className="font-bold text-green-900">Charity Hub Optimizes For IMPACT</h3>
            <ul className="mt-4 space-y-2 text-sm text-green-800">
              <li>👥 Meaningful Participation</li>
              <li>✅ Quality Contributions</li>
              <li>🛡 Verified Trust</li>
              <li>📊 Measurable Outcomes</li>
              <li>🏘 Community Uplift</li>
            </ul>
            <p className="mt-4 text-sm italic text-green-700">
              &quot;The algorithm&apos;s job is to amplify what creates the most good.&quot;
            </p>
          </div>
        </section>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border bg-gray-50 p-6">
            <h3 className="font-bold">Others Monetize ATTENTION</h3>
            <p className="mt-4 text-sm">👁 Attention → $ Ads → 📈 Platform Revenue</p>
          </div>
          <div className="rounded-2xl border-2 border-[var(--ch-teal)] bg-teal-50/50 p-6">
            <h3 className="font-bold text-[var(--ch-teal)]">Charity Hub Monetizes IMPACT</h3>
            <p className="mt-4 text-sm">
              🌍 Impact → ♥ Donations & Partnerships → 📊 Sustainable Impact Platform
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-2xl bg-[var(--ch-navy)] p-8 text-white md:p-12">
          <h2 className="font-display text-2xl font-semibold">
            THE QUESTION WE MUST ANSWER TOGETHER
          </h2>
          <p className="mt-4 text-lg text-teal-100">
            What does a top Social Entrepreneur gain on Charity Hub that they cannot on
            Instagram?
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <ul className="space-y-2 text-sm">
              {[
                "Verified impact reputation",
                "Measurable real-world outcomes",
                "Access to mission-aligned community",
                "Funding, partnerships, and resources",
                "Leadership status in the impact economy",
                "Tools built specifically for good",
                "Lasting legacy and societal change",
              ].map((item) => (
                <li key={item}>✅ {item}</li>
              ))}
            </ul>
            <p className="text-sm text-teal-100/90">
              Let&apos;s define the unique value that makes Charity Hub irreplaceable for
              creators who want impact — not just attention.
            </p>
          </div>
          <Link
            href="/se/events/create"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--ch-navy)]"
          >
            Start Building Your Impact →
          </Link>
        </section>
      </main>
    </div>
  );
}
