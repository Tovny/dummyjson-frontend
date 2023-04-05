import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { ProductsComponent } from './products.component';
import { ProductsService } from './services/products.service';
import { ProductsOverviewComponent } from './components/products-overview/products-overview.component';
import { ProductCrudComponent } from './components/product-crud/product-crud.component';
import { itemResolver } from 'src/app/shared/resolvers/item.resolver';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductsOverviewComponent,
        resolve: { products: dataResolver(ProductsService) },
      },
      {
        path: 'create',
        component: ProductCrudComponent,
        data: { title: 'Create product' },
      },
      {
        path: 'edit/:id',
        component: ProductCrudComponent,
        resolve: { item: itemResolver(ProductsService, ApiEndpoints.PRODUCTS) },
        data: { title: 'Edit product' },
      },
      {
        path: ':id',
        component: ProductComponent,
        resolve: { item: itemResolver(ProductsService, ApiEndpoints.PRODUCTS) },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
