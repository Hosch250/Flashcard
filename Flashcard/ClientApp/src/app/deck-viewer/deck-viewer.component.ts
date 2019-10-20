import { Component, OnInit } from '@angular/core';
import { FlashcardDeckService, Flashcard, FlashcardDeck } from '../shared/services/flashcardDeck.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fcd-deck-viewer',
    templateUrl: './deck-viewer.component.html',
    styleUrls: ['./deck-viewer.component.scss']
})
export class DeckViewerComponent implements OnInit {

    private _flashcardDeck: FlashcardDeck;
    private get flashcardDeck() {
        return this._flashcardDeck;
    }
    private set flashcardDeck(value) {
        this._flashcardDeck = value;
    }

    private _selectedCard: Flashcard;
    private get selectedCard() {
        return this._selectedCard;
    }
    private set selectedCard(value) {
        this._selectedCard = value;
    }

    constructor(private flashcardDeckService: FlashcardDeckService, private route: ActivatedRoute) {
        this.flashcardDeckService
            .get(parseInt(route.snapshot.paramMap.get('id')))
            .subscribe(data => {
                this.flashcardDeck = data;
                this.selectedCard = this.flashcardDeck.cards[0];
            });
    }

    private previousCard() {
        if (this.selectedCard.id === 0) {
            return;
        }

        this.selectedCard = this.flashcardDeck.cards[this.selectedCard.id - 1];
    }

    private nextCard() {
        if (this.selectedCard.id === this.flashcardDeck.cards.length - 1) {
            return;
        }

        this.selectedCard = this.flashcardDeck.cards[this.selectedCard.id + 1];
    }

    ngOnInit() {
    }
}
