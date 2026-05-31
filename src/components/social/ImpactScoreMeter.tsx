interface ImpactScoreMeterProps {
  score: number;
  maxScore?: number;
  label?: string;
  percentile?: string;
  size?: number;
}

export function ImpactScoreMeter({
  score,
  maxScore = 20000,
  label = "IMPACT SCORE",
  percentile,
  size = 140,
}: ImpactScoreMeterProps) {
  const pct = Math.min(1, score / maxScore);
  const r = (size - 16) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * 0.75;
  const offset = arcLength * (1 - pct);

  return (
    <div className="text-center" style={{ width: size }}>
      <p className="text-[10px] font-semibold tracking-widest text-gray-500">
        {label}
      </p>
      <svg width={size} height={size} className="mx-auto" aria-hidden>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={10}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--ch-teal)"
          strokeWidth={10}
          strokeDasharray={`${arcLength - offset} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
        />
      </svg>
      <p
        className="font-impact relative -mt-[4.85rem] text-4xl font-bold leading-none text-[var(--ch-teal)]"
        style={{ fontFamily: "var(--font-impact)" }}
      >
        {score.toLocaleString()}
      </p>
      {percentile && (
        <p className="relative pt-2 mt-3 max-w-[12rem] text-xs leading-snug text-gray-500">
          {percentile}
        </p>
      )}
    </div>
  );
}
