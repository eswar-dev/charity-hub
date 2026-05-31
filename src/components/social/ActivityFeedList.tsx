import Link from "next/link";
import { CdnImage } from "@/components/shared/CdnImage";
import type { ActivityItem } from "@/data/activityFeed";

export function ActivityFeedList({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            className="flex items-center gap-3 rounded-lg p-2 text-sm transition-colors hover:bg-gray-50"
          >
            {item.avatarKey && (
              <CdnImage
                src={item.avatarKey}
                alt=""
                width={32}
                height={32}
                className="rounded-full object-cover"
                cdnOptions={{ width: 64, height: 64, fit: "cover" }}
              />
            )}
            <span className="flex-1 text-gray-700">{item.text}</span>
            <span className="shrink-0 text-xs text-gray-400">{item.time}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
