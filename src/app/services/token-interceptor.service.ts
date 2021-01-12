import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, finalize, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadingService } from './loading.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private activeRequests: number = 0;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    //request info for loading service
    if (this.activeRequests >= 0) {
      this.activeRequests++;
      this.loadingService.loading$.next(true);
    }

    //if user is logged add header authorization
    if (this.authService.checkSession()) {
      request = this.addToken(request, this.authService.getToken());
    }

    return next.handle(request).pipe(
      // if error try refresh token
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {

          if (request.url.includes("refreshToken")) {
            this.loadingService.loading$.next(false)
            this.authService.signOff();
          }

          this.loadingService.loading$.next(true);
          return this.handle401Error(request, next)


        } else {
          return throwError(error);
        }
      }),
      // loading
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests <= 0) {
          this.loadingService.loading$.next(false);
        }
      })
    );
  }


  addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'authorization': `Bearer ${token}`
      }
    });
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.refreshToken().pipe(
        switchMap((res: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(res.token);
          return next.handle(this.addToken(request, res.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  refreshToken() {
    return this.http.get<any>(`${environment.API_URL}/refreshToken`, { withCredentials: true })
      .pipe(tap((res) => {
        this.authService.setToken(res.token)
      }));
  }

}
