import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OverviewBaseComponent } from 'src/app/shared/components/overview-base.component';
import { Product } from 'src/app/types';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsOverviewComponent extends OverviewBaseComponent<Product> {
  constructor(protected override service: ProductsService) {
    super(service);
  }
}
