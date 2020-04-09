import moment from 'moment';
import {
    XMatDateRangePickerComponent, XMatDateRangePickerDirective
} from 'x-material/date-range-picker';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'x-mat-app-example',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  selected: { startDate: moment.Moment; endDate: moment.Moment };

  @ViewChild(XMatDateRangePickerDirective, { static: true }) pickerDirective: XMatDateRangePickerDirective;

  inlineDate: any;

  inlineDateTime: any;

  picker: XMatDateRangePickerComponent;

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
