import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../servicios/proceso.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mostrar-notificacion',
  templateUrl: './mostrar-notificacion.component.html',
  styleUrls: ['./mostrar-notificacion.component.css']
})
export class MostrarNotificacionComponent implements OnInit {
  id: number;
  notificacion: any;
  constructor(private procesoService : ProcesoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerActuacion()
  }


  obtenerActuacion(): void {
    this.id=+ this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarNotificacion(this.id).subscribe(data => {
      this.notificacion = data
      console.log(data)
    })
  }

}
