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
  selector: 'app-agregar-ejecutivo',
  templateUrl: './agregar-ejecutivo.component.html',
  styleUrls: ['./agregar-ejecutivo.component.css']
})
export class AgregarEjecutivoComponent implements OnInit {
  private accion: string;
  private proceso: number;
  private id: number;
  form = new FormGroup({
    proceso : new FormControl(),
    titulo : new FormControl('', [
      Validators.required
    ]),
    obligacion : new FormControl('', [
      Validators.required
    ]),
    clase : new FormControl('', [
      Validators.required
    ]),
    pretension : new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.required
    ]),
    cuantia : new FormControl('', [
      Validators.required
    ])
  })
  constructor(private route: ActivatedRoute, private procesoService : ProcesoService,private location: Location) { }

  ngOnInit(): void {
    this.proceso = +this.route.snapshot.paramMap.get('proceso')
    this.accion = this.route.snapshot.paramMap.get('accion')
    this.form.controls['proceso'].setValue(this.proceso)
    if(this.accion === 'actualizar'){
      this.inicializar()
      console.log('actualizando')
    }
    console.log(this.form.value)
  }
  volver(): void{
    this.location.back()
  }

  public registrar():void {
    if (this.accion === 'actualizar') {
      this.procesoService.actualizarEjecutivo(this.id, this.form.value).subscribe(data => console.log(data))
      console.log(this.form.value)
      console.log(this.id)
    }else{
      this.procesoService.agregarEjecutivo(this.form.value).subscribe(data => console.log(data))
    }
    this.location.back()
  }
  private inicializar():void{
    
    this.procesoService.obtenerEjecutivo(this.proceso).subscribe(data => {
      this.form.controls['proceso'].setValue(data['proceso'])
      this.form.controls['titulo'].setValue(data['titulo'])
      this.form.controls['obligacion'].setValue(data['obligacion'])
      this.form.controls['clase'].setValue(data['clase'])
      this.form.controls['pretension'].setValue(data['pretension'])
      this.form.controls['cuantia'].setValue(data['cuantia'])
      this.id = data['id']
    })
  }
}
