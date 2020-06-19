import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute } from '@angular/router';

import { ProcesoService } from "../../servicios/proceso.service";
import { Location } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-agregar-notificacion',
  templateUrl: './agregar-notificacion.component.html',
  styleUrls: ['./agregar-notificacion.component.css']
})
export class AgregarNotificacionComponent implements OnInit {
  private accion: string;
  notificacion : any;
  id : number;
  private proceso : number;
  form = new FormGroup({
    proceso: new FormControl(),
    tipo: new FormControl('', [
      Validators.required,
    ]),
    mensaje: new FormControl('', [
      Validators.required,
    ]),
    expedicion: new FormControl('', [
      Validators.required,
    ]),
    limite: new FormControl('', [
      Validators.required,
    ])    
  })
  constructor(private route: ActivatedRoute, private procesoService : ProcesoService,private location: Location) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion')
    this.form.controls['proceso'].setValue(this.proceso)
    if(this.accion === 'actualizar'){
      this.inicializar()
      console.log('actualizando')
    }else{
      this.proceso =+ this.route.snapshot.paramMap.get('proceso')
      this.form.controls['proceso'].setValue(this.proceso)
    }
  }

  private formatDate(date):any {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  private inicializar(){
    this.id =+  this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarNotificacion(this.id).subscribe(data => {
      this.form.controls['proceso'].setValue(data['proceso'])
      this.form.controls['tipo'].setValue(data['tipo'])
      this.form.controls['mensaje'].setValue(data['mensaje'])
      this.form.controls['expedicion'].setValue(data['expedicion'])
      this.form.controls['limite'].setValue(data['limite'])
    })
  }
  registrar():void{
    let dataParse = this.formatDate(this.form.value.limite)
    this.form.value.limite = dataParse
    if (this.accion === 'actualizar') {
      this.procesoService.actualizarNotificacion(this.form.value, this.id).subscribe(data => console.log(data))
    } else {
      this.procesoService.agregarNotificacion(this.form.value).subscribe(data => console.log(data))
    }
  }
}
