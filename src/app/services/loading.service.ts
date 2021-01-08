import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService implements HttpInterceptor {

  loading$ = new BehaviorSubject<boolean>(true);
  activeRequests: number = 0

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests >= 0) {
      this.activeRequests++
      this.loading$.next(true)
    }

    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        this.loading$.next(true)
        if (this.activeRequests === 0) {
          this.loading$.next(false)
        }
      })
    )

  }

}
