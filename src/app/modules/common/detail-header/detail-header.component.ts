import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ApiEndpoints } from 'src/app/shared/models/ApiEndpoints.model';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-detail-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeaderComponent {
  @Input() title!: string;
  @Input() endpoint!: ApiEndpoints;
  @Input() id!: number;
  @Input() deleting = false;
  @Input() deleted = false;
  @Output() delete = new EventEmitter<void>();

  public get link() {
    return ['/', this.endpoint, 'edit', this.id];
  }
}
