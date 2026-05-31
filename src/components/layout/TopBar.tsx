"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Bell, X } from "lucide-react";
import { PersonaSwitcher } from "./PersonaSwitcher";
import { useHeaderOverlay } from "@/context/HeaderOverlayContext";
import { appNotifications } from "@/data/notifications";

interface TopBarProps {
  title: string;
  breadcrumbs?: string[];
  onMenuClick?: () => void;
  showMenu?: boolean;
}

function NotificationPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[200] bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed inset-x-0 bottom-0 z-[201] flex max-h-[min(75vh,24rem)] flex-col rounded-t-2xl border-t border-gray-200 bg-white shadow-2xl md:inset-auto md:bottom-auto md:right-4 md:top-[4.5rem] md:max-h-[20rem] md:w-[min(20rem,calc(100vw-2rem))] md:rounded-xl md:border"
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-[var(--ch-navy)]">Notifications</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
            aria-label="Close notifications"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="overflow-y-auto overscroll-contain py-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-2">
          {appNotifications.map((n) => (
            <li key={n.id} className="border-b border-gray-50 last:border-0">
              <Link
                href={n.href}
                onClick={onClose}
                className="flex gap-2 px-4 py-3 text-sm leading-snug text-gray-700 hover:bg-gray-50"
              >
                <span aria-hidden>🔔</span>
                <span className="min-w-0 flex-1">
                  {n.text}
                  <span className="mt-0.5 block text-xs text-gray-400">{n.time}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>,
    document.body
  );
}

export function TopBar({
  title,
  breadcrumbs = [],
  onMenuClick,
  showMenu = false,
}: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { setOverlayOpen } = useHeaderOverlay();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOverlayOpen("notifications", notifOpen);
    return () => setOverlayOpen("notifications", false);
  }, [notifOpen, setOverlayOpen]);

  useEffect(() => {
    if (!notifOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [notifOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {showMenu && (
            <button
              type="button"
              onClick={onMenuClick}
              className="shrink-0 rounded-lg p-2 hover:bg-gray-100 lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
          <div className="min-w-0">
            <Link
              href="/feed"
              className="font-display text-sm font-semibold text-[var(--ch-teal)]"
            >
              Charity Hub
            </Link>
            <h1 className="truncate text-sm font-semibold text-[var(--ch-navy)] lg:text-base">
              {title}
            </h1>
            {breadcrumbs.length > 0 && (
              <nav
                className="truncate text-xs text-gray-500"
                aria-label="Breadcrumb"
              >
                {breadcrumbs.join(" > ")}
              </nav>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setNotifOpen((o) => !o)}
            className={`rounded-full p-2 hover:bg-gray-100 ${
              notifOpen ? "bg-teal-50 text-[var(--ch-teal)]" : "text-gray-600"
            }`}
            aria-label="Notifications"
            aria-expanded={notifOpen}
          >
            <Bell className="h-5 w-5" />
          </button>
          <PersonaSwitcher />
        </div>
      </header>
      {mounted && (
        <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
      )}
    </>
  );
}
