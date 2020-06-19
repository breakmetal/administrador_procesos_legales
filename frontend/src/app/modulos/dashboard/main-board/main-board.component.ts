import { Component, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {
  @HostBinding('class') componentCssClass;
  esOscuro: boolean = false ;
  temaOscuro: string = 'darkend-theme';
  temaClaro: string =  'fronent-theme';

  constructor(public overlayContainer: OverlayContainer) { }
  
  ngOnInit(): void {
  }

  cambiarTema(){
    if (this.esOscuro) {
      this.overlayContainer.getContainerElement().classList.add(this.temaClaro);
      this.componentCssClass = this.temaClaro;
      this.esOscuro = false
    } else {
      this.overlayContainer.getContainerElement().classList.add(this.temaOscuro);
      this.componentCssClass = this.temaOscuro;
      this.esOscuro = true
    }
  }

}
