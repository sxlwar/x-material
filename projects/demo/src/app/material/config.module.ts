import { XMatDatePickerModule } from 'x-material/date-picker';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { BreadcrumbComponent } from './breadcrumb';
import { routes } from './config';
import { DatePickerComponent } from './date-picker';
import { MessageComponent } from './message';
import { PasswordComponent } from './password';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),

    XMatDatePickerModule.forRoot({
      applyLabel: 'OK',
      firstDay: 3,
    }),
  ],
  declarations: [BreadcrumbComponent, MessageComponent, PasswordComponent, DatePickerComponent],
})
export class ConfigModule {}
