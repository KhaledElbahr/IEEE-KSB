import { HttpErrorInterceptor } from './http-error.interceptor';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CacheInterceptor } from './cache.interceptor';

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  // {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true},
];
