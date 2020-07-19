import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesoService } from "../../servicios/proceso.service";
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import { Location } from '@angular/common';


@Component({
  selector: 'app-listar-actuaciones',
  templateUrl: './listar-actuaciones.component.html',
  styleUrls: ['./listar-actuaciones.component.css']
})
export class ListarActuacionesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  actuaciones : any;
  proceso: number;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  displayedColumns: string[] = ['actuacion', 'registro', 'acciones'];
  constructor(private route: ActivatedRoute, private procesoService: ProcesoService, public dialog: MatDialog, private _snackBar: MatSnackBar,private location: Location){ }

  ngOnInit(): void {
    this.listadoInicial()
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.listarActuaciones(event)
    );
  }


  listadoInicial(){
    this.proceso = +this.route.snapshot.paramMap.get('proceso')
    this.procesoService.iniciarListadoActuaciones(this.proceso).subscribe(data => {
      this.actuaciones = data['results'];
      this.count = data['count'];
      this.next = data['next'];
      this.previous = data['previous'];
      this.pageIndex = 0;
      console.log(data)
    })
  }

  listarActuaciones(event:any):void {
    if (event.pageIndex === this.pageIndex+1) {
      this.procesoService.obtenerNotificaciones(this.next).subscribe(data =>{
        this.actuaciones = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(this.actuaciones)
      })
      this.pageIndex++
    } else {
      this.procesoService.obtenerNotificaciones(this.previous).subscribe(data =>{
        this.actuaciones = data['results'];
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
      data:{titulo:'alerta', mensaje:`estas seguro de querer eliminar el registro de ${registro.id}`}
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.procesoService.eliminarActuacion(registro.id).subscribe(result => {
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
