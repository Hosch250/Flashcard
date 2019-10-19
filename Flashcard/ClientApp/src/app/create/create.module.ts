import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent, TagDialog } from './create.component';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FlashcardDeckService } from '../shared/services/flashcardDeck.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [CreateComponent, TagDialog],
  imports: [
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '', component: CreateComponent}
    ])
  ],
  providers: [FlashcardDeckService, MatDialog],
  entryComponents: [TagDialog]
})
export class CreateModule { }
