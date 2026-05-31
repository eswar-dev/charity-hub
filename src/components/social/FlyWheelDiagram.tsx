type FlyWheelVariant = "default" | "onDark";

const nodes = [
  { label: "Verified 501(c)(3)", color: "var(--ch-navy)", angle: -90 },
  { label: "Social Entrepreneur", color: "var(--compete-purple)", angle: -30 },
  { label: "Content Feed", color: "var(--ch-teal)", angle: 30 },
  { label: "Participation", color: "var(--ch-coral)", angle: 90 },
  { label: "Donations", color: "var(--ch-sage)", angle: 150 },
  { label: "Impact + Growth", color: "var(--ch-amber)", angle: 210 },
];

export function FlyWheelDiagram({ variant = "default" }: { variant?: FlyWheelVariant }) {
  const onDark = variant === "onDark";

  const cx = 200;
  const cy = 200;
  const radius = 130;

  const ringStroke = onDark ? "rgba(255,255,255,0.35)" : "#E5E7EB";
  const nodeFill = onDark ? "#ffffff" : "#ffffff";
  const nodeTextFill = onDark ? "#0f2a4a" : "#1f2937";
  const centerHubFill = onDark ? "rgba(255,255,255,0.12)" : "var(--ch-teal)";
  const centerHubOpacity = onDark ? 1 : 0.1;
  const centerTitleFill = onDark ? "#ffffff" : "var(--ch-teal)";
  const centerSubFill = onDark ? "rgba(255,255,255,0.85)" : "#4b5563";
  const captionClass = onDark
    ? "mt-4 text-center text-sm italic text-white/90"
    : "mt-4 text-center text-sm italic text-gray-600";

  return (
    <div className="mx-auto w-full max-w-md md:max-w-lg">
      <svg viewBox="0 0 400 400" className="w-full" aria-label="Competition For Good flywheel">
        <circle
          cx={cx}
          cy={cy}
          r={radius + 20}
          fill="none"
          stroke={ringStroke}
          strokeWidth={2}
          strokeDasharray="8 6"
          className="flywheel-arrow"
        />
        {nodes.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * radius - 55;
          const y = cy + Math.sin(rad) * radius - 18;
          const next = nodes[(i + 1) % nodes.length];
          const rad2 = (next.angle * Math.PI) / 180;
          const x2 = cx + Math.cos(rad2) * radius;
          const y2 = cy + Math.sin(rad2) * radius;
          const connectorStroke = onDark ? "rgba(255,255,255,0.45)" : node.color;

          return (
            <g key={node.label}>
              <path
                d={`M ${cx + Math.cos(rad) * (radius - 30)} ${cy + Math.sin(rad) * (radius - 30)} Q ${cx} ${cy} ${x2} ${y2}`}
                fill="none"
                stroke={connectorStroke}
                strokeWidth={2}
                markerEnd="url(#fw-arrow)"
                className="flywheel-arrow"
                opacity={onDark ? 0.9 : 0.6}
              />
              <rect
                x={x}
                y={y}
                width={110}
                height={36}
                rx={8}
                fill={nodeFill}
                stroke={node.color}
                strokeWidth={2}
              />
              <text
                x={x + 55}
                y={y + 22}
                textAnchor="middle"
                fill={nodeTextFill}
                fontSize={9}
                fontWeight={600}
                fontFamily="var(--font-body), system-ui, sans-serif"
              >
                {node.label}
              </text>
            </g>
          );
        })}
        <defs>
          <marker
            id="fw-arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill={onDark ? "rgba(255,255,255,0.6)" : "#94A3B8"} />
          </marker>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={48}
          fill={centerHubFill}
          opacity={centerHubOpacity}
        />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          fill={centerTitleFill}
          fontSize={12}
          fontWeight={700}
          fontFamily="var(--font-display), Georgia, serif"
        >
          Charity Hub
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fill={centerSubFill}
          fontSize={9}
          fontFamily="var(--font-body), system-ui, sans-serif"
        >
          Competition For Good
        </text>
      </svg>
      <p className={captionClass}>
        The flywheel&apos;s job is to amplify what creates the most good. More impact = more
        positive outcomes for the world.
      </p>
    </div>
  );
}
