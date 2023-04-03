import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ItemDetailsBaseComponent } from 'src/app/modules/common/item-details-base/item-details-base.component';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { Product } from 'src/app/types';
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

  constructor(
    protected override service: ProductsService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar,
    protected override dialog: MatDialog
  ) {
    super(service, route, snackbar, dialog, 'user');
  }

  public getImageAlt(index: number) {
    return `${this.item.title} #${index}`;
  }

  public trackByUrl(_: number, url: string) {
    return url;
  }
}
