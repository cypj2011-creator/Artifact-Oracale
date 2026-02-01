
import { GoogleGenAI, Type } from "@google/genai";
import { ArtifactAnalysis } from "../types";

export const analyzeArtifact = async (base64Image: string): Promise<ArtifactAnalysis> => {
  // Always initialize a new GoogleGenAI instance right before making an API call
  // to ensure it uses the most up-to-date configuration
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview', // High-reasoning model for historical identification
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: 'image/jpeg',
            data: base64Image.split(',')[1] || base64Image,
          },
        },
        {
          text: `Identify the artifact in this image. Provide a detailed historical and archeological analysis. 
          Be specific about the culture, location of origin, and time period. 
          If the object is a fragment, speculate on the original complete form based on known archeological patterns.`,
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
            description: "List of materials used (e.g., Terracotta, Lapis Lazuli, Bronze)"
          },
          confidence: { type: Type.NUMBER, description: "Confidence score from 0.0 to 1.0" }
        },
        required: ["name", "originLocation", "period", "culture", "description", "significance", "estimatedYear", "materials", "confidence"],
      },
    },
  });

  // Extract the text property directly (it's a getter, not a method)
  const jsonStr = response.text;
  if (!jsonStr) {
    throw new Error("The analysis returned no data. The artifact remains shrouded in mystery.");
  }

  try {
    const result = JSON.parse(jsonStr);
    return result as ArtifactAnalysis;
  } catch (err) {
    console.error("Failed to parse analysis result:", jsonStr);
    throw new Error("Could not interpret the historical archives. Please try another angle.");
  }
};
