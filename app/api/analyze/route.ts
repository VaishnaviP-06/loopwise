import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const VALID_PATHWAYS = [
  "Repair",
  "Reuse",
  "Repurpose",
  "Donate",
  "Recycle",
] as const;

const VALID_CONFIDENCE = ["Low", "Medium", "High"] as const;

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY ?? ""
);

function cleanJsonResponse(text: string) {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

function isValidResult(data: unknown) {
  if (!data || typeof data !== "object") return false;

  const result = data as Record<string, unknown>;

  return (
    typeof result.itemType === "string" &&
    Array.isArray(result.recommendedPathways) &&
    result.recommendedPathways.length > 0 &&
    result.recommendedPathways.every(
      (pathway) =>
        typeof pathway === "string" &&
        VALID_PATHWAYS.includes(
          pathway as (typeof VALID_PATHWAYS)[number]
        )
    ) &&
    typeof result.confidence === "string" &&
    VALID_CONFIDENCE.includes(
      result.confidence as (typeof VALID_CONFIDENCE)[number]
    ) &&
    typeof result.reason === "string" &&
    typeof result.secondLifeIdea === "string" &&
    typeof result.safetyNote === "string"
  );
}

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const formData = await request.formData();

    const image = formData.get("image");

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: "Please upload an image of the item." },
        { status: 400 }
      );
    }

    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "The uploaded file must be an image." },
        { status: 400 }
      );
    }

    const itemType = String(formData.get("itemType") ?? "");
    const condition = String(formData.get("condition") ?? "");
    const age = String(formData.get("age") ?? "");
    const material = String(formData.get("material") ?? "");
    const context = String(formData.get("context") ?? "");

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    const base64Image = imageBuffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
You are LoopWise, an AI-powered circular resource decision-support system.

Your task is to examine the uploaded item image together with the user's optional details and recommend practical ways to give the item another life.

Possible pathways:
- Repair
- Reuse
- Repurpose
- Donate
- Recycle

User-provided details:
Item type: ${itemType || "Not provided"}
Condition: ${condition || "Not provided"}
Age: ${age || "Not provided"}
Material: ${material || "Not provided"}
Context: ${context || "Not provided"}

Analyze the visible item carefully.

The recommendation must be based on BOTH:
1. What can reasonably be observed in the image.
2. The user-provided details.

Do not simply map the selected condition to a fixed recommendation.

Important safety rules:
- Do not claim that hidden structural, electrical, chemical, or other safety issues can be verified from an image.
- If safety depends on something that cannot be visually confirmed, say so.
- Do not recommend unsafe repair procedures.
- Recommend professional inspection when appropriate.

Return ONLY valid JSON using exactly this structure:

{
  "itemType": "string",
  "recommendedPathways": ["Repair", "Reuse"],
  "confidence": "Low",
  "reason": "string",
  "secondLifeIdea": "string",
  "safetyNote": "string"
}

Requirements:
- recommendedPathways must contain one or more of the five allowed pathways.
- confidence must be Low, Medium, or High.
- Keep the reasoning specific to the uploaded item.
- Do not invent facts that cannot reasonably be inferred.
- Do not include markdown or additional text outside the JSON.
`;

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image,
        },
      },
      prompt,
    ]);

    const responseText = result.response.text();
    const cleanedResponse = cleanJsonResponse(responseText);

    let analysisResult: unknown;

    try {
      analysisResult = JSON.parse(cleanedResponse);
    } catch {
      return NextResponse.json(
        {
          error:
            "The AI returned an invalid analysis. Please try again.",
        },
        { status: 502 }
      );
    }

    if (!isValidResult(analysisResult)) {
      return NextResponse.json(
        {
          error:
            "The AI returned an incomplete analysis. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("LoopWise Gemini analysis error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Gemini API error",
      },
      { status: 500 }
    );
  }
}