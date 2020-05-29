import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// User Components
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { TeamComponent } from './components/team/team.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ThanksComponent } from './components/thanks/thanks.component';
import { UserComponent } from './layout/user.component';

const userRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'team', component: TeamComponent },
      { path: 'contact-us', component: ContactUsComponent },
      { path: 'contact-us/thanks', component: ThanksComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      // { path: '**', component: PageNotFoundComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
