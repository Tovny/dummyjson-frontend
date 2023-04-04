import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CrudBaseComponent } from 'src/app/modules/common/crud-base/crud-base.component';
import { Cart, Option, Product, Response, User } from 'src/app/types';
import { CartsService } from '../../services/carts.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY_CART } from '../../constants/cart-constants';
import { Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { generateForm } from 'src/app/utils/generate-form.util';

type ProductControls = 'id' | 'quantity';

@Component({
  selector: 'app-cart-crud',
  templateUrl: './cart-crud.component.html',
  styleUrls: ['./cart-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartCrudComponent
  extends CrudBaseComponent<Cart>
  implements OnDestroy
{
  private _users$ = new BehaviorSubject<Option[]>([]);
  public users$ = this._users$.asObservable();
  private _products$ = new BehaviorSubject<Product[]>([]);
  public products$ = this._products$
    .asObservable()
    .pipe(
      map(products =>
        products.map(product => ({ label: product.title, value: product.id }))
      )
    );
  private sub!: Subscription;

  public get productsControl() {
    return this.form.controls.products;
  }

  public get total() {
    return this.form.controls.discountedTotal.value;
  }

  constructor(
    protected override service: CartsService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar,
    private http: HttpClient
  ) {
    super(service, route, snackbar, EMPTY_CART);
    http.get<Response<User>>(`${ApiEndpoints.USERS}?limit=0`).subscribe(res => {
      const userOptions = (res.users as User[]).map(user => ({
        label: `${user.firstName} ${user.lastName}`,
        value: user.id,
      }));
      this._users$.next(userOptions);
    });
    http
      .get<Response<Product>>(`${ApiEndpoints.PRODUCTS}?limit=0`)
      .subscribe(res => {
        this._products$.next(res.products as Product[]);
      });

    this.form.controls.userId.addValidators(Validators.required);

    // sync up total and the rest of the product controls
    this.sub = this.productsControl.valueChanges.subscribe(() => {
      const products = this._products$.value;
      const total = this.productsControl.controls.reduce<number>(
        (prev, curr) => {
          const product = products.find(
            prod => prod.id === curr.controls.id.value
          );
          if (product) {
            prev +=
              ((100 - product.discountPercentage) / 100) *
              product.price *
              curr.controls.quantity.value;

            // values have already been set
            if (curr.controls.title.value) {
              return prev;
            }

            Object.keys(product).forEach(key => {
              if (['id', 'quantity'].includes(key)) {
                return;
              }
              const control = curr.get(key);
              if (control) {
                control.setValue(product[key as keyof Product], {
                  emitEvent: false,
                });
              }
            });
          }
          return prev;
        },
        0
      );
      this.form.controls.discountedTotal.setValue(total);
    });
  }

  public override addControl() {
    const control = generateForm({
      id: 0,
      title: '',
      price: 0,
      quantity: 0,
      total: 0,
      discountPercentage: 0,
      discountedPrice: 0,
    });
    control.controls.quantity.addValidators(Validators.min(1));
    this.productsControl.push(control);
  }

  public getProductControl(index: number, key: ProductControls) {
    return this.productsControl.at(index).controls[key];
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
