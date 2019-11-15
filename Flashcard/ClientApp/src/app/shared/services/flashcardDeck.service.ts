import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { FlashcardDeck } from '../models/flashcardDeck';

@Injectable({
    providedIn: 'root'
})
export class FlashcardDeckService {
    constructor(private http: HttpClient) { }

    getNew(): FlashcardDeck {
        return {
            id: 0,
            title: '(New Deck)',
            cards: [],
            tags: []
        }
    }

    get(id: number): Observable<FlashcardDeck> {
        return this.http.get<FlashcardDeck>(`/FlashcardDeck/getDeck/${id}`);
    }

    getAll(category?: string): Observable<FlashcardDeck[]> {
        return category === undefined
            ? this.http.get<FlashcardDeck[]>(`/FlashcardDeck/getAllDecks`)
            : this.http.get<FlashcardDeck[]>(`/FlashcardDeck/getAllDecks?category=${category}`);
    }
    
    save(flashcardDeck: FlashcardDeck) {
        return this.http.post<FlashcardDeck>('/FlashcardDeck/SaveDeck', flashcardDeck);
    }
}
