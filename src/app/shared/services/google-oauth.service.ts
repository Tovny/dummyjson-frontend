import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleOAuthService {
  private accounts = window.google.accounts;
  private _authToken$ = new BehaviorSubject<string | null>(null);
  public authToken$ = this._authToken$.asObservable();

  constructor(private zone: NgZone) {
    this.accounts.id.initialize({
      client_id: environment.googleId,
      ux_mode: 'popup',
      callback: ({ credential }) => {
        this.zone.run(() => {
          this._authToken$.next(credential);
        });
      },
    });
  }

  public renderButton(elt: HTMLElement) {
    this.accounts.id.renderButton(elt, {
      type: 'icon',
    });
  }

  public logout() {
    this.accounts.id.revoke('logout', () => {
      this.zone.run(() => {
        this._authToken$.next(null);
      });
    });
  }
}
