import { XMatDatePickerModule } from 'x-material/date-picker';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { BreadcrumbComponent } from './breadcrumb';
import { routes } from './config';
import { DatePickerComponent } from './date-picker';
import { MessageComponent } from './message';
import { PaginatorComponent } from './paginator';
import { PasswordComponent } from './password';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    ReactiveFormsModule,
    XMatDatePickerModule.forRoot({
      applyLabel: 'OK',
      firstDay: 3,
    }),
  ],
  declarations: [BreadcrumbComponent, DatePickerComponent, MessageComponent, PaginatorComponent, PasswordComponent],
})
export class ConfigModule {}
