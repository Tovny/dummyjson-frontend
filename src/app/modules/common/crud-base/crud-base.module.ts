import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudBaseComponent } from './crud-base.component';

const modules = [MatSnackBarModule, ReactiveFormsModule];

@NgModule({
  declarations: [CrudBaseComponent],
  imports: modules,
  exports: modules,
})
export class CrudBaseModule {}
