import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Article } from '../models/article';
import { Volunteer } from '../models/volunteer';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost/IEEE-KSB/api';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(`${this.url}/articles.php`).pipe(
      map((data: Article[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getLastArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.url}/last-articles.php`).pipe(
      map((data: Article[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getArticlesByYear(year: number) {
    return this.http.get<Article[]>(`${this.url}/get-article-by-date.php?year=${year}`).pipe(
      map((data: Article[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getHomeVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${this.url}/home-volunteers.php`).pipe(
      map((data: Volunteer[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  getVolunteers(): Observable<Volunteer[]> {
    return this.http.get<Volunteer[]>(`${this.url}/volunteers.php`).pipe(
      map((data: Volunteer[]) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  sendFeedback(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(`${this.url}/contacts.php`, contact).pipe(
      map((data: Contact) => {
        console.log(data);
        return data;
      }),
      catchError(err => throwError(err))
    );
  }

  // Handle Errors
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
}
