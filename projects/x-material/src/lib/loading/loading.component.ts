import { TemplatePortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Component, DoCheck, ElementRef } from '@angular/core';

import { xMatFadeInOutAnimation } from '../common/animations/fade/fadeInOut.animation';

export enum LoadingType {
  Circular = 'circular',
  Linear = 'linear',
}

export enum LoadingMode {
  Determinate = 'determinate',
  Indeterminate = 'indeterminate',
}

export enum LoadingStrategy {
  Overlay = 'overlay',
  Replace = 'replace',
}

export enum LoadingStyle {
  FullScreen = 'fullscreen',
  Overlay = 'overlay',
  None = 'none',
}

export const X_MAT_CIRCLE_DIAMETER = 100;

@Component({
  selector: 'x-mat-loading',
  styleUrls: ['./loading.component.scss'],
  templateUrl: './loading.component.html',
  animations: [xMatFadeInOutAnimation],
})
export class XMatLoadingComponent implements DoCheck {
  /**
   * Flag for animation
   */
  animation = false;

  /**
   * Content injected into loading component.
   */
  // tslint:disable-next-line:no-any
  content: TemplatePortal<any>;

  style: LoadingStyle = LoadingStyle.None;

  /**
   * height: number
   * Sets height of [XMatLoadingComponent].
   */
  height: number;

  /**
   * type: LoadingType
   * Sets type of [XMatLoadingComponent] rendered.
   */
  type: LoadingType = LoadingType.Circular;

  /**
   * color: primary' | 'accent' | 'warn'
   * Sets theme color of [XMatLoadingComponent] rendered.
   */
  color: 'primary' | 'accent' | 'warn' = 'primary';

  private _mode: LoadingMode = LoadingMode.Indeterminate;

  private defaultMode: LoadingMode = LoadingMode.Indeterminate;

  private _value = 0;

  private circleDiameter: number = X_MAT_CIRCLE_DIAMETER;

  constructor(private elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

  ngDoCheck(): void {
    // When overlay is used and the host width has a value greater than 1px
    // set the circle diameter when possible incase the loading component was rendered in a hidden state
    if (this.isOverlay() && this.hostHeight() > 1 && this.animation) {
      this.setCircleDiameter();
      this.changeDetectorRef.markForCheck();
    }
  }

  getHeight(): string {
    // Ignore height if style is `overlay` or `fullscreen`.
    // Add height if child elements have a height and style is `none`, else return default height.
    if (this.isOverlay() || this.isFullScreen()) {
      return undefined;
    } else {
      return this.height ? `${this.height}px` : '150px';
    }
  }

  getCircleDiameter(): number {
    return this.circleDiameter;
  }

  getCircleStrokeWidth(): number {
    // we calculate the stroke width by setting it as 10% of its diameter
    // tslint:disable-next-line:no-magic-numbers
    const strokeWidth: number = this.getCircleDiameter() / 10;
    return Math.abs(strokeWidth);
  }

  isCircular(): boolean {
    return this.type === LoadingType.Circular;
  }

  isLinear(): boolean {
    return this.type === LoadingType.Linear;
  }

  isFullScreen(): boolean {
    return this.style === LoadingStyle.FullScreen;
  }

  isOverlay(): boolean {
    return this.style === LoadingStyle.Overlay;
  }

  /**
   * Starts in animation and returns an observable for completition event.
   */
  show(): void {
    /* need to switch back to the selected mode, so we have saved it in another variable
     *  and then recover it. (issue with protractor)
     */
    this._mode = this.defaultMode;
    // Set values before the animations starts
    this.setCircleDiameter();
    // Check for changes for `OnPush` change detection
    this.animation = true;
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Starts out animation and returns an observable for completition event.
   */
  hide(): void {
    this.animation = false;
    /* need to switch back and forth from determinate/indeterminate so the setInterval()
     * inside mat-progress-spinner stops and protractor doesnt timeout waiting to sync.
     */
    this._mode = LoadingMode.Determinate;
    // Check for changes for `OnPush` change detection
    /* little hack to reset the loader value and animation before removing it from DOM
     * else, the loader will appear with prev value when its registered again
     * and will do an animation going prev value to 0.
     */
    this.value = 0;
    // Check for changes for `OnPush` change detection
    this.changeDetectorRef.markForCheck();
  }

  /**
   * Calculate the proper diameter for the circle and set it
   */
  private setCircleDiameter(): void {
    // we set a default diameter of 100 since this is the default in material
    let diameter: number = X_MAT_CIRCLE_DIAMETER;
    // if height is provided, then we take that as diameter
    if (this.height) {
      diameter = this.height;
      // else if its not provided, then we take the host height
    } else if (this.height === undefined) {
      diameter = this.hostHeight();
    }

    // if the diameter is over X_MAT_CIRCLE_DIAMETER, we set X_MAT_CIRCLE_DIAMETER
    this.circleDiameter =
      !!diameter && diameter <= X_MAT_CIRCLE_DIAMETER ? Math.floor(diameter) : X_MAT_CIRCLE_DIAMETER;
  }

  /**
   * Sets mode of [XMatLoadingComponent] to LoadingMode.Determinate or LoadingMode.Indeterminate
   */
  set mode(mode: LoadingMode) {
    this.defaultMode = mode;
  }

  get mode(): LoadingMode {
    return this._mode;
  }

  /**
   * Sets value of [XMatLoadingComponent] if mode is 'LoadingMode.Determinate'
   */
  set value(value: number) {
    this._value = value;
    // Check for changes for `OnPush` change detection
    this.changeDetectorRef.markForCheck();
  }
  get value(): number {
    return this._value;
  }

  /**
   * Returns the host height of the loading component
   */
  private hostHeight(): number {
    if (<HTMLElement>this.elementRef.nativeElement) {
      return (<HTMLElement>this.elementRef.nativeElement).getBoundingClientRect().height;
    }
    return 0;
  }
}
