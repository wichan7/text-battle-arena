import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function chat(contents: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });

  return response.text;
}
