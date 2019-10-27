import { TestBed } from '@angular/core/testing';

import { FlashcardDeckService } from './flashcardDeck.service';
import { HttpClientModule } from '@angular/common/http'; 

describe('FlashcardDeckService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
  }));

  it('should be created', () => {
    const service: FlashcardDeckService = TestBed.get(FlashcardDeckService);
    expect(service).toBeTruthy();
  });
});
