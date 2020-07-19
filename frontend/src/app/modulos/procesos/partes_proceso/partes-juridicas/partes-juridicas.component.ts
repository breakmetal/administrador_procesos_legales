import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-partes-juridicas',
  templateUrl: './partes-juridicas.component.html',
  styleUrls: ['./partes-juridicas.component.css']
})
export class PartesJuridicasComponent implements OnInit {
  @Input() partes:any;
  @Input() proceso:number;
  @Output() recargar = new EventEmitter<void>();
  form = new FormGroup({
    empresa: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    rol: new FormControl('', [
      Validators.required,
    ]),
    proceso: new FormControl()
  })
  empresas: any;
  constructor(private route: ActivatedRoute, private procesoService : ProcesoService,private location: Location) { }

  ngOnInit(): void {
    this.onChanges()
    this.form.controls['proceso'].setValue(this.proceso)
  }

  onChanges(): void {
    this.inicializar()
  }
  private inicializar(){
    this.form.get('empresa').valueChanges.subscribe(valor => {
      this.listarEmpresas(valor)
    })
  }
  private listarEmpresas(empresa: string) {
    this.procesoService.listarPartesJuridicas(empresa).subscribe(data =>{
      this.empresas = data
      console.log(data)
    })
  }

  public registrar():void{
    this.procesoService.agregarParteJuridica(this.form.value).subscribe(data =>{
      console.log(data)
      this.recargar.emit()
    })
    this.form.reset()
    this.form.controls['proceso'].setValue(this.proceso)
    this.inicializar()
  }

  eliminar(id:number):void{
    this.procesoService.eliminarParteJuridica(id).subscribe(data =>{
      console.log(data)
      this.recargar.emit()
    })
    this.inicializar()
  }

}
