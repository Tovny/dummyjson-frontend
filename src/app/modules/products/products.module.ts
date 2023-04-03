import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OverviewListComponent } from '../common/overview-list/overview-list.component';
import { OverviewCardComponent } from '../common/overview-card/overview-card.component';
import { ProductsOverviewComponent } from './components/products-overview/products-overview.component';
import { ProductComponent } from './components/product/product.component';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';

@NgModule({
  declarations: [ProductsComponent, ProductsOverviewComponent, ProductComponent, ProductCrudComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule,
    OverviewListComponent,
    OverviewCardComponent,
  ],
})
export class ProductsModule {}
