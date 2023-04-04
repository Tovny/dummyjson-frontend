import { Component, OnDestroy, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  template: '',
})
export class BaseCVAComponent implements ControlValueAccessor, OnDestroy {
  public control = new FormControl<unknown>(null);
  private destroy$ = new Subject<void>();

  constructor(@Self() @Optional() protected controlDirective: NgControl) {
    if (controlDirective) {
      controlDirective.valueAccessor = this;

      this.control.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(val => this.onChange(val));
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
