"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Rocket,
  Calendar,
  CheckSquare,
  Settings,
  UserPlus,
} from "lucide-react";

const links = [
  { href: "/nonprofit/launchpad", label: "Launchpad", icon: Rocket },
  { href: "/nonprofit/events", label: "Events", icon: Calendar },
  {
    href: "/nonprofit/approvals",
    label: "SE Approvals",
    icon: CheckSquare,
    badge: 2,
  },
  { href: "/nonprofit/onboarding", label: "Onboarding", icon: UserPlus },
  { href: "/nonprofit/settings", label: "Settings", icon: Settings },
];

export function NonprofitSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 p-3" aria-label="Nonprofit navigation">
      {links.map(({ href, label, icon: Icon, badge }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition ${
              active
                ? "border-l-4 border-[var(--ch-teal)] bg-teal-50/80 font-medium text-[var(--ch-teal)]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="flex items-center gap-3">
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </span>
            {badge !== undefined && (
              <span className="rounded-full bg-amber-100 px-2 text-xs font-medium text-amber-800">
                {badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
