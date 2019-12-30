import { Component, OnInit } from '@angular/core';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { ActivatedRoute } from '@angular/router';
import { FlashcardDeck } from '../shared/models/flashcardDeck';
import { shuffle } from 'lodash';

@Component({
  selector: 'fcd-deck-viewer',
  templateUrl: './deck-viewer.component.html',
  styleUrls: ['./deck-viewer.component.scss']
})
export class DeckViewerComponent implements OnInit {

  private _flashcardDeck: FlashcardDeck;
  public get flashcardDeck() {
    return this._flashcardDeck;
  }
  public set flashcardDeck(value) {
    this._flashcardDeck = value;
  }

  public selectedCardIndex: number = 0;

  constructor(private flashcardDeckService: FlashcardDeckService, private route: ActivatedRoute) {
  }

  public previousCard() {
    if (this.selectedCardIndex === 0) {
      return;
    }

    document.getElementsByClassName('flip-container').item(0).classList.remove('hover');
    this.selectedCardIndex--;
  }

  public nextCard() {
    if (this.selectedCardIndex === this.flashcardDeck.cards.length - 1) {
      return;
    }

    document.getElementsByClassName('flip-container').item(0).classList.remove('hover');
    this.selectedCardIndex++;
  }

  public shuffle() {
    this.flashcardDeck.cards = shuffle(this.flashcardDeck.cards);
  }

  ngOnInit() {
    this.flashcardDeckService
      .get(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(data => {
        this.flashcardDeck = data;
      });
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
