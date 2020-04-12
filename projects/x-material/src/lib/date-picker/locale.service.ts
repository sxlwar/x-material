import { Inject, Injectable } from '@angular/core';

import { defaultLocaleConfig, LOCALE_CONFIG, LocaleConfig } from './date-picker.config';

@Injectable()
export class LocaleService {
  constructor(@Inject(LOCALE_CONFIG) private _config: LocaleConfig) {}

  get config() {
    if (!this._config) {
      return defaultLocaleConfig;
    }

    return { ...defaultLocaleConfig, ...this._config };
  }
}
