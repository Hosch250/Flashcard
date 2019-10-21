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
    public get flashcardDeck() {
        return this._flashcardDeck;
    }
    public set flashcardDeck(value) {
        this._flashcardDeck = value;
    }

    private _selectedCard: Flashcard;
    public get selectedCard() {
        return this._selectedCard;
    }
    public set selectedCard(value) {
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

    public previousCard() {
        if (this.selectedCard.id === 0) {
            return;
        }

        this.selectedCard = this.flashcardDeck.cards[this.selectedCard.id - 1];
    }

    public nextCard() {
        if (this.selectedCard.id === this.flashcardDeck.cards.length - 1) {
            return;
        }

        this.selectedCard = this.flashcardDeck.cards[this.selectedCard.id + 1];
    }

    ngOnInit() {
    }
}
