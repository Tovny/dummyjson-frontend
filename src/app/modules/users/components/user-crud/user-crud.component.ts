import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from 'src/app/types';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CrudBaseComponent } from 'src/app/modules/common/crud-base/crud-base.component';
import { FormFieldTypes } from 'src/app/shared/models/form-field-types.model';
import { EMPTY_USER, USER_FORM_FIELDS } from '../../constants/constants';

@Component({
  selector: 'app-user-crud',
  templateUrl: '../../../common/crud-base/crud-base.component.html',
  styleUrls: ['../../../common/crud-base/crud-base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCrudComponent extends CrudBaseComponent<User> {
  public readonly formFields = USER_FORM_FIELDS;
  public readonly fieldsetType = FormFieldTypes.FIELDSET;
  public readonly selectType = FormFieldTypes.SELECT;

  constructor(
    protected override service: UsersService,
    protected override route: ActivatedRoute,
    protected override snackbar: MatSnackBar
  ) {
    super(service, route, snackbar, EMPTY_USER);
  }
}
