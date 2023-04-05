import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Image } from 'src/app/types';

enum AnimationStates {
  IN = 'in',
  OUT = 'out',
}

const animationDuration = 250;

@Component({
  standalone: true,
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        AnimationStates.OUT,
        style({
          opacity: 0,
        })
      ),
      state(
        AnimationStates.IN,
        style({
          opacity: 1,
        })
      ),
      transition('in => out', animate(`${animationDuration}ms ease-in`)),
      transition('out => in', animate(`${animationDuration}ms ease-out`)),
    ]),
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSliderComponent {
  @Input() images!: Image[];
  private _selectedImage$ = new BehaviorSubject(0);
  private _animationState$ = new BehaviorSubject<AnimationStates>(
    AnimationStates.IN
  );
  public sliderState$ = combineLatest([
    this._selectedImage$,
    this._animationState$,
  ]).pipe(map(([index, state]) => ({ index, state })));
  private actionsDisabled = false;

  public get previousDisabled() {
    return this.actionsDisabled || this._selectedImage$.value <= 0;
  }

  public get nextDisabled() {
    return (
      this.actionsDisabled ||
      this._selectedImage$.value >= this.images.length - 1
    );
  }

  public handleSlide(change: -1 | 1) {
    const currentIndex = this._selectedImage$.value;
    const newIndex =
      change === -1
        ? Math.max(currentIndex + change, 0)
        : Math.min(currentIndex + change, this.images.length - 1);

    if (newIndex !== currentIndex) {
      this._animationState$.next(AnimationStates.OUT);
      this.actionsDisabled = true;

      setTimeout(() => {
        this._selectedImage$.next(newIndex);
      }, animationDuration);
    }
  }

  handleImageLoad() {
    this._animationState$.next(AnimationStates.IN);
    this.actionsDisabled = false;
  }
}
