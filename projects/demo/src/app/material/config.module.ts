import { XMatDatePickerModule } from 'x-material/date-picker';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { BreadcrumbComponent } from './breadcrumb';
import { routes } from './config';
import { DatePickerComponent } from './date-picker';
import { LoadingComponent } from './loading';
import { MessageComponent } from './message';
import { PaginatorComponent } from './paginator';
import { PasswordComponent } from './password';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatSelectModule,
    MatListModule,
    ReactiveFormsModule,
    XMatDatePickerModule.forRoot({
      applyLabel: 'OK',
      firstDay: 3,
    }),
  ],
  declarations: [
    BreadcrumbComponent,
    DatePickerComponent,
    LoadingComponent,
    MessageComponent,
    PaginatorComponent,
    PasswordComponent,
  ],
})
export class ConfigModule {}
