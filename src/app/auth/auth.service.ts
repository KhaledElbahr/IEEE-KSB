import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, delay, tap, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  ACCESS_TOKEN: string;
  urlPath = 'http://localhost/IEEE-KSB/api';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  login(loginInfo): Observable<any> {
    return this.http.post<any>(`${this.urlPath}/adminlogin.php`, loginInfo).pipe(
      map((data) => {
        console.log(data);
        if (data.status === 'success') {
          this.ACCESS_TOKEN = data.jwt;
          localStorage.setItem('token', this.ACCESS_TOKEN);
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        return data;
      }),
      catchError(this.handleHttpError)
    );
  }

  changePassword(newPassword): Observable<any> {
    return this.http.post(`${this.urlPath}/change-password.php`, newPassword).pipe(
      map(data => data),
      catchError(err => this.handleHttpError(err))
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Handle Http Errors
  private handleHttpError(err) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned an unsuccessful response!!! ${err.status} - ${err.body.error}`;
    }
    return throwError(errorMessage);
  }
}
