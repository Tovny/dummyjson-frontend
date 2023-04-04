import {
  Cart,
  FormField,
  FormType,
  GeneratedForm,
  Product,
  User,
} from 'src/app/types';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseApiService } from 'src/app/shared/services/base-api.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  InjectionToken,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { generateForm } from 'src/app/utils/generate-form.util';
import { FormFieldTypes } from 'src/app/shared/models/form-field-types.model';
import { ARRAY_CONTROL } from 'src/app/constants/constants';

export const ITEM_KEY_TOKEN = new InjectionToken('item');

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CrudBaseComponent<T extends User | Product | Cart> {
  public title!: string;
  public form: GeneratedForm<T> = new FormGroup({} as FormType<T>);
  public formDisabled$ = this.form.statusChanges.pipe(
    map(status => status === 'DISABLED')
  );
  @ViewChild('input', { static: true })
  public inputRef!: TemplateRef<unknown>;
  @ViewChild('textarea', { static: true })
  public textareaRef!: TemplateRef<unknown>;
  @ViewChild('select', { static: true })
  public selectRef!: TemplateRef<unknown>;
  @ViewChild('fieldset', { static: true })
  public fieldsetRef!: TemplateRef<unknown>;

  constructor(
    protected service: BaseApiService<T>,
    protected route: ActivatedRoute,
    protected snackbar: MatSnackBar,
    @Inject(ITEM_KEY_TOKEN) protected emptyItem: Partial<T>
  ) {
    this.title = route.snapshot.data['title'];
    const item = route.snapshot.data['item'];
    this.form = generateForm<T>(item || emptyItem);
  }

  public handleSubmit() {
    if (!this.form.valid) {
      return;
    }

    const item = this.form.getRawValue() as Partial<T>;

    if (typeof item.id === 'number') {
      return this.editItem(item.id, item);
    }
    this.addItem(item);
  }

  private addItem(item: Partial<T>) {
    this.form.disable();

    this.service.addItem(item).subscribe({
      next: () => {
        this.form.reset();
        this.form.enable();
        this.openSnackbar('Item added successfully!');
      },
      error: () => {
        this.form.enable();
        this.openSnackbar('Failed to add item!');
      },
    });
  }

  private editItem(id: number, item: Partial<T>) {
    this.form.disable();

    this.service.updateItem(id, item).subscribe({
      next: () => {
        this.form.enable();
        this.openSnackbar('Item successfully updated!');
      },
      error: () => {
        this.form.enable();
        this.openSnackbar('Failed to update item!');
      },
    });
  }

  private openSnackbar(msg: string) {
    this.snackbar.open(msg, 'Dismiss', { duration: 1000 * 5 });
  }

  public getTemplate(type: FormFieldTypes) {
    switch (type) {
      case FormFieldTypes.TEXTAREA:
        return this.textareaRef;
      case FormFieldTypes.SELECT:
        return this.selectRef;
      case FormFieldTypes.FIELDSET:
        return this.fieldsetRef;
      default:
        return this.inputRef;
    }
  }

  public isFormArray(control: AbstractControl) {
    return control instanceof FormArray;
  }

  public getControl(
    control: FormControl<unknown>,
    key: string
  ): FormControl<unknown> {
    if (key === ARRAY_CONTROL) {
      return control;
    }
    return control.get(key) as FormControl<unknown>;
  }

  public isArrayControl(control: AbstractControl) {
    return control instanceof FormArray;
  }

  public getFieldsetControl(control: AbstractControl, index: number) {
    if (control instanceof FormArray) {
      return control.at(index);
    }
    return control;
  }

  public addControl(control: FormArray) {
    control.push(new FormControl(null));
    this.form.markAsDirty();
  }

  public removeControl(control: FormArray, index: number) {
    control.removeAt(index);
    this.form.markAsDirty();
  }

  public trackByLabelAndControl(_: number, { label, control }: FormField) {
    return `${label}_${control}`;
  }

  public trackByOption(_: number, option: string) {
    return option;
  }
}
