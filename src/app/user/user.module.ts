import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
// Reactive Forms Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Material Module
import { MaterialModule } from '../shared/modules/material.module';
// Components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { TeamComponent } from './components/team/team.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { UserComponent } from './layout/user.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

@NgModule({
  declarations: [
    AboutComponent,
    ArticlesComponent,
    FooterComponent,
    TeamComponent,
    ContactUsComponent,
    HomeComponent,
    ThanksComponent,
    UserComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
