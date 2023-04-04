import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ItemDetailsBaseComponent } from 'src/app/modules/common/item-details-base/item-details-base.component';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { Cart, Product, User } from 'src/app/types';
import { CartsService } from '../../services/carts.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent extends ItemDetailsBaseComponent<Cart> {
  public readonly cartsEndpoint = ApiEndpoints.CARTS;
  public readonly productsEndpoint = ApiEndpoints.PRODUCTS;
  private _user$ = new BehaviorSubject<User | null>(null);
  public user$ = this._user$.asObservable();

  constructor(
    protected override service: CartsService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar,
    protected override dialog: MatDialog,
    private http: HttpClient
  ) {
    super(service, route, snackbar, dialog, 'cart');
    this.http
      .get<User>(`users/${this.item.userId}`)
      .subscribe(res => this._user$.next(res));
  }

  public getTitle(user: User) {
    return `Cart #${this.item.id} (${user.firstName} ${user.lastName})`;
  }

  public trackById(_: number, product: Partial<Product>) {
    return product.id;
  }
}
