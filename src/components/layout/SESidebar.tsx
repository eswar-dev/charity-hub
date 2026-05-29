"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  UserPlus,
  Rss,
  Compass,
  PenLine,
  Trophy,
  Medal,
  User,
} from "lucide-react";

const engageLinks = [
  { href: "/feed", label: "My Feed", icon: Rss },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/se/create-story", label: "Create Story", icon: PenLine },
  { href: "/compete", label: "Competition", icon: Trophy },
  { href: "/compete/leaderboard", label: "Leaderboard", icon: Medal },
  { href: "/creators/se-001", label: "My Profile", icon: User },
];

const links = [
  { href: "/se/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/se/events", label: "My Events", icon: Calendar },
  { href: "/se/onboarding", label: "Onboarding", icon: UserPlus },
];

export function SESidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-4 p-3" aria-label="Social Entrepreneur navigation">
      <div>
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-purple-400">
          Create & Engage
        </p>
        <div className="space-y-1">
          {engageLinks.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? "border-l-4 border-purple-600 bg-purple-50 font-medium text-purple-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                active
                  ? "border-l-4 border-purple-600 bg-purple-50 font-medium text-purple-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
