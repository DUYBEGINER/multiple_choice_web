export default function Hero() {
  const rows = [
    { name: 'John Dowson', pct: 90 },
    { name: 'Caroline Rodriguez', pct: 80 },
    { name: 'Kevin Nguyen', pct: 75 },
    { name: 'Beth Stacey', pct: 60 },
  ];

  return (
    <section className="bg-[radial-gradient(1200px_400px_at_25%_20%,rgba(0,0,0,.12),transparent_60%),#f6f7f8]">
      <div className="container grid gap-8 px-6 py-12 md:grid-cols-2 mx-auto items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              The Best Online Testing for
              <br /> Business &amp; Education
            </h1>
            <p className="mt-4 max-w-xl text-gray-600">
              ClassMarker&apos;s secure, professional web-based Quiz maker is an easy-to-use,
              customizable online testing solution for business, training &amp; educational
              assessments with Tests &amp; Quizzes graded instantly, saving hours of paperwork!
            </p>
            <button className="mt-6 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white shadow ring-1 ring-red-500/20 hover:brightness-95">
              Try it free
            </button>
          </div>

        
          <div className="relative flex justify-center">
            <div className="w-[520px] overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="flex items-center gap-2 border-b px-4 py-3">
                <span className="text-xl">🗂</span>
                <span className="font-medium">Skill Certification</span>
                <div className="ml-auto flex items-center gap-5">
                  <div className="text-right">
                    <div className="font-bold">568</div>
                    <div className="text-xs text-gray-500">Finished</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">21</div>
                    <div className="text-xs text-gray-500">In progress</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 border-b p-2">
                <button className="rounded-lg border bg-gray-100 px-3 py-1 text-sm">Results</button>
                <button className="rounded-lg border px-3 py-1 text-sm">Settings</button>
                <button className="rounded-lg border px-3 py-1 text-sm">Analytics</button>
              </div>

              <ul className="space-y-3 p-4">
                {rows.map((r) => (
                  <li key={r.name} className="grid grid-cols-[1fr_1fr_auto] items-center gap-3">
                    <span className="truncate">{r.name}</span>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-blue-400"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{r.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </section>
  );
}
