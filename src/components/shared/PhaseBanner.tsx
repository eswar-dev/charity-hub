import { Info, AlertTriangle } from "lucide-react";

interface PhaseBannerProps {
  phase: "2" | "3";
  message: string;
  sticky?: boolean;
}

export function PhaseBanner({ phase, message, sticky = false }: PhaseBannerProps) {
  const isPhase2 = phase === "2";
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
        isPhase2
          ? "border-blue-200 bg-[var(--phase-2-bg)] text-[var(--phase-2-text)]"
          : "border-orange-200 bg-[var(--phase-3-bg)] text-[var(--phase-3-text)]"
      } ${sticky ? "sticky top-16 z-30" : ""}`}
      role="note"
    >
      {isPhase2 ? (
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      ) : (
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
      )}
      <p>
        <span className="font-semibold">
          {isPhase2 ? "Phase 2 / MMVP.0" : "Phase 3 / SOW-2"} —{" "}
        </span>
        {message}
      </p>
    </div>
  );
}
