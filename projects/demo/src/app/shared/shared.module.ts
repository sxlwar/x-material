import { XMatBreadcrumbModule } from 'x-material/breadcrumb';
import { XMatPasswordModule } from 'x-material/password';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, XMatPasswordModule, XMatBreadcrumbModule],
  exports: [CommonModule, XMatPasswordModule, XMatBreadcrumbModule],
})
export class SharedModule {}
