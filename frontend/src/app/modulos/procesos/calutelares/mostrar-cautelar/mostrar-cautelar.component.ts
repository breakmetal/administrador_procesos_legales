import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../servicios/proceso.service';
import { ConfirmDialogComponent } from "../../../compartidos/confirm-dialog/confirm-dialog.component";
import { MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mostrar-cautelar',
  templateUrl: './mostrar-cautelar.component.html',
  styleUrls: ['./mostrar-cautelar.component.css']
})
export class MostrarCautelarComponent implements OnInit {
  id: number;
  cautelar: any;
  constructor(private location: Location, private route: ActivatedRoute, private procesoService: ProcesoService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.mostrarCautelar()
  }

  mostrarCautelar(): void {
    this.id=+ this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarCautelar(this.id).subscribe(data => {
      this.cautelar = data
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
        this.procesoService.eliminarCautelar(this.cautelar.id).subscribe(result => {
          this.volver() 
        })
      }
    });
  }


}
