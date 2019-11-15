import { Component, OnInit } from '@angular/core';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { ActivatedRoute } from '@angular/router';
import { FlashcardDeck } from '../shared/models/flashcardDeck';
import { Flashcard } from '../shared/models/flashcard';

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
    }

    public previousCard() {
        if (this.selectedCard.id === 0) {
            return;
        }

        document.getElementsByClassName('flip-container').item(0).classList.remove('hover');
        this.selectedCard = this.flashcardDeck.cards[this.selectedCard.id - 1];
    }

    public nextCard() {
        if (this.selectedCard.id === this.flashcardDeck.cards.length - 1) {
            return;
        }

        document.getElementsByClassName('flip-container').item(0).classList.remove('hover');
        this.selectedCard = this.flashcardDeck.cards[this.selectedCard.id + 1];
    }

    ngOnInit() {
        this.flashcardDeckService
            .get(parseInt(this.route.snapshot.paramMap.get('id')))
            .subscribe(data => {
                this.flashcardDeck = data;
                this.selectedCard = this.flashcardDeck.cards[0];
            });
    }
}
