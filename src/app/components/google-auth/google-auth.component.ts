import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { GoogleOAuthService } from 'src/app/shared/services/google-oauth.service';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleAuthComponent implements AfterViewInit {
  public authToken$ = this.authService.authToken$.pipe(
    tap(token => {
      if (!token) {
        this._disabled$.next(false);

        requestAnimationFrame(() => {
          const elt = this.loginElt?.nativeElement;
          if (elt) {
            this.authService.renderButton(elt);
          }
        });
      }
    })
  );
  private _disabled$ = new BehaviorSubject(false);
  public disabled$ = this._disabled$.asObservable();
  @ViewChild('login', { static: false }) loginElt?: ElementRef<HTMLDivElement>;

  constructor(private authService: GoogleOAuthService) {}

  ngAfterViewInit(): void {
    const elt = this.loginElt?.nativeElement;
    if (elt) {
      this.authService.renderButton(elt);
    }
  }

  public logout() {
    this._disabled$.next(true);
    this.authService.logout();
  }
}
