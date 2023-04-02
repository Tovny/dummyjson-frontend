import { Cart, Product, User } from 'src/app/types';
import { BaseApiService } from '../services/base-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export class CrudBaseComponent<T extends User | Product | Cart> {
  public title!: string;
  public formDisabled$ = this.form.statusChanges.pipe(
    map(status => status === 'DISABLED')
  );

  constructor(
    protected service: BaseApiService<T>,
    protected route: ActivatedRoute,
    protected fb: FormBuilder,
    protected snackbar: MatSnackBar,
    protected form: FormGroup<any>
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  public handleSubmit() {
    const item = this.form.getRawValue() as Partial<T>;

    if (typeof item.id === 'number') {
      return this.editItem(item.id, item);
    }
    this.addItem(item);
  }

  private addItem(item: Partial<T>) {
    this.form.disable();

    this.service
      .addItem(item)
      .pipe(tap(() => this.form.enable))
      .subscribe({
        next: () => {
          this.form.reset();
          this.openSnackbar('Item added successfully!');
        },
        error: () => {
          this.openSnackbar('Failed to add item!');
        },
      });
  }

  private editItem(id: number, item: Partial<T>) {
    this.form.disable();

    this.service
      .updateItem(id, item)
      .pipe(tap(() => this.form.enable()))
      .subscribe({
        next: () => {
          this.openSnackbar('Item successfully updated!');
        },
        error: () => {
          this.openSnackbar('Failed to update item!');
        },
      });
  }

  private openSnackbar(msg: string) {
    this.snackbar.open(msg, 'Dismiss', { duration: 1000 * 5 });
  }
}
