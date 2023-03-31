import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Cart, Product, Response, User } from 'src/app/types';
import { ApiEndpoints } from '../models/ApiEndpoints.model';

export class BaseApiService<T extends User | Product | Cart> {
  private _data$ = new BehaviorSubject<T[]>([]);
  public data$ = this._data$.asObservable();
  private total?: number;

  constructor(protected http: HttpClient, private key: ApiEndpoints) {}

  public fetchItems(search?: string) {
    if (this.total && this._data$.value.length >= this.total) {
      return this.data$;
    }

    const searchQuery = search ? `/search?q=${search}` : '';
    const skipQuery = `${searchQuery ? '&' : '?'}skip=${this.total || 0}`;

    return this.http
      .get<Response<T>>(`${this.key}${searchQuery}${skipQuery}`)
      .pipe(
        tap(res => {
          this.total = res.total;
          this._data$.next([...this._data$.value, ...res[this.key]]);
        }),
        map(res => res[this.key])
      );
  }

  public fetchItem(id: number) {
    return this.http.get<T>(`${this.key}/${id}`);
  }

  public addItem(item: Partial<T>) {
    return this.http.post<T>(`${this.key}/add`, item);
  }

  public updateItem(id: number, item: Partial<T>) {
    return this.http.put<T>(`${this.key}/${id}`, item);
  }

  public deleteItem(id: number) {
    return this.http.delete<T>(`${this.key}/${id}`);
  }
}
