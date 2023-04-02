import { Cart, Product, User } from 'src/app/types';
import { BaseApiService } from '../services/base-api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs';

export class CrudBaseComponent<T extends User | Product | Cart> {
  constructor(
    protected service: BaseApiService<T>,
    protected fb: FormBuilder,
    protected snackbar: MatSnackBar,
    protected form: FormGroup<any>
  ) {}

  public addItem(item: Partial<T>) {
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

  public editItem(id: number, item: Partial<T>) {
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

  public deleteItem(id: number) {
    this.form.disable();

    this.service.deleteItem(id).subscribe({
      next: () => {
        this.openSnackbar('Item successfully deleted!');
      },
      error: () => {
        this.form.enable();
        this.openSnackbar('Failed to delete item!');
      },
    });
  }

  private openSnackbar(msg: string) {
    this.snackbar.open(msg, 'Dismiss');
  }
}
