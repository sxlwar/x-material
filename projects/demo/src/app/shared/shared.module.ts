import { XMatPasswordModule } from 'x-material/password';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule, XMatPasswordModule],
  exports: [CommonModule, XMatPasswordModule],
})
export class SharedModule {}
