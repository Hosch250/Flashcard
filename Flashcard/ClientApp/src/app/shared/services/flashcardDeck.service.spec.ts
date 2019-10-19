import { TestBed } from '@angular/core/testing';

import { FlashcardDeckService } from './flashcardDeck.service';

describe('FlashcardDeckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashcardDeckService = TestBed.get(FlashcardDeckService);
    expect(service).toBeTruthy();
  });
});
