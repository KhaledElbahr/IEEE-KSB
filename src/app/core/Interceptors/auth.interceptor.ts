import { AuthService } from './../../auth/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: add your Request HttpHeaders here
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Authentication: `Bearer ${this.auth.ACCESS_TOKEN}`
      }
    });

    return next.handle(request);
  }
}
