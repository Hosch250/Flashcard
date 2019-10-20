import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { DeckViewerComponent } from './deck-viewer.component';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';


@NgModule({
    declarations: [DeckViewerComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        FlexLayoutModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: '', component: DeckViewerComponent }
        ])
    ],
    providers: [FlashcardDeckService],
})
export class DeckViewerModule { }
