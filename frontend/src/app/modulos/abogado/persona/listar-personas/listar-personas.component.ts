import { Component, OnInit, ViewChild  } from '@angular/core';
import { ListarPersonasService } from "../../servicios/listar-personas.service";
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialog} from '@angular/material/dialog';
import { PersonaService } from '../../servicios/persona.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface Persona {
  documento : string,
  nombre : string,
  apellido: string,
  nacimiento: any,
  ocupacion: string,
  contact_info: any
}


/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-listar-personas',
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.css']
})
export class ListarPersonasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['documento','nombre', 'acciones'];
  dataSource : any;
  persona : Persona;
  count : number;
  next : number;
  previous : number;
  pageIndex : number;
  prueba : any;
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
  constructor(private listar:ListarPersonasService, private personaService:PersonaService, public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  

  ngOnInit() {
    this.listadoInicial()
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(
       (event) => this.obtenerListadoPersonas(event)
    );
  }
  /**
   * listado inicial
   */
  private listadoInicial(){
    this.listar.obtenerPersonas().subscribe(res => {
      this.persona = res['results'];
      this.count = res['count'];
      this.next = res['next'];
      this.previous = res['previous'];
      this.pageIndex = 0;      
    }); 
  }

  /**
   * obtener listadoPersonas
   */
  public obtenerListadoPersonas(event:any):void {
    if (event.pageIndex === this.pageIndex+1) {
      this.personaService.obtenerPersonas(this.next).subscribe(res =>{
        this.persona = res['results'];
        this.count = res['count'];
        this.next = res['next'];
        this.previous = res['previous'];
        this.pageIndex = 0;
      })
      this.pageIndex++
    } else {
      this.personaService.obtenerPersonas(this.previous).subscribe(res =>{
        this.persona = res['results'];
        this.count = res['count'];
        this.next = res['next'];
        this.previous = res['previous'];
        this.pageIndex = 0;
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
      data:{titulo:'alerta', mensaje:`estas seguro de querer eliminar el registro de ${registro.nombre} ${registro.apellido}`}
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.personaService.eliminarPersona(registro.id).subscribe(result => {
          this.listadoInicial()
          this.openSnackBar("registro eliminado", "☠️")
        })
      }
    });
  }

  buscarNombre(){
    this.documento.controls['documento'].setValue('')
    this.paginator.pageIndex=0
    if (this.nombre.get('nombre').value != "") {
      this.personaService.buscarNombre(this.nombre.get('nombre').value).subscribe(data =>{
        this.persona = data['results'];
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
      this.personaService.buscarDocumento(this.documento.get('documento').value).subscribe(data =>{
        this.persona = data['results'];
        this.count = data['count'];
        this.next = data['next'];
        this.previous = data['previous'];
        this.pageIndex = 0;
        console.log(data)
      })
    } else {
      this.listadoInicial()
    }
  }
  
  
}