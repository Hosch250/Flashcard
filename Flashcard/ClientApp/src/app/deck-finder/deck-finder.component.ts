import { Component, OnInit } from '@angular/core';
import { FlashcardDeckService, FlashcardDeck } from '../shared/services/flashcardDeck.service';

@Component({
    selector: 'fcd-deck-finder',
    templateUrl: './deck-finder.component.html',
    styleUrls: ['./deck-finder.component.scss']
})
export class DeckFinderComponent implements OnInit {

    constructor(private readonly flashcardDeckService: FlashcardDeckService) { }

    private _decks: FlashcardDeck[];
    private get decks() {
        return this._decks;
    }
    private set decks(value) {
        this._decks = value;
    }

    ngOnInit() {
        this.flashcardDeckService.getAll().subscribe(data => {
            this.decks = data;
        });
    }
}
