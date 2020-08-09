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
  selector: 'app-agregar-proceso',
  templateUrl: './agregar-proceso.component.html',
  styleUrls: ['./agregar-proceso.component.scss']
})
export class AgregarProcesoComponent implements OnInit {
  private accion: string;
  despachos: any;
  id:number;
  form = new FormGroup({
    numero_proceso : new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$')
    ]),
    despacho : new FormControl('', [
      Validators.required
    ]),
    tipo : new FormControl('EJECUTIVO', [

    ]),
    estado : new FormControl('', [
      Validators.required
    ]),
    litisconsorcio : new FormControl('', [
      Validators.required
    ]),
    descripcion : new FormControl('', [
      Validators.required
    ]),
    fecha_providencia : new FormControl('', [
      Validators.required
    ]),
    fecha_publicacion : new FormControl('', [
      Validators.required
    ]),
    fecha_finalizacion : new FormControl('',[
      Validators.required
    ]),
    
  })

  constructor(private route: ActivatedRoute, private procesoService : ProcesoService,private location: Location) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion')
    if(this.accion === 'actualizar'){
      this.inicializar()
      console.log('actualizando')
    }
    this.onChanges();
  }

  onChanges(): void {
    this.form.get('despacho').valueChanges.subscribe(valor => {
      this.listarDespachos(valor)
    })
  }

  private listarDespachos(despacho: string) {
    this.procesoService.listarDespachos(despacho).subscribe(data =>{
      this.despachos = data
      console.log(data)
    })
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

  /**
   * registrar
   */
  public registrar():void {
    /*let dataParse = this.formatDate(this.form.value.fecha_providencia)
    this.form.value.fecha_providencia = dataParse
    dataParse = this.formatDate(this.form.value.fecha_publicacion)
    this.form.value.fecha_publicacion = dataParse
    dataParse = this.formatDate(this.form.value.fecha_finalizacion)
    this.form.value.fecha_finalizacion = dataParse*/
    if (this.accion === 'actualizar') {
      this.procesoService.actualizarProceso(this.id, this.form.value).subscribe(proceso => this.location.back())
    }else{
      this.procesoService.agregarProcesos(this.form.value).subscribe(proceso => this.location.back())
    }
    
  }

  private inicializar():void{
    this.id = +this.route.snapshot.paramMap.get('id')
    this.procesoService.mostrarProceso(this.id).subscribe(data => {
      this.form.controls['numero_proceso'].setValue(data['numero_proceso'])
      this.form.controls['despacho'].setValue(data['despacho'])
      this.form.controls['tipo'].setValue(data['tipo'])
      this.form.controls['estado'].setValue(data['estado'])
      this.form.controls['litisconsorcio'].setValue(data['litisconsorcio'])
      this.form.controls['descripcion'].setValue(data['descripcion'])
      this.form.controls['fecha_providencia'].setValue(data['fecha_providencia'])
      this.form.controls['fecha_publicacion'].setValue(data['fecha_publicacion'])
      this.form.controls['fecha_finalizacion'].setValue(data['fecha_finalizacion'])
    })
  }
}
