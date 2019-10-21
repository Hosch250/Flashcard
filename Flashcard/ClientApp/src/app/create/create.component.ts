import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlashcardDeckService, FlashcardDeck, Flashcard } from '../shared/services/flashcardDeck.service';
import { find, remove, indexOf } from 'lodash';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'fcd-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

    private _flashcardDeck: FlashcardDeck;
    public get flashcardDeck() {
        return this._flashcardDeck;
    }
    public set flashcardDeck(value) {
        this._flashcardDeck = value;
        this._allTags = value.tags;
    }
    
    private _selectedCard: Flashcard;
    public get selectedCard() {
        return this._selectedCard;
    }
    public set selectedCard(value) {
        this._selectedCard = value;
    }
    
    private _allTags: string[];
    public get allTags() {
        return this._allTags;
    }

    public addTagDialog(): void {
        const dialogRef = this.dialog.open(TagDialog);

        dialogRef.afterClosed().subscribe(tag => {
            if (tag !== undefined && tag !== '') {
                this._allTags.push(tag);
            }
        });
    }
    
    constructor(private flashcardDeckService: FlashcardDeckService, private dialog: MatDialog, private route: ActivatedRoute) {
        if (!route.snapshot.paramMap.has('id')) {
            this.flashcardDeck = this.flashcardDeckService.getNew();
        } else {
            this.flashcardDeckService
                .get(parseInt(route.snapshot.paramMap.get('id')))
                .subscribe(data => {
                    this.flashcardDeck = data;
                    this.selectedCard = this.flashcardDeck.cards[0];
                });
        }
    }

    public setSelectedCard(ev: any) {
        var cardId = parseInt(ev.value);
        this.selectedCard = find(this.flashcardDeck.cards, {id: cardId});
    }

    public addCard() {
        this.flashcardDeck.cards.push({
            id: this.flashcardDeck.cards.length,
            label: '',
            front: '',
            back: ''
        });

        this.selectedCard = this.flashcardDeck.cards[this.flashcardDeck.cards.length - 1];
    }

    public deleteCard() {
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
    
    public saveDeck() {
        this.flashcardDeckService.save(this.flashcardDeck).subscribe(data => {
            this.flashcardDeck = data;
            this.selectedCard = this.flashcardDeck.cards[0];
        });
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
