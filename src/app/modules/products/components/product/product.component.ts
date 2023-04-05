import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemDetailsBaseComponent } from 'src/app/modules/common/item-details-base/item-details-base.component';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { Image, Product } from 'src/app/types';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent extends ItemDetailsBaseComponent<Product> {
  public readonly productsEndpoint = ApiEndpoints.PRODUCTS;
  public images = this.item.images.map((image, i) => ({
    src: image,
    alt: `${this.item.title} #${i + 1}`,
  }));

  constructor(
    protected override service: ProductsService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar,
    protected override dialog: MatDialog
  ) {
    super(service, route, snackbar, dialog);
  }
}
