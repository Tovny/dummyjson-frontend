import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ApiEndpoints } from 'src/app/shared/models/ApiEndpoints.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-detail-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './detail-header.component.html',
  styleUrls: ['./detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailHeaderComponent {
  @Input() title!: string;
  @Input() endpoint!: ApiEndpoints;
  @Input() id!: number;

  public get link() {
    return ['/', this.endpoint, 'edit', this.id];
  }
}
