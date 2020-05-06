import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { XMatMessageComponent, XMatMessageContainerDirective } from './message.component';

// tslint:disable-next-line:no-any
const X_MAT_MESSAGE: Type<any>[] = [XMatMessageComponent, XMatMessageContainerDirective];

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: X_MAT_MESSAGE,
  exports: X_MAT_MESSAGE,
})
export class XMatMessageModule {}
