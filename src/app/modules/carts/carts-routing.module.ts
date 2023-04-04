import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { CartsComponent } from './carts.component';
import { CartsService } from './services/carts.service';
import { CartsOverviewComponent } from './components/carts-overview/carts-overview.component';
import { CartCrudComponent } from './components/cart-crud/cart-crud.component';
import { itemResolver } from 'src/app/shared/resolvers/item.resolver';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartsComponent,
    children: [
      {
        path: '',
        component: CartsOverviewComponent,
        resolve: { carts: dataResolver(CartsService) },
      },
      {
        path: 'create',
        component: CartCrudComponent,
        data: { title: 'Create cart' },
      },
      {
        path: 'edit/:id',
        component: CartCrudComponent,
        resolve: { item: itemResolver(CartsService, ApiEndpoints.CARTS) },
        data: { title: 'Edit cart' },
      },
      {
        path: ':id',
        component: CartComponent,
        resolve: { cart: itemResolver(CartsService, ApiEndpoints.CARTS) },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartsRoutingModule {}
