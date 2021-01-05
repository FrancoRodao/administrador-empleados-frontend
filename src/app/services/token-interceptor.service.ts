import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

	constructor(
		private auth: AuthService,
		private http: HttpClient
	) { }

	refreshingToken = new BehaviorSubject<boolean>(false);

	intercept(req: HttpRequest<any>, next: HttpHandler) {

		
		if (!this.auth.getToken()) {
			return next.handle(req)
		}

		const reqClone = req.clone({
			setHeaders: {
				authorization: `Bearer ${this.auth.getToken()}`
			}
		})

		return next.handle(reqClone).pipe(
			catchError((err: any) => {

				//if error is about http
				if (err instanceof HttpErrorResponse) {

					if (err.url.includes('refreshToken')) {
						return next.handle(reqClone)
					}

					//if error is not about authorization 
					if (err.status !== 401) {
						return next.handle(reqClone)
					}


					if(this.refreshingToken.value === true){
						return this.refreshingToken.pipe(
							filter(value => value === false),
							take(1),
							switchMap((value)=>{
								return next.handle(reqClone)
							})
						)
					}else{
						this.refreshingToken.next(true)
						return this.renewToken(req).pipe(
							switchMap(reqWithNewToken => {
								this.refreshingToken.next(false)
								return next.handle(reqWithNewToken)
							})
						)
					}

				} else {
					return next.handle(reqClone)
				}

			})
		)
	}

	renewToken(req: HttpRequest<any>) {
		return this.http.get(`${environment.API_URL}/refreshToken`, { withCredentials: true }).pipe(
			map((res: any) => {
				//update access token
				this.auth.setToken(res.token)
				return req.clone({
					setHeaders: {
						authorization: `Bearer ${res.token}`
					}
				})
			})
		)
	}
}




        // console.log('interceptado')
        // console.log(req)
        // if(req.url.includes(`${environment.API_URL}/signin` || req.url.includes(`${environment.API_URL}/signup`))){
        //     return req.handle()
        // }else if(req.){
        //     let tokenizeReq = req.clone({
        //         setHeaders: {
        //             authorization: `Bearer ${this.auth.getToken()}`
        //         },
        //     });
        //     return next.handle(tokenizeReq);
        // }
