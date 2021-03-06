import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../shared/services/login.service';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent }
    ])
  ],
  providers: [LoginService],
})
export class LoginModule { }
