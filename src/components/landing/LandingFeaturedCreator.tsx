import { CdnImage } from "@/components/shared/CdnImage";
import Link from "next/link";
import type { CreatorProfile } from "@/data/creators";
import { BadgeCheck } from "lucide-react";

export function LandingFeaturedCreator({ creator }: { creator: CreatorProfile }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-video w-full">
        <CdnImage
          src={creator.bannerKey}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width:768px) 100vw, 33vw"
          cdnOptions={{ width: 800, height: 450, fit: "cover" }}
        />
      </div>
      <div className="relative px-5 pb-5 pt-10">
        <div className="absolute -top-8 left-5">
          <CdnImage
            src={creator.avatar}
            alt=""
            width={64}
            height={64}
            className="rounded-full border-4 border-white object-cover shadow-md"
            cdnOptions={{ width: 128, height: 128, fit: "cover" }}
          />
        </div>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-[var(--ch-navy)]">{creator.name}</h3>
          {creator.isVerified && (
            <BadgeCheck className="h-4 w-4 text-[var(--ch-teal)]" aria-label="Verified" />
          )}
        </div>
        <p className="text-sm text-gray-500">{creator.handle}</p>
        <p className="mt-1 text-xs text-gray-600">{creator.causeCategories.join(" • ")}</p>
        <hr className="my-4 border-gray-100" />
        <p className="text-sm text-gray-700">
          <span className="font-semibold">{creator.eventsCreated} events</span>
          {" · "}
          <span className="font-semibold">{creator.totalParticipants.toLocaleString()} participants</span>
        </p>
        <p
          className="mt-2 text-lg text-[var(--impact-gold)]"
          style={{ fontFamily: "var(--font-impact)" }}
        >
          Impact Score: {creator.impactScore.toLocaleString()} 📈
        </p>
        <p className="mt-1 text-xs text-gray-400">
          ${creator.totalRaised.toLocaleString()} raised
        </p>
        <Link
          href={`/creators/${creator.id}`}
          className="mt-4 inline-block text-sm font-semibold text-[var(--ch-teal)] hover:underline"
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
}
