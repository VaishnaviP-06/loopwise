import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnalyzerExperience from "@/components/analyzer/AnalyzerExperience";

export const metadata: Metadata = {
  title: "Analyze an item · LoopWise",
  description:
    "Upload an item and let LoopWise explore repair, reuse, repurpose, donate and recycle options before you replace or discard it.",
};

export default function AnalyzePage() {
  return (
    <main className="bg-loop-bg">
      <Navbar />

      <section className="px-6 pb-20 pt-32 sm:pt-36 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-display text-4xl tracking-[-0.02em] text-loop-text sm:text-5xl">
            What should you do with it?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-loop-text/70 sm:text-base">
            Upload an item and let LoopWise explore the options before you
            replace or discard it.
          </p>
        </div>

        <div className="mt-14">
          <AnalyzerExperience />
        </div>
      </section>

      <Footer />
    </main>
  );
}
