// Storage interface for the transliteration app
// Currently, most functionality happens client-side (OCR, transliteration)
// This can be extended for features like saving history, etc.

export interface IStorage {
  // Placeholder for future storage needs
}

export class MemStorage implements IStorage {
  constructor() {
    // Initialize storage if needed
  }
}

export const storage = new MemStorage();
