import { Component, OnInit, Input } from '@angular/core';
import { ProcesoService } from "../../servicios/proceso.service";
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-actuaciones',
  templateUrl: './listar-actuaciones.component.html',
  styleUrls: ['./listar-actuaciones.component.css']
})
export class ListarActuacionesComponent implements OnInit {
  actuaciones : any;
  @Input() proceso: number;
  constructor(private procesoService: ProcesoService, public dialog: MatDialog, private _snackBar: MatSnackBar){ }

  ngOnInit(): void {
    this.listarAnotaciones()
  }
  listarAnotaciones(){
    this.procesoService.listarActuaciones(this.proceso).subscribe(data => {
      this.actuaciones = data
      console.log(data)
    })
  }
  

  /*confirmDialog(registro:any): void {
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
  }*/
  

}
