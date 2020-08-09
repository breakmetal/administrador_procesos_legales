import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodasMisNotificacionesComponent } from './todas-mis-notificaciones.component';

describe('TodasMisNotificacionesComponent', () => {
  let component: TodasMisNotificacionesComponent;
  let fixture: ComponentFixture<TodasMisNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodasMisNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodasMisNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
