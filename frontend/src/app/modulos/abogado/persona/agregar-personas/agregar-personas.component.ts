import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from "../../servicios/persona.service";
import { Location } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-agregar-personas',
  templateUrl: './agregar-personas.component.html',
  styleUrls: ['./agregar-personas.component.css']
})
export class AgregarPersonasComponent implements OnInit {
  private accion:string;
  private id:number;
  form = new FormGroup({
    documento : new FormControl('', [
      Validators.required, 
      Validators.pattern('^[0-9]+$')
    ]),
    nombre: new FormControl('',[
      Validators.required, 
      Validators.pattern('^[a-zA-Z]+$')
    ]
    ),
    apellido: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    nacimiento: new FormControl('', [Validators.required]),
    ocupacion: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[a-zA-Z]+$')
    ]), 
    email: new FormControl('', [
      Validators.required, 
      Validators.pattern('^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$')
    ]),
    celular : new FormControl('', [
      Validators.required, 
      Validators.pattern('^[0-9]+$')
    ]),
    fijo : new FormControl('', [
      Validators.pattern('^[0-9]*$')
    ]),
    direccion : new FormControl('', [
      Validators.required, 
      Validators.pattern('[^`~!@$%^&*()_|+\=?;:,.]+$')
    ]),
  });

  constructor(private route: ActivatedRoute, private personaService: PersonaService, private location: Location) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion')
    if(this.accion === 'actualizar'){
      this.inicializar()
      console.log('actualizando')
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

  public registrar():void{
    let dataParse = this.formatDate(this.form.value.nacimiento)
    this.form.value.nacimiento = dataParse
    if (this.accion === 'actualizar') {
      this.personaService.actualizarPersona(this.id, this.form.value).subscribe(persona => console.log(persona));
    } else {
      this.personaService.agregarPersonas(this.form.value).subscribe(persona => console.log(persona));
    }
    this.location.back()
  }

  private inicializar():void{
    this.id = +this.route.snapshot.paramMap.get('id')
    this.personaService.mostrarPersona(this.id).subscribe(data => {
      this.form.controls['documento'].setValue(data['documento'])
      this.form.controls['nombre'].setValue(data['nombre'])
      this.form.controls['apellido'].setValue(data['apellido'])
      this.form.controls['nacimiento'].setValue(data['nacimiento'])
      this.form.controls['ocupacion'].setValue(data['ocupacion'])
      this.form.controls['email'].setValue(data['email'])
      this.form.controls['celular'].setValue(data['celular'])
      this.form.controls['fijo'].setValue(data['fijo'])
      this.form.controls['direccion'].setValue(data['direccion'])
    })
  }
}