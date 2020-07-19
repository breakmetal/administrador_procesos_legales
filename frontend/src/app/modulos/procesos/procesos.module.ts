import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';  
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatListModule} from '@angular/material/list'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { CompartidosModule } from "../compartidos/compartidos.module";

import { ProcesosRoutingModule } from './procesos-routing.module';
import { ListarProcesosComponent } from './proceso/listar-procesos/listar-procesos.component';
import { MostrarProcesoComponent } from './proceso/mostrar-proceso/mostrar-proceso.component';
import { AgregarProcesoComponent } from './proceso/agregar-proceso/agregar-proceso.component';
import { PartesComponent } from './partes_proceso/partes/partes.component';
import { AgregarEjecutivoComponent } from './ejecutivo/agregar-ejecutivo/agregar-ejecutivo.component';
import { PartesJuridicasComponent } from './partes_proceso/partes-juridicas/partes-juridicas.component';
import { AgregarActuacionComponent } from "./actuaciones/agregar-actuacion/agregar-actuacion.component";
import { ListarActuacionesComponent } from "./actuaciones/listar-actuaciones/listar-actuaciones.component";
import { AgregarCautelarComponent } from './calutelares/agregar-cautelar/agregar-cautelar.component';
import { ListarCautelarComponent } from './calutelares/listar-cautelar/listar-cautelar.component';
import { ListarNotificacionesComponent } from './notificaciones/listar-notificaciones/listar-notificaciones.component';
import { AgregarNotificacionComponent } from './notificaciones/agregar-notificacion/agregar-notificacion.component';
import { MostrarNotificacionComponent } from './notificaciones/mostrar-notificacion/mostrar-notificacion.component';
import { AgregarArchivoComponent } from './archivos/agregar-archivo/agregar-archivo.component';
import { DespachoComponent } from './despachos/despacho/despacho.component';
import { PersonasNotificadasComponent } from './notificaciones/personas-notificadas/personas-notificadas.component';
import { EmpresasNotificadasComponent } from './notificaciones/empresas-notificadas/empresas-notificadas.component';
import { MostrarActuacionComponent } from './actuaciones/mostrar-actuacion/mostrar-actuacion.component';
import { ListarArchivosComponent } from './archivos/listar-archivos/listar-archivos.component';
import { ArchivoNombrePipe } from './pipes/archivo-nombre.pipe';
import { MostrarCautelarComponent } from './calutelares/mostrar-cautelar/mostrar-cautelar.component';

@NgModule({
  declarations: [
    ListarProcesosComponent, 
    MostrarProcesoComponent, 
    AgregarProcesoComponent, 
    PartesComponent, 
    AgregarEjecutivoComponent, 
    PartesJuridicasComponent,
    AgregarActuacionComponent,
    ListarActuacionesComponent,
    AgregarCautelarComponent,
    ListarCautelarComponent,
    ListarNotificacionesComponent,
    AgregarNotificacionComponent,
    MostrarNotificacionComponent,
    AgregarArchivoComponent,
    DespachoComponent,
    PersonasNotificadasComponent,
    EmpresasNotificadasComponent,
    MostrarActuacionComponent,
    ListarArchivosComponent,
    ArchivoNombrePipe,
    MostrarCautelarComponent
  ],
  imports: [
    CommonModule,
    ProcesosRoutingModule,
    CompartidosModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule
  ]
})
export class ProcesosModule { }
