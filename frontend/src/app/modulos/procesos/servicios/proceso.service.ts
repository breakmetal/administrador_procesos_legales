import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Proceso{
  id : number;
  numero_proceso : string;
  despacho : number;
  user : number;
  tipo : string;
  estado : string;
  listisconsorcio : string;
  descripcion : string;
  fecha_providencia : any;
  fecha_publicacion : any;
  fecha_finalizacion : any; 

}

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {
  private url = "http://127.0.0.1:8000/api/v1.0/procesos/procesos/"
  private urlEjecutivo = "http://127.0.0.1:8000/api/v1.0/procesos/ejecutivos/"
  private urlActuaciones = "http://127.0.0.1:8000/api/v1.0/procesos/actuaciones/"
  private urlCautelar = "http://127.0.0.1:8000/api/v1.0/procesos/cautelares/"
  private urlNotificacion = "http://127.0.0.1:8000/api/v1.0/procesos/notificaciones/"
  private urlArchivos = "http://127.0.0.1:8000/api/v1.0/procesos/archivos/"
  constructor(private http: HttpClient) { }

  /**
   * agregarProcesos
   */
  public agregarProcesos(proceso: Proceso) {
    return this.http.post(this.url, proceso)
  }

  /**
   * eliminarProceso
   */
  public eliminarProceso(id: number) {
    const ruta = `${this.url}${id}`
    return this.http.delete(ruta)
  }

  /**
   * mostrarProceso
   */
  public mostrarProceso(id: number) {
    const ruta = `${this.url}${id}`
    return this.http.get(ruta)
  }

  public obtenerProcesos(urlPaginacion:any) {
    return this.http.get(urlPaginacion);
  }
  public iniciarListadoProcesos() {
    return this.http.get(this.url);
  }

  public actualizarProceso(id:number, proceso:Proceso){
    const ruta = `${this.url}${id}/`
    return this.http.put(ruta, proceso);
  }

  public listarDespachos(despacho:string){
    const ruta = `http://127.0.0.1:8000/api/v1.0/procesos/despachos?despacho=${despacho}`
    return this.http.get(ruta)
  }
  /**
   * permite obtener la informacion de la parte ejecutiva del proceso
   */
  public obtenerEjecutivo(proceso: number) {
    const ruta = `${this.urlEjecutivo}${proceso}`
    return this.http.get(ruta)
  }
  /**
   * agregar la informacion extra que define el proceso como ejecutivo
   */
  public agregarEjecutivo(ejecutivo:any) {
    return this.http.post(this.urlEjecutivo, ejecutivo)
  }

  public actualizarEjecutivo(id:number, ejecutivo:any){
    const ruta = `${this.urlEjecutivo}${id}/`
    return this.http.put(ruta, ejecutivo);
  }

    /** 
    Estos metodos pertenecen a la API de partes naturales
  */
  /**
   *  este metodo lista las personanas naturales vinculadas a un proceso para 
   * llenar un formulario de auto-completar
   */
  public listarPartesNaturales(nombre:string) {
    const ruta = `http://127.0.0.1:8000/api/v1.0/abogado/personas/partesPersonas?nombre=${nombre}`
    return this.http.get(ruta)
  }

  public agregarParteNatural(persona:any){
    const ruta = `http://127.0.0.1:8000/api/v1.0/procesos/partes_naturales/` 
    return this.http.post(ruta, persona)
  }

  public eliminarParteNatural(id:number){
    const ruta = `http://127.0.0.1:8000/api/v1.0/procesos/partes_naturales/${id}` 
    return this.http.delete(ruta)
  }

  /** 
    Estos metodos pertenecen a la API de partes juridicas
  */
  public listarPartesJuridicas(nombre:string) {
    const ruta = `http://127.0.0.1:8000/api/v1.0/abogado/empresas/partesJuridicas?nombre=${nombre}`
    return this.http.get(ruta)
  }

  public agregarParteJuridica(persona:any){
    const ruta = `http://127.0.0.1:8000/api/v1.0/procesos/partes_juridico/` 
    return this.http.post(ruta, persona)
  }

  public eliminarParteJuridica(id:number){
    const ruta = `http://127.0.0.1:8000/api/v1.0/procesos/partes_juridico/${id}` 
    return this.http.delete(ruta)
  }

  /** 
    Estos metodos pertenecen a la API de actuaciones
  */
  public mostrarActuacion(id:number){
    const ruta = `${this.urlActuaciones}${id}/`
    return this.http.get(ruta)
  }
  public contarActuaciones(proceso:number){
    return this.http.get(`${this.urlActuaciones}${proceso}/contar_actuaciones`)
  }
  public agregarActuacion(actuacion:any){
    return this.http.post(this.urlActuaciones, actuacion)
  }
  public actualizarActuacion(actuacion:any, id: number){
    const ruta = `${this.urlActuaciones}${id}/`
    return this.http.put(ruta, actuacion)
  }
  public listarActuaciones(proceso:number){
    return this.http.get(`${this.urlActuaciones}${proceso}/listar_actuaciones`)
  }
  public eliminarActuacion(id:number){
    return this.http.delete(`${this.urlActuaciones}${id}/`)
  }

  /**
   * metodos para la API de medidas cautelares
   */

  public mostrarCautelar(id:number){
    return this.http.get(`${this.urlCautelar}${id}/`)
  }
  public agregarCautelar(cautelar:any){
    return this.http.post(this.urlCautelar, cautelar)
  }
  public actualizarCautelar(cautelar:any, id:number){
    return this.http.put(`${this.urlCautelar}${id}/`, cautelar)
  }
  public listarCautelares(proceso:number){
    return this.http.get(`${this.urlCautelar}${proceso}/listar_cautelares`)
  }
  public contarCautelares(proceso:number){
    return this.http.get(`${this.urlCautelar}${proceso}/contar_cautelares`)
  }

  /**
   * metodos para la API de notificaciones
   */
  public mostrarNotificacion(id:number){
    return this.http.get(`${this.urlNotificacion}${id}/`)
  }
  public agregarNotificacion(notificacion:any){
    return this.http.post(this.urlNotificacion, notificacion)
  }
  public actualizarNotificacion(notificacion:any, id:number){
    return this.http.put(`${this.urlNotificacion}${id}/`, notificacion)
  }
  public listarNotificaciones(proceso:number){
    return this.http.get(`${this.urlNotificacion}${proceso}/listar_notificaciones`)
  }
  public contarNotificaciones(proceso:number){
    return this.http.get(`${this.urlNotificacion}${proceso}/contar_notificaciones`)
  }
  public alertaNotificaciones(proceso:number){
    return this.http.get(`${this.urlNotificacion}${proceso}/alerta`)
  }
  /**
   * metodos para la API de archivos 
   */

  public mostrarArchivo(id:number){
    return this.http.get(`${this.urlArchivos}${id}/`)
  }
  public agregarArchivo(archivo:any){
    return this.http.post(this.urlArchivos, archivo)
  }
  public actualizarArchivo(archivo:any, id:number){
    return this.http.put(`${this.urlArchivos}${id}/`, archivo)
  }
  public listarArchivos(proceso:number){
    return this.http.get(`${this.urlArchivos}${proceso}/listar_archivos`)
  }
  public contarArchivos(proceso:number){
    return this.http.get(`${this.urlArchivos}${proceso}/contar_archivos`)
  }
  /**
   * consulatar despacho
   */
  public obtenerDespacho(id:number){
    return this.http.get(`http://127.0.0.1:8000/api/v1.0/despacho/${id}/`)
  }
}

