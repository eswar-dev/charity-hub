import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { ImpactReveal } from "@/components/donor/ImpactReveal";
import { getEventById } from "@/data/events";
import { getNonprofitById } from "@/data/nonprofits";
import { notFound } from "next/navigation";

export default function ImpactPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);
  if (!event) notFound();
  const nonprofit = getNonprofitById(event.nonprofitId);

  return (
    <div className="min-h-screen bg-[var(--ch-cream)]">
      <TopBar title="Impact Reveal" />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link href={`/events/${event.id}`} className="text-sm text-[var(--ch-teal)]">← Back to event</Link>
        <ImpactReveal
          eventId={event.id}
          totalRaised={event.raised}
          nonprofitName={nonprofit?.name ?? "Nonprofit"}
        />
      </main>
    </div>
  );
}
