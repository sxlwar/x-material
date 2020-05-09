import moment, { Moment } from 'moment';
import { LocaleConfig, XMatDatePickerComponent, XMatDatePickerDirective } from 'x-material';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'x-mat-app-example',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  selected: { startDate: Moment; endDate: Moment };

  local: LocaleConfig = {
    applyLabel: '确定',
    cancelLabel: '取消',
    daysOfWeek: ['一', '二', '三', '四', '五', '六', '日'],
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    firstDay: 7,
  };

  singleSelected = moment();

  @ViewChild(XMatDatePickerDirective, { static: true }) pickerDirective: XMatDatePickerDirective;

  // tslint:disable-next-line:no-any
  inlineDate: any;

  // tslint:disable-next-line:no-any
  inlineDateTime: any;

  picker: XMatDatePickerComponent;

  constructor() {
    this.selected = {
      startDate: moment('2015-11-18T00:00Z'),
      endDate: moment('2015-11-26T00:00Z'),
    };
  }

  ngOnInit() {
    this.picker = this.pickerDirective.picker;
  }

  ngModelChange(e) {
    console.log(e);
  }

  change(e) {
    console.log(e);
  }

  selectedDate(e) {
    this.inlineDate = e;
  }

  selectedDateTime(e) {
    this.inlineDateTime = e;
  }

  open(e) {
    this.pickerDirective.open(e);
  }

  clear(e) {
    // this.picker.clear(); // we can do
    this.selected = null; // now we can do
  }
}
