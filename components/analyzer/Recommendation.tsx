"use client";

import type { AnalysisResult, Pathway } from "@/lib/analysis";

const PATHWAY_COPY: Record<Pathway, string> = {
  Repair: "Fix it and extend its useful life.",
  Reuse: "Continue using it for its original purpose.",
  Repurpose: "Give it a different function.",
  Donate: "Pass it to someone who can use it.",
  Recycle: "Recover materials when reuse is no longer practical.",
};

const ALL_PATHWAYS: Pathway[] = [
  "Repair",
  "Reuse",
  "Repurpose",
  "Donate",
  "Recycle",
];

interface RecommendationProps {
  result: AnalysisResult;
  onReset: () => void;
}

export default function Recommendation({ result, onReset }: RecommendationProps) {
  return (
    <div className="rounded-2xl border border-loop-border bg-loop-card p-6 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-loop-primary">
        Recommended action
      </p>

      <h2 className="mt-3 font-display text-3xl text-loop-text sm:text-4xl">
        {result.recommendedPathways.join(" + ")}
      </h2>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-loop-border bg-loop-bg px-3.5 py-1.5 text-xs font-medium text-loop-text">
        Confidence
        <span className="font-mono text-loop-primary">{result.confidence}</span>
      </div>

      <p className="mt-6 max-w-2xl text-[15px] leading-7 text-loop-text/80">
        {result.reason}
      </p>

      <div className="mt-8 rounded-xl border border-loop-border bg-loop-light p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-loop-primary">
          Possible second life
        </p>
        <p className="mt-2 text-sm leading-6 text-loop-text/80">
          {result.secondLifeIdea}
        </p>
      </div>

      {/* Pathway options, recommended ones highlighted */}
      <div className="mt-10">
        <p className="text-sm font-medium text-loop-text">All pathways considered</p>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ALL_PATHWAYS.map((pathway) => {
            const isRecommended = result.recommendedPathways.includes(pathway);
            return (
              <div
                key={pathway}
                className={`rounded-xl border p-4 transition-colors duration-200 ${
                  isRecommended
                    ? "border-loop-dark bg-loop-dark text-white"
                    : "border-loop-border bg-loop-bg text-loop-text"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-base">{pathway}</span>
                  {isRecommended && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                      Best fit
                    </span>
                  )}
                </div>
                <p
                  className={`mt-2 text-xs leading-5 ${
                    isRecommended ? "text-white/80" : "text-loop-muted"
                  }`}
                >
                  {PATHWAY_COPY[pathway]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Responsible AI note */}
      <div className="mt-10 rounded-xl border border-loop-border bg-loop-bg p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-loop-text">
          Important
        </p>
        <p className="mt-2 text-sm leading-6 text-loop-muted">
          AI recommendations are based on the information provided and
          cannot detect hidden structural, electrical or material hazards.
          Professional inspection may be required.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center rounded-full border border-loop-border bg-loop-card px-6 py-3 text-sm font-medium text-loop-dark transition-colors duration-200 hover:bg-loop-light"
      >
        Analyze another item
      </button>
    </div>
  );
}
