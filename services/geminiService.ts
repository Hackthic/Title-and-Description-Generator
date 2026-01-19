
import { GoogleGenAI, Type } from "@google/genai";
import { OptimizationResult } from "../types";

export const optimizeShortContent = async (script: string): Promise<OptimizationResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    I have a YouTube Short script. I need you to optimize it for me.
    
    Original Script:
    """
    ${script}
    """
    
    Tasks:
    1. Refine the script into a SHOT-BY-SHOT format (Shot 1, Shot 2, etc.).
       - Ensure the total duration is between 1 minute and 1 minute 30 seconds.
       - Each shot must have a 'visual' description (what is on screen) and 'audio' (what is being said).
       - Target a professional flow with high retention hooks.
    2. Generate the TOP 5 SEO-optimized titles. Each title MUST include 2 trending hashtags and #ytshorts. Ensure they are searchable and relate to what viewers want.
    3. Create a full SEO-optimized description. 
       - DO NOT summarize the script.
       - Include SEO keywords relevant to the niche.
       - Include 5 hashtags related to the script content.
       - Include 5 general #ytshort hashtags (e.g., #shorts, #trending, #viral, #ytshorts, #shortvideo).
    4. Provide a step-by-step editing guide on how to edit this specific Short (e.g., where to put text overlays, transition tips, sound choice).
    
    Return the output in a clean JSON format.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          refinedScript: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                number: { type: Type.INTEGER },
                visual: { type: Type.STRING, description: "Description of the visual action" },
                audio: { type: Type.STRING, description: "Dialogue or voiceover text" }
              },
              required: ["number", "visual", "audio"]
            },
            description: "A shot-by-shot breakdown of the script for 1:00-1:30 min duration."
          },
          titles: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Top 5 SEO optimized titles with hashtags."
          },
          description: {
            type: Type.STRING,
            description: "Full SEO optimized description with 10 hashtags."
          },
          editingGuide: {
            type: Type.STRING,
            description: "Expert tips on how to edit the video."
          }
        },
        required: ["refinedScript", "titles", "description", "editingGuide"]
      }
    }
  });

  const resultText = response.text;
  if (!resultText) throw new Error("No response from AI");
  
  return JSON.parse(resultText) as OptimizationResult;
};
