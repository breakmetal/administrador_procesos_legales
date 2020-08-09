import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainBoardComponent } from "./main-board/main-board.component";
import { IndexPanelComponent } from "./index-panel/index-panel.component";
import { AuthGuard } from "../auth/guardianes/auth.guard";

const routes: Routes = [
  {
    path: 'dashboard', component: MainBoardComponent,
    children: [
      { 
        path: '', 
        redirectTo: '/index', 
        pathMatch: 'full', 
        //canActivate: [AuthGuard]
      },
      {
        path: 'index',
        component: IndexPanelComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: `abogado`, loadChildren: () =>
          import('../abogado/abogado.module').then(m => m.AbogadoModule),
        canActivate: [AuthGuard]
      },
      {
        path: `proceso`, loadChildren: () =>
          import('../procesos/procesos.module').then(m => m.ProcesosModule),
          canActivate: [AuthGuard]
      },
    ]
  },
  
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
