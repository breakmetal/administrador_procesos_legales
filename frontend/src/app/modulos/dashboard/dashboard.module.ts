import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatListModule} from '@angular/material/list'; 
import {MatDividerModule} from '@angular/material/divider'; 
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainBoardComponent } from './main-board/main-board.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { IndexPanelComponent } from './index-panel/index-panel.component';


@NgModule({
  declarations: [MainBoardComponent, LeftPanelComponent, IndexPanelComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatDividerModule
  ]
})
export class DashboardModule { }
