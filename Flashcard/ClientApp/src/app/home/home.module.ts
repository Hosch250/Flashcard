import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { DeckFinderComponent } from '../deck-finder/deck-finder.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSelectModule } from '@angular/material/select';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    declarations: [HomeComponent, DeckFinderComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatGridListModule,
        MatSelectModule,
        HttpClientModule,
        FlexLayoutModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent }
        ])
    ],
    providers: [FlashcardDeckService]
})
export class HomeModule { }
