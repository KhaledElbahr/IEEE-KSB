import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpCacheService } from '../services/http-cache.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  constructor(private httpCache: HttpCacheService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Pass along non-cacheable requests and invalidate cache
      if (req.method !== 'GET') {
          console.log(`Invalidating cache: ${req.method} ${req.url}`);
          this.httpCache.invalidateCache();
          return next.handle(req);
      }

      // Attempt to retrieve a cached response
      const cachedRes: HttpResponse<any> = this.httpCache.get(req.url);

      // return cached response
      if (cachedRes) {
          console.log(`Returning a cached response: ${cachedRes.url}`);
          console.log(cachedRes);
          return of(cachedRes);
      }

      // Send request to server and add response to cache
      return next.handle(req).pipe(
          tap(event => {
              if (event.type === HttpEventType.Response) {
                  console.log(`Adding item to cache: ${req.url}`);
                  this.httpCache.put(req.url, event);
              }
          })
      );
  }
}
