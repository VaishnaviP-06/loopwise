// lib/analysis.ts

export type ItemType =
  | "Furniture"
  | "Electronics"
  | "Clothing"
  | "Household"
  | "Other";

export type ItemCondition =
  | "Good"
  | "Minor damage"
  | "Damaged"
  | "Unsure";

export type Pathway =
  | "Repair"
  | "Reuse"
  | "Repurpose"
  | "Donate"
  | "Recycle";

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
  itemType: string;
  recommendedPathways: Pathway[];
  confidence: Confidence;
  reason: string;
  secondLifeIdea: string;
  safetyNote: string;
}

const VALID_PATHWAYS: Pathway[] = [
  "Repair",
  "Reuse",
  "Repurpose",
  "Donate",
  "Recycle",
];

const VALID_CONFIDENCE: Confidence[] = [
  "Low",
  "Medium",
  "High",
];

function isAnalysisResult(data: unknown): data is AnalysisResult {
  if (!data || typeof data !== "object") {
    return false;
  }

  const result = data as Record<string, unknown>;

  return (
    typeof result.itemType === "string" &&
    Array.isArray(result.recommendedPathways) &&
    result.recommendedPathways.length > 0 &&
    result.recommendedPathways.every(
      (pathway): pathway is Pathway =>
        typeof pathway === "string" &&
        VALID_PATHWAYS.includes(pathway as Pathway)
    ) &&
    typeof result.confidence === "string" &&
    VALID_CONFIDENCE.includes(
      result.confidence as Confidence
    ) &&
    typeof result.reason === "string" &&
    typeof result.secondLifeIdea === "string" &&
    typeof result.safetyNote === "string"
  );
}

/**
 * Manual fallback analysis.
 *
 * This runs when the Gemini API is unavailable.
 * It uses the user's selected item type and condition
 * to provide a practical circular-resource recommendation.
 */
function manualAnalysis(
  details: ItemDetailsInput
): AnalysisResult {
  const itemType = details.itemType || "Other";
  const condition = details.condition || "Unsure";

  const materialText = details.material
    ? ` The item is described as ${details.material}.`
    : "";

  const contextText = details.context
    ? ` Considering the provided context (${details.context}),`
    : "";

  // --------------------------------------------------
  // GOOD CONDITION
  // --------------------------------------------------

  if (condition === "Good") {
    return {
      itemType,
      recommendedPathways: ["Reuse", "Donate"],
      confidence: "Medium",
      reason:
        `The item is reported to be in good condition, so replacing it may not be necessary.${materialText}${contextText} keeping it in use or passing it on can extend its useful life.`,
      secondLifeIdea:
        "Continue using it for its current purpose, or donate it to someone who can use it.",
      safetyNote:
        "This is a preliminary recommendation based on the information provided. Check the item physically for hidden damage or safety issues.",
    };
  }

  // --------------------------------------------------
  // MINOR DAMAGE
  // --------------------------------------------------

  if (condition === "Minor damage") {
    return {
      itemType,
      recommendedPathways: ["Repair", "Reuse"],
      confidence: "High",
      reason:
        `The item has been reported to have minor damage, which suggests that repair may allow it to remain useful instead of being replaced.${materialText}${contextText}`,
      secondLifeIdea:
        "Repair the damaged part and continue using the item for its original purpose.",
      safetyNote:
        "Confirm that the item is structurally and functionally safe before using or repairing it.",
    };
  }

  // --------------------------------------------------
  // DAMAGED
  // --------------------------------------------------

  if (condition === "Damaged") {
    return {
      itemType,
      recommendedPathways: ["Repurpose", "Recycle"],
      confidence: "Medium",
      reason:
        `The item is reported as damaged, so its original use may no longer be practical.${materialText}${contextText} usable parts or materials may still have value through repurposing or appropriate recycling.`,
      secondLifeIdea:
        "Consider whether usable parts or materials can be transformed into something useful before recycling the remaining material.",
      safetyNote:
        "Do not use or repair an item if its damage could create a structural, electrical, chemical, or other safety hazard. Professional inspection may be appropriate.",
    };
  }

  // --------------------------------------------------
  // UNSURE
  // --------------------------------------------------

  return {
    itemType,
    recommendedPathways: ["Reuse", "Repair", "Recycle"],
    confidence: "Low",
    reason:
      `There is not enough condition information to make a high-confidence recommendation.${materialText}${contextText} further physical inspection can help determine whether the item can be repaired or reused.`,
    secondLifeIdea:
      "Inspect the item first and identify any parts that can safely remain in use, be repaired, or be recovered for recycling.",
    safetyNote:
      "An image and limited details cannot confirm hidden structural, electrical, chemical, or other safety risks. Inspect the item carefully before taking action.",
  };
}

/**
 * Analyze an item using the LoopWise AI endpoint.
 *
 * If the AI service is unavailable for any reason,
 * automatically falls back to manual analysis.
 */
export async function analyzeItem(
  imageFile: File,
  details: ItemDetailsInput
): Promise<AnalysisResult> {
  const formData = new FormData();

  formData.append("image", imageFile);
  formData.append("itemType", details.itemType);
  formData.append("condition", details.condition);
  formData.append("age", details.age);
  formData.append("material", details.material);
  formData.append("context", details.context);

  try {
    const response = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    // --------------------------------------------------
    // AI SUCCESS
    // --------------------------------------------------

    if (response.ok) {
      let data: unknown;

      try {
        data = await response.json();
      } catch {
        console.warn(
          "LoopWise: AI returned an unreadable response. Using manual analysis."
        );

        return manualAnalysis(details);
      }

      if (isAnalysisResult(data)) {
        return data;
      }

      console.warn(
        "LoopWise: AI returned an incomplete response. Using manual analysis."
      );

      return manualAnalysis(details);
    }

    // --------------------------------------------------
    // AI REQUEST FAILED
    // --------------------------------------------------

    let errorMessage = "";

    try {
      const body = await response.json();

      if (body && typeof body.error === "string") {
        errorMessage = body.error;
      }
    } catch {
      // Ignore response parsing errors.
    }

    console.warn(
      "LoopWise AI unavailable. Using manual analysis.",
      errorMessage
    );

    return manualAnalysis(details);
  } catch (error) {
    // --------------------------------------------------
    // NETWORK / SERVER ERROR
    // --------------------------------------------------

    console.warn(
      "LoopWise could not reach the AI service. Using manual analysis.",
      error
    );

    return manualAnalysis(details);
  }
}