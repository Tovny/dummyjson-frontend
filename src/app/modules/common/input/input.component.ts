import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Optional,
  Self,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements ControlValueAccessor, OnDestroy {
  @Input() type: 'text' | 'number' | 'email' = 'text';
  public control = new FormControl<unknown>(null);
  private sub?: Subscription;

  constructor(@Self() @Optional() private controlDirective: NgControl) {
    this.controlDirective.valueAccessor = this;

    this.sub = this.control.valueChanges.subscribe(val =>
      this.controlDirective.control?.setValue(val)
    );
  }

  public changeValueTo(value: unknown): void {
    this.control.patchValue(value);
  }

  public writeValue(value: unknown): void {
    this.onChange(value);
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public onChange = (value: unknown): unknown => {
    console.log(value);
    return value;
  };

  public onTouch = (): void => {};

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
