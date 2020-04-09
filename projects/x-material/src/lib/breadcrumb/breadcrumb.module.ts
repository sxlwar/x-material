import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

import { BreadComponent } from './bread/bread.component';
import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';

export function breadcrumbServiceFactory(router: Router) {
  return new BreadcrumbService(router);
}

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [BreadcrumbComponent, BreadComponent],
  providers: [{ provide: BreadcrumbService, useFactory: breadcrumbServiceFactory, deps: [Router] }],
  exports: [BreadcrumbComponent, BreadComponent],
})
export class XMatBreadcrumbModule {}
