"use client";

import Link from "next/link";
import { useState } from "react";
import type { FlowDefinition } from "@/types";

const personaColors: Record<string, string> = {
  nonprofit: "#0D7377",
  se: "#7C3AED",
  admin: "#0F2A4A",
  donor: "#DB2777",
  system: "#6B7280",
};

interface FlowDiagramProps {
  flow: FlowDefinition;
}

export function FlowDiagram({ flow }: FlowDiagramProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const nodeWidth = 140;
  const nodeHeight = 48;

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white p-6">
      <h2 className="font-display mb-6 text-2xl font-semibold text-[var(--ch-navy)]">
        {flow.title}
      </h2>
      <svg
        viewBox="0 0 900 600"
        className="min-w-[900px] w-full"
        role="img"
        aria-label={`Flow diagram: ${flow.title}`}
      >
        {flow.swimLanes?.map((lane) => (
          <g key={lane.label}>
            <rect
              x={0}
              y={lane.y}
              width={900}
              height={lane.height}
              fill="rgba(0,0,0,0.02)"
              stroke="#E5E7EB"
              strokeDasharray="4"
            />
            <text
              x={12}
              y={lane.y + 20}
              className="text-xs font-semibold fill-gray-500"
            >
              {lane.label}
            </text>
          </g>
        ))}

        {flow.edges.map((edge, i) => {
          const from = flow.nodes.find((n) => n.id === edge.from);
          const to = flow.nodes.find((n) => n.id === edge.to);
          if (!from || !to) return null;
          const x1 = from.x + nodeWidth / 2;
          const y1 = from.y + nodeHeight;
          const x2 = to.x + nodeWidth / 2;
          const y2 = to.y;
          const midY = (y1 + y2) / 2;
          return (
            <g key={`edge-${i}`}>
              <path
                d={`M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`}
                fill="none"
                stroke="#CBD5E1"
                strokeWidth={2}
                markerEnd="url(#arrow)"
              />
              {edge.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={midY}
                  textAnchor="middle"
                  className="text-[10px] fill-gray-500 font-medium"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill="#CBD5E1" />
          </marker>
        </defs>

        {flow.annotations?.map((ann) => (
          <foreignObject
            key={ann.id}
            x={ann.x}
            y={ann.y}
            width={160}
            height={72}
          >
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-[10px] leading-tight text-amber-900 shadow-sm">
              {ann.text}
            </div>
          </foreignObject>
        ))}

        {flow.nodes.map((node) => {
          const color = personaColors[node.persona];
          const isHovered = hovered === node.id;
          const w = node.shape === "diamond" ? 100 : nodeWidth;
          const h = node.shape === "diamond" ? 100 : nodeHeight;
          const x = node.x + (nodeWidth - w) / 2;
          const y = node.y;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                transform: isHovered ? "scale(1.03)" : "scale(1)",
                transformOrigin: `${node.x + nodeWidth / 2}px ${node.y + nodeHeight / 2}px`,
                transition: "transform 0.15s",
              }}
            >
              {node.shape === "diamond" ? (
                <polygon
                  points={`${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}`}
                  fill="white"
                  stroke={color}
                  strokeWidth={2}
                  filter={isHovered ? "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" : undefined}
                />
              ) : node.shape === "circle" ? (
                <ellipse
                  cx={node.x + nodeWidth / 2}
                  cy={node.y + nodeHeight / 2}
                  rx={nodeWidth / 2 - 10}
                  ry={nodeHeight / 2}
                  fill={color}
                  stroke={color}
                />
              ) : (
                <rect
                  x={node.x}
                  y={node.y}
                  width={nodeWidth}
                  height={nodeHeight}
                  rx={node.shape === "rounded" ? 16 : 8}
                  fill="white"
                  stroke={color}
                  strokeWidth={2}
                  filter={isHovered ? "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" : undefined}
                />
              )}
              <text
                x={node.x + nodeWidth / 2}
                y={node.y + nodeHeight / 2 + 4}
                textAnchor="middle"
                className={`text-[11px] font-medium ${node.shape === "circle" ? "fill-white" : "fill-gray-800"}`}
              >
                {node.label.length > 18
                  ? `${node.label.slice(0, 16)}…`
                  : node.label}
              </text>
              {isHovered && node.href && (
                <foreignObject
                  x={node.x}
                  y={node.y + nodeHeight + 4}
                  width={nodeWidth}
                  height={28}
                >
                  <Link
                    href={node.href}
                    className="block text-center text-[10px] font-medium text-[var(--ch-teal)] hover:underline"
                  >
                    Go to screen →
                  </Link>
                </foreignObject>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
