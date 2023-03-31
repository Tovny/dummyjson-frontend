import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { CartsComponent } from './carts.component';
import { CartsService } from './services/carts.service';

const routes: Routes = [
  {
    path: '',
    component: CartsComponent,
    resolve: { carts: dataResolver(CartsService) },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartsRoutingModule {}
