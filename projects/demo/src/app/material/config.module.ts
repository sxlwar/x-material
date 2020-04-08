import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { BreadcrumbComponent } from './breadcrumb';
import { routes } from './config';
import { MessageComponent } from './message';
import { PasswordComponent } from './password';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule, RouterModule.forChild(routes)],
  declarations: [BreadcrumbComponent, MessageComponent, PasswordComponent],
})
export class ConfigModule {}
