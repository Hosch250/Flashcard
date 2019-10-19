import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 

export interface Flashcard {
    id: number;
    label: string;
    front: string;
    back: string;
}

export interface FlashcardDeck {
    id: number;
    title: string;
    cards: Flashcard[];
    tags: string[];
}

@Injectable({
    providedIn: 'root'
})
export class FlashcardDeckService {
    
    private _httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    
    constructor(private http: HttpClient) { }
    
    get(id: number): FlashcardDeck {
        return {
            id: id,
            title: "State Abbreviations",
            tags: ['geography', 'united-states'],
            cards: [
                {  id: 0, label: 'Alabama', front: 'Alabama', back: 'AL' },
                {  id: 1, label: 'Alaska', front: 'Alaska', back: 'AK' },
                {  id: 2, label: 'Arizona', front: 'Arizona', back: 'AZ' },
                {  id: 3, label: 'Arkansas', front: 'Arkansas', back: 'AR' },
                {  id: 4, label: 'California', front: 'California', back: 'CA' },
                {  id: 5, label: 'Colorado', front: 'Colorado', back: 'CO' },
                {  id: 6, label: 'Connecticut', front: 'Connecticut', back: 'CT' },
                {  id: 7, label: 'Delaware', front: 'Delaware', back: 'DE' },
                {  id: 8, label: 'Florida', front: 'Florida', back: 'FL' },
                {  id: 9, label: 'Georgia', front: 'Georgia', back: 'GA' },
                {  id: 10, label: 'Hawaii', front: 'Hawaii', back: 'HI' },
                {  id: 11, label: 'Idaho', front: 'Idaho', back: 'ID' },
                {  id: 12, label: 'Illinois', front: 'Illinois', back: 'IL' },
                {  id: 13, label: 'Indiana', front: 'Indiana', back: 'IN' },
                {  id: 14, label: 'Iowa', front: 'Iowa', back: 'IA' },
                {  id: 15, label: 'Kansas', front: 'Kansas', back: 'KS' },
                {  id: 16, label: 'Kentucky', front: 'Kentucky', back: 'KY' },
                {  id: 17, label: 'Louisiana', front: 'Louisiana', back: 'LA' },
                {  id: 18, label: 'Maine', front: 'Maine', back: 'ME' },
                {  id: 19, label: 'Maryland', front: 'Maryland', back: 'MD' },
                {  id: 20, label: 'Massachusetts', front: 'Massachusetts', back: 'MA' },
                {  id: 21, label: 'Michigan', front: 'Michigan', back: 'MI' },
                {  id: 22, label: 'Minnesota', front: 'Minnesota', back: 'MN' },
                {  id: 23, label: 'Mississippi', front: 'Mississippi', back: 'MS' },
                {  id: 24, label: 'Missouri', front: 'Missouri', back: 'MO' },
                {  id: 25, label: 'Montana', front: 'Montana', back: 'MT' },
                {  id: 26, label: 'Nebraska', front: 'Nebraska', back: 'NE' },
                {  id: 27, label: 'Nevada', front: 'Nevada', back: 'NV' },
                {  id: 28, label: 'New Hampshire', front: 'New Hampshire', back: 'NH' },
                {  id: 29, label: 'New Jersey', front: 'New Jersey', back: 'NJ' },
                {  id: 30, label: 'New Mexico', front: 'New Mexico', back: 'NM' },
                {  id: 31, label: 'New York', front: 'New York', back: 'NY' },
                {  id: 32, label: 'North Carolina', front: 'North Carolina', back: 'NC' },
                {  id: 33, label: 'North Dakota', front: 'North Dakota', back: 'ND' },
                {  id: 34, label: 'Ohio', front: 'Ohio', back: 'OH' },
                {  id: 35, label: 'Oklahoma', front: 'Oklahoma', back: 'OK' },
                {  id: 36, label: 'Oregon', front: 'Oregon', back: 'OR' },
                {  id: 37, label: 'Pennsylvania', front: 'Pennsylvania', back: 'PA' },
                {  id: 38, label: 'Rhode Island', front: 'Rhode Island', back: 'RI' },
                {  id: 39, label: 'South Carolina', front: 'South Carolina', back: 'SC' },
                {  id: 40, label: 'South Dakota', front: 'South Dakota', back: 'SD' },
                {  id: 41, label: 'Tennessee', front: 'Tennessee', back: 'TN' },
                {  id: 42, label: 'Texas', front: 'Texas', back: 'TX' },
                {  id: 43, label: 'Utah', front: 'Utah', back: 'UT' },
                {  id: 44, label: 'Vermont', front: 'Vermont', back: 'VT' },
                {  id: 45, label: 'Virginia', front: 'Virginia', back: 'VA' },
                {  id: 46, label: 'Washington', front: 'Washington', back: 'WA' },
                {  id: 47, label: 'West Virginia', front: 'West Virginia', back: 'WV' },
                {  id: 48, label: 'Wisconsin', front: 'Wisconsin', back: 'WI' },
                {  id: 49, label: 'Wyoming', front: 'Wyoming', back: 'WY' }
            ]
        };
    }
    
    save(flashcardDeck: FlashcardDeck) {
        return this.http.post<FlashcardDeck>('https://localhost:44323/FlashcardDeck/', flashcardDeck, this._httpOptions);
    }
}
