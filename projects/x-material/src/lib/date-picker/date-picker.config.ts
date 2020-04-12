import moment, { Moment } from 'moment';

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

export interface Ranges {
  [key: string]: [Moment | string, Moment | string];
}

/**
 *  defaultLocaleConfig
 */
export const defaultLocaleConfig: LocaleConfig = {
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

export const defaultRangesConfig: Ranges = {
  Today: [moment(), moment()],
  Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [
    moment()
      .subtract(1, 'month')
      .startOf('month'),
    moment()
      .subtract(1, 'month')
      .endOf('month'),
  ],
};
