import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService } from "../../servicios/empresa.service";
import { Location } from '@angular/common';



export interface Empresa{
  documento: number;
  nombre: string;
  actividad: string;
  email: string;
  celular: number;
  fijo: number;
  direccion: string;

}

@Component({
  selector: 'app-mostrar-empresa',
  templateUrl: './mostrar-empresa.component.html',
  styleUrls: ['./mostrar-empresa.component.css']
})
export class MostrarEmpresaComponent implements OnInit {
  displayedColumns: string[] = ['campo', 'valor'];
  contactoColumnas: string[] = ['numero', 'ubicacion', 'acciones'];
  empresa: any;
  tabla: any;
  constructor(private location: Location, private route: ActivatedRoute, private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.obtenerEmpresa()
  }
  volver(): void{
    this.location.back()
  }
  obtenerEmpresa(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.empresaService.mostrarEmpresa(id).subscribe(data => {
      this.empresa = data
      this.tabla = this.crearFilasTabla(data)
    })
  }

  crearFilasTabla(empresa:object): Object[] {
    let arrayValores = Object.entries(empresa)
    let arraySalida = []
    arraySalida = arrayValores.map( function(elemento) {
      if (elemento[0] !== "contact_info") {
        return {"campo" : elemento[0], "valor" : elemento[1]}
      }
    } )
    arraySalida = arraySalida.filter(function(elemento){
      return elemento != undefined && elemento['campo'] != 'id'&& elemento['campo'] !='nombre' && elemento['campo'] !='apellido'
    })
    console.log(arraySalida)
    return arraySalida;
  }
}
