import { GoogleGenAI } from "@google/genai";
import { FlashcardData, Category } from "../types";
import { GENERATION_PROMPT, SYSTEM_INSTRUCTION } from "../constants";

// Helper to safely map arbitrary string to Category enum
const mapCategory = (cat: string): Category => {
  const normalized = cat.toLowerCase();
  if (normalized.includes("technical")) return Category.TECHNICAL_DEEP_DIVE;
  if (normalized.includes("presentation")) return Category.PRESENTATION;
  if (normalized.includes("network")) return Category.NETWORKING;
  return Category.GENERAL_QA;
};

export const streamFlashcards = async (
  onCardReceived: (card: FlashcardData) => void
): Promise<void> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing in environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const responseStream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: GENERATION_PROMPT,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        // NDJSON does not require 'application/json' mimeType, strictly text processing
      },
    });

    let buffer = "";
    let cardIndex = 0;

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        buffer += text;
        const lines = buffer.split("\n");
        // Keep the last part in buffer as it might be incomplete
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine) continue;
          
          try {
            // Remove potential comma/brackets if model outputs array style despite prompt
            let cleanLine = trimmedLine.replace(/,$/, '').replace(/^\[/, '').replace(/\]$/, '');
            
            // Basic check to see if it looks like JSON
            if (!cleanLine.startsWith('{')) continue;

            const item = JSON.parse(cleanLine);
            
            if (item.english && item.vietnamese) {
               const card: FlashcardData = {
                id: `stream-${Date.now()}-${cardIndex++}`,
                english: item.english,
                vietnamese: item.vietnamese,
                russian: item.russian,
                category: item.category ? mapCategory(item.category) : Category.GENERAL_QA,
                context: item.context || "Workshop context",
               };
               onCardReceived(card);
            }
          } catch (e) {
            // Silent fail for parsing noise
          }
        }
      }
    }
    
    // Process trailing buffer
    if (buffer.trim()) {
        try {
            let cleanLine = buffer.trim().replace(/,$/, '').replace(/^\[/, '').replace(/\]$/, '');
            if (cleanLine.startsWith('{')) {
              const item = JSON.parse(cleanLine);
               if (item.english) {
                 const card: FlashcardData = {
                  id: `stream-${Date.now()}-${cardIndex++}`,
                  english: item.english,
                  vietnamese: item.vietnamese,
                  russian: item.russian,
                  category: item.category ? mapCategory(item.category) : Category.GENERAL_QA,
                  context: item.context || "Workshop context",
                 };
                 onCardReceived(card);
              }
            }
        } catch (e) {}
    }

  } catch (error) {
    console.error("Stream error:", error);
    throw error;
  }
};