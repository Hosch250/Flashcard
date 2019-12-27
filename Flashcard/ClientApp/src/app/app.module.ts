import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './shared/services/login.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        AppRoutingModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        HttpClientModule
    ],
    providers: [LoginService],
    bootstrap: [AppComponent]
})
export class AppModule { }
