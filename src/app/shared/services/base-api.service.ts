import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Cart, Product, Response, User } from 'src/app/types';
import { ApiEndpoints } from '../models/api-endpoints.model';

export class BaseApiService<T extends User | Product | Cart> {
  private _data$ = new BehaviorSubject<T[]>([]);
  public data$ = this._data$.asObservable();
  private _total$ = new BehaviorSubject(0);
  public total$ = this._total$.asObservable();
  private searchQuery = '';
  private createdItems = 0;

  public get searchTerm() {
    return this.searchQuery;
  }

  public get itemsTake() {
    return this.take;
  }

  constructor(
    protected http: HttpClient,
    private key: ApiEndpoints,
    private take = 30,
    private allowSearch = true
  ) {}

  public fetchItems(search = '') {
    const searchMatches = search === this.searchQuery;
    const params = {
      q: search,
      take: this.take,
      skip: searchMatches ? this._data$.value.length - this.createdItems : 0,
    };

    return this.http
      .get<Response<T>>(
        `${this.key}${search && this.allowSearch ? '/search' : ''}`,
        {
          params,
        }
      )
      .pipe(
        tap(res => {
          this.searchQuery = search;
          this._total$.next(res.total);
          this._data$.next([
            ...(searchMatches ? this._data$.value : []),
            ...(res[this.key] as T[]),
          ]);
        }),
        map(res => res[this.key])
      );
  }

  public fetchItem(id: number) {
    return this.http.get<T>(`${this.key}/${id}`);
  }

  public addItem(item: Partial<T>) {
    return this.http.post<T>(`${this.key}/add`, item).pipe(
      tap(res => {
        this._total$.next(this._total$.value + 1);
        this._data$.next([...this._data$.value, res]);
        this.createdItems++;
      })
    );
  }

  public updateItem(id: number, item: Partial<T>) {
    delete item.id;

    return this.http
      .put<T>(`${this.key}/${id}`, item)
      .pipe(
        tap(res =>
          this._data$.next(
            this._data$.value.map(item => (item.id === res.id ? res : item))
          )
        )
      );
  }

  public deleteItem(id: number) {
    return this.http.delete<T>(`${this.key}/${id}`).pipe(
      tap(res => {
        this._total$.next(this._total$.value - 1);
        this._data$.next(this._data$.value.filter(item => item.id !== res.id));
      })
    );
  }
}
