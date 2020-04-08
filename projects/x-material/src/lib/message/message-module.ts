import { CommonModule } from '@angular/common';
import { NgModule, Type } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { XMatMessageComponent, XMatMessageContainerDirective } from './message';

const XMat_MESSAGE: Type<any>[] = [XMatMessageComponent, XMatMessageContainerDirective];

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: XMat_MESSAGE,
  exports: XMat_MESSAGE,
})
export class XMatMessageModule {}
