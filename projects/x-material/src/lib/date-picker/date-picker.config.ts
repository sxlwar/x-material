import moment from 'moment';

import { InjectionToken } from '@angular/core';

export const LOCALE_CONFIG = new InjectionToken<LocaleConfig>('dateRangePicker.config');

/**
 *  LocaleConfig Interface
 */
export interface LocaleConfig {
  applyLabel?: string;
  cancelLabel?: string;
  clearLabel?: string;
  customRangeLabel?: string;
  daysOfWeek?: string[];
  direction?: string;
  displayFormat?: string;
  firstDay?: number;
  format?: string;
  monthNames?: string[];
  separator?: string;
  weekLabel?: string;
}

/**
 *  DefaultLocaleConfig
 */
export const DefaultLocaleConfig: LocaleConfig = {
  applyLabel: 'Apply',
  cancelLabel: 'Cancel',
  clearLabel: 'Clear',
  customRangeLabel: 'Custom range',
  daysOfWeek: moment.weekdaysMin(),
  direction: 'ltr',
  firstDay: moment.localeData().firstDayOfWeek(),
  monthNames: moment.monthsShort(),
  separator: ' - ',
  weekLabel: 'W',
};
