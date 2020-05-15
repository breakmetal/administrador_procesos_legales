import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenService } from "./interceptors/refresh-token.service";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
  {
    path: '', component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenService,
      multi: true,
    }
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
