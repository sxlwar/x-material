import { XMatBreadcrumbModule } from 'x-material/breadcrumb';
import { XMatLoadingModule } from 'x-material/loading';
import { XMatMessageModule } from 'x-material/message';
import { XMatPaginatorModule } from 'x-material/paginator';
import { XMatPasswordModule } from 'x-material/password';

import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

// tslint:disable-next-line:no-any
const config: Type<any>[] = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  ReactiveFormsModule,
  XMatBreadcrumbModule,
  XMatLoadingModule,
  XMatMessageModule,
  XMatPaginatorModule,
  XMatPasswordModule,
];

@NgModule({
  imports: [...config],
  exports: [...config],
})
export class SharedModule {}
