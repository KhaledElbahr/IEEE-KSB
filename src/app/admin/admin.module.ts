import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Reactive Forms Module
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Http Client Module
import { HttpClientModule } from '@angular/common/http';
// Material Module
import { MaterialModule } from '../shared/modules/material.module';
// Routing Module
import { AdminRoutingModule } from './admin-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { UploadImageComponent } from './shared/components/upload-image/upload-image.component';
import { AdminComponent } from './layout/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileInfoComponent } from './components/dashboard/profile-info/profile-info.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { VolunteerComponent } from './components/volunteers/volunteer/volunteer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    UploadImageComponent,
    AdminComponent,
    DashboardComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    VolunteersComponent,
    ArticlesComponent,
    ArticleComponent,
    VolunteerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
