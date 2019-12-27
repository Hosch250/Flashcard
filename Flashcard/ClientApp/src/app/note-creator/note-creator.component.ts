import { Component, Input } from '@angular/core';
import { NoteService } from '../shared/services/note.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'fcd-note-creator',
  templateUrl: './note-creator.component.html',
  styleUrls: ['./note-creator.component.scss']
})
export class NoteCreatorComponent {

  constructor(fb: FormBuilder, private readonly noteService: NoteService) {
    this.form = fb.group({
      content: fb.control('', { validators: [Validators.required, Validators.minLength(15), Validators.maxLength(2000)], updateOn: 'blur' })
    });
  }

  @Input() deckId: number;
  public form: FormGroup;
  public isSending = false;

  public createNote() {
    this.isSending = true;
    this.noteService.create(this.deckId, this.form.get('content').value, this.getCookie('username'))
      .subscribe(s => { this.form.reset(); this.isSending = false; });
  }

  private getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookies = decodedCookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }
}
