"use client";

import { useEffect, useMemo, useState } from "react";
import ImageUpload from "@/components/analyzer/ImageUpload";
import ItemDetails from "@/components/analyzer/ItemDetails";
import Recommendation from "@/components/analyzer/Recommendation";
import {
  analyzeItem,
  EMPTY_ITEM_DETAILS,
  type AnalysisResult,
  type ItemDetailsInput,
} from "@/lib/analysis";

export default function AnalyzerExperience() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [details, setDetails] = useState<ItemDetailsInput>(EMPTY_ITEM_DETAILS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // Keep the object URL in sync with the selected file, and clean it up.
  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const canAnalyze = useMemo(() => Boolean(imageFile) && !isAnalyzing, [
    imageFile,
    isAnalyzing,
  ]);

  const handleAnalyze = async () => {
    if (!imageFile) return;
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeItem(details);
      setResult(analysis);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setDetails(EMPTY_ITEM_DETAILS);
    setResult(null);
  };

  if (result) {
    return (
      <div className="mx-auto max-w-3xl">
        <Recommendation result={result} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-3xl gap-8">
      <div className="rounded-2xl border border-loop-border bg-loop-card p-6 sm:p-8">
        <ImageUpload
          imagePreviewUrl={imagePreviewUrl}
          onImageSelected={setImageFile}
          onImageRemoved={() => setImageFile(null)}
        />
      </div>

      <ItemDetails details={details} onChange={setDetails} />

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-loop-muted">
          AI-assisted decision support, not professional inspection.
        </p>

        <button
          type="button"
          disabled={!canAnalyze}
          onClick={handleAnalyze}
          className="inline-flex w-full items-center justify-center rounded-full bg-loop-dark px-7 py-3.5 text-sm font-medium text-white transition-colors duration-200 enabled:hover:bg-loop-hover disabled:cursor-not-allowed disabled:bg-loop-secondary disabled:text-white/80 sm:w-auto"
        >
          {isAnalyzing ? "Analyzing…" : "Analyze with AI →"}
        </button>
      </div>
    </div>
  );
}
