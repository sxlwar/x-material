import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';
import { PasswordComponent} from './password';
import { XMaterialModule } from 'x-material';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    XMaterialModule,
    RouterModule.forChild([
      {
        path: 'password',
        component: PasswordComponent,
      },
    ]),
  ],
  declarations: [
    PasswordComponent,
  ],
})
export class ConfigModule {}
