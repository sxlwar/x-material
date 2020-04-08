import { Routes } from '@angular/router';

import { BreadcrumbComponent } from '../breadcrumb';
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
];
