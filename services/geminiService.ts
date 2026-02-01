
import { GoogleGenAI, Type } from "@google/genai";
import { ArtifactAnalysis } from "../types";

/**
 * Service to analyze artifact images using Gemini API.
 * Follows Google GenAI SDK guidelines for initialization and content generation.
 */
export const analyzeArtifact = async (base64Image: string): Promise<ArtifactAnalysis> => {
  // Always use process.env.API_KEY directly when initializing the client as per guidelines.
  // Assume the variable is pre-configured and valid.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview', 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              // Strip the base64 header if present from the picker's output
              data: base64Image.includes('base64,') ? base64Image.split('base64,')[1] : base64Image,
            },
          },
          {
            text: `You are a world-class archeologist. Identify the artifact in this image. 
            Analyze its material, craftsmanship, and style to determine:
            1. Its specific name or type.
            2. Where it is from (geographic origin and ancient region).
            3. When it is from (time period, dynasty, and estimated century).
            4. The culture or civilization that produced it.
            5. Its historical significance and original purpose.`,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Common or formal name of the artifact" },
            originLocation: { type: Type.STRING, description: "Modern-day geographic location and ancient region" },
            period: { type: Type.STRING, description: "Historical period or dynasty" },
            culture: { type: Type.STRING, description: "The specific civilization or group" },
            description: { type: Type.STRING, description: "A detailed narrative description of its form and function" },
            significance: { type: Type.STRING, description: "A concise statement of its historical or cultural importance" },
            estimatedYear: { type: Type.STRING, description: "Estimated age (e.g., c. 1200 BCE or 4th Century AD)" },
            materials: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "List of materials used"
            },
            confidence: { type: Type.NUMBER, description: "Confidence score from 0.0 to 1.0" }
          },
          required: ["name", "originLocation", "period", "culture", "description", "significance", "estimatedYear", "materials", "confidence"],
        },
      },
    });

    // Directly access the .text property from the GenerateContentResponse object.
    const text = response.text;
    if (!text) {
      throw new Error("The historical archives are silent. Try a clearer photo of the artifact.");
    }

    return JSON.parse(text) as ArtifactAnalysis;
  } catch (err: any) {
    console.error("Gemini Analysis Error:", err);
    throw new Error(err.message || "Archeological analysis failed. The relic's origin remains obscured.");
  }
};
