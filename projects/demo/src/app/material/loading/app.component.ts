import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingMode, LoadingType, XMatLoadingService } from 'x-material/loading';

import { Component } from '@angular/core';

@Component({
  selector: 'x-mat-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  overlayStarSyntax = false;

  loading = false;

  itemList: { label: string; value: boolean }[] = [
    { label: 'Light', value: true },
    { label: 'Console', value: false },
    { label: 'T.V.', value: true },
  ];

  // tslint:disable-next-line:no-any
  private _subject: BehaviorSubject<any> = new BehaviorSubject<any>({ name: 'I am here!' });

  // tslint:disable-next-line
  observable$: Observable<any> = this._subject.asObservable();

  constructor(private _loadingService: XMatLoadingService) {
    this._loadingService.create({
      name: 'customFullscreenDemo',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'accent',
    });
  }

  toggleOverlayStarSyntax(): void {
    this.overlayStarSyntax = !this.overlayStarSyntax;
    if (this.overlayStarSyntax) {
      this._loadingService.register('overlayStarSyntax');
    } else {
      this._loadingService.resolve('overlayStarSyntax');
    }
  }

  toggle(): void {
    this.loading = !this.loading;
  }

  toggleUntil(): void {
    // tslint:disable-next-line:no-any
    this._subject = new BehaviorSubject<any>(undefined);
    this.observable$ = this._subject.asObservable();
    setTimeout(() => {
      this._subject.next({ name: 'I am here!' });
      // tslint:disable-next-line:no-magic-numbers
    }, 1000);
  }

  toggleDefaultFullscreenDemo(): void {
    this._loadingService.register();
    // tslint:disable-next-line:no-magic-numbers
    setTimeout(() => this._loadingService.resolve(), 1500);
  }

  toggleCustomFullscreenDemo(): void {
    this._loadingService.register('customFullscreenDemo');
    // tslint:disable-next-line:no-magic-numbers
    setTimeout(() => this._loadingService.resolve('customFullscreenDemo'), 1500);
  }
}
