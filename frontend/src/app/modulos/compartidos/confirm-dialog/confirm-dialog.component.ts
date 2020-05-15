import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  titulo:string;
  mensaje:string;

  constructor(@Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>) { 
      this.titulo = data.titulo;
      this.mensaje = data.mensaje;

    }

  ngOnInit(): void {
  }

}
