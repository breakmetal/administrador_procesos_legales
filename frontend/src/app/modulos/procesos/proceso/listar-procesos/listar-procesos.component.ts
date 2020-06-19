import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { MatDialog} from '@angular/material/dialog';
import { ProcesoService } from '../../servicios/proceso.service';
import {MatPaginator} from '@angular/material/paginator';

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
  selector: 'app-listar-procesos',
  templateUrl: './listar-procesos.component.html',
  styleUrls: ['./listar-procesos.component.scss']
})
export class ListarProcesosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['proceso', 'estado', 'acciones'];
  dataSource : any;
  proceso : Proceso;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  constructor(private procesoService : ProcesoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.listadoInicial()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.obtenerListadoProcesos(event)
    );
  }

  listadoInicial(): void {
    this.procesoService.iniciarListadoProcesos().subscribe(data =>{
      this.proceso = data['results'];
      this.count = data['count'];
      this.next = data['next'];
      this.previous = data['previous'];
      this.pageIndex = 0;
      console.log(data)
    })
  }

  public obtenerListadoProcesos(event:any):void {
    if (event.pageIndex === this.pageIndex+1) {
      this.procesoService.obtenerProcesos(this.next).subscribe(data =>{
        this.proceso = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
      })
      this.pageIndex++
    } else {
      this.procesoService.obtenerProcesos(this.previous).subscribe(data =>{
        this.proceso = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
    })
    this.pageIndex--
   }
  }

  confirmDialog(registro:any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{titulo:'alerta', mensaje:`estas seguro de querer eliminar el registro del proceso ${registro.numero_proceso} `}
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.procesoService.eliminarProceso(registro.id).subscribe(result => {
          this.listadoInicial()
        })
      }
    });
  }
}
