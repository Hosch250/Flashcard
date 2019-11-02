import { Component, OnInit } from '@angular/core';
import { FlashcardDeckService, FlashcardDeck } from '../shared/services/flashcardDeck.service';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { findKey } from 'lodash';

@Component({
    selector: 'fcd-deck-finder',
    templateUrl: './deck-finder.component.html',
    styleUrls: ['./deck-finder.component.scss']
})
export class DeckFinderComponent implements OnInit {
    public columns: number;
    private readonly breakpointsToColumns = {
        "(max-width: 599.99px) and (orientation: portrait)": 1,
        "(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)": 1,
        "(min-width: 840px) and (orientation: portrait)": 1,
        "(max-width: 959.99px) and (orientation: landscape)": 1,
        "(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)": 2,
        "(min-width: 1280px) and (orientation: landscape)": 3
    };

    constructor(private readonly flashcardDeckService: FlashcardDeckService, private readonly http: HttpClient, private readonly breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([
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
            this.columns = this.breakpointsToColumns[breakpoint];
        });
    }

    private _decks: FlashcardDeck[];
    public get decks() {
        return this._decks;
    }
    public set decks(value) {
        this._decks = value;
    }

    public categories: string[];

    public filterDecks(category: any) {
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
