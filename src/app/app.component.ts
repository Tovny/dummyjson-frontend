import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public menuItems = ['products', 'carts', 'users'];
  public loading$ = this.router.events.pipe(
    filter(
      evt =>
        evt instanceof NavigationStart ||
        evt instanceof NavigationEnd ||
        evt instanceof NavigationError
    ),
    map((evt: Event) => evt instanceof NavigationStart)
  );

  constructor(private router: Router) {}
}
