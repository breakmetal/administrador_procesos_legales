import { Component, OnInit, Input } from '@angular/core';
import { ProcesoService } from "../../servicios/proceso.service";


@Component({
  selector: 'app-despacho',
  templateUrl: './despacho.component.html',
  styleUrls: ['./despacho.component.css']
})
export class DespachoComponent implements OnInit {
  @Input() id: any;
  public despacho: any;

  constructor(private procesoService : ProcesoService) { }

  ngOnInit(): void {
    this.mostrarDespacho(this.id)
  }
  private mostrarDespacho(id:number){
    this.procesoService.obtenerDespacho(id).subscribe(data => {this.despacho =data})
  }

}
