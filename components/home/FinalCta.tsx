import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="bg-loop-primary px-6 py-20 text-center sm:py-24 lg:px-10">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl tracking-[-0.02em] text-white sm:text-4xl">
          Give your next item another chance.
        </h2>

        <Link
          href="/analyze"
          className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-sm font-medium text-loop-dark transition-colors duration-200 hover:bg-loop-bg"
        >
          Analyze an item
          <span className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
