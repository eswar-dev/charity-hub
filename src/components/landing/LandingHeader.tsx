import Link from "next/link";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-100 bg-white/95 px-6 backdrop-blur">
      <Link href="/" className="font-display text-xl font-semibold text-[var(--ch-navy)]">
        Charity Hub
      </Link>
      <div className="flex items-center gap-3">
        <button type="button" className="text-sm font-medium text-gray-600 hover:text-[var(--ch-navy)]">
          Sign In
        </button>
        <Link
          href="/feed"
          className="rounded-full bg-[var(--ch-teal)] px-5 py-2 text-sm font-semibold text-white"
        >
          Join
        </Link>
      </div>
    </header>
  );
}
