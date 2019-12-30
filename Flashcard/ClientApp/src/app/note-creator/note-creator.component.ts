import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from '../shared/services/note.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'fcd-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrls: ['./note-creator.component.scss']
})
export class NoteCreatorComponent implements OnInit {

  constructor(private readonly fb: FormBuilder, private readonly noteService: NoteService) {
  }

  @Input() username: string;
  @Input() deckId: number;
  public form: FormGroup;
  public isSending = false;

  public createNote() {
    this.isSending = true;
    this.noteService.create(this.deckId, this.form.get('content').value, this.username)
      .subscribe(s => { this.form.reset(); this.isSending = false; });
  }

  ngOnInit() {
    this.form = this.fb.group({
      content: this.fb.control({ value: '', disabled: !this.username }, { validators: [Validators.required, Validators.minLength(15), Validators.maxLength(2000)], updateOn: 'blur' })
    });
  }
}
