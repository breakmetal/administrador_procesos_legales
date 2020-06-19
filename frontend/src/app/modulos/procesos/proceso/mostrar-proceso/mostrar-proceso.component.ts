import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from "../../servicios/proceso.service";

export interface Proceso{
  id : number;
  numero_proceso : string;
  despacho : string;
  user : number;
  tipo : string;
  estado : string;
  listisconsorcio : string;
  descripcion : string;
  fecha_providencia : any;
  fecha_publicacion : any;
  fecha_finalizacion : any; 
}

@Component({
  selector: 'app-mostrar-proceso',
  templateUrl: './mostrar-proceso.component.html',
  styleUrls: ['./mostrar-proceso.component.scss']
})
export class MostrarProcesoComponent implements OnInit {
  displayedColumns: string[] = ['campo', 'valor'];
  id: number;
  alerta: any;
  proceso: any;
  archivos: any;
  ejecutivo: any;
  cautelares: any;
  actuaciones: any;
  tablaProceso: any;
  notificaciones: any;
  tablaEjecutivo: any;
  constructor(private route: ActivatedRoute, private procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')
    this.contarAlertas()
    this.obtenerProceso()
    this.contarArchivos()
    this.contarCautelares()
    this.obtenerEjecutivo()
    this.contarActuaciones()
    this.contarNotificaciones()
  }

  obtenerProceso(): void {
    //const id = +this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarProceso(this.id).subscribe(data => {
      this.proceso = data;
      this.tablaProceso = this.crearFilasTabla(data)
      console.log(data)
    })
  }

  obtenerEjecutivo(): void {  
    this.procesoService.obtenerEjecutivo(this.id).subscribe(data => {
      this.ejecutivo = data
      this.tablaEjecutivo = this.crearFilasTablaJuridico(data)
      console.log(this.ejecutivo)
    })
  }

  contarActuaciones(): void {
    this.procesoService.contarActuaciones(this.id).subscribe(data => {
      this.actuaciones = data
    })
  }

  contarNotificaciones(): void {
    this.procesoService.contarNotificaciones(this.id).subscribe(data => {
      this.notificaciones = data
    })
  }
  contarAlertas(): void {
    this.procesoService.alertaNotificaciones(this.id).subscribe(data => {
      this.alerta = data
    })
  }
  contarArchivos(): void {
    this.procesoService.contarArchivos(this.id).subscribe(data => {
      this.archivos = data
    })
  }
  contarCautelares(): void {
    this.procesoService.contarCautelares(this.id).subscribe(data => {
      this.cautelares = data
    })
  }
  crearFilasTabla(proceso:object): Object[]{
    let arrayValores = Object.entries(proceso)
    let arraySalida= []
    arraySalida = arrayValores.map( function(elemento) {

        return {"campo" : elemento[0], "valor" : elemento[1]}

    } )
    arraySalida = arraySalida.filter(function(elemento){
      return elemento['campo'] !='numero_proceso' && elemento['campo'] != 'id' && elemento['campo'] !='partesNaturales' && elemento['campo'] !='partesJuridicas' && elemento['campo'] != 'despacho'
    })
    return arraySalida;
  }

  crearFilasTablaJuridico(juridico:object): Object[]{
    let arrayValores = Object.entries(juridico)
    let arraySalida= []
    arraySalida = arrayValores.map( function(elemento) {

        return {"campo" : elemento[0], "valor" : elemento[1]}

    } )
    arraySalida = arraySalida.filter(function(elemento){
      return elemento['campo'] !='proceso' && elemento['campo'] != 'id' 
    })
    return arraySalida;
  }

  

}
