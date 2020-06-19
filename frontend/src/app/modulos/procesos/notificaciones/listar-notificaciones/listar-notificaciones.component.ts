import { Component, OnInit, Input } from '@angular/core';
import { ProcesoService } from "../../servicios/proceso.service";

@Component({
  selector: 'app-listar-notificaciones',
  templateUrl: './listar-notificaciones.component.html',
  styleUrls: ['./listar-notificaciones.component.css']
})
export class ListarNotificacionesComponent implements OnInit {
  notificaciones : any;
  @Input() proceso : number;  
  constructor(private procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.listarNotificaciones()
  }

  listarNotificaciones(){
    this.procesoService.listarNotificaciones(this.proceso).subscribe(data => {
      this.notificaciones = data
      console.log(data)
    })
  }
}
