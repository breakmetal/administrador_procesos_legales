import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component'; 





@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class CompartidosModule { }
