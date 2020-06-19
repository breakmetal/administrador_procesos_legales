import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarProcesosComponent } from "./proceso/listar-procesos/listar-procesos.component";
import { AgregarProcesoComponent } from "./proceso/agregar-proceso/agregar-proceso.component";
import { MostrarProcesoComponent } from "./proceso/mostrar-proceso/mostrar-proceso.component";
import { AgregarEjecutivoComponent } from "./ejecutivo/agregar-ejecutivo/agregar-ejecutivo.component";
import { AgregarActuacionComponent } from "./actuaciones/agregar-actuacion/agregar-actuacion.component";
import { ListarActuacionesComponent } from "./actuaciones/listar-actuaciones/listar-actuaciones.component";
import { AgregarCautelarComponent } from "./calutelares/agregar-cautelar/agregar-cautelar.component";
import { AgregarNotificacionComponent } from "./notificaciones/agregar-notificacion/agregar-notificacion.component";
import { AgregarArchivoComponent } from "./archivos/agregar-archivo/agregar-archivo.component";
import { MostrarNotificacionComponent } from './notificaciones/mostrar-notificacion/mostrar-notificacion.component';

const routes: Routes = [
  {
    path: 'listar-procesos',
    component: ListarProcesosComponent,
  },
  {
    path: 'agregar-proceso/:accion',
    component: AgregarProcesoComponent,
  },
  {
    path: 'mostrar-proceso/:id',
    component: MostrarProcesoComponent,
  },
  {
    path: 'actualizar-proceso/:accion/:id',
    component: AgregarProcesoComponent,
  },
  /**
   *  API ejecutivo
   */
  {
    path: 'agregar-ejecutivo/:accion/:proceso',
    component: AgregarEjecutivoComponent,
  },
  {
    path: 'actualizar-ejecutivo/:accion/:proceso',
    component: AgregarEjecutivoComponent,
  },
  /**
   * API actuaciones
   */
  {
    path: 'agregar-actuacion/:accion/:proceso',
    component: AgregarActuacionComponent,
  },
  {
    path: 'listar-actuaciones',
    component: ListarActuacionesComponent,
  },
  {
    path: 'actualizar-actuacion/:accion/:id',
    component: AgregarActuacionComponent,
  },
  /**
   * API cautelar
   */
  {
    path: 'agregar-cautelar/:accion/:proceso',
    component: AgregarCautelarComponent,
  },
  {
    path: 'actualizar-cautelar/:accion/:id',
    component: AgregarCautelarComponent,
  },
  /**
   * API notificaciones
   */
  {
    path: 'agregar-notificacion/:accion/:proceso',
    component: AgregarNotificacionComponent,
  },
  {
    path: 'actualizar-notificacion/:accion/:id',
    component: AgregarNotificacionComponent,
  },
  {
    path: 'listar-notificaciones/:proceso',
    component: MostrarNotificacionComponent,
  },
  /**
   * archivos
   */
  {
    path: 'agregar-archivo/:accion/:proceso',
    component: AgregarArchivoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
