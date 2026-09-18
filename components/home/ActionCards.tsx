const PATHWAYS = [
  {
    number: "01",
    title: "Repair",
    description: "Fix it and extend its useful life.",
  },
  {
    number: "02",
    title: "Reuse",
    description: "Continue using it for its original purpose.",
  },
  {
    number: "03",
    title: "Repurpose",
    description: "Give it a different function.",
  },
  {
    number: "04",
    title: "Donate",
    description: "Pass it to someone who can use it.",
  },
  {
    number: "05",
    title: "Recycle",
    description: "Recover materials when reuse is no longer practical.",
  },
];

export default function ActionCards() {
  return (
    <section id="second-life" className="bg-loop-light px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-loop-primary">
            Second life
          </p>

          <h2 className="mt-4 font-display text-4xl tracking-[-0.02em] text-loop-text sm:text-5xl">
            Don&apos;t stop at disposal.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-loop-text/70">
            Every item can have different possibilities depending on its
            condition, material, and context.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PATHWAYS.map((pathway) => (
            <div
              key={pathway.title}
              className="rounded-2xl border border-loop-border bg-loop-card p-6 transition-colors duration-200 hover:border-loop-secondary"
            >
              <span className="font-mono text-xs text-loop-secondary">
                {pathway.number}
              </span>

              <h3 className="mt-12 font-display text-lg text-loop-text">
                {pathway.title}
              </h3>

              <p className="mt-2 text-sm leading-5 text-loop-muted">
                {pathway.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
