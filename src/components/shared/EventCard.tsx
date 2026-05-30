import { CdnImage } from "@/components/shared/CdnImage";
import Link from "next/link";
import type { Event } from "@/types";
import { getNonprofitById } from "@/data/nonprofits";
import { getSEById } from "@/data/users";
import { StatusBadge } from "./StatusBadge";
import { DonationProgress } from "./DonationProgress";
import { TrustSignals } from "./TrustSignals";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const nonprofit = getNonprofitById(event.nonprofitId);
  const se = event.seId ? getSEById(event.seId) : null;

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full">
        <CdnImage
          src={event.banner}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          cdnOptions={{ width: 800, height: 400, fit: "cover" }}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-[var(--ch-navy)]">
          {event.causeCategory}
        </span>
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold leading-tight text-[var(--ch-navy)]">
            {event.title}
          </h3>
          <StatusBadge status={event.status} />
        </div>
        {nonprofit && (
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-800">{nonprofit.name}</p>
            <TrustSignals compact />
          </div>
        )}
        {se && (
          <p className="mb-3 text-xs text-gray-500">Organized by {se.name}</p>
        )}
        <DonationProgress raised={event.raised} goal={event.goal} />
        <Link
          href={`/events/${event.id}`}
          className="mt-4 inline-flex w-full justify-center rounded-full bg-[var(--ch-teal)] py-2.5 text-sm font-medium text-white transition hover:bg-[var(--ch-teal-light)]"
          aria-label={`View event ${event.title}`}
        >
          View Event
        </Link>
      </div>
    </article>
  );
}
