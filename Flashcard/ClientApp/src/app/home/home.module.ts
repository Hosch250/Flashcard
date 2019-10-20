import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { DeckFinderComponent } from '../deck-finder/deck-finder.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [HomeComponent, DeckFinderComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        RouterModule.forChild([
            { path: '', component: HomeComponent }
        ])
    ],
    providers: [FlashcardDeckService]
})
export class HomeModule { }
