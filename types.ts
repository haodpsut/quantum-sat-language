export enum Category {
  GENERAL_QA = "General Q&A",
  PRESENTATION = "Presentation Flow",
  TECHNICAL_DEEP_DIVE = "Technical (AI/Quantum/SAGINs)",
  NETWORKING = "Networking & Discussion"
}

export interface FlashcardData {
  id: string;
  english: string;
  vietnamese: string;
  russian: string;
  category: Category;
  context: string; // Usage context (e.g., "Use when explaining methodology")
  phonetic?: string;
}

export interface AppState {
  cards: FlashcardData[];
  currentIndex: number;
  isLoading: boolean;
  isFlipped: boolean;
  error: string | null;
  apiKey: string | null;
}
