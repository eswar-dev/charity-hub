interface DonationProgressProps {
  raised: number;
  goal: number;
  showLabels?: boolean;
  daysLeft?: number;
}

export function DonationProgress({
  raised,
  goal,
  showLabels = true,
  daysLeft,
}: DonationProgressProps) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));

  return (
    <div className="w-full">
      {showLabels && (
        <div className="mb-2 flex justify-between text-sm">
          <span className="font-medium text-[var(--ch-navy)]">
            ${raised.toLocaleString()} raised
          </span>
          <span className="text-gray-500">
            of ${goal.toLocaleString()} goal
            {daysLeft !== undefined && ` · ${daysLeft} days left`}
          </span>
        </div>
      )}
      <div className="relative h-3 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--ch-teal)] to-[var(--ch-teal-light)] transition-all duration-700"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={raised}
          aria-valuemin={0}
          aria-valuemax={goal}
          aria-label={`${pct}% of goal raised`}
        />
        {[25, 50, 75].map((m) => (
          <div
            key={m}
            className="absolute top-0 h-full w-px bg-white/40"
            style={{ left: `${m}%` }}
          />
        ))}
      </div>
      {showLabels && (
        <p className="mt-1 text-xs text-gray-500">{pct}% to goal</p>
      )}
    </div>
  );
}
