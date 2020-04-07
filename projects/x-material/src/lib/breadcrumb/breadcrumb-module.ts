import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { BreadComponent } from './bread';
import { BreadcrumbComponent } from './breadcrumb';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [BreadcrumbComponent, BreadComponent],
  exports: [BreadcrumbComponent, BreadComponent],
})
export class XMatBreadcrumbModule {}
