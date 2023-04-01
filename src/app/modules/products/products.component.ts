import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OverviewBaseComponent } from 'src/app/shared/components/overview-base.component';
import { ApiEndpoints } from 'src/app/shared/models/ApiEndpoints.model';
import { Product } from 'src/app/types';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent extends OverviewBaseComponent<Product> {
  public readonly productsEndpoint = ApiEndpoints.PRODUCTS;

  constructor(protected override service: ProductsService) {
    super(service);
  }
}
