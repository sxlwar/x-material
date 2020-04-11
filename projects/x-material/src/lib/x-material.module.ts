import { NgModule } from '@angular/core';

import { XMatBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { XMatDatePickerModule } from './date-picker/date-picker.module';
import { XMatMessageModule } from './message/message.module';
import { XMatPasswordModule } from './password/password.module';

@NgModule({
  exports: [XMatPasswordModule, XMatBreadcrumbModule, XMatMessageModule, XMatDatePickerModule],
})
export class XMatModule {}
