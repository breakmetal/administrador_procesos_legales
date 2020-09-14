import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardModule } from "./modulos/dashboard/dashboard.module";
import { AuthModule } from "./modulos/auth/auth.module";
import { ErrorHandler } from '@angular/core';
//import { CompartidosModule } from "./modulos/compartidos/compartidos.module";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DashboardModule,
    AuthModule,
    //CompartidosModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
