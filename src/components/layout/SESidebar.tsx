"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, User, UserPlus } from "lucide-react";

const links = [
  { href: "/se/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/se/events", label: "My Events", icon: Calendar },
  { href: "/se/profile", label: "Profile", icon: User },
  { href: "/se/onboarding", label: "Onboarding", icon: UserPlus },
];

export function SESidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 p-3" aria-label="Social Entrepreneur navigation">
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
    </nav>
  );
}
