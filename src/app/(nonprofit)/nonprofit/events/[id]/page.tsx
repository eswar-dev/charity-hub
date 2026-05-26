import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventById } from "@/data/events";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { DonationProgress } from "@/components/shared/DonationProgress";

export default function NonprofitEventDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const event = getEventById(params.id);
  if (!event) notFound();

  return (
    <div>
      <Link href="/nonprofit/events" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <div className="mt-4 overflow-hidden rounded-2xl border bg-white shadow-sm">
        <Image src={event.banner} alt="" width={800} height={300} className="h-48 w-full object-cover" />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <h1 className="font-display text-2xl font-semibold">{event.title}</h1>
            <StatusBadge status={event.status} />
          </div>
          <p className="mt-4 text-gray-700">{event.story}</p>
          <div className="mt-6">
            <DonationProgress raised={event.raised} goal={event.goal} />
          </div>
          <Link href={`/events/${event.id}`} className="mt-6 inline-block text-sm text-[var(--ch-teal)]">
            View public page →
          </Link>
        </div>
      </div>
    </div>
  );
}
