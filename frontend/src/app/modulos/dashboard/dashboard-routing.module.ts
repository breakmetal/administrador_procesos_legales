import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainBoardComponent } from "./main-board/main-board.component";
import { IndexPanelComponent } from "./index-panel/index-panel.component";

const routes: Routes = [
  {
    path: 'dashboard', component: MainBoardComponent,
    children: [
      { 
        path: '', 
        redirectTo: '/index', 
        pathMatch: 'full' },
      {
        path: 'index',
        component: IndexPanelComponent,
      },
      {
        path: `abogado`, loadChildren: () =>
          import('../abogado/abogado.module').then(m => m.AbogadoModule)
      },
      {
        path: `proceso`, loadChildren: () =>
          import('../procesos/procesos.module').then(m => m.ProcesosModule)
      },
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
