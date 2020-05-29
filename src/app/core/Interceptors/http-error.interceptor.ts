import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // TODO: handle your Request Error here
      catchError(err => {
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${err.error.message}`;
        } else if ([401, 403].indexOf(err.status) !== -1) {
          errorMessage = `Unauthorized user`;
        }
        else {
          errorMessage = `Backend returned an unsuccessful response!!! ${err.status} - ${err.body.error}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
