import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Self,
  SimpleChanges,
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
export class InputComponent
  implements ControlValueAccessor, OnChanges, OnDestroy
{
  @Input() type: 'text' | 'number' | 'email' = 'text';
  @Input() disabled?: boolean;
  public control = new FormControl<unknown>(null);
  private sub?: Subscription;

  constructor(@Self() @Optional() private controlDirective: NgControl) {
    if (controlDirective) {
      controlDirective.valueAccessor = this;

      this.sub = this.control.valueChanges.subscribe(val => this.onChange(val));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const disabledChange = changes['disabled'];
    if (disabledChange) {
      disabledChange.currentValue
        ? this.control.disable()
        : this.control.enable();
    }
  }

  public writeValue(value: unknown): void {
    this.control.setValue(value);
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  public onChange = (value: unknown): unknown => {
    return value;
  };

  public onTouch = (): void => {};

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
