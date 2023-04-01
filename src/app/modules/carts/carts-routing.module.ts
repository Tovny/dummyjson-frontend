import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dataResolver } from 'src/app/shared/resolvers/data.resolver';
import { CartsComponent } from './carts.component';
import { CartsService } from './services/carts.service';
import { CartsOverviewComponent } from './components/carts-overview/carts-overview.component';

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
      { path: '**', redirectTo: '' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartsRoutingModule {}
