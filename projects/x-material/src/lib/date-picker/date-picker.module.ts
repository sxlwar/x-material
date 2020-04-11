import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { XMatDatePickerComponent } from './date-picker.component';
import { LOCALE_CONFIG, LocaleConfig } from './date-picker.config';
import { XMatDatePickerDirective } from './date-picker.directive';
import { LocaleService } from './locale.service';

@NgModule({
  declarations: [XMatDatePickerComponent, XMatDatePickerDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  providers: [],
  exports: [XMatDatePickerComponent, XMatDatePickerDirective],
  entryComponents: [XMatDatePickerComponent],
})
export class XMatDatePickerModule {
  constructor() {}
  static forRoot(config: LocaleConfig = {}): ModuleWithProviders<XMatDatePickerModule> {
    return {
      ngModule: XMatDatePickerModule,
      providers: [
        { provide: LOCALE_CONFIG, useValue: config },
        { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG] },
      ],
    };
  }
}
