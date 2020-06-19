import { Component, OnInit, Input } from '@angular/core';
import { ProcesoService } from "../../servicios/proceso.service";

@Component({
  selector: 'app-listar-cautelar',
  templateUrl: './listar-cautelar.component.html',
  styleUrls: ['./listar-cautelar.component.css']
})
export class ListarCautelarComponent implements OnInit {
  cautelares : any;
  @Input() proceso: number;
  constructor(private procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.listarAnotaciones()
  }
  listarAnotaciones(){
    this.procesoService.listarCautelares(this.proceso).subscribe(data => {
      this.cautelares = data
      console.log(data)
    })
  }
}
