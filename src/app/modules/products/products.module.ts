import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewListComponent } from '../common/overview-list/overview-list.component';
import { OverviewCardComponent } from '../common/overview-card/overview-card.component';
import { ProductsOverviewComponent } from './components/products-overview/products-overview.component';

@NgModule({
  declarations: [ProductsComponent, ProductsOverviewComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    OverviewListComponent,
    OverviewCardComponent,
  ],
})
export class ProductsModule {}
