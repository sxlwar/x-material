import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { PasswordComponent } from './password.component';

@NgModule({
  imports: [MatInputModule, MatIconModule],
  declarations: [PasswordComponent],
  exports: [PasswordComponent],
})
export class XMatPasswordModule {}
