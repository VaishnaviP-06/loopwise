// Shared types and analysis logic for the Analyze experience.
//
// `analyzeItem` currently runs a deterministic mock so the full frontend
// flow can be demonstrated without a backend. To connect a real AI model
// later, replace the body of `analyzeItem` with a call to your API route
// (e.g. POST /api/analyze) that accepts the same arguments and resolves
// to the same `AnalysisResult` shape — no page or component changes
// should be required.

export type ItemType =
  | "Furniture"
  | "Electronics"
  | "Clothing"
  | "Household"
  | "Other";

export type ItemCondition = "Good" | "Minor damage" | "Damaged" | "Unsure";

export type Pathway = "Repair" | "Reuse" | "Repurpose" | "Donate" | "Recycle";

export interface ItemDetailsInput {
  itemType: ItemType | "";
  condition: ItemCondition | "";
  age: string;
  material: string;
  context: string;
}

export const EMPTY_ITEM_DETAILS: ItemDetailsInput = {
  itemType: "",
  condition: "",
  age: "",
  material: "",
  context: "",
};

export type Confidence = "Low" | "Medium" | "High";

export interface AnalysisResult {
  recommendedPathways: Pathway[];
  confidence: Confidence;
  reason: string;
  secondLifeIdea: string;
}

const ALL_PATHWAYS: Pathway[] = [
  "Repair",
  "Reuse",
  "Repurpose",
  "Donate",
  "Recycle",
];

/**
 * Mock analysis. Swap this implementation for a real API call when a
 * backend / AI model is connected. Keep the function signature and
 * return type the same so calling code does not need to change.
 */
export async function analyzeItem(
  details: ItemDetailsInput
): Promise<AnalysisResult> {
  // Simulate network / inference latency.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  const condition = details.condition || "Unsure";

  if (condition === "Good") {
    return {
      recommendedPathways: ["Reuse", "Donate"],
      confidence: "High",
      reason:
        "The item appears to be in good condition, so it likely still has plenty of useful life left — either for you or for someone else.",
      secondLifeIdea:
        "Keep using it as-is, or pass it on to someone who can put it to immediate use.",
    };
  }

  if (condition === "Minor damage") {
    return {
      recommendedPathways: ["Repair", "Reuse"],
      confidence: "Medium",
      reason:
        "The item appears suitable for continued use, and the reported damage may be repairable without replacing the entire product.",
      secondLifeIdea: "Keep it as a study or workspace chair after repair.",
    };
  }

  if (condition === "Damaged") {
    return {
      recommendedPathways: ["Repurpose", "Recycle"],
      confidence: "Medium",
      reason:
        "Significant damage makes continued use in its original form less practical, but its materials or parts may still be valuable.",
      secondLifeIdea:
        "Break it down for parts or materials, or repurpose what still works into something new.",
    };
  }

  // Unsure / fallback
  return {
    recommendedPathways: ["Repair", "Donate"],
    confidence: "Low",
    reason:
      "Without more detail on its condition, LoopWise suggests starting with the options most likely to keep it in use for longer.",
    secondLifeIdea:
      "A closer look — or a quick repair estimate — will help narrow this down further.",
  };
}

export const ALL_PATHWAYS_LIST = ALL_PATHWAYS;
