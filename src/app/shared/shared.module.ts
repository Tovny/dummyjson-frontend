import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const modules = [CommonModule, MatButtonModule, MatIconModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
