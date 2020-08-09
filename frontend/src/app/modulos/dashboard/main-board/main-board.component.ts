import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { OverlayContainer} from '@angular/cdk/overlay';
import { LoginService } from "../../auth/servicios/login.service";
@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit, OnDestroy {
  @HostBinding('class') componentCssClass;
  esOscuro: boolean = false ;
  temaOscuro: string = 'darkend-theme';
  temaClaro: string =  'fronent-theme';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public overlayContainer: OverlayContainer,public changeDetectorRef: ChangeDetectorRef, public media: MediaMatcher, public loginService: LoginService) { }
    
  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
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
  salir(){
    this.loginService.logout()
  }

}
