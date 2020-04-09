import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { XMatDateRangePickerComponent } from './date-range-picker.component';
import { LOCALE_CONFIG, LocaleConfig } from './date-range-picker.config';
import { XMatDateRangePickerDirective } from './date-range-picker.directive';
import { LocaleService } from './locale.service';

@NgModule({
  declarations: [XMatDateRangePickerComponent, XMatDateRangePickerDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
  exports: [XMatDateRangePickerComponent, XMatDateRangePickerDirective],
  entryComponents: [XMatDateRangePickerComponent],
})
export class XMatDateRangePickerModule {
  constructor() {}
  static forRoot(config: LocaleConfig = {}): ModuleWithProviders<XMatDateRangePickerModule> {
    return {
      ngModule: XMatDateRangePickerModule,
      providers: [
        { provide: LOCALE_CONFIG, useValue: config },
        { provide: LocaleService, useClass: LocaleService, deps: [LOCALE_CONFIG] },
      ],
    };
  }
}
