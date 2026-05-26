import Image from "next/image";
import Link from "next/link";
import { socialEntrepreneurs } from "@/data/users";
import { getNonprofitById } from "@/data/nonprofits";

const alex = socialEntrepreneurs[0];
const np = getNonprofitById(alex.nonprofitId);

export default function SEProfilePage() {
  return (
    <div className="max-w-lg">
      <Link href="/se/dashboard" className="text-sm text-purple-600">← Back</Link>
      <div className="mt-6 rounded-2xl border bg-white p-8 shadow-sm text-center">
        <Image src={alex.avatar} alt="" width={96} height={96} className="mx-auto rounded-full" />
        <h1 className="font-display mt-4 text-2xl font-semibold">{alex.name}</h1>
        <p className="mt-2 text-gray-600">{alex.bio}</p>
        <p className="mt-4 text-sm">
          Connected to <strong>{np?.name}</strong>
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {alex.causeInterests.map((c) => (
            <span key={c} className="rounded-full bg-purple-50 px-3 py-1 text-xs text-purple-800">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
