const STEPS = [
  {
    number: "01",
    title: "Upload an item",
    description:
      "Upload a photo of something you are considering replacing or throwing away.",
  },
  {
    number: "02",
    title: "Add context",
    description:
      "Optionally provide details such as condition, age, material or intended use.",
  },
  {
    number: "03",
    title: "Get a circular recommendation",
    description:
      "AI evaluates the available options and recommends Repair, Reuse, Repurpose, Donate or Recycle.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 sm:py-32 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-loop-primary">
            How it works
          </p>

          <h2 className="mt-4 font-display text-4xl tracking-[-0.02em] text-loop-text sm:text-5xl">
            A better decision starts with what you already have.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => (
            <div
              key={step.number}
              className={`relative pt-8 ${
                index !== 0
                  ? "border-t border-loop-border md:border-t-0 md:border-l md:pl-8 md:pt-0"
                  : ""
              }`}
            >
              <span className="font-mono text-sm text-loop-secondary">
                {step.number}
              </span>

              <h3 className="mt-6 font-display text-xl text-loop-text">
                {step.title}
              </h3>

              <p className="mt-3 max-w-xs text-sm leading-6 text-loop-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
