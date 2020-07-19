import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../servicios/proceso.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { Location } from '@angular/common';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-mostrar-actuacion',
  templateUrl: './mostrar-actuacion.component.html',
  styleUrls: ['./mostrar-actuacion.component.css']
})
export class MostrarActuacionComponent implements OnInit {
  id: number;
  actuacion: any;
  constructor(private location: Location, private route: ActivatedRoute, private procesoService: ProcesoService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mostrarActuacion()
  }

  mostrarActuacion(): void {
    this.id=+ this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarActuacion(this.id).subscribe(data => {
      this.actuacion = data
      console.log(data)
    })
  }

  volver(): void{
    this.location.back()
  }


  confirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{titulo:'alerta', mensaje:`estas seguro de querer eliminar este registro`}
    })
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.procesoService.eliminarActuacion(this.actuacion.id).subscribe(result => {
          this.volver() 
        })
      }
    });
  }


}
