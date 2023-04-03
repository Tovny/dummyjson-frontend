import { Cart, Product, User } from 'src/app/types';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, EMPTY, catchError, of, switchMap, tap } from 'rxjs';
import { BaseApiService } from 'src/app/shared/services/base-api.service';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  InjectionToken,
} from '@angular/core';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { NO_DATA_AVAILABLE } from 'src/app/constants/constants';

export const DATA_KEY_TOKEN = new InjectionToken<string>('dataKey');

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemDetailsBaseComponent<T extends User | Product | Cart> {
  public item!: T;
  private _disabled$ = new BehaviorSubject(false);
  public disabled$ = this._disabled$.asObservable();
  private _deleted$ = new BehaviorSubject(false);
  public deleted$ = this._deleted$.asObservable();

  constructor(
    protected service: BaseApiService<T>,
    protected route: ActivatedRoute,
    protected snackbar: MatSnackBar,
    protected dialog: MatDialog,
    @Inject(DATA_KEY_TOKEN) protected dataKey: string
  ) {
    this.item = route.snapshot.data[dataKey];
  }

  public deleteItem(id: number) {
    this.dialog
      .open(ConfirmDeleteComponent)
      .afterClosed()
      .pipe(
        switchMap(confirmed => {
          if (confirmed) {
            this._disabled$.next(true);

            return this.service.deleteItem(id).pipe(
              tap(() => {
                this._deleted$.next(true);
                this.openSnackbar('Item successfully deleted!');
              }),
              catchError(err => {
                this._disabled$.next(false);
                this.openSnackbar('Failed to delete item!');
                return of(err);
              })
            );
          }
          return EMPTY;
        })
      )
      .subscribe();
  }

  public showItem(item: string | number | undefined | null) {
    if (!item) {
      return NO_DATA_AVAILABLE;
    }
    return `${item}`;
  }

  public combineItems(separator: string, ...items: (string | number)[]) {
    if (!items?.find(elt => !!elt)) {
      return NO_DATA_AVAILABLE;
    }
    return items.join(separator);
  }

  private openSnackbar(msg: string) {
    this.snackbar.open(msg, 'Dismiss', { duration: 5000 });
  }
}
