import { Component, OnInit, ViewChild } from '@angular/core';
import { ProcesoService } from '../../servicios/proceso.service';
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog} from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-cautelar',
  templateUrl: './listar-cautelar.component.html',
  styleUrls: ['./listar-cautelar.component.css']
})
export class ListarCautelarComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  cautelares : any;
  proceso: number;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  nombre : string;
  displayedColumns: string[] = ['clase', 'acciones'];
  constructor(private route: ActivatedRoute, private procesoService: ProcesoService, public dialog: MatDialog, private _snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    this.listadoInicial()
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.listarCautelares(event)
    );
  }
  listadoInicial(){
    this.proceso = +this.route.snapshot.paramMap.get('proceso')
    this.procesoService.iniciarListadoCautelares(this.proceso).subscribe(data => {
      this.cautelares = data['results'];
      this.count = data['count'];
      this.next = data['next'];
      this.previous = data['previous'];
      this.pageIndex = 0;
      console.log(data)
    })
  }

  listarCautelares(event:any):void {
    if (event.pageIndex === this.pageIndex+1) {
      this.procesoService.obtenerArchivos(this.next).subscribe(data =>{
        this.cautelares = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(this.cautelares)
      })
      this.pageIndex++
    } else {
      this.procesoService.obtenerNotificaciones(this.previous).subscribe(data =>{
        this.cautelares = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
    })
    this.pageIndex--
   }
  }
  
  volver(): void{
    this.location.back()
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
        this.procesoService.eliminarCautelar(registro.id).subscribe(result => {
          this.listadoInicial()
          this.openSnackBar("registro eliminado", "☠️")
        })
      }
    });
  }

}
