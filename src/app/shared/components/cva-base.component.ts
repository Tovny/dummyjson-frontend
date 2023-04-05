import {
  Component,
  OnInit,
  OnDestroy,
  Optional,
  Self,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { merge, Subscription, tap } from 'rxjs';

@Component({
  template: '',
})
export class BaseCVAComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  public control = new FormControl<unknown>(null);
  private sub?: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    @Self() @Optional() protected controlDirective?: NgControl
  ) {
    if (controlDirective) {
      controlDirective.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    const directiveControl = this.controlDirective?.control;
    if (directiveControl) {
      this.sub = merge(
        this.control.valueChanges.pipe(tap(val => this.onChange(val))),
        directiveControl.statusChanges.pipe(
          tap(() => {
            this.control.setErrors(
              (this.controlDirective as NgControl).errors,
              {
                emitEvent: false,
              }
            );
            this.cdRef.markForCheck();
          })
        )
      ).subscribe();
    }
  }

  public writeValue(value: unknown): void {
    this.control.setValue(value, { emitEvent: false });
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

  public setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.control.disable({ emitEvent: false })
      : this.control.enable({ emitEvent: false });

    this.cdRef.markForCheck();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
