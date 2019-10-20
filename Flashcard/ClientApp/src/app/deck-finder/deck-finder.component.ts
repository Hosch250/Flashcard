import { Component, OnInit } from '@angular/core';
import { FlashcardDeckService, FlashcardDeck } from '../shared/services/flashcardDeck.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'fcd-deck-finder',
    templateUrl: './deck-finder.component.html',
    styleUrls: ['./deck-finder.component.scss']
})
export class DeckFinderComponent implements OnInit {

    constructor(private readonly flashcardDeckService: FlashcardDeckService, private http: HttpClient) { }

    private _decks: FlashcardDeck[];
    private get decks() {
        return this._decks;
    }
    private set decks(value) {
        this._decks = value;
    }

    private categories: string[];

    private filterDecks(category: any) {
        this.flashcardDeckService.getAll(category).subscribe(data => {
            this.decks = data;
        });
    }

    ngOnInit() {
        this.flashcardDeckService.getAll().subscribe(data => {
            this.decks = data;
        });
        
        this.http.get<string[]>(`/FlashcardDeck/getAllCategories`).subscribe(data => {
            this.categories = data;
        });
    }
}
