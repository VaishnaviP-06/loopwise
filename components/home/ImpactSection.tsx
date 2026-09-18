export default function ImpactSection() {
  return (
    <section id="why-loopwise" className="bg-loop-dark px-6 py-24 text-white sm:py-32 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-loop-secondary">
            Why LoopWise
          </p>

          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-tight tracking-[-0.02em] sm:text-5xl">
            Before you replace it, ask what else it could become.
          </h2>
        </div>

        <div>
          <p className="max-w-lg text-base leading-7 text-white/75">
            Usable products are often discarded because people don&apos;t
            know whether they can be repaired, reused, repurposed, donated
            or recycled. LoopWise turns that uncertainty into a practical,
            item-by-item decision, so replacement becomes a last resort
            rather than a default.
          </p>

          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-medium text-white/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15 font-mono text-[10px]">
              12
            </span>
            SDG 12 · Responsible Consumption and Production
          </div>
        </div>
      </div>
    </section>
  );
}
