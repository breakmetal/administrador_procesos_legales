import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";


import { ProcesoService } from "../../servicios/proceso.service";




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-partes',
  templateUrl: './partes.component.html',
  styleUrls: ['./partes.component.css']
})
export class PartesComponent implements OnInit {
  @Input() partes:any;
  @Input() proceso:number;
  @Output() recargar = new EventEmitter<void>();
  form = new FormGroup({
    persona: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    rol: new FormControl('', [
      Validators.required,
    ]),
    proceso: new FormControl()
  })
  personas: any;
  constructor(private procesoService : ProcesoService) { }

  ngOnInit(): void {
    this.onChanges()
    this.form.controls['proceso'].setValue(this.proceso)
  }

  onChanges(): void {
    this.inicializar()
  }
  private inicializar(){
    this.form.get('persona').valueChanges.subscribe(valor => {
      this.listarPersonas(valor)
    })
  }
  private listarPersonas(persona: string) {
    this.procesoService.listarPartesNaturales(persona).subscribe(data =>{
      this.personas = data
      console.log(data)
    })
  }

  public registrar():void{
    this.procesoService.agregarParteNatural(this.form.value).subscribe(data =>{
      console.log(data)
    })
    this.form.reset()
    this.recargar.emit()
    this.form.controls['proceso'].setValue(this.proceso)
    this.inicializar()
  }

  eliminar(id:number):void{
    this.procesoService.eliminarParteNatural(id).subscribe(data =>{
      console.log(data)
      this.recargar.emit()
      this.inicializar()
    })
    
  }

}
