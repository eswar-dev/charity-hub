import type { LifecycleStatus } from "@/types";

const statusStyles: Record<string, { bg: string; text: string }> = {
  Draft: { bg: "bg-gray-100", text: "text-gray-700" },
  Submitted: { bg: "bg-blue-50", text: "text-blue-700" },
  "Pending Review": { bg: "bg-amber-50", text: "text-amber-700" },
  "More Info Needed": { bg: "bg-orange-50", text: "text-orange-700" },
  Approved: { bg: "bg-teal-50", text: "text-teal-700" },
  Active: { bg: "bg-green-100", text: "text-green-800" },
  Live: { bg: "bg-green-100", text: "text-green-800" },
  Published: { bg: "bg-green-100", text: "text-green-800" },
  "Changes Requested": { bg: "bg-purple-50", text: "text-purple-700" },
  Rejected: { bg: "bg-red-50", text: "text-red-700" },
  Cancelled: { bg: "bg-gray-200", text: "text-gray-500" },
  "Settlement Pending": { bg: "bg-amber-100", text: "text-amber-800" },
  Completed: { bg: "bg-indigo-50", text: "text-indigo-700" },
  "Pending Approval": { bg: "bg-amber-50", text: "text-amber-700" },
  "In Review": { bg: "bg-blue-50", text: "text-blue-700" },
  Escalated: { bg: "bg-red-50", text: "text-red-700" },
};

interface StatusBadgeProps {
  status: LifecycleStatus | string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const style = statusStyles[status] ?? {
    bg: "bg-gray-100",
    text: "text-gray-700",
  };

  return (
    <span
      className={`font-mono inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${style.bg} ${style.text} ${className}`}
    >
      {status}
    </span>
  );
}
