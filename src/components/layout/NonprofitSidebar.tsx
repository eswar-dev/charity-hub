"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  Rocket,
  Calendar,
  CheckSquare,
  Settings,
  UserPlus,
  Rss,
  Compass,
  Trophy,
} from "lucide-react";

const communityLinks = [
  { href: "/feed", label: "Feed", icon: Rss },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/compete", label: "Competition", icon: Trophy },
];

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

function NavLink({
  href,
  label,
  icon: Icon,
  badge,
  active,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  active: boolean;
}) {
  return (
    <Link
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
}

export function NonprofitSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-4 p-3" aria-label="Nonprofit navigation">
      <div>
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Community
        </p>
        <div className="space-y-1">
          {communityLinks.map((item) => (
            <NavLink
              key={item.href}
              {...item}
              active={
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              }
            />
          ))}
        </div>
      </div>
      <div className="space-y-1">
        {links.map((item) => (
          <NavLink
            key={item.href}
            {...item}
            active={pathname.startsWith(item.href)}
          />
        ))}
      </div>
    </nav>
  );
}
