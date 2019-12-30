import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './shared/services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { UserBannerComponent } from './user-banner/user-banner.component';

@NgModule({
    declarations: [
        AppComponent,
        UserBannerComponent
    ],
    imports: [
        BrowserModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        AppRoutingModule,
        NoopAnimationsModule,
        FlexLayoutModule,
        HttpClientModule
    ],
    providers: [LoginService],
    bootstrap: [AppComponent]
})
export class AppModule { }
