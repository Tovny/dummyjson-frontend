import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User, UserResponse } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();
  private total?: number;

  constructor(private http: HttpClient) {}

  public fetchusers() {
    return this.http.get<UserResponse>('users').pipe(
      tap(({ total, users }) => {
        this.total = total;
        this._users$.next([...this._users$.value, ...users]);
      })
    );
  }
}
