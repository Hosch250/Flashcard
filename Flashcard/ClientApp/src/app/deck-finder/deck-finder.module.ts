import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeckFinderComponent } from './deck-finder.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        RouterModule.forChild([
            { path: '', component: DeckFinderComponent }
        ])
    ],
    providers: [FlashcardDeckService],
})
export class DeckFinderModule { }
