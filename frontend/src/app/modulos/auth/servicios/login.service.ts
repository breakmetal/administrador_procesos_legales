import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  throwError, Observable } from 'rxjs';
import {Router} from '@angular/router';
import { catchError, mapTo, tap, map } from 'rxjs/operators';
import { strict } from 'assert';


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

  login(user:object) {
    return this.http.post('http://127.0.0.1:8000/api/token/', JSON.stringify(user), this.httpOptions).subscribe(
      res => {
        this.almacenarCredenciales(res, user);
        console.log(res);       
      }
    );     
  }

  
  almacenarCredenciales(data:any, usuario:object){
    localStorage.setItem("access", data['access']);
    localStorage.setItem("refresh", data['refresh']);
    localStorage.setItem("username", usuario['username'])
  }

  /*refreshAccessToken() {
    return this.http.post('http://127.0.0.1:8000/api/token/refresh/', { refresh : this.getRefreshToken() }, this.httpOptions).subscribe(
      res => {
        this.setNewAccessToken(res['access']);
        console.log(res);   
      }
    );     
  }*/
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
  /*refreshAccessToken() {
    return this.http.post('http://127.0.0.1:8000/api/token/refresh/', { refresh : this.getRefreshToken() }, this.httpOptions).pipe(
      map(token => {
        this.setNewAccessToken(token['access'])
        console.log(token)
      })
    )
         
  }

  
  /*login(user:object) {
    return this.http.post('http://127.0.0.1:8000/api/token/', JSON.stringify(user), this.httpOptions).subscribe(
      res => {
        this.tokens(res, user);
        console.log(res);

        
      }
    );     
  }
  /*refreshAccessToken() {
    return this.http.post('http://127.0.0.1:8000/api/token/refresh/', { refresh : this.getRefreshToken() }, this.httpOptions).subscribe(
      res => {
        this.setNewAccessToken(res['access']);
        console.log(res);   
      }
    );     
  }*/

 
 
  /**
   * Esta funcion permite crear variables de sesion para guardar los tokens
  
  public tokens(data:any, user:object) {
    localStorage.setItem("access", data['access']);
    localStorage.setItem("refresh", data['refresh']);
    localStorage.setItem("username", user['username'])
  }*/

  /**
   * get_token, permite recuperar el token almacenado en el localStore
   */
  /*public get_token() {
    return localStorage.getItem('access');
  }
  public setNewAccessToken(token:string){
    localStorage.setItem("access", token);
  }
  public getRefreshToken() {
    return localStorage.getItem('refresh');
  }
  
  login(usuario:object): Observable<boolean> {
    return this.http.post<any>('http://127.0.0.1:8000/api/token/', JSON.stringify(usuario))
      .pipe(
        tap(tokens => this.almacenarUsuario(tokens, usuario),
            error => console.log(error),
            () => console.log("loggin correcto")
        ))
  }

  */

}
