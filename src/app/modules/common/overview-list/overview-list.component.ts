import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Cart, Product, User } from 'src/app/types';
import { InputComponent } from '../input/input.component';

@Component({
  standalone: true,
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    InputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewListComponent<T extends User | Product | Cart> {
  @Input() public items!: T[];
  @Input() public total!: number;
  @Input() public loading!: boolean;
  @Input() public showSearch = true;
  @Output() public loadData = new EventEmitter<string>();
  @ContentChild('itemTemplate')
  public itemTemplateRef!: TemplateRef<unknown>;
  public search = '';

  public handleLoadData() {
    if (!this.loading) {
      this.loadData.emit(this.search);
    }
  }

  public trackById(_: number, item: T) {
    return item.id;
  }
}
