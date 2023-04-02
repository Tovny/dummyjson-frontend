import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'src/app/types';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CrudBaseComponent } from 'src/app/modules/common/crud-base/crud-base.component';

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
    protected override fb: FormBuilder,
    protected override snackbar: MatSnackBar
  ) {
    const user: User | undefined = route.snapshot.data['user'];

    const form = fb.group({
      id: fb.control(user?.id),
      firstName: fb.control(user?.firstName || ''),
      lastName: fb.control(user?.lastName || ''),
      age: fb.control(user?.age || 0),
      email: fb.control(user?.email || ''),
      address: fb.group({
        address: fb.control(user?.address.address || ''),
        city: fb.control(user?.address.city || ''),
        postalCode: fb.control(user?.address.postalCode || ''),
        state: fb.control(user?.address.state || ''),
      }),
    });

    super(service, route, fb, snackbar, form);
  }
}
