import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

export interface Flashcard {
    id: number;
    label: string;
    front: string;
    back: string;
}

export interface FlashcardDeck {
    id: number;
    title: string;
    cards: Flashcard[];
    tags: string[];
}

@Injectable({
    providedIn: 'root'
})
export class FlashcardDeckService {
    
    private _httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    
    constructor(private http: HttpClient) { }

    getNew(): FlashcardDeck {
        return {
            id: 0,
            title: '',
            cards: [],
            tags: []
        }
    }

    get(id: number): Observable<FlashcardDeck> {
        return this.http.get<FlashcardDeck>(`/FlashcardDeck/getDeck/${id}`);
    }

    getAll(): Observable<FlashcardDeck[]> {
        return this.http.get<FlashcardDeck[]>(`/FlashcardDeck/getAllDecks`);
    }
    
    save(flashcardDeck: FlashcardDeck) {
        return this.http.post<FlashcardDeck>('/FlashcardDeck/SaveDeck', flashcardDeck);
    }
}
