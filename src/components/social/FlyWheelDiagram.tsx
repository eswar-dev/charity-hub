export function FlyWheelDiagram() {
  const nodes = [
    { label: "Verified 501(c)(3)", color: "var(--ch-navy)", angle: -90 },
    { label: "Social Entrepreneur", color: "var(--compete-purple)", angle: -30 },
    { label: "Content Feed", color: "var(--ch-teal)", angle: 30 },
    { label: "Participation", color: "var(--ch-coral)", angle: 90 },
    { label: "Donations", color: "var(--ch-sage)", angle: 150 },
    { label: "Impact + Growth", color: "var(--ch-amber)", angle: 210 },
  ];

  const cx = 200;
  const cy = 200;
  const radius = 130;

  return (
    <div className="mx-auto w-full max-w-md md:max-w-lg">
      <svg viewBox="0 0 400 400" className="w-full" aria-label="Competition For Good flywheel">
        <circle
          cx={cx}
          cy={cy}
          r={radius + 20}
          fill="none"
          stroke="#E5E7EB"
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
          return (
            <g key={node.label}>
              <path
                d={`M ${cx + Math.cos(rad) * (radius - 30)} ${cy + Math.sin(rad) * (radius - 30)} Q ${cx} ${cy} ${x2} ${y2}`}
                fill="none"
                stroke={node.color}
                strokeWidth={2}
                markerEnd="url(#fw-arrow)"
                className="flywheel-arrow"
                opacity={0.6}
              />
              <rect
                x={x}
                y={y}
                width={110}
                height={36}
                rx={8}
                fill="white"
                stroke={node.color}
                strokeWidth={2}
              />
              <text
                x={x + 55}
                y={y + 22}
                textAnchor="middle"
                className="fill-gray-800 text-[9px] font-medium"
              >
                {node.label}
              </text>
            </g>
          );
        })}
        <defs>
          <marker id="fw-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#94A3B8" />
          </marker>
        </defs>
        <circle cx={cx} cy={cy} r={48} fill="var(--ch-teal)" opacity={0.1} />
        <text x={cx} y={cy - 6} textAnchor="middle" className="fill-[var(--ch-teal)] text-xs font-bold">
          Charity Hub
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="fill-gray-600 text-[9px]">
          Competition For Good
        </text>
      </svg>
      <p className="mt-4 text-center text-sm italic text-gray-600">
        The flywheel&apos;s job is to amplify what creates the most good. More impact = more
        positive outcomes for the world.
      </p>
    </div>
  );
}
