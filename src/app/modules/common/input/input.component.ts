import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BaseCVAComponent } from 'src/app/shared/components/cva-base.component';

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
  extends BaseCVAComponent
  implements ControlValueAccessor, OnChanges
{
  @Input() type: 'text' | 'number' | 'email' = 'text';
  @Input() min?: number;
  @Input() max?: number;
  @Input() disabled?: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    const disabledChange = changes['disabled'];
    if (disabledChange) {
      disabledChange.currentValue
        ? this.control.disable()
        : this.control.enable();
    }
  }
}
