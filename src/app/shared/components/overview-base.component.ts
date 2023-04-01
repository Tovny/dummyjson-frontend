import { Cart, Product, User } from 'src/app/types';
import { BaseApiService } from '../services/base-api.service';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

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
}
