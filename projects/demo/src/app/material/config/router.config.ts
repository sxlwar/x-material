import { Routes } from '@angular/router';

import { BreadcrumbComponent } from '../breadcrumb';
import { DateRangePickerComponent } from '../date-range-picker';
import { MessageComponent } from '../message';
import { PasswordComponent } from '../password';

export const routes: Routes = [
  {
    path: 'password',
    component: PasswordComponent,
  },
  {
    path: 'breadcrumb',
    component: BreadcrumbComponent,
  },
  {
    path: 'message',
    component: MessageComponent,
  },
  {
    path: 'date-range-picker',
    component: DateRangePickerComponent,
  },
];
