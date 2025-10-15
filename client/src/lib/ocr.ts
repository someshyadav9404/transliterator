import { createWorker } from "tesseract.js";

export async function extractTextFromImage(
  imageSrc: string,
  language: "eng" | "hin" = "eng"
): Promise<{ text: string; confidence: number }> {
  try {
    // Modern Tesseract.js API (v5+) - pass language directly to createWorker
    const worker = await createWorker(language);
    
    try {
      const { data } = await worker.recognize(imageSrc);
      return {
        text: data.text.trim(),
        confidence: data.confidence,
      };
    } finally {
      await worker.terminate();
    }
  } catch (error) {
    // If Hindi language fails (e.g., trained data not available), fallback to English
    if (language === "hin") {
      console.warn("Hindi OCR failed, falling back to English", error);
      const worker = await createWorker("eng");
      try {
        const { data } = await worker.recognize(imageSrc);
        return {
          text: data.text.trim(),
          confidence: data.confidence,
        };
      } finally {
        await worker.terminate();
      }
    }
    throw error;
  }
}
