import { NgModule } from '@angular/core';

import { XMatBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { XMatDateRangePickerModule } from './date-range-picker/date-range-picker.module';
import { XMatMessageModule } from './message/message.module';
import { XMatPasswordModule } from './password/password.module';

@NgModule({
  exports: [XMatPasswordModule, XMatBreadcrumbModule, XMatMessageModule, XMatDateRangePickerModule],
})
export class XMatModule {}
