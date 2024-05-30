import { InstantPersonas } from "@/components/instantPersonas";
import { Separator } from "@/components/ui/separator";
import { POWER_WORDS } from "@/util/util";

export default function TermsOfService() {
  return (
    <main className="bg-gradient-to-b from-slate-50 to-green-50">
      <title>Power Words for Headlines</title>
      <meta
        name="description"
        content="Use these power words in your headlines to increase engagement and conversions."
      />
      <div className="mx-auto px-4 py-8 flex flex-col max-w-2xl gap-4 ">
        <InstantPersonas className="text-3xl" />
        <h1 className="text-3xl font-bold flex gap-4">
          Power Words for Headlines
        </h1>
        <p>
          <strong>
            Here are some great power words you can use in your headlines!
          </strong>
        </p>
        <Separator />
        <div className="flex-col gap-3 grid grid-cols-3">
          {/* alphabetize */}
          {POWER_WORDS.sort().map((word) => (
            <div key={word} className="flex flex-col gap-2">
              <h2 className="text-xs text-slate-700">{word}</h2>
            </div>
          ))}
        </div>
        <Separator />
      </div>
    </main>
  );
}
