import { Flashcard } from "./Flashcard";
export interface FlashcardDeck {
    id: number;
    title: string;
    cards: Flashcard[];
    tags: string[];
}
