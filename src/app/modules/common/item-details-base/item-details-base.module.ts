import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { ItemDetailsBaseComponent } from './item-details-base.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const modules = [MatDialogModule, MatSnackBarModule];

@NgModule({
  declarations: [ItemDetailsBaseComponent],
  imports: [...modules, CommonModule, ConfirmDeleteComponent],
  exports: [modules, ItemDetailsBaseComponent],
})
export class ItemDetailsBaseModule {}
