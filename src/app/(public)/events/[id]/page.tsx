import { CdnImage } from "@/components/shared/CdnImage";
import { EventHeroMedia } from "@/components/shared/EventHeroMedia";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { getEventById } from "@/data/events";
import { getNonprofitById } from "@/data/nonprofits";
import { getSEById } from "@/data/users";
import { getDonationsForEvent } from "@/data/donations";
import { TrustSignals } from "@/components/shared/TrustSignals";
import { DonationProgress } from "@/components/shared/DonationProgress";
import { DonationWidget } from "@/components/donor/DonationWidget";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function PublicEventPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);
  if (!event) notFound();
  const nonprofit = getNonprofitById(event.nonprofitId);
  const se = event.seId ? getSEById(event.seId) : null;
  const donors = getDonationsForEvent(event.id);

  const posts =
    donors.length > 0
      ? donors.slice(0, 3).map((d) => ({
          author: d.donorName,
          avatar: d.avatar,
          text:
            d.donorName === "Maria Santos"
              ? "So inspired by this cause!"
              : d.donorName === "James Chen"
                ? "Just shared with my team."
                : "Can't wait for event day!",
        }))
      : [
          {
            author: nonprofit?.name ?? "Community",
            avatar: nonprofit?.logo ?? event.banner,
            text: "Be the first to share why this cause matters to you.",
          },
        ];

  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title={event.title} breadcrumbs={["Events", event.title]} />
      <main className="mx-auto max-w-4xl px-4 py-6">
        <Link href="/events" className="text-sm text-[var(--ch-teal)]">← Back</Link>

        <section className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm">
          <EventHeroMedia event={event} priority />
          <div className="p-8">
            <h1 className="font-display text-4xl font-semibold text-[var(--ch-navy)]">
              {event.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
              {se && (
                <span className="flex items-center gap-2">
                  <CdnImage src={se.avatar} alt="" width={32} height={32} className="rounded-full" />
                  {se.name}
                </span>
              )}
              {nonprofit && (
                <span className="font-medium">{nonprofit.name}</span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              54 participants · 12 shares · 28 comments
            </p>
            <p className="mt-6 text-lg text-gray-700">{event.story}</p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border bg-white p-6">
          <h2 className="font-semibold text-[var(--ch-navy)]">Nonprofit Trust Signals</h2>
          {nonprofit && (
            <div className="mt-4 flex gap-4">
              <CdnImage src={nonprofit.logo} alt="" width={48} height={48} className="rounded-xl" />
              <div>
                <p className="font-semibold">{nonprofit.name}</p>
                <TrustSignals ein={nonprofit.ein} />
                <p className="mt-2 text-sm text-gray-600">{nonprofit.mission}</p>
              </div>
            </div>
          )}
        </section>

        <section className="relative mt-8 rounded-2xl border bg-white p-6">
          <span className="absolute -top-3 right-4 rounded bg-amber-100 px-2 py-0.5 text-[10px] text-amber-900">
            Possible engagement
          </span>
          <h2 className="font-semibold">Engagement</h2>
          <div className="mt-4 space-y-4">
            {posts.map((p) => (
              <div key={`${p.author}-${p.text}`} className="flex gap-3 rounded-xl bg-gray-50 p-4">
                <CdnImage
                  src={p.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 rounded-full object-cover"
                  cdnOptions={{ width: 80, height: 80, fit: "cover" }}
                />
                <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{p.author}</p>
                <p className="text-sm text-gray-700">{p.text}</p>
                <div className="mt-2 flex gap-4 text-gray-400">
                  <button type="button" aria-label="Like post"><Heart className="h-4 w-4" /></button>
                  <button type="button" aria-label="Comment"><MessageCircle className="h-4 w-4" /></button>
                  <button type="button" aria-label="Share"><Share2 className="h-4 w-4" /></button>
                </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-semibold mb-4">Progress</h2>
            <DonationProgress raised={event.raised} goal={event.goal} daysLeft={23} />
            <div className="mt-6 grid grid-cols-3 gap-2">
              {donors.map((d) => (
                <div key={d.id} className="text-center text-xs">
                  <CdnImage
                    src={d.avatar}
                    alt=""
                    width={32}
                    height={32}
                    className="mx-auto rounded-full object-cover"
                    cdnOptions={{ width: 64, height: 64, fit: "cover" }}
                  />
                  <p className="mt-1 font-medium">{d.donorName}</p>
                  <p className="text-gray-500">${d.amount}</p>
                </div>
              ))}
            </div>
          </div>
          <DonationWidget eventId={event.id} />
        </section>
      </main>
    </div>
  );
}
