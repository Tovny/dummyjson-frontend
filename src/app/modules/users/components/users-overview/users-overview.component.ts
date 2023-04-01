import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'src/app/types';
import { UsersService } from '../../services/users.service';
import { OverviewBaseComponent } from 'src/app/shared/components/overview-base.component';
import { ApiEndpoints } from 'src/app/shared/models/ApiEndpoints.model';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersOverviewComponent extends OverviewBaseComponent<User> {
  public readonly usersEndpoint = ApiEndpoints.USERS;

  constructor(protected override service: UsersService) {
    super(service);
  }
}
