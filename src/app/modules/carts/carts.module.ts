import { NgModule } from '@angular/core';

import { CartsRoutingModule } from './carts-routing.module';
import { CartsComponent } from './carts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartsOverviewComponent } from './components/carts-overview/carts-overview.component';
import { OverviewListComponent } from '../common/overview-list/overview-list.component';
import { OverviewCardComponent } from '../common/overview-card/overview-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CartComponent } from './components/cart/cart.component';
import { CartCrudComponent } from './components/cart-crud/cart-crud.component';
import { CrudBaseModule } from '../common/crud-base/crud-base.module';
import { SelectComponent } from '../common/select/select.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailHeaderComponent } from '../common/detail-header/detail-header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormErrorComponent } from '../common/form-error/form-error.component';

@NgModule({
  declarations: [
    CartsComponent,
    CartsOverviewComponent,
    CartComponent,
    CartCrudComponent,
  ],
  imports: [
    SharedModule,
    CartsRoutingModule,
    OverviewListComponent,
    OverviewCardComponent,
    MatCardModule,
    MatButtonModule,
    CrudBaseModule,
    SelectComponent,
    HttpClientModule,
    DetailHeaderComponent,
    MatDialogModule,
    FormErrorComponent,
  ],
})
export class CartsModule {}
