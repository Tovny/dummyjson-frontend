import { NgModule } from '@angular/core';

import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartsOverviewComponent } from './components/carts-overview/carts-overview.component';
import { OverviewListComponent } from '../common/overview-list/overview-list.component';
import { OverviewCardComponent } from '../common/overview-card/overview-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CartsComponent, CartsOverviewComponent],
  imports: [
    SharedModule,
    CartsRoutingModule,
    OverviewListComponent,
    OverviewCardComponent,
    MatCardModule,
    MatButtonModule,
  ],
})
export class CartsModule {}
