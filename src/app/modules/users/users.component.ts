import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'src/app/types';
import { UsersService } from './services/users.service';
import { OverviewBaseComponent } from 'src/app/shared/components/overview-base.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent extends OverviewBaseComponent<User> {
  constructor(protected override service: UsersService) {
    super(service);
  }
}
