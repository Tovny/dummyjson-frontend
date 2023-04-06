import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  BehaviorSubject,
  Subscription,
  combineLatest,
  debounceTime,
  fromEvent,
  map,
} from 'rxjs';
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
export class ImageSliderComponent implements OnChanges, OnDestroy {
  @Input() images!: Image[];
  private _selectedImage$ = new BehaviorSubject(0);
  private _animationState$ = new BehaviorSubject<AnimationStates>(
    AnimationStates.IN
  );
  private _sliderHeight$ = new BehaviorSubject<{
    height: number;
    calculated: number;
  }>({ height: 0, calculated: 0 });
  public sliderState$ = combineLatest([
    this._selectedImage$,
    this._animationState$,
    this._sliderHeight$,
  ]).pipe(map(([index, state, height]) => ({ index, state, height })));
  private actionsDisabled = false;
  private sub!: Subscription;

  public get previousDisabled() {
    return this.actionsDisabled || this._selectedImage$.value <= 0;
  }

  public get nextDisabled() {
    return (
      this.actionsDisabled ||
      this._selectedImage$.value >= this.images.length - 1
    );
  }

  constructor() {
    this.sub = fromEvent(window, 'resize')
      .pipe(debounceTime(250))
      .subscribe(() => this.resetSliderHeight());
  }

  ngOnChanges(): void {
    this.resetSliderHeight();
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

  public handleImageLoad() {
    this._animationState$.next(AnimationStates.IN);
    this.actionsDisabled = false;
  }

  public handleHeightImageLoad(evt: Event) {
    const eltHeight = (evt.currentTarget as HTMLImageElement).scrollHeight;
    const { height, calculated } = this._sliderHeight$.value;
    const nextHeight = Math.max(height, eltHeight);

    this._sliderHeight$.next({
      height: Math.min(nextHeight, 500),
      calculated: calculated + 1,
    });
  }

  private resetSliderHeight() {
    this._sliderHeight$.next({ height: 0, calculated: 0 });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
