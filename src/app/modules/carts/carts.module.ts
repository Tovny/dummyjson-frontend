import { NgModule } from '@angular/core';

import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [CartsComponent],
  imports: [SharedModule, CartsRoutingModule],
})
export class CartsModule {}
