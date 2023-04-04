import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudBaseComponent } from './crud-base.component';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from '../input/input.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectComponent } from '../select/select.component';

const modules = [
  MatSnackBarModule,
  ReactiveFormsModule,
  MatButtonModule,
  InputComponent,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  SelectComponent,
];

@NgModule({
  declarations: [CrudBaseComponent],
  imports: modules,
  exports: modules,
})
export class CrudBaseModule {}
