import { Inject, Injectable } from '@angular/core';

import { DefaultLocaleConfig, LOCALE_CONFIG, LocaleConfig } from './date-picker.config';

@Injectable()
export class LocaleService {
  constructor(@Inject(LOCALE_CONFIG) private _config: LocaleConfig) {}

  get config() {
    if (!this._config) {
      return DefaultLocaleConfig;
    }

    return { ...DefaultLocaleConfig, ...this._config };
  }
}
