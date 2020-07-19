import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, filter, take, switchMap, tap, map, retry } from 'rxjs/operators';
import { LoginService } from "../servicios/login.service";
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService implements HttpInterceptor{
  private refrescarTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private ruta_refrescar_token = "http://127.0.0.1:8000/api/token/refresh/";

  constructor(public loginService:LoginService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.loginService.get_token()) {
      request = this.addToken(request, this.loginService.get_token());
      this.refrescarTokenSubject.next(null);
    }

    return next.handle(request).pipe(catchError(error => {
      let refreshToken = localStorage.getItem('refresh')
      if (error.status === 401 && refreshToken !== null && error.url!==this.ruta_refrescar_token) {
        return this.manejarError401(request, next)
        //this.loginService.refreshAccessToken()
      } else {
        return throwError(error);
      }
    }));
  }
  
  private manejarError401(request: HttpRequest<any>, next: HttpHandler){
    this.refrescarTokenSubject.next(null)

    return this.loginService.refreshAccessToken().pipe(
      switchMap((token: any) => {
        this.refrescarTokenSubject.next(token)
        return next.handle(this.addToken(request,this.loginService.get_token()))
      })
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}


  /*constructor(public loginService:LoginService, private router: Router, private http: HttpClient) { }
  private metodo:string;
  private refrescar = true;
  private ruta_refrescar_token = "http://127.0.0.1:8000/api/token/refresh/";
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (this.loginService.get_token()!== null) {
      req = this.addToken(req, this.loginService.get_token());
      this.metodo = req.method
    }    
    return next.handle(req).pipe(tap(() => {},    
    (err: any) => {
    if (err instanceof HttpErrorResponse) {
      let refreshToken = localStorage.getItem('refresh')
      if (err.status === 401 && refreshToken !== null && err.url!==this.ruta_refrescar_token)  {
        this.loginService.refreshAccessToken()
      }else{
        this.router.navigate(['login']);
      }

    }
  }))

  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  private repetir(request: HttpRequest<any>, next: HttpHandler){
    
  }*/

