import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartsComponent {}
