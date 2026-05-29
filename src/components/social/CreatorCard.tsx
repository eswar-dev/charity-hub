import Image from "next/image";
import Link from "next/link";
import type { CreatorProfile } from "@/data/creators";

interface CreatorCardProps {
  creator: CreatorProfile;
}

export function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <Image
        src={creator.avatar}
        alt=""
        width={80}
        height={80}
        className="mx-auto rounded-full"
      />
      <h3 className="mt-4 text-center font-semibold text-[var(--ch-navy)]">
        {creator.name}
      </h3>
      <p className="text-center text-sm text-gray-500">{creator.handle}</p>
      <div className="mt-2 flex flex-wrap justify-center gap-1">
        {creator.badges.slice(0, 2).map((b) => (
          <span
            key={b}
            className="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-800"
          >
            {b}
          </span>
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-gray-500">
        {creator.causeCategories.join(" • ")}
      </p>
      <hr className="my-4 border-gray-100" />
      <p className="text-center text-sm text-gray-600">
        {creator.eventsCreated} events · {creator.totalParticipants} participants
      </p>
      <p className="text-center text-sm font-medium">
        ${creator.totalRaised.toLocaleString()} raised
      </p>
      <p
        className="mt-2 text-center font-impact text-lg text-[var(--impact-gold)]"
        style={{ fontFamily: "var(--font-impact)" }}
      >
        Impact Score: {creator.impactScore.toLocaleString()}
      </p>
      <Link
        href={`/creators/${creator.id}`}
        className="mt-4 block text-center text-sm font-medium text-[var(--ch-teal)] hover:underline"
      >
        View Profile →
      </Link>
    </div>
  );
}
