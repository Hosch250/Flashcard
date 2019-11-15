import { Component, Input } from '@angular/core';
import { NoteService } from '../shared/services/note.service';
import { Note } from '../shared/models/note';

@Component({
    selector: 'fcd-note-viewer',
    templateUrl: './note-viewer.component.html',
    styleUrls: ['./note-viewer.component.scss']
})
export class NoteViewerComponent {
    
    constructor(private readonly noteService: NoteService) { }

    public notes: Note[];

    private _deckId = 0;
    @Input() set deckId(value) {
        this._deckId = value;

        if (!this._deckId) {
            this.notes = [];
        } else {
            this.noteService.get(this._deckId)
                .subscribe(s => this.notes = s);
        }
    };
}
