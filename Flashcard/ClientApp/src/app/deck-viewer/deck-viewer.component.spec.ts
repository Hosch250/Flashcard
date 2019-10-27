import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckViewerComponent } from './deck-viewer.component';
import { FlashcardDeckService, FlashcardDeck } from '../shared/services/flashcardDeck.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('DeckViewerComponent', () => {
  let component: DeckViewerComponent;
  let fixture: ComponentFixture<DeckViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [DeckViewerComponent],
        imports: [
            CommonModule,
            MatButtonModule,
            MatIconModule,
            MatCardModule,
            FlexLayoutModule,
            HttpClientTestingModule,
            RouterTestingModule,
            NoopAnimationsModule
        ],
        providers: [FlashcardDeckService, {
            provide: ActivatedRoute,
            useValue: { snapshot: { paramMap: convertToParamMap( { 'id': '1' } ) } }
          }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let httpMock = TestBed.get(HttpTestingController);
    const data : FlashcardDeck = {
      id: 1,
      title: 'test',
      tags: ['tag'],
      cards: [{
          id: 1,
          label: 'card',
          front: 'card',
          back: 'card'
      }]
    };
    let request = httpMock.expectOne('/FlashcardDeck/getDeck/1');
    request.flush(data);
    expect(component).toBeTruthy();
  });
});
