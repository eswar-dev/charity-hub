"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Zap, PlusCircle, User } from "lucide-react";

const items = [
  { href: "/feed", label: "Feed", icon: Home },
  { href: "/explore", label: "Explore", icon: Search },
  { href: "/compete", label: "Compete", icon: Zap },
  { href: "/se/create-story", label: "Create", icon: PlusCircle },
  { href: "/creators/se-001", label: "Profile", icon: User },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-gray-200 bg-white/95 backdrop-blur md:hidden"
      aria-label="Mobile navigation"
    >
      {items.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${
              active ? "text-[var(--ch-teal)]" : "text-gray-500"
            }`}
          >
            <Icon className="h-5 w-5" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
