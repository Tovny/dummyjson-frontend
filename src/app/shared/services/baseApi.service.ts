import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Cart, Product, Response, User } from 'src/app/types';
import { ApiEndpoints } from '../models/ApiEndpoints.model';

export class BaseApiService<T extends User | Product | Cart> {
  private _data$ = new BehaviorSubject<T[]>([]);
  public data$ = this._data$.asObservable();
  private total?: number;

  constructor(protected http: HttpClient, private key: ApiEndpoints) {}

  public fetchData() {
    return this.http.get<Response<T>>(this.key).pipe(
      tap(res => {
        this.total = res.total;
        this._data$.next([...this._data$.value, ...res[this.key]]);
      })
    );
  }
}
