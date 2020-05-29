import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { of, Observable, throwError } from 'rxjs';
import { Statistics } from '../models/statistics';
import { Admin } from '../models/admin';
import { Volunteer } from '../models/volunteer';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = 'http://localhost/IEEE-KSB/api';
  ACCESS_TOKEN: string;

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(`${this.url}/statistics.php`).pipe(
      map((data: Statistics) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getAdmin(): Observable<Admin> {
    return this.http.get<Admin>(`${this.url}/admin.php`).pipe(
      map((data: Admin) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  updateAdminProfile(admin: Admin): Observable<any> {
    return this.http.put<Admin>(`${this.url}/edit-admin.php?id=${admin.id}`, admin).pipe(
      map(data => {
        console.log(data);
        return data;
      }),
      catchError(err => throwError(err))
    );
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${this.url}/volunteers.php`).pipe(
      tap((data: Volunteer[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getVolunteer(id: number): Observable<Volunteer> {
    if (id === 0) {
      return of(this.initializeVolunteer());
    }
    return this.http.get<Volunteer>(`${this.url}/get-volunteer.php?id=${id}`).pipe(
      tap((data: Volunteer) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  addVolunteer(volunteer): Observable<any> {
    volunteer.id = null;
    return this.http.post<any>(`${this.url}/add-volunteer.php`, volunteer).pipe(
      map((data: any) => {
        console.log(data);
        return data;
      }),
      catchError(err => throwError(err))
    );
  }

  updateVolunteer(volunteer): Observable<any> {
    return this.http.put<any>(`${this.url}/edit-volunteer.php?id=${volunteer.id}`,
      volunteer);
  }

  deleteVolunteer(vid: number) {
    return this.http.delete(`${this.url}/delete-volunteer.php?id=${vid}`).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/articles.php`).pipe(
      map((data: Article[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getArticle(id: number): Observable<Article> {
    if (id === 0) {
      return of(this.initializeArticle());
    }
    return this.http.get<Article>(`${this.url}/get-article.php?id=${id}`).pipe(
      tap((data: Article) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  addArticle(article: Article): Observable<any> {
    article.id = null;
    return this.http.post<Article>(`${this.url}/add-article.php`, article).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(err => throwError(err))
    );
  }

  updateArticle(article: Article): Observable<any> {
    return this.http.put<Article>(`${this.url}/edit-article.php?id=${article.id}`, article).pipe(
      catchError(err => throwError(err))
    );
  }

  deleteArticle(rid: number) {
    return this.http.delete(`${this.url}/delete-article.php?id=${rid}`).pipe(
      map((data: any) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned an unsuccessful response!!! ${err.status} - ${err.body.error}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  private initializeVolunteer(): Volunteer {
    // Return an initialized object
    return {
      id: 0,
      arab_name: null,
      eng_name: null,
      age: null,
      role: { id: null, name: null },
      committee: { id: null, name: null },
      image: null,
      gmail: null,
      linkedIn: null,
    };
  }

  private initializeArticle(): Article {
    return {
      id: 0,
      title: null,
      link: null,
      image: null,
      date: null,
      description: null
    };
  }

}

// hireDate: employee.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
