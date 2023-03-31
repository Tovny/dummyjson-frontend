import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { ProductsComponent } from './products.component';
import { ProductsService } from './services/products.service';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    resolve: { products: dataResolver(ProductsService) },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
