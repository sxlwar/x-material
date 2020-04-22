import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingMode, LoadingType } from 'x-material/loading';
import { XMatLoadingService } from 'x-material/loading/loading.service';

import { Component } from '@angular/core';

@Component({
  selector: 'x-mat-app-example',
  templateUrl: './app.component.html',
})
export class AppComponent {
  overlayStarSyntax: boolean = false;

  loading: boolean = false;

  private _subject: BehaviorSubject<any> = new BehaviorSubject<any>({ name: 'I am here!' });

  observable$: Observable<any> = this._subject.asObservable();

  itemList: any[] = [
    { label: 'Light', value: true },
    { label: 'Console', value: false },
    { label: 'T.V.', value: true },
  ];

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
    this._subject = new BehaviorSubject<any>(undefined);
    this.observable$ = this._subject.asObservable();
    setTimeout(() => {
      this._subject.next({ name: 'I am here!' });
    }, 1000);
  }

  toggleDefaultFullscreenDemo(): void {
    this._loadingService.register();
    setTimeout(() => this._loadingService.resolve(), 1500);
  }

  toggleCustomFullscreenDemo(): void {
    this._loadingService.register('customFullscreenDemo');
    setTimeout(() => this._loadingService.resolve('customFullscreenDemo'), 1500);
  }
}
