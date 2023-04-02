import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'src/app/types';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CrudBaseComponent } from 'src/app/modules/common/crud-base/crud-base.component';
import { EMPTY_USER } from 'src/app/contants/empty-items.util';

@Component({
  selector: 'app-user-crud',
  templateUrl: './user-crud.component.html',
  styleUrls: ['./user-crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCrudComponent extends CrudBaseComponent<User> {
  constructor(
    protected override service: UsersService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar
  ) {
    super(service, route, snackbar, EMPTY_USER);
  }
}
