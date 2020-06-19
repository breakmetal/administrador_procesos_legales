import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Persona {
  documento : string,
  nombre : string,
  apellido: string,
  nacimiento: any,
  ocupacion: string,
}
@Injectable({
  providedIn: 'root'
})


export class PersonaService {
  private  url= 'http://127.0.0.1:8000/api/v1.0/abogado/personas/';
  constructor(private http: HttpClient) { }

  public agregarPersonas(persona: Persona) {
   
    return this.http.post(this.url, persona)
  }
  /**
   * EliminarPersona
   */
  public eliminarPersona(id: number) {
    const ruta = `${this.url}${id}`
    return this.http.delete(ruta)
  }

  /**
   * mostrarPersona
   */
  public mostrarPersona(id: number) {
    const ruta = `${this.url}${id}`
    return this.http.get(ruta)
  }

  public obtenerPersonas(urlPaginacion:any) {
    return this.http.get(urlPaginacion);
  }

  public actualizarPersona(id:number, persona:Persona){
    const ruta = `${this.url}${id}/`
    return this.http.put(ruta, persona);
  }

  public agregarInfoPersona(id:number, info:any){
    const ruta = `${this.url}${id}/`
    return this.http.patch(ruta,info)
  }
  
}