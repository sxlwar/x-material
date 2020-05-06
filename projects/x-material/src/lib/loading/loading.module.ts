import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { XMatLoadingComponent } from './loading.component';
import { XMatLoadingDirective } from './loading.directive';
import { LOADING_FACTORY_PROVIDER } from './loading.factory';
import { LOADING_PROVIDER } from './loading.service';

// tslint:disable-next-line:no-any
const X_MAT_LOADING: Type<any>[] = [XMatLoadingComponent, XMatLoadingDirective];

// tslint:disable-next-line:no-any
const X_MAT_LOADING_ENTRY_COMPONENTS: Type<any>[] = [XMatLoadingComponent];

@NgModule({
  imports: [CommonModule, MatProgressBarModule, MatProgressSpinnerModule, OverlayModule, PortalModule],
  declarations: [X_MAT_LOADING],
  exports: [X_MAT_LOADING],
  providers: [LOADING_FACTORY_PROVIDER, LOADING_PROVIDER],
  entryComponents: [X_MAT_LOADING_ENTRY_COMPONENTS],
})
export class XMatLoadingModule {}
