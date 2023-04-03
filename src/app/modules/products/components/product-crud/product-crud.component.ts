import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCrudComponent {

}
