import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DeckFinderComponent } from '../deck-finder/deck-finder.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatSelectModule } from '@angular/material/select';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [HomeComponent, DeckFinderComponent],
        imports: [
            CommonModule,
            MatCardModule,
            MatButtonModule,
            MatIconModule,
            MatGridListModule,
            MatSelectModule,
            HttpClientModule,
            FlexLayoutModule,
            RouterTestingModule,
            NoopAnimationsModule
        ],
        providers: [FlashcardDeckService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
