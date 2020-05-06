import {
    AfterViewInit, ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, HostListener,
    Input, Renderer2, TemplateRef, ViewChild, ViewContainerRef
} from '@angular/core';

import { xMatCollapseAnimation } from '../common/animations/collapse';

@Directive({
  // tslint:disable-next-line
  selector: '[XMatMessageContainer]',
})
export class XMatMessageContainerDirective {
  constructor(public viewContainer: ViewContainerRef) {}
}

@Component({
  selector: 'x-mat-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  animations: [xMatCollapseAnimation],
})
export class XMatMessageComponent implements AfterViewInit {
  @ViewChild(XMatMessageContainerDirective, { static: true }) _childElement: XMatMessageContainerDirective;

  // tslint:disable-next-line:no-any
  @ViewChild('tpl', { static: false }) _template: TemplateRef<any>;

  /**
   * label: string
   *
   * Sets the label of the message.
   */
  @Input() label: string;

  /**
   * subLabel?: string
   *
   * Sets the subLabel of the message.
   */
  @Input() subLabel: string;

  /**
   * icon?: string
   *
   * The icon to be displayed before the title.
   * Defaults to `info_outline` icon
   */
  @Input() icon = 'info_outline';

  /**
   * color?: primary | accent | warn
   *
   * Sets the color of the message.
   * Can also use any material color: purple | light-blue, etc.
   */
  @Input('color')
  set color(color: string) {
    this._renderer.removeClass(this._elementRef.nativeElement, 'mat-' + this._color);
    this._renderer.removeClass(this._elementRef.nativeElement, 'bgc-' + this._color + '-100');
    this._renderer.removeClass(this._elementRef.nativeElement, 'tc-' + this._color + '-700');

    if (color === 'primary' || color === 'accent' || color === 'warn') {
      this._renderer.addClass(this._elementRef.nativeElement, 'mat-' + color);
    } else {
      this._renderer.addClass(this._elementRef.nativeElement, 'bgc-' + color + '-100');
      this._renderer.addClass(this._elementRef.nativeElement, 'tc-' + color + '-700');
    }

    this._color = color;
    this._changeDetectorRef.markForCheck();
  }

  get color(): string {
    return this._color;
  }

  /**
   * Shows or hides the message depending on its value.
   * Defaults to 'true'.
   */
  @Input('opened') set opened(opened: boolean) {
    if (this._initialized) {
      if (opened) {
        this.open();
      } else {
        this.close();
      }
    } else {
      this._opened = opened;
    }
  }

  get opened(): boolean {
    return this._opened;
  }

  private _color: string;

  private _opened = true;

  private _hidden = false;

  private _animating = false;

  private _initialized = false;

  constructor(
    private _renderer: Renderer2,
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef
  ) {
    this._renderer.addClass(this._elementRef.nativeElement, 'x-mat-message');
  }

  /**
   * Detach element when close animation is finished to set animating state to false
   * hidden state to true and detach element from DOM
   */
  @HostListener('@xMatCollapse.done')
  animationDoneListener(): void {
    if (!this._opened) {
      this._hidden = true;
      this._detach();
    }
    this._animating = false;
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Initializes the component and attaches the content.
   */
  ngAfterViewInit(): void {
    Promise.resolve(undefined).then(() => {
      if (this._opened) {
        this._attach();
      }
      this._initialized = true;
    });
  }

  /**
   * Renders the message on screen
   * Validates if there is an animation currently and if its already opened
   */
  open(): void {
    if (!this._opened && !this._animating) {
      this._opened = true;
      this._attach();
      this._startAnimationState();
    }
  }

  /**
   * Removes the message content from screen.
   * Validates if there is an animation currently and if its already closed
   */
  close(): void {
    if (this._opened && !this._animating) {
      this._opened = false;
      this._startAnimationState();
    }
  }

  /**
   * Toggles between open and close depending on state.
   */
  toggle(): void {
    if (this._opened) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Binding host to xMatCollapse animation
   */
  // tslint:disable-next-line:no-any
  @HostBinding('@xMatCollapse') get collapsedAnimation(): any {
    return { value: !this._opened, duration: 100 };
  }

  /**
   * Binding host to display style when hidden
   */
  @HostBinding('style.display')
  get hidden(): string {
    return this._hidden ? 'none' : undefined;
  }

  /**
   * Method to set the state before starting an animation
   */
  private _startAnimationState(): void {
    this._animating = true;
    this._hidden = false;
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Method to attach template to DOM
   */
  private _attach(): void {
    this._childElement.viewContainer.createEmbeddedView(this._template);
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Method to detach template from DOM
   */
  private _detach(): void {
    this._childElement.viewContainer.clear();
    this._changeDetectorRef.markForCheck();
  }
}
