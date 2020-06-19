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
  selector: 'app-agregar-archivo',
  templateUrl: './agregar-archivo.component.html',
  styleUrls: ['./agregar-archivo.component.css']
})
export class AgregarArchivoComponent implements OnInit {
  private accion: string;
  archivo : any;
  id : number;
  private proceso : string;
  form = new FormGroup({
    nombre_archivo: new FormControl(),
    archivo :  new FormControl(),
    descripcion : new FormControl(),
  })
  constructor(private route: ActivatedRoute, private procesoService : ProcesoService,private location: Location) { }

  ngOnInit(): void {
    this.accion = this.route.snapshot.paramMap.get('accion')
    if(this.accion === 'actualizar'){
      //this.inicializar()
      console.log('actualizando')
    }else{
      this.proceso = this.route.snapshot.paramMap.get('proceso')
    }
  }

  procesarArchivo(event):void {
    if (event.target.files.length > 0) {
      const archivo = event.target.files[0];
      this.form.patchValue({
        archivo: archivo
      });
    }
  }

  private obtener_extension(archivo:string){
    let extension = archivo.split(".")
    console.log(extension[extension.length-1])
    return extension[-1]
  }


  registrar(){
    const formData = new FormData();
    formData.append('proceso', this.proceso);
    let archivo = this.obtener_extension(this.form.get('nombre_archivo').value)
    formData.append('archivo', this.form.get('archivo').value);
    formData.append('descripcion', this.form.get('descripcion').value);
    this.procesoService.agregarArchivo(formData).subscribe( data => 
      console.log(data)
    )
  }
}
