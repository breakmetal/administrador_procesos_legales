import { Component, OnInit, Input } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-response-snack-bar',
  templateUrl: './response-snack-bar.component.html',
  styleUrls: ['./response-snack-bar.component.css']
})
export class ResponseSnackBarComponent implements OnInit {
  @Input() mensaje: string;
  @Input() accion: string; 
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  
  openSnackBar() {
    this._snackBar.open(this.mensaje, this.accion, {
      duration: 5000,
    });
  }
}
