import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'src/app/types';
import { UsersService } from '../../services/users.service';
import { OverviewBaseComponent } from 'src/app/shared/components/overview-base.component';

@Component({
  selector: 'app-users-overview',
  templateUrl: './users-overview.component.html',
  styleUrls: ['./users-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersOverviewComponent extends OverviewBaseComponent<User> {
  constructor(protected override service: UsersService) {
    super(service);
  }

  public getSubtitles(user: User) {
    return [
      'Phone: ' + this.showItem(user.phone),
      'E-Mail: ' + this.showItem(user.email),
    ];
  }
}
