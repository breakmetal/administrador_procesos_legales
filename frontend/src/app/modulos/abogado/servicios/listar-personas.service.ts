import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListarPersonasService {
  constructor(private http: HttpClient) { }
  public obtenerPersonas() {
    const url = 'http://127.0.0.1:8000/api/v1.0/abogado/personas';
    return this.http.get(url);
  }
}
