import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditProfileComponent } from './components/dashboard/edit-profile/edit-profile.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { VolunteerComponent } from './components/volunteers/volunteer/volunteer.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { CanDeactivateGuard } from '../core/services/can-deactivate.guard';
import { DataResolverService } from '../core/services/data-resolver.service';

const adminRoutes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {
        path: 'dashboard', component: DashboardComponent, children: [
          { path: 'edit-profile', component: EditProfileComponent },
        ]
      },
      {
        path: 'volunteers', component: VolunteersComponent, resolve: { resolvedData: DataResolverService }, children: [
          { path: 'volunteer', component: VolunteerComponent },
        ]
      },
      {
        path: 'articles', component: ArticlesComponent, resolve: { resolvedData: DataResolverService }, children: [
          { path: 'article', component: ArticleComponent },
        ]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
