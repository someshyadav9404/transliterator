import { z } from "zod";

// Transliteration direction types
export const transliterationDirections = ["en-to-hi", "hi-to-en"] as const;

export const transliterationDirectionSchema = z.enum(transliterationDirections);

export type TransliterationDirection = z.infer<typeof transliterationDirectionSchema>;

// OCR result schema
export const ocrResultSchema = z.object({
  text: z.string(),
  confidence: z.number().optional(),
  language: z.string().optional(),
});

export type OCRResult = z.infer<typeof ocrResultSchema>;

// Transliteration result schema
export const transliterationResultSchema = z.object({
  originalText: z.string(),
  transliteratedText: z.string(),
  direction: transliterationDirectionSchema,
  timestamp: z.date().optional(),
});

export type TransliterationResult = z.infer<typeof transliterationResultSchema>;

// Image upload schema
export const imageUploadSchema = z.object({
  file: z.instanceof(File),
  preview: z.string().optional(),
});

export type ImageUpload = z.infer<typeof imageUploadSchema>;
