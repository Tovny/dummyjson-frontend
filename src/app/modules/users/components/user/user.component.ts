import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiEndpoints } from 'src/app/shared/models/api-endpoints.model';
import { User } from 'src/app/types';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsBaseComponent } from 'src/app/modules/common/item-details-base/item-details-base.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent extends ItemDetailsBaseComponent<User> {
  public readonly usersEndpoint = ApiEndpoints.USERS;

  public get fullName() {
    return `${this.item.firstName} ${this.item.lastName}`;
  }

  constructor(
    protected override service: UsersService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar,
    protected override dialog: MatDialog
  ) {
    super(service, route, snackbar, dialog, 'user');
  }
}
