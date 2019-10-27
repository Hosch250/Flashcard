import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckViewerComponent } from './deck-viewer.component';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
            HttpClientModule,
            RouterTestingModule,
            NoopAnimationsModule
        ],
        providers: [FlashcardDeckService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
