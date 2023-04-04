import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { Image } from 'src/app/types';

@Component({
  standalone: true,
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSliderComponent {
  @Input() images!: Image[];
  private _selectedImage$ = new BehaviorSubject(0);
  public selectedImage$ = this._selectedImage$.asObservable();

  public get previousDisabled() {
    return this._selectedImage$.value <= 0;
  }

  public get nextDisabled() {
    return this._selectedImage$.value >= this.images.length - 1;
  }

  public handleSlide(change: -1 | 1) {
    const currentIndex = this._selectedImage$.value;
    if (change === -1) {
      return this._selectedImage$.next(Math.max(currentIndex + change, 0));
    }
    this._selectedImage$.next(
      Math.min(currentIndex + change, this.images.length - 1)
    );
  }
}
