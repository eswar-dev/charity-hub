import Image from "next/image";
import type { Nonprofit } from "@/types";
import { StatusBadge } from "./StatusBadge";
import { TrustSignals } from "./TrustSignals";

interface NonprofitCardProps {
  nonprofit: Nonprofit;
  onSelect?: () => void;
  selected?: boolean;
}

export function NonprofitCard({
  nonprofit,
  onSelect,
  selected,
}: NonprofitCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:shadow-md ${
        selected
          ? "border-[var(--ch-teal)] ring-2 ring-[var(--ch-teal)]/20"
          : "border-gray-100"
      }`}
      aria-pressed={selected}
      aria-label={`Select ${nonprofit.name}`}
    >
      <div className="flex gap-4">
        <Image
          src={nonprofit.logo}
          alt=""
          width={56}
          height={56}
          className="rounded-xl object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-[var(--ch-navy)]">
              {nonprofit.name}
            </h3>
            <StatusBadge status={nonprofit.status} />
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {nonprofit.mission}
          </p>
          <div className="mt-2">
            <TrustSignals ein={nonprofit.ein} compact />
          </div>
        </div>
      </div>
    </button>
  );
}
