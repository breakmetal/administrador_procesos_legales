import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesoService } from '../../servicios/proceso.service';
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog} from '@angular/material/dialog';
import { Location } from '@angular/common';


@Component({
  selector: 'app-listar-archivos',
  templateUrl: './listar-archivos.component.html',
  styleUrls: ['./listar-archivos.component.css']
})
export class ListarArchivosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  proceso: number;
  archivos: any;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  nombre : string;
  displayedColumns: string[] = ['archivo', 'descripcion', 'acciones'];
  constructor(private route: ActivatedRoute, private procesoService: ProcesoService, public dialog: MatDialog, private _snackBar: MatSnackBar,private location: Location) { }

  ngOnInit(): void {
    this.listadoInicial()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.listarArchivos(event)
    );
  }

  listadoInicial(){
    this.proceso = +this.route.snapshot.paramMap.get('proceso')
    this.procesoService.iniciarListadoArchivos(this.proceso).subscribe(data => {
      this.archivos = data['results'];
      this.count = data['count'];
      this.next = data['next'];
      this.previous = data['previous'];
      this.pageIndex = 0;
      console.log(data)
    })
  }
  volver(): void{
    this.location.back()
  }

  listarArchivos(event:any):void {
    if (event.pageIndex === this.pageIndex+1) {
      this.procesoService.obtenerArchivos(this.next).subscribe(data =>{
        this.archivos = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(this.archivos)
      })
      this.pageIndex++
    } else {
      this.procesoService.obtenerNotificaciones(this.previous).subscribe(data =>{
        this.archivos = data['results'];
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
        this.procesoService.eliminarArchivo(registro.id).subscribe(result => {
          this.listadoInicial()
          this.openSnackBar("registro eliminado", "☠️")
        })
      }
    });
  }
  
  obtenerNombre(): void{
    let palabras = this.archivos.archivo
    let indice = palabras.length()
    this.nombre = palabras[indice-1]
  }
}
