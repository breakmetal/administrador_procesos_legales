import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, filter, take, switchMap, tap } from 'rxjs/operators';
import { LoginService } from "../servicios/login.service";
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService implements HttpInterceptor{

  constructor(public loginService:LoginService, private router: Router) { }

        

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (this.loginService.get_token()!== null) {
      req = this.addToken(req, this.loginService.get_token());
    }    
    return next.handle(req).pipe( tap(() => {},
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      let refreshToken = localStorage.getItem('refresh')
      if (err.status === 401 && refreshToken !== null) {
        this.loginService.refreshAccessToken()
        console.log(refreshToken)
      }else{
        this.router.navigate(['login']);
      }

    }
  }));

  }
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

  }
  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })
  }



    
}
