import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesoService } from "../servicios/proceso.service";
import {MatPaginator} from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todas-mis-notificaciones',
  templateUrl: './todas-mis-notificaciones.component.html',
  styleUrls: ['./todas-mis-notificaciones.component.css']
})
export class TodasMisNotificacionesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  notificaciones:any;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  displayedColumns: string[] = ['tipo', 'limite', 'acciones'];
  constructor(private route: ActivatedRoute, private procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.listadoInicial()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.obtenerListadoNotificaciones(event)
    );
  }

  listadoInicial(){
    this.procesoService.todasNotificaciones().subscribe(data => {
      this.notificaciones = data['results'];
      this.count = data['count'];
      this.next = data['next'];
      this.previous = data['previous'];
      this.pageIndex = 0;
      console.log(data)
    })
  }

  public obtenerListadoNotificaciones(event:any):void {

  }

}
