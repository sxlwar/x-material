import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { PasswordComponent } from './password';

@NgModule({
  imports: [MatInputModule, MatIconModule],
  declarations: [PasswordComponent],
  exports: [PasswordComponent],
})
export class XMatPasswordModule {}
