import Link from "next/link";
import { CdnImage } from "@/components/shared/CdnImage";
import { nonprofits } from "@/data/nonprofits";
import { StatusBadge } from "@/components/shared/StatusBadge";

export default function AdminNonprofitsPage() {
  return (
    <div>
      <Link href="/admin" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <h1 className="font-display mt-4 text-3xl font-semibold text-[var(--ch-navy)]">
        Nonprofit Management
      </h1>
      <div className="mt-6 grid gap-4">
        {nonprofits.map((np) => (
          <div
            key={np.id}
            className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-sm"
          >
            <CdnImage src={np.logo} alt="" width={48} height={48} className="rounded-xl" cdnOptions={{ width: 96, height: 96 }} />
            <div className="flex-1">
              <h3 className="font-semibold">{np.name}</h3>
              <p className="font-mono text-xs text-gray-500">EIN {np.ein}</p>
            </div>
            <StatusBadge status={np.status} />
            <StatusBadge status={np.settlementStatus === "Pending" ? "Settlement Pending" : "Active"} />
          </div>
        ))}
      </div>
    </div>
  );
}
