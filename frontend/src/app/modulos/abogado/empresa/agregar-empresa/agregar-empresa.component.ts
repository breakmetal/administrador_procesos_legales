import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from "../../servicios/empresa.service";
import { Location } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.css']
})
export class AgregarEmpresaComponent implements OnInit {
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
    actividad: new FormControl('', [
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
  constructor(private route: ActivatedRoute, private empresaService: EmpresaService, private location: Location) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion')
    if(this.accion === 'actualizar'){
      this.inicializar()
      console.log('actualizando')
    }
  }

  public registrar():void{
    if (this.accion === 'actualizar') {
      this.empresaService.actualizarEmpresa(this.id, this.form.value).subscribe(empresa => console.log(empresa));
    } else {
      console.log(this.form)
      this.empresaService.agregarEmpresas(this.form.value).subscribe(empresa=> console.log(empresa));
    }
    this.location.back()
  }

  private inicializar():void{
    this.id = +this.route.snapshot.paramMap.get('id')
    this.empresaService.mostrarEmpresa(this.id).subscribe(data => {
      this.form.controls['documento'].setValue(data['documento'])
      this.form.controls['nombre'].setValue(data['nombre'])
      this.form.controls['actividad'].setValue(data['actividad'])
      this.form.controls['email'].setValue(data['email'])
      this.form.controls['celular'].setValue(data['celular'])
      this.form.controls['fijo'].setValue(data['fijo'])
      this.form.controls['direccion'].setValue(data['direccion'])
    })
  }

}
