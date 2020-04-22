import { NgModule } from '@angular/core';

import { XMatBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { XMatDatePickerModule } from './date-picker/date-picker.module';
import { XMatLoadingModule } from './loading/loading.module';
import { XMatMessageModule } from './message/message.module';
import { XMatPaginatorModule } from './paginator';
import { XMatPasswordModule } from './password/password.module';

@NgModule({
  exports: [
    XMatPasswordModule,
    XMatBreadcrumbModule,
    XMatMessageModule,
    XMatDatePickerModule,
    XMatPaginatorModule,
    XMatLoadingModule,
  ],
})
export class XMatModule {}
