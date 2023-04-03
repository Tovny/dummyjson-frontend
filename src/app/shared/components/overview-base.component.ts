import { Cart, Product, User } from 'src/app/types';
import { BaseApiService } from '../services/base-api.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { NO_DATA_AVAILABLE } from 'src/app/constants/constants';

export class OverviewBaseComponent<T extends User | Product | Cart> {
  private _loading$ = new BehaviorSubject(false);
  public loading$ = this._loading$.asObservable();
  public data$ = combineLatest([
    this.service.data$,
    this.service.total$,
    this.loading$,
  ]).pipe(map(([data, total, loading]) => ({ data, total, loading })));

  constructor(protected service: BaseApiService<T>) {}

  public loadData(searchTerm?: string) {
    this._loading$.next(true);

    this.service.fetchItems(searchTerm).subscribe({
      next: () => this._loading$.next(false),
      error: () => this._loading$.next(false),
    });
  }

  public showItem(item: string | undefined) {
    if (!item) {
      return NO_DATA_AVAILABLE;
    }
    return item;
  }

  public combineItems(separator: string, ...items: string[]) {
    if (!items?.find(elt => !!elt)) {
      return NO_DATA_AVAILABLE;
    }
    return items.join(separator);
  }
}
