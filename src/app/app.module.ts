import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Reactive Forms Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Http Client Module
import { HttpClientModule } from '@angular/common/http';
// App Module
import { AppRoutingModule } from './app-routing.module';
// Core Modules
import { CoreModule } from './core/core.module';
// Auth Module
import { AuthModule } from './auth/auth.module';
// Material UI
import { MaterialModule } from './shared/modules/material.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
