import { AdminService } from 'src/app/core/services/admin.service';
import { Volunteer } from 'src/app/core/models/volunteer';
import { Article } from 'src/app/core/models/article';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService implements Resolve<Article[] | Volunteer[]> {

  constructor(private adminService: AdminService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Article[] | Volunteer[]> {
      const pathUrl = route.url[0].path;
      if (pathUrl === 'articles') {
        return this.adminService.getArticles();
      } else if (pathUrl === 'volunteers') {
        return this.adminService.getVolunteers();
      }
  }
}
