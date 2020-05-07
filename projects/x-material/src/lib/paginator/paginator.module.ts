import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { XMatPaginatorComponent } from './paginator.component';

@NgModule({
  imports: [MatInputModule, MatIconModule, CommonModule, MatButtonModule],
  declarations: [XMatPaginatorComponent],
  exports: [XMatPaginatorComponent],
})
export class XMatPaginatorModule {}
