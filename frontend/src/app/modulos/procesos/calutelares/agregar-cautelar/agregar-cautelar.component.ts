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
  selector: 'app-agregar-cautelar',
  templateUrl: './agregar-cautelar.component.html',
  styleUrls: ['./agregar-cautelar.component.css']
})
export class AgregarCautelarComponent implements OnInit {
  private accion: string;
  cautelar : any;
  id : number;
  private proceso : number;
  form = new FormGroup({
    proceso : new FormControl(),
    clase : new FormControl('', [
      Validators.required
    ]),
    estado : new FormControl('',[
      Validators.required
    ]),
    secuestro_info : new FormControl('',[
      Validators.required
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
  private inicializar(){
    this.id =+  this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarCautelar(this.id).subscribe(data => {
      this.form.controls['proceso'].setValue(data['proceso'])
      this.form.controls['clase'].setValue(data['clase'])
      this.form.controls['estado'].setValue(data['estado'])
      this.form.controls['secuestro_info'].setValue(data['secuestro_info'])
    })
  }
  volver(): void{
    this.location.back()
  }

  registrar():void{
    if (this.accion === 'actualizar') {
      this.procesoService.actualizarCautelar(this.form.value, this.id).subscribe(data => this.volver())
    } else {
      this.procesoService.agregarCautelar(this.form.value).subscribe(data => this.volver())
    }
  }

}
