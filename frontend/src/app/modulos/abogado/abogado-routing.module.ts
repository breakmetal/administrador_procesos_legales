import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarPersonasComponent } from "./persona/listar-personas/listar-personas.component";
import { AgregarPersonasComponent } from "./persona/agregar-personas/agregar-personas.component";
import { MostrarPersonaComponent } from "./persona/mostrar-persona/mostrar-persona.component";

import { ListarEmpresasComponent } from "./empresa/listar-empresas/listar-empresas.component";
import { AgregarEmpresaComponent } from "./empresa/agregar-empresa/agregar-empresa.component";
import { MostrarEmpresaComponent } from "./empresa/mostrar-empresa/mostrar-empresa.component";


const routes: Routes = [
  {
    path: 'listar-personas',
    component: ListarPersonasComponent,
  },
  {
    path: 'agregar-personas/:accion',
    component: AgregarPersonasComponent 
  },
  {
    path: 'actualizar-persona/:accion/:id',
    component: AgregarPersonasComponent 
  },
  {
    path: 'mostrar-persona/:id',
    component: MostrarPersonaComponent
  },
  {
    path: 'listar-empresas',
    component: ListarEmpresasComponent,
  },
  {
    path: 'agregar-empresa/:accion',
    component: AgregarEmpresaComponent 
  },
  {
    path: 'actualizar-empresa/:accion/:id',
    component: AgregarEmpresaComponent 
  },
  {
    path: 'mostrar-empresa/:id',
    component: MostrarEmpresaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbogadoRoutingModule { }
