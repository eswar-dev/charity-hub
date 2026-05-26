"use client";

import Link from "next/link";
import { useState } from "react";

const TEAL = "#0D7377";
const NAVY = "#0F2A4A";
const GRAY = "#6B7280";

interface NodeDef {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  shape: "rect" | "rounded" | "diamond" | "circle";
  stroke?: string;
  href?: string;
}

const nodes: NodeDef[] = [
  { id: "start", x: 420, y: 24, w: 24, h: 24, label: "", shape: "circle", stroke: GRAY },
  {
    id: "discover",
    x: 340,
    y: 64,
    w: 220,
    h: 44,
    label: "Nonprofit discovers Charity Hub",
    shape: "rounded",
    stroke: TEAL,
    href: "/",
  },
  {
    id: "start-reg",
    x: 340,
    y: 124,
    w: 220,
    h: 44,
    label: "Start nonprofit registration",
    shape: "rect",
    stroke: TEAL,
    href: "/nonprofit/onboarding",
  },
  {
    id: "details",
    x: 340,
    y: 184,
    w: 220,
    h: 44,
    label: "Enter organization details",
    shape: "rect",
    stroke: TEAL,
    href: "/nonprofit/onboarding",
  },
  {
    id: "profile",
    x: 340,
    y: 244,
    w: 220,
    h: 44,
    label: "Create charity profile",
    shape: "rect",
    stroke: TEAL,
  },
  {
    id: "upload",
    x: 340,
    y: 304,
    w: 220,
    h: 44,
    label: "Upload logo / profile assets placeholder",
    shape: "rect",
    stroke: TEAL,
  },
  {
    id: "terms",
    x: 340,
    y: 364,
    w: 220,
    h: 44,
    label: "Accept terms and verification attestation",
    shape: "rect",
    stroke: TEAL,
  },
  {
    id: "phase2",
    x: 385,
    y: 432,
    w: 130,
    h: 90,
    label: "Phase 2 / MMVP.0?",
    shape: "diamond",
    stroke: GRAY,
  },
  {
    id: "demo",
    x: 48,
    y: 560,
    w: 200,
    h: 44,
    label: "Show front-end demo flow only",
    shape: "rect",
    stroke: TEAL,
    href: "/nonprofit/onboarding",
  },
  {
    id: "pending",
    x: 48,
    y: 620,
    w: 200,
    h: 44,
    label: 'Show "Pending Review" state',
    shape: "rect",
    stroke: TEAL,
    href: "/nonprofit/onboarding",
  },
  {
    id: "launchpad-prev",
    x: 48,
    y: 680,
    w: 200,
    h: 44,
    label: "Show Launchpad preview",
    shape: "rect",
    stroke: TEAL,
    href: "/nonprofit/launchpad",
  },
  { id: "end-left", x: 136, y: 760, w: 24, h: 24, label: "", shape: "circle", stroke: GRAY },
  {
    id: "submit",
    x: 620,
    y: 560,
    w: 220,
    h: 44,
    label: "Submit nonprofit application",
    shape: "rect",
    stroke: TEAL,
    href: "/nonprofit/onboarding",
  },
  {
    id: "admin-review",
    x: 665,
    y: 640,
    w: 130,
    h: 90,
    label: "Charity Hub Admin reviews submission",
    shape: "diamond",
    stroke: NAVY,
    href: "/admin/review-queue",
  },
  {
    id: "verify",
    x: 665,
    y: 760,
    w: 130,
    h: 90,
    label: "Verification complete?",
    shape: "diamond",
    stroke: NAVY,
  },
  {
    id: "more-info",
    x: 880,
    y: 760,
    w: 200,
    h: 44,
    label: "Request additional information",
    shape: "rect",
    stroke: NAVY,
    href: "/admin/review-queue",
  },
  {
    id: "update",
    x: 880,
    y: 820,
    w: 200,
    h: 44,
    label: "Nonprofit updates submission",
    shape: "rect",
    stroke: TEAL,
  },
  {
    id: "resubmit",
    x: 880,
    y: 880,
    w: 200,
    h: 44,
    label: "Resubmit nonprofit application",
    shape: "rect",
    stroke: TEAL,
  },
  {
    id: "still-incomplete",
    x: 915,
    y: 948,
    w: 130,
    h: 90,
    label: "Verification still incomplete?",
    shape: "diamond",
    stroke: NAVY,
  },
  {
    id: "approve",
    x: 620,
    y: 880,
    w: 200,
    h: 44,
    label: "Approve nonprofit",
    shape: "rect",
    stroke: NAVY,
    href: "/admin/review-queue",
  },
  {
    id: "activate",
    x: 620,
    y: 940,
    w: 200,
    h: 44,
    label: "Activate Launchpad access",
    shape: "rect",
    stroke: NAVY,
    href: "/nonprofit/launchpad",
  },
  {
    id: "assign",
    x: 620,
    y: 1000,
    w: 200,
    h: 44,
    label: "Assign primary admin",
    shape: "rect",
    stroke: NAVY,
  },
  {
    id: "enable",
    x: 620,
    y: 1060,
    w: 200,
    h: 44,
    label: "Enable event participation controls",
    shape: "rect",
    stroke: NAVY,
  },
  {
    id: "ready",
    x: 580,
    y: 1120,
    w: 280,
    h: 44,
    label: "Nonprofit ready to receive event requests",
    shape: "rounded",
    stroke: TEAL,
    href: "/nonprofit/launchpad",
  },
  { id: "end-right", x: 718, y: 1200, w: 24, h: 24, label: "", shape: "circle", stroke: GRAY },
];

function center(n: NodeDef) {
  return { cx: n.x + n.w / 2, cy: n.y + n.h / 2 };
}

function bottom(n: NodeDef) {
  return { x: n.x + n.w / 2, y: n.y + n.h };
}

function top(n: NodeDef) {
  return { x: n.x + n.w / 2, y: n.y };
}

function left(n: NodeDef) {
  return { x: n.x, y: n.y + n.h / 2 };
}

function right(n: NodeDef) {
  return { x: n.x + n.w, y: n.y + n.h / 2 };
}

function getNode(id: string) {
  const n = nodes.find((node) => node.id === id);
  if (!n) throw new Error(`Missing node ${id}`);
  return n;
}

function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  label?: string
) {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g key={`${x1}-${y1}-${x2}-${y2}-${label}`}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#94A3B8" strokeWidth={2} markerEnd="url(#arr)" />
      {label && (
        <text x={midX} y={midY - 6} textAnchor="middle" className="fill-gray-600 text-[11px] font-semibold">
          {label}
        </text>
      )}
    </g>
  );
}

function FlowNode({
  node,
  hovered,
  onHover,
}: {
  node: NodeDef;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  const color = node.stroke ?? TEAL;
  const isHover = hovered === node.id;

  if (node.shape === "circle") {
    const c = center(node);
    const r = node.w / 2;
    const filled = node.id === "start";
    return (
      <g
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
      >
        <circle
          cx={c.cx}
          cy={c.cy}
          r={r}
          fill={filled ? "#111827" : "white"}
          stroke={filled ? "#111827" : color}
          strokeWidth={2}
        />
        {isHover && node.href && (
          <foreignObject x={c.cx - 60} y={c.cy + r + 6} width={120} height={24}>
            <Link href={node.href} className="block text-center text-[10px] font-medium text-[var(--ch-teal)] hover:underline">
              Go to screen →
            </Link>
          </foreignObject>
        )}
      </g>
    );
  }

  if (node.shape === "diamond") {
    const c = center(node);
    const pts = `${c.cx},${node.y} ${node.x + node.w},${c.cy} ${c.cx},${node.y + node.h} ${node.x},${c.cy}`;
    return (
      <g
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
      >
        <polygon
          points={pts}
          fill="white"
          stroke={color}
          strokeWidth={2}
          filter={isHover ? "url(#shadow)" : undefined}
        />
        <foreignObject x={node.x + 8} y={node.y + 12} width={node.w - 16} height={node.h - 24}>
          <p className="text-center text-[10px] font-medium leading-tight text-gray-800">
            {node.label}
          </p>
        </foreignObject>
        {isHover && node.href && (
          <foreignObject x={node.x} y={node.y + node.h + 4} width={node.w} height={24}>
            <Link href={node.href} className="block text-center text-[10px] font-medium text-[var(--ch-teal)] hover:underline">
              Go to screen →
            </Link>
          </foreignObject>
        )}
      </g>
    );
  }

  return (
    <g
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={node.shape === "rounded" ? 14 : 6}
        fill="white"
        stroke={color}
        strokeWidth={2}
        filter={isHover ? "url(#shadow)" : undefined}
      />
      <foreignObject x={node.x + 6} y={node.y + 6} width={node.w - 12} height={node.h - 12}>
        <p className="flex h-full items-center justify-center text-center text-[11px] font-medium leading-snug text-gray-800">
          {node.label}
        </p>
      </foreignObject>
      {isHover && node.href && (
        <foreignObject x={node.x} y={node.y + node.h + 4} width={node.w} height={24}>
          <Link href={node.href} className="block text-center text-[10px] font-medium text-[var(--ch-teal)] hover:underline">
            Go to screen →
          </Link>
        </foreignObject>
      )}
    </g>
  );
}

export function NonprofitOnboardingFlowDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);

  const start = getNode("start");
  const discover = getNode("discover");
  const startReg = getNode("start-reg");
  const details = getNode("details");
  const profile = getNode("profile");
  const upload = getNode("upload");
  const terms = getNode("terms");
  const phase2 = getNode("phase2");
  const demo = getNode("demo");
  const pending = getNode("pending");
  const launchpad = getNode("launchpad-prev");
  const endLeft = getNode("end-left");
  const submit = getNode("submit");
  const adminReview = getNode("admin-review");
  const verify = getNode("verify");
  const moreInfo = getNode("more-info");
  const update = getNode("update");
  const resubmit = getNode("resubmit");
  const stillInc = getNode("still-incomplete");
  const approve = getNode("approve");
  const activate = getNode("activate");
  const assign = getNode("assign");
  const enable = getNode("enable");
  const ready = getNode("ready");
  const endRight = getNode("end-right");

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-[#FAFAF7] p-4 md:p-8">
      <h2 className="font-display mb-2 text-center text-2xl font-bold text-[#1a1a1a] md:text-3xl">
        501(c)(3) Nonprofit Onboarding Lifecycle
      </h2>
      <p className="mb-6 text-center text-sm text-gray-500">
        Hover nodes to highlight · Linked screens show &quot;Go to screen&quot;
      </p>
      <svg
        viewBox="0 0 1120 1280"
        className="mx-auto min-w-[900px] w-full max-w-[1120px]"
        role="img"
        aria-label="501(c)(3) Nonprofit Onboarding Lifecycle flowchart"
      >
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#94A3B8" />
          </marker>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Phase branch labels */}
        <text x={148} y={540} textAnchor="middle" className="fill-[#0D7377] text-xs font-bold">
          Phase 2 / MMVP.0
        </text>
        <text x={730} y={540} textAnchor="middle" className="fill-[#0F2A4A] text-xs font-bold">
          Phase 3 / SOW-2
        </text>

        {/* Sticky notes */}
        <foreignObject x={580} y={178} width={200} height={88}>
          <div className="rounded-md border-2 border-amber-300 bg-amber-50 px-2 py-1.5 text-[9px] leading-tight text-amber-950 shadow-sm">
            <strong>Typical fields:</strong> EIN, Organization name, Address, Contact email, Mission, Cause category
          </div>
        </foreignObject>
        <foreignObject x={260} y={668} width={200} height={72}>
          <div className="rounded-md border-2 border-amber-300 bg-amber-50 px-2 py-1.5 text-[9px] leading-tight text-amber-950 shadow-sm">
            No real EIN verification, no real document storage, no backend approval workflow
          </div>
        </foreignObject>
        <foreignObject x={880} y={520} width={180} height={36}>
          <div className="rounded-md border-2 border-amber-300 bg-amber-50 px-2 py-1 text-[9px] text-amber-950">
            Real EIN validation — Phase 3 / SOW-2
          </div>
        </foreignObject>

        {/* Main trunk */}
        {line(bottom(start).x, bottom(start).y, top(discover).x, top(discover).y)}
        {line(bottom(discover).x, bottom(discover).y, top(startReg).x, top(startReg).y)}
        {line(bottom(startReg).x, bottom(startReg).y, top(details).x, top(details).y)}
        {line(bottom(details).x, bottom(details).y, top(profile).x, top(profile).y)}
        {line(bottom(profile).x, bottom(profile).y, top(upload).x, top(upload).y)}
        {line(bottom(upload).x, bottom(upload).y, top(terms).x, top(terms).y)}
        {line(bottom(terms).x, bottom(terms).y, top(phase2).x, top(phase2).y)}

        {/* Phase 2 — Yes (left) */}
        {line(left(phase2).x, left(phase2).y, right(demo).x, right(demo).y, "Yes")}
        {line(bottom(demo).x, bottom(demo).y, top(pending).x, top(pending).y)}
        {line(bottom(pending).x, bottom(pending).y, top(launchpad).x, top(launchpad).y)}
        {line(bottom(launchpad).x, bottom(launchpad).y, top(endLeft).x, top(endLeft).y)}

        {/* Phase 3 — No (right) */}
        {line(right(phase2).x, right(phase2).y, left(submit).x, left(submit).y, "No")}
        {line(bottom(submit).x, bottom(submit).y, top(adminReview).x, top(adminReview).y)}
        {line(bottom(adminReview).x, bottom(adminReview).y, top(verify).x, top(verify).y)}

        {/* Verify Yes → approve chain */}
        {line(left(verify).x, left(verify).y, right(approve).x, right(approve).y, "Yes")}
        {line(bottom(approve).x, bottom(approve).y, top(activate).x, top(activate).y)}
        {line(bottom(activate).x, bottom(activate).y, top(assign).x, top(assign).y)}
        {line(bottom(assign).x, bottom(assign).y, top(enable).x, top(enable).y)}
        {line(bottom(enable).x, bottom(enable).y, top(ready).x, top(ready).y)}
        {line(bottom(ready).x, bottom(ready).y, top(endRight).x, top(endRight).y)}

        {/* Verify No → more info loop */}
        {line(right(verify).x, right(verify).y, left(moreInfo).x, left(moreInfo).y, "No")}
        {line(bottom(moreInfo).x, bottom(moreInfo).y, top(update).x, top(update).y)}
        {line(bottom(update).x, bottom(update).y, top(resubmit).x, top(resubmit).y)}
        {line(bottom(resubmit).x, bottom(resubmit).y, top(stillInc).x, top(stillInc).y)}
        {line(left(stillInc).x, left(stillInc).y, right(adminReview).x, right(adminReview).y + 20, "Yes")}
        {line(bottom(stillInc).x, bottom(stillInc).y, top(approve).x, top(approve).y - 40, "No")}

        {/* Loop back from admin to review (implicit via still incomplete yes) */}
        <path
          d={`M ${left(adminReview).x} ${top(adminReview).y - 8} L ${left(adminReview).x - 40} ${top(adminReview).y - 8} L ${left(adminReview).x - 40} ${top(submit).y - 20} L ${top(submit).x} ${top(submit).y - 20}`}
          fill="none"
          stroke="#94A3B8"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          opacity={0.4}
        />

        {nodes.map((node) => (
          <FlowNode
            key={node.id}
            node={node}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </svg>
    </div>
  );
}
