import { CdnImage } from "@/components/shared/CdnImage";

export interface ParticipationCounterProps {
  participantCount: number;
  goalCount?: number;
  label?: string;
  showAvatars?: boolean;
  avatarKeys?: string[];
  size?: "sm" | "md" | "lg";
  raisedAmount?: number;
  raisedGoal?: number;
}

const sizeClasses = {
  sm: { count: "text-lg", label: "text-xs", avatars: 24 },
  md: { count: "text-2xl", label: "text-sm", avatars: 28 },
  lg: { count: "text-5xl", label: "text-base", avatars: 32 },
};

export function ParticipationCounter({
  participantCount,
  goalCount,
  label = "participating",
  showAvatars = true,
  avatarKeys = ["donations/maria", "donations/james", "donations/elena"],
  size = "md",
  raisedAmount,
  raisedGoal,
}: ParticipationCounterProps) {
  const s = sizeClasses[size];
  const pct = goalCount
    ? Math.min(100, Math.round((participantCount / goalCount) * 100))
    : Math.min(100, Math.round((participantCount / 100) * 100));

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {showAvatars && (
            <div className="flex -space-x-2">
              {avatarKeys.slice(0, 3).map((key) => (
                <CdnImage
                  key={key}
                  src={key}
                  alt=""
                  width={s.avatars}
                  height={s.avatars}
                  className="rounded-full border-2 border-white object-cover"
                  cdnOptions={{ width: s.avatars * 2, height: s.avatars * 2, fit: "cover" }}
                />
              ))}
            </div>
          )}
          <div>
            <p
              className={`font-semibold text-[var(--ch-navy)] ${s.count}`}
              style={size === "lg" ? { fontFamily: "var(--font-impact)" } : undefined}
            >
              {participantCount.toLocaleString()}
            </p>
            <p className={`text-gray-600 ${s.label}`}>
              {participantCount === 1 ? "person" : "people"} {label}
            </p>
          </div>
        </div>
        {raisedAmount !== undefined && (
          <p className="text-right text-xs text-gray-500">
            ${raisedAmount.toLocaleString()}
            {raisedGoal !== undefined && ` raised of $${raisedGoal.toLocaleString()}`}
          </p>
        )}
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--ch-teal)] to-[var(--ch-teal-light)] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
