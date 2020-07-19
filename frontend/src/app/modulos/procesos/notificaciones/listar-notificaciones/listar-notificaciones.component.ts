import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { MatDialog} from '@angular/material/dialog';
import { ProcesoService } from "../../servicios/proceso.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-notificaciones',
  templateUrl: './listar-notificaciones.component.html',
  styleUrls: ['./listar-notificaciones.component.css']
})
export class ListarNotificacionesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  notificaciones: any;
  proceso: number;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  displayedColumns: string[] = ['tipo', 'expedicion', 'limite', 'acciones'];
  constructor(private route: ActivatedRoute, private procesoService: ProcesoService, public dialog: MatDialog, private _snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    this.listadoInicial()
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.obtenerListadoNotificaciones(event)
    );
  }

  listadoInicial(){
    this.proceso = +this.route.snapshot.paramMap.get('proceso')
    this.procesoService.iniciarlistadoNotificaciones(this.proceso).subscribe(data => {
      this.notificaciones = data['results'];
      this.count = data['count'];
      this.next = data['next'];
      this.previous = data['previous'];
      this.pageIndex = 0;
      console.log(data)
    })
  }

  public obtenerListadoNotificaciones(event:any):void {
    if (event.pageIndex === this.pageIndex+1) {
      this.procesoService.obtenerNotificaciones(this.next).subscribe(data =>{
        this.notificaciones = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
      })
      this.pageIndex++
    } else {
      this.procesoService.obtenerNotificaciones(this.previous).subscribe(data =>{
        this.notificaciones = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
    })
    this.pageIndex--
   }
  }

  private openSnackBar(mensaje, accion):void {
    this._snackBar.open(mensaje, accion, {
      duration: 5000,
    });
  }

  confirmDialog(registro:any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{titulo:'alerta', mensaje:`estas seguro de querer eliminar el registro del proceso ${registro.id} `}
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.procesoService.eliminarNotificacion(registro.id).subscribe(result => {
          this.listadoInicial()
          this.openSnackBar("registro eliminado", "☠️")
        })
      }
    });
  }

  volver(): void{
    this.location.back()
  }
}
