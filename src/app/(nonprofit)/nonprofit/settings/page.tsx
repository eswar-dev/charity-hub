import Link from "next/link";

export default function NonprofitSettingsPage() {
  return (
    <div>
      <Link href="/nonprofit/launchpad" className="text-sm text-[var(--ch-teal)]">← Back</Link>
      <h1 className="font-display mt-4 text-3xl font-semibold">Org Settings</h1>
      <form className="mt-6 max-w-lg space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        <label className="block text-sm">
          Organization Name
          <input defaultValue="GreenPath Foundation" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        <label className="block text-sm">
          Contact Email
          <input defaultValue="sarah@greenpath.org" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </label>
        <button type="button" className="rounded-full bg-[var(--ch-teal)] px-6 py-2.5 text-sm text-white">
          Save Changes
        </button>
      </form>
    </div>
  );
}
