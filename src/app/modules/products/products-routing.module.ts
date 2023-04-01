import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { ProductsComponent } from './products.component';
import { ProductsService } from './services/products.service';
import { ProductsOverviewComponent } from './components/products-overview/products-overview.component';

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
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
