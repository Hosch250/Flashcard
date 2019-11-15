import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

import { DeckViewerComponent } from './deck-viewer.component';
import { NoteViewerComponent } from '../note-viewer/note-viewer.component';
import { NoteCreatorComponent } from '../note-creator/note-creator.component';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { NoteService } from '../shared/services/note.service';


@NgModule({
    declarations: [DeckViewerComponent, NoteViewerComponent, NoteCreatorComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        FlexLayoutModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: DeckViewerComponent }
        ])
    ],
    providers: [FlashcardDeckService, NoteService],
})
export class DeckViewerModule { }
