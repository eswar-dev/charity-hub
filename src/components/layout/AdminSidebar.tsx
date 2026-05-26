"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  Building2,
  Calendar,
  FileText,
  CreditCard,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/review-queue", label: "Review Queue", icon: ClipboardList },
  { href: "/admin/nonprofits", label: "Nonprofits", icon: Building2 },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 p-3" aria-label="Admin navigation">
      {links.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href ||
          (href !== "/admin" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              active
                ? "border-l-4 border-[var(--ch-teal)] bg-teal-50/80 font-medium text-[var(--ch-teal)]"
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
