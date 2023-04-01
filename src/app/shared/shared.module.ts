import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  CommonModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
