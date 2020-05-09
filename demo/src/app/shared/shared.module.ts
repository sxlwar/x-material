import {
  XMatBreadcrumbModule,
  XMatLoadingModule,
  XMatMessageModule,
  XMatPaginatorModule,
  XMatPasswordModule,
} from 'x-material';

import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
