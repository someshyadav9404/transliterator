import Sanscript from "@indic-transliteration/sanscript";

export function transliterateText(
  text: string,
  direction: "en-to-hi" | "hi-to-en"
): string {
  if (!text.trim()) {
    return "";
  }

  try {
    if (direction === "en-to-hi") {
      // English (ITRANS) to Hindi (Devanagari)
      // Use syncope option for more natural Hindi transliteration
      return Sanscript.t(text, "itrans", "devanagari", { syncope: true });
    } else {
      // Hindi (Devanagari) to English (ITRANS)
      return Sanscript.t(text, "devanagari", "itrans");
    }
  } catch (error) {
    console.error("Transliteration error:", error);
    return text; // Return original text if transliteration fails
  }
}

// Helper to detect if text is primarily Devanagari
export function isDevanagariText(text: string): boolean {
  // Check if text contains Devanagari characters (Unicode range: 0900-097F)
  const devanagariRegex = /[\u0900-\u097F]/;
  return devanagariRegex.test(text);
}

// Helper to detect if text is primarily Latin/English
export function isLatinText(text: string): boolean {
  // Check if text contains Latin characters
  const latinRegex = /[a-zA-Z]/;
  return latinRegex.test(text);
}
