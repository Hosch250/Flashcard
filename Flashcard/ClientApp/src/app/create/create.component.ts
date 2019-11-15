import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { includes, trim } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TagDialog } from './tag-dialog.component';

@Component({
    selector: 'fcd-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateComponent implements OnInit {
    public Editor = ClassicEditor;
    public allTags: string[] = [];
    public selectedCardId: number = 0;
    public form: FormGroup = this.fb.group({
        id: 0,
        title: '',
        cards: this.fb.array([]),
        tags: this.fb.control([])
    });

    public get cardControls() {
        return this.form.get('cards') as FormArray;
    }

    public addTagDialog(): void {
        const dialogRef = this.dialog.open(TagDialog);

        dialogRef.afterClosed().subscribe(tag => {
            let sanitizedTag = trim(tag);

            if (sanitizedTag !== undefined && sanitizedTag !== '' && !includes(this.allTags, sanitizedTag)) {
                this.allTags.push(sanitizedTag);
            }
        });
    }

    constructor(private readonly fb: FormBuilder,
        private readonly flashcardDeckService: FlashcardDeckService,
        private readonly dialog: MatDialog,
        private readonly route: ActivatedRoute) {
    }

    public setSelectedCard(ev: any) {
        this.selectedCardId = parseInt(ev.value);
    }

    public addCard() {
        let cards = this.form.get('cards') as FormArray;
        cards.push(this.fb.group({
            id: 0,
            label: '(New Card)',
            front: '',
            back: ''
        }));

        this.selectedCardId = cards.length - 1;
    }

    public deleteCard() {
        let cards = this.form.get('cards') as FormArray;
        cards.removeAt(this.selectedCardId);

        if (cards.length === 0) {
            this.selectedCardId = 0;
        } else {
            this.selectedCardId = this.selectedCardId === 0
                ? 0
                : this.selectedCardId - 1;
        }
    }
    
    public saveDeck() {
        this.flashcardDeckService.save(this.form.value).subscribe(data => {
            this.form = this.fb.group({
                id: data.id,
                title: data.title,
                cards: this.fb.array(data.cards.map(card => this.fb.group({
                    id: card.id,
                    label: card.label,
                    front: card.front,
                    back: card.back
                }))),
                tags: this.fb.control(data.tags)
            });
            this.allTags = data.tags;
        });
    }

    ngOnInit() {
        if (!this.route.snapshot.paramMap.has('id')) {
            let deck = this.flashcardDeckService.getNew();
            this.form = this.fb.group({
                id: deck.id,
                title: deck.title,
                cards: this.fb.array(deck.cards.map(card => this.fb.group({
                    id: card.id,
                    label: card.label,
                    front: card.front,
                    back: card.back
                }))),
                tags: this.fb.control(deck.tags)
            });
        } else {
            this.flashcardDeckService
                .get(parseInt(this.route.snapshot.paramMap.get('id')))
                .subscribe(data => {
                    this.form = this.fb.group({
                        id: data.id,
                        title: data.title,
                        cards: this.fb.array(data.cards.map(card => this.fb.group({
                            id: card.id,
                            label: card.label,
                            front: card.front,
                            back: card.back
                        }))),
                        tags: this.fb.control(data.tags)
                    });
                    this.allTags = data.tags;
                    this.selectedCardId = 0;
                });
        }
    }
}
