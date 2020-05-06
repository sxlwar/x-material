import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { LoadingMode, LoadingStrategy, LoadingType } from './loading.component';
import { ILoadingRef } from './loading.factory';
import { XMatLoadingService } from './loading.service';

/**
 * Context class for variable reference
 */
export class XMatLoadingContext {
  // tslint:disable-next-line:no-any
  $implicit: any = undefined;
  // tslint:disable-next-line:no-any
  xMatLoading: any = undefined;
}

// Constant for generation of the id for the next component
let X_MAT_LOADING_NEXT_ID = 0;

@Directive({
  // tslint:disable-next-line
  selector: '[xMatLoading]',
})
export class XMatLoadingDirective implements OnInit, OnDestroy {
  /**
   * xMatLoadingColor?: "primary" | "accent" | "warn"
   * Sets the theme color of the loading component. Defaults to "primary"
   */
  @Input('xMatLoadingColor') color: 'primary' | 'accent' | 'warn' = 'primary';

  /**
   * xMatLoading: string
   * Name reference of the loading mask, used to register/resolve requests to the mask.
   */
  @Input('xMatLoading')
  set name(name: string) {
    if (!this._name && name) {
      this._name = name;
    }
  }

  /**
   * xMatLoadingUntil?: any
   * If its null, undefined or false it will be used to register requests to the mask.
   * Else if its any value that can be resolved as true, it will resolve the mask.
   * [name] is optional when using [until], but can still be used to register/resolve it manually.
   */
  // tslint:disable-next-line:no-any
  @Input('xMatLoadingUntil') set until(until: any) {
    if (!this._name) {
      this._name = 'x-mat-loading-until-' + X_MAT_LOADING_NEXT_ID++;
    }

    this._context.$implicit = this._context.xMatLoading = until;

    if (!until) {
      this._loadingService.register(this._name);
    } else {
      this._loadingService.resolveAll(this._name);
    }
  }

  /**
   * xMatLoadingType?: LoadingType or ['linear' | 'circular']
   * Sets the type of loading mask depending on value.
   * Defaults to [LoadingType.Circular | 'circular'].
   */
  @Input('xMatLoadingType') set type(type: LoadingType) {
    this._type = type === LoadingType.Linear ? LoadingType.Linear : LoadingType.Circular;
  }

  /**
   * xMatLoadingMode?: LoadingMode or ['determinate' | 'indeterminate']
   * Sets the mode of loading mask depending on value.
   * Defaults to [LoadingMode.Indeterminate | 'indeterminate'].
   */
  @Input('xMatLoadingMode')
  set mode(mode: LoadingMode) {
    this._mode = mode === LoadingMode.Determinate ? LoadingMode.Determinate : LoadingMode.Indeterminate;
  }

  /**
   * xMatLoadingStrategy?: LoadingStrategy or ['replace' | 'overlay']
   * Sets the strategy of loading mask depending on value.
   * Defaults to [LoadingMode.Replace | 'replace'].
   */
  @Input('xMatLoadingStrategy')
  set strategy(strategy: LoadingStrategy) {
    this._strategy = strategy === LoadingStrategy.Overlay ? LoadingStrategy.Overlay : LoadingStrategy.Replace;
  }

  private _context: XMatLoadingContext = new XMatLoadingContext();

  private _type: LoadingType;

  private _mode: LoadingMode;

  private _strategy: LoadingStrategy;

  private _name: string;

  private _loadingRef: ILoadingRef;

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private _templateRef: TemplateRef<XMatLoadingContext>,
    private _loadingService: XMatLoadingService
  ) {}

  /**
   * Registers component in the DOM, so it will be available when calling resolve/register.
   */
  ngOnInit(): void {
    this._registerComponent();
  }

  /**
   * Remove component when directive is destroyed.
   */
  ngOnDestroy(): void {
    this._loadingService.removeComponent(this._name);
    this._loadingRef = undefined;
  }

  /**
   * Creates [XMatLoadingComponent] and attaches it to this directive's [ViewContainerRef].
   * Passes this directive's [TemplateRef] to modify DOM depending on loading `strategy`.
   */
  private _registerComponent(): void {
    if (!this._name) {
      throw new Error('Name is needed to register loading directive');
    }
    // Check if `XMatLoadingComponent` has been created before trying to add one again.
    // There is a weird edge case when using `[routerLinkActive]` that calls the `ngOnInit` twice in a row
    if (!this._loadingRef) {
      this._loadingRef = this._loadingService.createComponent(
        {
          name: this._name,
          type: this._type,
          mode: this._mode,
          color: this.color,
          strategy: this._strategy,
        },
        this._viewContainerRef,
        this._templateRef,
        this._context
      );
    }
  }
}
