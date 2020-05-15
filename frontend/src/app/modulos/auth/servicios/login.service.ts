import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //opciones para hacer llamados a la API
  private httpOptions: any;
  // the actual JWT token de acceso
  public token_access: string;
  public token_refresh: string;
  public username:string;
  public errors:any=[];
  constructor(private http: HttpClient, private router: Router) { 
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  login(user:object) {
    return this.http.post('http://127.0.0.1:8000/api/token/', JSON.stringify(user), this.httpOptions).subscribe(
      res => {
        this.tokens(res, user);
        console.log(res);

        
      }
    );     
  }
  refreshAccessToken() {
    return this.http.post('http://127.0.0.1:8000/api/token/refresh/', { refresh : this.getRefreshToken() }, this.httpOptions).subscribe(
      res => {
        this.setNewAccessToken(res['access']);
        console.log(res);   
      }
    );     
  }
  
  /**
   * Esta funcion permite crear variables de sesion para guardar los tokens
  **/
  public tokens(data:any, user:object) {
    localStorage.setItem("access", data['access']);
    localStorage.setItem("refresh", data['refresh']);
    localStorage.setItem("username", user['username'])
  }

  /**
   * get_token, permite recuperar el token almacenado en el localStore
   */
  public get_token() {
    return localStorage.getItem('access');
  }
  private setNewAccessToken(token:string){
    localStorage.setItem("access", token);
  }
  private getRefreshToken() {
    return localStorage.getItem('refresh');
  }

}
