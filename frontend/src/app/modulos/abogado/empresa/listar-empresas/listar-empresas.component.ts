import { Component, OnInit, ViewChild  } from '@angular/core';
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { EmpresaService } from '../../servicios/empresa.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Empresa{
  documento: number;
  nombre: string;
  actividad: string;
  email: string;
  celular: number;
  fijo: number;
  direccion: string;

}

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.css']
})
export class ListarEmpresasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['documento', 'nombre', 'acciones'];
  dataSource : any;
  empresa : Empresa;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  nombre = new FormGroup({
    nombre : new FormControl('', [
      Validators.pattern('^[0-9]+$')
    ]),
  })
  documento = new FormGroup({
    documento : new FormControl('', [
      Validators.pattern('^[0-9]+$')
    ]),
  })
  constructor(private empresaService : EmpresaService, public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.listadoInicial()
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.obtenerListadoEmpresas(event)
    );
  }


  /**
   * obtenerListadoEmpresas
   */
  public obtenerListadoEmpresas(event:any):void {
    if (event.pageIndex === this.pageIndex+1) {
      this.empresaService.obtenerEmpresas(this.next).subscribe(data =>{
        this.empresa = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
      })
      this.pageIndex++
    } else {
      this.empresaService.obtenerEmpresas(this.previous).subscribe(data =>{
        this.empresa = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
    })
    this.pageIndex--
   }
  }
   /**
   * notificacion de las acciones a traves de un snack-bar
   */
  private openSnackBar(mensaje, accion):void {
    this._snackBar.open(mensaje, accion, {
      duration: 5000,
    });
  }

  confirmDialog(registro:any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{titulo:'alerta', mensaje:`estas seguro de querer eliminar el registro de ${registro.nombre}`}
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.empresaService.eliminarEmpresa(registro.id).subscribe(result => {
          this.listadoInicial()
          this.openSnackBar("registro eliminado", "☠️")
        })
      }
    });
  }

  listadoInicial(): void {
    this.empresaService.iniciarListadoEmpresas().subscribe(data =>{
      this.empresa = data['results'];
      this.count = data['count'];
      this.next = data['next'];
      this.previous = data['previous'];
      this.pageIndex = 0;
      console.log(data)
    })
  }

  buscarNombre(){
    this.documento.controls['documento'].setValue('')
    this.paginator.pageIndex=0
    if (this.nombre.get('nombre').value != "") {
      this.empresaService.buscarNombre(this.nombre.get('nombre').value).subscribe(data =>{
        this.empresa = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
      })
    } else {
      this.listadoInicial()
      console.log('por aqui pase')
    }
  }

  buscarDocumento(){
    this.nombre.controls['nombre'].setValue('')
    this.paginator.pageIndex=0
    if (this.documento.get('documento').value != "") {
      this.empresaService.buscarDocumento(this.documento.get('documento').value).subscribe(data =>{
        this.empresa = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
      })
    } else {
      this.listadoInicial()
      console.log('documento')
    }
  }
  
}
