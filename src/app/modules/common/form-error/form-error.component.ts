import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormErrorComponent implements OnChanges, OnDestroy {
  @Input() control!: AbstractControl;
  private sub?: Subscription;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(): void {
    this.sub?.unsubscribe();

    this.sub = this.control.statusChanges.subscribe(() =>
      this.cdRef.markForCheck()
    );
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
