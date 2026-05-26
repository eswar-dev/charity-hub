import type { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  heading: string;
  subtext: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function EmptyState({
  icon: Icon,
  heading,
  subtext,
  ctaLabel,
  ctaHref,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-8 py-16 text-center">
      <div className="mb-4 rounded-full bg-gray-50 p-4">
        <Icon className="h-8 w-8 text-gray-400" aria-hidden />
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--ch-navy)]">
        {heading}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-gray-600">{subtext}</p>
      {ctaLabel && ctaHref && (
        <Link
          href={ctaHref}
          className="mt-6 rounded-full bg-[var(--ch-teal)] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--ch-teal-light)]"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
