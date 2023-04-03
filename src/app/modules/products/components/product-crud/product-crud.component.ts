import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CrudBaseComponent } from 'src/app/modules/common/crud-base/crud-base.component';
import { FormFieldTypes } from 'src/app/shared/models/form-field-types.model';
import { Product } from 'src/app/types';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY_PRODUCT, PRODUCT_FORM_FIELDS } from '../../constants/constants';

@Component({
  selector: 'app-product-crud',
  templateUrl: '../../../common/crud-base/crud-base.component.html',
  styleUrls: ['../../../common/crud-base/crud-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCrudComponent extends CrudBaseComponent<Product> {
  public readonly formFields = PRODUCT_FORM_FIELDS;
  public readonly fieldsetType = FormFieldTypes.FIELDSET;
  public readonly selectType = FormFieldTypes.SELECT;

  constructor(
    protected override service: ProductsService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar
  ) {
    super(service, route, snackbar, EMPTY_PRODUCT);
  }
}
