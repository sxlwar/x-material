import { XMatBreadcrumbModule } from 'x-material/breadcrumb';
import { XMatMessageModule } from 'x-material/message';
import { XMatPasswordModule } from 'x-material/password';

import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

const config: Type<any>[] = [
  CommonModule,
  XMatPasswordModule,
  XMatBreadcrumbModule,
  XMatMessageModule,
  MatIconModule,
  MatButtonModule,
];

@NgModule({
  imports: [...config],
  exports: [...config],
})
export class SharedModule {}
