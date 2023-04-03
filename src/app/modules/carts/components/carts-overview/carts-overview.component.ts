import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OverviewBaseComponent } from 'src/app/shared/components/overview-base.component';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { Cart } from 'src/app/types';
import { CartsService } from '../../services/carts.service';
import { NO_DATA_AVAILABLE } from 'src/app/constants/constants';

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

  public getProductPriceAndQuantity(prod: {
    discountedPrice: number;
    quantity: number;
  }) {
    if (!prod.discountedPrice && !prod.quantity) {
      return NO_DATA_AVAILABLE;
    }
    return this.combineItems(
      ', ',
      `${prod.discountedPrice}`,
      `${prod.quantity}x`
    );
  }
}
