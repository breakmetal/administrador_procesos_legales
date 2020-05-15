import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Empresa{
  documento: number;
  nombre: string;
  actividad: string;
  email: string;
  celular: number;
  fijo: number;
  direccion: string;

}
@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url = "http://127.0.0.1:8000/api/v1.0/abogado/empresas/";
  constructor(private http: HttpClient) { }

  public agregarEmpresas(empresa: Empresa) {
   
    return this.http.post(this.url, empresa)
  }
  /**
   * EliminarEmpresa
   */
  public eliminarEmpresa(id: number) {
    const ruta = `${this.url}${id}`
    return this.http.delete(ruta)
  }

  /**
   * mostrarEmpresa
   */
  public mostrarEmpresa(id: number) {
    const ruta = `${this.url}${id}`
    return this.http.get(ruta)
  }

  public obtenerEmpresas(urlPaginacion:any) {
    return this.http.get(urlPaginacion);
  }
  public iniciarListadoEmpresas() {
    return this.http.get(this.url);
  }

  public actualizarEmpresa(id:number, empresa:Empresa){
    const ruta = `${this.url}${id}/`
    return this.http.put(ruta, empresa);
  }

  public agregarInfoEmpresa(id:number, info:any){
    const ruta = `${this.url}${id}/`
    return this.http.patch(ruta,info)
  }
}
