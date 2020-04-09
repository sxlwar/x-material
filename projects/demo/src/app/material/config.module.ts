import { XMatDateRangePickerModule } from 'x-material/date-range-picker';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { BreadcrumbComponent } from './breadcrumb';
import { routes } from './config';
import { DateRangePickerComponent } from './date-range-picker';
import { MessageComponent } from './message';
import { PasswordComponent } from './password';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),

    XMatDateRangePickerModule.forRoot({
      applyLabel: 'OK',
      firstDay: 3,
    }),
  ],
  declarations: [BreadcrumbComponent, MessageComponent, PasswordComponent, DateRangePickerComponent],
})
export class ConfigModule {}
