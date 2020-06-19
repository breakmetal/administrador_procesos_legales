import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ResponseSnackBarComponent } from './response-snack-bar/response-snack-bar.component'; 





@NgModule({
  declarations: [ConfirmDialogComponent, ResponseSnackBarComponent],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class CompartidosModule { }
