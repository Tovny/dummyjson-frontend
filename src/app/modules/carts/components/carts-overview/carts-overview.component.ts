import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OverviewBaseComponent } from 'src/app/shared/components/overview-base.component';
import { ApiEndpoints } from 'src/app/shared/models/ApiEndpoints.model';
import { Cart } from 'src/app/types';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-carts-overview',
  templateUrl: './carts-overview.component.html',
  styleUrls: ['./carts-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartsOverviewComponent extends OverviewBaseComponent<Cart> {
  public readonly productsEndpoint = ApiEndpoints.PRODUCTS;

  constructor(protected override service: CartsService) {
    super(service);
  }

  public getCartSubtitles(cart: Cart) {
    return cart.products.map(prod => `${prod.title}, ${prod.quantity}`);
  }
}
