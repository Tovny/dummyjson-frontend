import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from 'src/app/shared/models/ApiEndpoints.model';
import { User } from 'src/app/types';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  public user!: User;
  public readonly usersEndpoint = ApiEndpoints.USERS;

  public get fullName() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }

  constructor(private route: ActivatedRoute) {
    this.user = route.snapshot.data['user'];
  }
}
