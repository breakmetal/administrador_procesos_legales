import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonaService } from '../../servicios/persona.service';
import { Location } from '@angular/common';

export interface Persona {
  documento : string,
  nombre : string,
  apellido: string,
  nacimiento: any,
  ocupacion: string,
  contact_info: any
}

@Component({
  selector: 'app-mostrar-persona',
  templateUrl: './mostrar-persona.component.html',
  styleUrls: ['./mostrar-persona.component.css']
})
export class MostrarPersonaComponent implements OnInit {
  displayedColumns: string[] = ['campo', 'valor'];
  contactoColumnas: string[] = ['numero', 'ubicacion', 'acciones'];
  persona : any;
  tabla : any;
  constructor(private location: Location,private route: ActivatedRoute, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.obtenerPersona()
  }

  obtenerPersona(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.personaService.mostrarPersona(id).subscribe(data => {
      this.persona = data;
      this.tabla = this.crearFilasTabla(data)
      console.log(data)
      console.log(this.tabla)
    })
  }
  volver(): void{
    this.location.back()
  }

  crearFilasTabla(persona:object): Object[]{
    let arrayValores = Object.entries(persona)
    let arraySalida= []
    arraySalida = arrayValores.map( function(elemento) {
      if (elemento[0] !== "contact_info") {
        return {"campo" : elemento[0], "valor" : elemento[1]}
      }
    } )
    arraySalida = arraySalida.filter(function(elemento){
      return elemento != undefined && elemento['campo'] != 'id'&& elemento['campo'] !='nombre' && elemento['campo'] !='apellido'
    })
    /*arrayValores.forEach(elemento =>  if(elemento[0] === "contact_info"){
        arraySalida.push({"campo" : elemento[0], "valor" : elemento[1]})
      })*/
    return arraySalida;
  }

}
