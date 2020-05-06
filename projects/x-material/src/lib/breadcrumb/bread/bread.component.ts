import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding
} from '@angular/core';

@Component({
  selector: 'x-mat-bread, a[x-mat-bread]',
  styleUrls: ['./bread.component.scss'],
  templateUrl: './bread.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadComponent implements AfterViewInit {
  private _displayCrumb = true;

  private _width = 0;

  private _displayIcon = true;

  private _separatorIcon = 'chevron_right';

  // Sets the icon url shown between breadcrumbs. Defaults to 'chevron_right'
  get separatorIcon(): string {
    return this._separatorIcon;
  }

  set separatorIcon(separatorIcon: string) {
    this._separatorIcon = separatorIcon;
    setTimeout(() => {
      this._changeDetectorRef.markForCheck();
    });
  }

  // Should show the right chevron or not before the label
  get displayIcon(): boolean {
    return this._displayIcon;
  }

  set displayIcon(displayIcon: boolean) {
    this._displayIcon = displayIcon;
    setTimeout(() => {
      this._changeDetectorRef.markForCheck();
    });
  }

  get displayCrumb(): boolean {
    return this._displayCrumb;
  }

  /**
   * Whether to display the crumb or not
   */
  set displayCrumb(shouldDisplay: boolean) {
    this._displayCrumb = shouldDisplay;
    setTimeout(() => {
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * Width of the DOM element of the crumb
   */
  get width(): number {
    return this._width;
  }

  /**
   * Gets the display style of the crumb
   */
  @HostBinding('style.display')
  get displayBinding(): string {
    // Set the display to none on the component, just in case the end user is hiding
    // and showing them instead of the component doing itself for reasons like responsive
    return this._displayCrumb ? undefined : 'none';
  }

  @HostBinding('class')
  get className(): string {
    return 'mat-button x-mat-bread';
  }

  constructor(private _elementRef: ElementRef, private _changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    // set the width from the actual rendered DOM element
    setTimeout(() => {
      this._width = (<HTMLElement>this._elementRef.nativeElement).getBoundingClientRect().width;
      this._changeDetectorRef.markForCheck();
    });
  }

  /**
   * Stop click propagation when clicking on icon
   */
  _handleIconClick(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
  }
}
