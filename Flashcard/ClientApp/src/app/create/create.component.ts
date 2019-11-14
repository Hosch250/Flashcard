import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlashcardDeckService, FlashcardDeck, Flashcard } from '../shared/services/flashcardDeck.service';
import { find, remove, indexOf, findKey, includes, trim } from 'lodash';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'fcd-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {

    //private _flashcardDeck: FlashcardDeck;
    //public get flashcardDeck() {
    //    return this._flashcardDeck;
    //}
    //public set flashcardDeck(value) {
    //    this._flashcardDeck = value;
    //    this._allTags = value.tags;
    //}
    
    //private _selectedCard: Flashcard;
    //public get selectedCard() {
    //    return this._selectedCard;
    //}
    //public set selectedCard(value) {
    //    this._selectedCard = value;
    //}
    
    private allTags: string[] = [];

    public addTagDialog(): void {
        const dialogRef = this.dialog.open(TagDialog);

        dialogRef.afterClosed().subscribe(tag => {
            let sanitizedTag = trim(tag);

            if (sanitizedTag !== undefined && sanitizedTag !== '' && !includes(this.allTags, sanitizedTag)) {
                this.allTags.push(sanitizedTag);
            }
        });
    }

    private readonly breakpointsToShowSidebar = {
        "(max-width: 599.99px) and (orientation: portrait)": false,
        "(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)": false,
        "(min-width: 840px) and (orientation: portrait)": false,
        "(max-width: 959.99px) and (orientation: landscape)": false,
        "(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)": true,
        "(min-width: 1280px) and (orientation: landscape)": true
    };

    public showSidebar = true;
    public form: FormGroup = this.fb.group({
        id: 0,
        title: '',
        cards: this.fb.array([]),
        tags: this.fb.array([])
    });;

    constructor(private readonly fb: FormBuilder,
        private readonly flashcardDeckService: FlashcardDeckService,
        private readonly dialog: MatDialog,
        private readonly route: ActivatedRoute,
        private readonly breakpointObserver: BreakpointObserver) {
    }

    //public setSelectedCard(ev: any) {
    //    var cardId = parseInt(ev.value);
    //    this.selectedCard = find(this.flashcardDeck.cards, {id: cardId});
    //}

    //public addCard() {
    //    this.flashcardDeck.cards.push({
    //        id: this.flashcardDeck.cards.length,
    //        label: '(New Card)',
    //        front: '',
    //        back: ''
    //    });

    //    this.selectedCard = this.flashcardDeck.cards[this.flashcardDeck.cards.length - 1];
    //}

    //public deleteCard() {
    //    let selectedIndex = indexOf(this.flashcardDeck.cards, this.selectedCard);
    //    remove(this.flashcardDeck.cards, card => card.id === this.selectedCard.id);

    //    if (this.flashcardDeck.cards.length === 0) {
    //        this.selectedCard = null;
    //    } else {
    //        let newIndex = selectedIndex === 0
    //            ? 0
    //            : selectedIndex - 1;
    //        this.selectedCard = this.flashcardDeck.cards[newIndex];
    //    }
    //}
    
    public saveDeck() {
        //this.flashcardDeckService.save(this.flashcardDeck).subscribe(data => {
        //    this.flashcardDeck = data;
        //    this.selectedCard = this.flashcardDeck.cards[0];
        //});
    }

    ngOnInit() {
        if (!this.route.snapshot.paramMap.has('id')) {
            let deck = this.flashcardDeckService.getNew();
            this.form = this.fb.group({
                id: deck.id,
                title: deck.title,
                cards: this.fb.array(deck.cards),
                tags: this.fb.array(deck.tags)
            });
            //this.flashcardDeck = this.flashcardDeckService.getNew();
        } else {
            this.flashcardDeckService
                .get(parseInt(this.route.snapshot.paramMap.get('id')))
                .subscribe(data => {
                    this.form = this.fb.group({
                        id: data.id,
                        title: data.title,
                        cards: this.fb.array(data.cards),
                        tags: this.fb.array(data.tags)
                    });
                    console.log(this.form.get('tags').value);
                    this.allTags = data.tags;
                    //this.flashcardDeck = data;
                    //this.selectedCard = this.flashcardDeck.cards[0];
                });
        }

        this.breakpointObserver.observe([
            Breakpoints.Handset,
            Breakpoints.Tablet,
            Breakpoints.Web,
            Breakpoints.HandsetPortrait,
            Breakpoints.TabletPortrait,
            Breakpoints.WebPortrait,
            Breakpoints.HandsetLandscape,
            Breakpoints.TabletLandscape,
            Breakpoints.WebLandscape
        ]).subscribe(result => {
            let breakpoint = findKey(result.breakpoints, o => o);
            this.showSidebar = this.breakpointsToShowSidebar[breakpoint];
        });
    }
}

@Component({
    selector: 'tag-dialog',
    templateUrl: './tag-dialog.component.html',
})
export class TagDialog {

    constructor(public dialogRef: MatDialogRef<TagDialog>) {}
}
