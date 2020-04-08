import { NgModule } from '@angular/core';

import { XMatBreadcrumbModule } from './breadcrumb';
import { XMatMessageModule } from './message';
import { XMatPasswordModule } from './password/password-module';

@NgModule({
  exports: [XMatPasswordModule, XMatBreadcrumbModule, XMatMessageModule],
})
export class XMatModule {}
