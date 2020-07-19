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
  selector: 'app-personas-notificadas',
  templateUrl: './personas-notificadas.component.html',
  styleUrls: ['./personas-notificadas.component.css']
})
export class PersonasNotificadasComponent implements OnInit {
  @Input() notificados:any;
  @Input() notificacion:number;
  @Output() recargar = new EventEmitter<void>();
  personas: any;
  form = new FormGroup({
    persona: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    notificacion: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    notificado: new FormControl(false, [
      Validators.required
    ]),
    medio: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private procesoService : ProcesoService) { }

  ngOnInit(): void {
    this.onChanges()
    this.form.controls['notificacion'].setValue(this.notificacion)
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
    this.procesoService.agregarPersonaNotificada(this.form.value).subscribe(data =>{
      console.log(data)
    })
    this.form.reset()
    this.form.controls['notificacion'].setValue(this.notificacion)
    this.recargar.emit()
    this.inicializar()
  }

  eliminar(id:number):void{
    this.procesoService.eliminarPersonaNotificada(id).subscribe(data =>{
      console.log(data)
      this.recargar.emit()
      this.inicializar()
    })
    
  }
}
