import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlashcardDeckService, FlashcardDeck, Flashcard } from '../shared/services/flashcardDeck.service';
import { find, remove, indexOf } from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'fcd-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

    private _flashcardDeck: FlashcardDeck;
    private get flashcardDeck() {
        return this._flashcardDeck;
    }
    private set flashcardDeck(value) {
        this._flashcardDeck = value;
        this._allTags = value.tags;
    }
    
    private _selectedCard: Flashcard;
    private get selectedCard() {
        return this._selectedCard;
    }
    private set selectedCard(value) {
        this._selectedCard = value;
    }
    
    private _allTags: string[];
    private get allTags() {
        return this._allTags;
    }

    private addTagDialog(): void {
        const dialogRef = this.dialog.open(TagDialog);

        dialogRef.afterClosed().subscribe(tag => {
            if (tag !== undefined && tag !== '') {
                this._allTags.push(tag);
            }
        });
    }
    
    constructor(private flashcardDeckService: FlashcardDeckService, private dialog: MatDialog) { 
        this.flashcardDeckService.get(0).subscribe(data => {
            this.flashcardDeck = data;
            this.selectedCard = this.flashcardDeck.cards[0];
        });
    }

    private setSelectedCard(ev: any) {
        var cardId = parseInt(ev.value);
        this.selectedCard = find(this.flashcardDeck.cards, {id: cardId});
    }

    private addCard() {
        this.flashcardDeck.cards.push({
            id: this.flashcardDeck.cards.length,
            label: '',
            front: '',
            back: ''
        });

        this.selectedCard = this.flashcardDeck.cards[this.flashcardDeck.cards.length - 1];
    }

    private deleteCard() {
        let selectedIndex = indexOf(this.flashcardDeck.cards, this.selectedCard);
        remove(this.flashcardDeck.cards, card => card.id === this.selectedCard.id);

        if (this.flashcardDeck.cards.length === 0) {
            this.selectedCard = null;
        } else {
            let newIndex = selectedIndex === 0
                ? 0
                : selectedIndex - 1;
            this.selectedCard = this.flashcardDeck.cards[newIndex];
        }
    }
    
    private saveDeck() {
        this.flashcardDeckService.save(this.flashcardDeck).subscribe();
    }

    ngOnInit() {
    }
}

@Component({
    selector: 'tag-dialog',
    templateUrl: './tag-dialog.component.html',
})
export class TagDialog {

    constructor(public dialogRef: MatDialogRef<TagDialog>) {}
}
