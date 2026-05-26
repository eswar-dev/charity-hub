import { BadgeCheck, Shield } from "lucide-react";

interface TrustSignalsProps {
  ein?: string;
  compact?: boolean;
}

export function TrustSignals({ ein, compact = false }: TrustSignalsProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}
    >
      <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 font-medium text-teal-800">
        <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
        EIN Verified
      </span>
      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 font-medium text-green-800">
        <Shield className="h-3.5 w-3.5" aria-hidden />
        Registered 501(c)(3)
      </span>
      {ein && (
        <span className="font-mono text-gray-500">EIN: {ein}</span>
      )}
    </div>
  );
}
