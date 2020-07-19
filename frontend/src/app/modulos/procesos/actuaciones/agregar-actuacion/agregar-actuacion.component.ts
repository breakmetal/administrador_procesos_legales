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
  selector: 'app-agregar-actuacion',
  templateUrl: './agregar-actuacion.component.html',
  styleUrls: ['./agregar-actuacion.component.css']
})
export class AgregarActuacionComponent implements OnInit {
  private accion: string;
  actuacion : any;
  id : number;
  private proceso : number;
  form = new FormGroup({
    proceso :  new FormControl(),
    actuacion :  new FormControl('', [
      Validators.required,
      Validators.pattern('[^`~!@$%^&*()_|+\=?;:,.]+$')
    ]),
    anotacion :  new FormControl('', [
      Validators.required,
      Validators.pattern('[^`~!@$%^&*()_|+\=?;:,.]+$')
    ]),
    inicio :  new FormControl('', [
      Validators.required
    ]),
    termino :  new FormControl('', [
      Validators.required
    ]),
    registro:  new FormControl('', [
      Validators.required
    ]),

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
  private inicializar(){
    this.id =+  this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarActuacion(this.id).subscribe(data => {
      this.form.controls['proceso'].setValue(data['proceso'])
      this.form.controls['actuacion'].setValue(data['actuacion'])
      this.form.controls['anotacion'].setValue(data['anotacion'])
      this.form.controls['inicio'].setValue(data['inicio'])
      this.form.controls['termino'].setValue(data['termino'])
      this.form.controls['registro'].setValue(data['registro'])
      
    })
  }

  volver(): void{
    this.location.back()
  }


  registrar():void{
    if (this.accion === 'actualizar') {
      this.procesoService.actualizarActuacion(this.form.value, this.id).subscribe(data => console.log(data))
    } else {
      this.procesoService.agregarActuacion(this.form.value).subscribe(data => this.volver())
    }
    
  }

}
