import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { BreadcrumbComponent } from './breadcrumb';
import { PasswordComponent } from './password';

@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'password',
        component: PasswordComponent,
      },
      {
        path: 'breadcrumb',
        component: BreadcrumbComponent,
      },
    ]),
  ],
  declarations: [BreadcrumbComponent, PasswordComponent],
})
export class ConfigModule {}
