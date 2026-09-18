import Image from "next/image";
import Link from "next/link";

function HeroCopy() {
  return (
    <>
      {/* Eyebrow */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-loop-border bg-white/80 px-3.5 py-2 text-xs font-medium text-loop-primary backdrop-blur-sm">
        <span className="h-1.5 w-1.5 rounded-full bg-loop-primary" />
        Reuse before replacement
      </div>

      {/* Heading */}
      <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.03em] text-loop-text sm:text-5xl lg:text-[64px]">
        Give things
        <br />
        <span className="text-loop-primary">another life.</span>
      </h1>

      {/* Description */}
      <p className="mt-6 max-w-[480px] text-[15px] leading-7 text-loop-text/70 sm:text-base">
        Before replacing something, discover whether it can be repaired,
        reused, repurposed, donated, or recycled.
      </p>

      {/* CTA */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/analyze"
          className="rounded-full bg-loop-dark px-6 py-3.5 text-sm font-medium text-white shadow-sm transition-colors duration-200 hover:bg-loop-hover"
        >
          Analyze an item
          <span className="ml-2">→</span>
        </Link>

        <Link
          href="#how-it-works"
          className="rounded-full border border-loop-border bg-white px-6 py-3.5 text-sm font-medium text-loop-dark transition-colors duration-200 hover:bg-loop-light"
        >
          See how it works
        </Link>
      </div>

      {/* Trust statement */}
      <div className="mt-8 flex items-center gap-3 text-xs text-loop-muted">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-loop-primary">
          ✓
        </span>
        <span>AI-assisted decision support, not professional inspection</span>
      </div>
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-loop-bg">
      {/* Banner image, always shown at its full, uncropped aspect ratio */}
      <div className="relative aspect-[1983/793] w-full">
        <Image
          src="/images/loopwise-hero.png"
          alt="A wooden chair, plant and home objects in a sunlit interior"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Soft left-side overlay so overlaid text stays readable on larger screens */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-loop-bg/95 via-loop-bg/70 to-transparent lg:block" />

        {/* Desktop / tablet: copy overlaid on the lighter left area of the image */}
        <div className="pointer-events-none absolute inset-0 hidden items-center lg:flex">
          <div className="mx-auto w-full max-w-7xl px-10">
            <div className="pointer-events-auto max-w-xl">
              <HeroCopy />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / small tablet: copy sits below the full banner, never cramped over it */}
      <div className="px-6 pb-14 pt-10 sm:px-8 lg:hidden">
        <div className="mx-auto max-w-xl">
          <HeroCopy />
        </div>
      </div>
    </section>
  );
}
