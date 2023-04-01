import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Cart, Product, Response, User } from 'src/app/types';
import { ApiEndpoints } from '../models/ApiEndpoints.model';

export class BaseApiService<T extends User | Product | Cart> {
  private _data$ = new BehaviorSubject<T[]>([]);
  public data$ = this._data$.asObservable();
  private _total$ = new BehaviorSubject(0);
  public total$ = this._total$.asObservable();
  private searchQuery = '';

  constructor(protected http: HttpClient, private key: ApiEndpoints) {}

  public fetchItems(search?: string) {
    const searchMathes = search === this.searchQuery;
    const searchQuery = search ? `/search?q=${search}` : '';
    const skipQuery = `${searchQuery ? '&' : '?'}skip=${this._total$.value}`;

    return this.http
      .get<Response<T>>(`${this.key}${searchQuery}${skipQuery}`)
      .pipe(
        tap(res => {
          this._total$.next(res.total);
          this._data$.next([
            ...(searchMathes ? this._data$.value : []),
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
      })
    );
  }

  public updateItem(id: number, item: Partial<T>) {
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
