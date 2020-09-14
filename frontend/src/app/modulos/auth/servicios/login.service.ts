import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import {Router} from '@angular/router';
import { catchError, mapTo, tap, map } from 'rxjs/operators';
import { strict } from 'assert';
import {FormGroup, FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  //opciones para hacer llamados a la API
  private httpOptions: any;
  private usuarioActivo: string;

  public errors:any=[];
  constructor(private http: HttpClient, private router: Router) { 
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  login(user:any) {
    return this.http.post('http://127.0.0.1:8000/api/token/', JSON.stringify(user.value), this.httpOptions).subscribe(
      res => {
        this.almacenarCredenciales(res, user);
        this.router.navigateByUrl('dashboard/proceso/todas-notificaciones')
      }
    );     
  }

  
  almacenarCredenciales(data:any, usuario:object){
    localStorage.setItem("access", data['access']);
    localStorage.setItem("refresh", data['refresh']);
    localStorage.setItem("username", usuario['username'])
  }

  refreshAccessToken() {
    return this.http.post('http://127.0.0.1:8000/api/token/refresh/', { refresh : this.getRefreshToken() }).pipe(
      map((res:Response) => {
        this.setNewAccessToken(res['access'])
        return res})
    )
  }


  public get_token() {
    return localStorage.getItem('access');
  }
  public setNewAccessToken(token:string){
    localStorage.setItem("access", token);
  }
  public getRefreshToken() {
    return localStorage.getItem('refresh');
  }

  isLoggedIn() {
    return !!this.getRefreshToken();
  }

  logout() {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
    this.router.navigateByUrl('')
  }


}
