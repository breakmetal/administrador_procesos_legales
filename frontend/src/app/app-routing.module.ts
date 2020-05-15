import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: `login`, loadChildren: () =>
      import('./modulos/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: `dashboard`, loadChildren: () =>
      import('./modulos/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
