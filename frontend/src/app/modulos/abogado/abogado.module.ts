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
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {MatGridListModule} from '@angular/material/grid-list'; 
import { AbogadoRoutingModule } from './abogado-routing.module';
import { ListarPersonasComponent } from './persona/listar-personas/listar-personas.component';
import { AgregarPersonasComponent } from './persona/agregar-personas/agregar-personas.component';
import { CompartidosModule } from "../compartidos/compartidos.module";
import { MostrarPersonaComponent } from './persona/mostrar-persona/mostrar-persona.component';
import { AgregarEmpresaComponent } from './empresa/agregar-empresa/agregar-empresa.component';
import { ListarEmpresasComponent } from './empresa/listar-empresas/listar-empresas.component';
import { MostrarEmpresaComponent } from './empresa/mostrar-empresa/mostrar-empresa.component';

@NgModule({
  declarations: [ListarPersonasComponent, AgregarPersonasComponent, MostrarPersonaComponent, AgregarEmpresaComponent, ListarEmpresasComponent, MostrarEmpresaComponent],
  imports: [
    CommonModule,
    AbogadoRoutingModule,
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
    MatSnackBarModule
  ],
})
export class AbogadoModule { }
