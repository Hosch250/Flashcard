import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
    constructor(private http: HttpClient) { }

    get(deckId: number): Observable<Note[]> {
        return this.http.get<Note[]>(`/Note/getNotes?deckId=${deckId}`);
    }

    create(deckId: number, content: string, createdBy: string): Observable<Note> {
        return this.http.post<Note>(`/Note/createNote?deckId=${deckId}&content=${content}&createdBy=${createdBy}`, null);
    }
}
