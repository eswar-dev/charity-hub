import { auditLog } from "@/data/adminQueue";

export function AuditLog({ limit = 10 }: { limit?: number }) {
  return (
    <ul className="divide-y divide-gray-50">
      {auditLog.slice(0, limit).map((entry) => (
        <li key={entry.id} className="flex gap-4 py-3 text-sm">
          <span className="font-mono shrink-0 text-xs text-gray-400">
            {entry.timestamp}
          </span>
          <div>
            <span className="font-medium text-gray-800">{entry.actor}</span>
            <p className="text-gray-600">{entry.action}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
