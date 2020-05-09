import { Routes } from '@angular/router';

import { BreadcrumbComponent } from '../breadcrumb';
import { DatePickerComponent } from '../date-picker';
import { LoadingComponent } from '../loading';
import { MessageComponent } from '../message';
import { PaginatorComponent } from '../paginator';
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
    path: 'date-picker',
    component: DatePickerComponent,
  },
  {
    path: 'paginator',
    component: PaginatorComponent,
  },
  {
    path: 'loading',
    component: LoadingComponent,
  },
];
