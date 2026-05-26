import Link from "next/link";
import { PhaseBanner } from "@/components/shared/PhaseBanner";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function AdminPaymentsPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <h1 className="font-display mt-4 text-3xl font-semibold text-[var(--ch-navy)]">
        Payment & Payout Issues
      </h1>
      <PhaseBanner
        phase="3"
        message="Stripe integration and payout reconciliation are Phase 3 / SOW-2."
      />
      <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
        <p className="font-mono text-sm">TXN-8842</p>
        <p className="mt-2 font-semibold">GreenPath Foundation — $1,240</p>
        <p className="text-sm text-gray-600">Payout delayed — Stripe webhook</p>
        <div className="mt-4">
          <StatusBadge status="Escalated" />
        </div>
        <button
          type="button"
          disabled
          className="mt-4 cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-500"
        >
          Open in Stripe Dashboard (Phase 3)
        </button>
      </div>
    </div>
  );
}
