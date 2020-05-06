/* tslint:disable:cyclomatic-complexity no-magic-numbers */
import moment, { Moment } from 'moment';

import {
    ChangeDetectorRef, ComponentFactoryResolver, Directive, DoCheck, ElementRef, EventEmitter,
    forwardRef, HostListener, Input, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, Output,
    Renderer2, SimpleChanges, ViewContainerRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { XMatDatePickerComponent, XMatSelectedDate } from './date-picker.component';
import { LocaleConfig, Ranges } from './date-picker.config';
import { LocaleService } from './locale.service';

type ModelValue = string | { [key: string]: Moment };

@Directive({
  // tslint:disable-next-line
  selector: 'input[xMatDatePicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XMatDatePickerDirective),
      multi: true,
    },
  ],
})
export class XMatDatePickerDirective implements OnInit, OnChanges, DoCheck {
  @Input() minDate: Moment;

  @Input() maxDate: Moment;

  @Input() autoApply: boolean;

  @Input() showCustomRangeLabel: boolean;

  @Input() linkedCalendars: boolean;

  @Input() dateLimit: number = null;

  @Input() isRangePicker: boolean;

  @Input() showWeekNumbers: boolean;

  @Input() showISOWeekNumbers: boolean;

  @Input() showDropdown: boolean;

  @Input() isInvalidDate: (date: Moment) => boolean;

  @Input() isCustomDate: (date: Moment) => false | string | string[];

  @Input() addTooltipForDate: (date: Moment) => string;

  @Input() showClearButton: boolean;

  /**
   * Set predefined date ranges the user can select from.
   * Each key is the label for the range, and its value an array with two dates representing the bounds of the range
   *
   * @example
   * ```ts
   * const ranges: Ranges = {
   *  'Today': [moment(), moment()],
   *  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
   *  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
   *  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
   *  'This Month': [moment().startOf('month'), moment().endOf('month')],
   *  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
   * }
   * ```
   */
  @Input() ranges: Ranges | true;

  /**
   * set to true if you want to display the ranges with the calendar.
   * Available only if the ranges is set.
   */
  @Input() alwaysShowCalendars: boolean;

  /**
   * set to true if you want the calendar won't be closed after choosing a range
   * Available only if the ranges is set.
   */
  @Input() keepCalendarOpeningWithRange: boolean;

  /**
   * set to true if you want to display the range label on input
   * Available only if the ranges is set.
   */
  @Input() showRangeLabelOnInput: boolean;

  /**
   * set to true if you want to allow selection range from end date first
   * Available only if the ranges is set.
   */
  @Input() customRangeDirection: boolean;

  /**
   * set to true if you want to lock start date and change only the end date
   * Available only if the ranges is set.
   */
  @Input() lockStartDate = false;

  /**
   * position the calendar to the up or down form the input element;
   */
  @Input() positionY: 'up' | 'down' = 'down';

  /**
   * position the calendar form the input element;
   */
  @Input() positionX: 'left' | 'center' | 'right' | 'auto' = 'auto';

  @Input() lastMonthDayClass: string;

  @Input() firstMonthDayClass: string;

  @Input() emptyWeekRowClass: string;

  @Input() firstDayOfNextMonthClass: string;

  @Input() lastDayOfPreviousMonthClass: string;

  @Input() showCancel = false;

  @Input() timePicker = false;

  @Input() timePicker24Hour = false;

  @Input() timePickerIncrement = 1;

  @Input() timePickerSeconds = false;

  @Input() closeOnAutoApply = true;

  /**
   * local configurations;
   */
  @Input() set locale(value: LocaleConfig) {
    this._locale = { ...this._localeService.config, ...value };
  }

  get locale(): LocaleConfig {
    return this._locale;
  }

  /**
   * the start key you want for the start value; default: startDate
   * the model would be { [startKey]: Moment, [endKey]: Moment }
   */
  @Input() set startKey(value: string) {
    this._startKey = value !== null ? value : 'startDate';
  }

  /**
   * the end key you want for the end value; default: endDate
   * the model would be { [startKey]: Moment, [endKey]: Moment }
   */
  @Input() set endKey(value: string) {
    this._endKey = value !== null ? value : 'endDate';
  }

  // tslint:disable-next-line
  @Output('change') onChange: EventEmitter<ModelValue> = new EventEmitter();

  /**
   * Fired when clicked on range, and send an object with range label and dates value
   */
  // tslint:disable-next-line
  @Output('rangeClicked') rangeClicked: EventEmitter<{ label: string; dates: [Moment, Moment] }> = new EventEmitter();

  /**
   * Fires when the date model is updated, like applying (if you have activated the apply button),
   * or when selecting a range or date without the apply button, and sends an object containing start and end date,
   * eg: { startDate: Moment, endDate: Moment }
   */
  // tslint:disable-next-line
  @Output('datesUpdated') datesUpdated: EventEmitter<Omit<XMatSelectedDate, 'chosenLabel'>> = new EventEmitter();

  @Output() startDateChanged: EventEmitter<Pick<XMatSelectedDate, 'startDate'>> = new EventEmitter();

  @Output() endDateChanged: EventEmitter<Pick<XMatSelectedDate, 'endDate'>> = new EventEmitter();

  picker: XMatDatePickerComponent;

  _locale: LocaleConfig = {};

  notForChangesProperty: Array<string> = ['locale', 'endKey', 'startKey'];

  get value() {
    return this._value || null;
  }

  set value(val) {
    this._value = val;
    this._onChange(val);
    this._changeDetectorRef.markForCheck();
  }

  private _onChange = Function.prototype;

  private _onTouched = Function.prototype;

  private _value: ModelValue;

  // tslint:disable-next-line:no-any
  private localeDiffer: KeyValueDiffer<string, any>;

  private _endKey = 'endDate';

  private _startKey = 'startDate';

  constructor(
    public viewContainerRef: ViewContainerRef,
    public _changeDetectorRef: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _el: ElementRef,
    private _renderer: Renderer2,
    private differs: KeyValueDiffers,
    private _localeService: LocaleService,
    private elementRef: ElementRef
  ) {
    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(XMatDatePickerComponent);
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);

    this.picker = <XMatDatePickerComponent>componentRef.instance;
    this.picker.inline = false; // set inline to false for all directive usage
  }

  ngOnInit() {
    this.picker.startDateChanged.asObservable().subscribe((itemChanged: Pick<XMatSelectedDate, 'startDate'>) => {
      this.startDateChanged.emit(itemChanged);
    });

    this.picker.endDateChanged.asObservable().subscribe((itemChanged: Pick<XMatSelectedDate, 'endDate'>) => {
      this.endDateChanged.emit(itemChanged);
    });

    this.picker.rangeClicked.asObservable().subscribe((range: { label: string; dates: [Moment, Moment] }) => {
      this.rangeClicked.emit(range);
    });

    this.picker.datesUpdated.asObservable().subscribe((range: Omit<XMatSelectedDate, 'chosenLabel'>) => {
      this.datesUpdated.emit(range);
    });

    this.picker.selectedDate.asObservable().subscribe((change: XMatSelectedDate) => {
      if (change) {
        const value = {};

        value[this._startKey] = change.startDate;
        value[this._endKey] = change.endDate;
        this.value = value;
        this.onChange.emit(value);

        if (typeof change.chosenLabel === 'string') {
          this._el.nativeElement.value = change.chosenLabel;
        }
      }
    });

    this.picker.firstMonthDayClass = this.firstMonthDayClass;
    this.picker.lastMonthDayClass = this.lastMonthDayClass;
    this.picker.emptyWeekRowClass = this.emptyWeekRowClass;
    this.picker.firstDayOfNextMonthClass = this.firstDayOfNextMonthClass;
    this.picker.lastDayOfPreviousMonthClass = this.lastDayOfPreviousMonthClass;
    this.picker.positionY = this.positionY;
    this.picker.positionX = this.positionX;
    this.localeDiffer = this.differs.find(this.locale).create();
    this.picker.closeOnAutoApply = this.closeOnAutoApply;
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const change in changes) {
      if (changes.hasOwnProperty(change)) {
        if (this.notForChangesProperty.indexOf(change) === -1) {
          this.picker[change] = changes[change].currentValue;
        }
      }
    }
  }

  ngDoCheck() {
    if (this.localeDiffer) {
      const changes = this.localeDiffer.diff(this.locale);

      if (changes) {
        this.picker.updateLocale(this.locale);
      }
    }
  }

  onBlur() {
    this._onTouched();
  }

  /**
   * Open datepicker from outside
   * It is possible to open datepicker from outside.
   * You should create an input with attached datepicker directive and a button with "x-mat-date-picker-action"
   * class (to prevent triggering of clickOutside).
   *
   * @example
   * ```html
   * <input
   *  xMatDatePicker
   *  [closeOnAutoApply]="true"
   *  [autoApply]="true"
   *  [isRangePicker]="true"
   *  [linkedCalendars]="true"
   *  [(ngModel)]="selected"
   *  (datesUpdated)="datesUpdated($event)"
   *  class="datepicker-calendar-icon" />
   *
   *  <a class="x-mat-date-picker-action" (click)="openDatepicker()">
   *    Open
   *  </a>
   * ```
   *
   * ```ts
   * @ViewChild(XMatDatePickerDirective, { static: false }) pickerDirective: XMatDatePickerDirective;
   * openDatepicker() {
   *   this.pickerDirective.open()
   * }
   * ```
   */
  open(event?: Event) {
    this.picker.show(event);
    setTimeout(() => {
      this.setPosition();
    });
  }

  hide(e?: Event) {
    this.picker.hide(e);
  }

  toggle(e?: Event) {
    if (this.picker.isShown) {
      this.hide(e);
    } else {
      this.open(e);
    }
  }

  clear() {
    this.picker.clear();
  }

  writeValue(value: ModelValue) {
    this.setValue(value);
  }

  // tslint:disable-next-line:no-any
  registerOnChange(fn: (...args: any[]) => any) {
    this._onChange = fn;
  }

  // tslint:disable-next-line:no-any
  registerOnTouched(fn: (...args: any[]) => any) {
    this._onTouched = fn;
  }

  /**
   * Set position of the calendar
   */
  setPosition(): void {
    let style: { top: string; left: string; right: string };
    let containerTop: string;
    const container = this.picker.pickerContainer.nativeElement;
    const element = this._el.nativeElement;

    containerTop =
      this.positionY && this.positionY === 'up' ? element.offsetTop - container.clientHeight + 'px' : 'auto';

    // tslint:disable-next-line:prefer-conditional-expression
    if (this.positionX === 'right') {
      style = {
        top: containerTop,
        left: element.offsetLeft - container.clientWidth + element.clientWidth + 'px',
        right: 'auto',
      };
    } else if (this.positionX === 'center') {
      style = {
        top: containerTop,
        left: element.offsetLeft + element.clientWidth / 2 - container.clientWidth / 2 + 'px',
        right: 'auto',
      };
    } else if (this.positionX === 'left') {
      style = {
        top: containerTop,
        left: element.offsetLeft + 'px',
        right: 'auto',
      };
    } else {
      const position = element.offsetLeft + element.clientWidth / 2 - container.clientWidth / 2;

      if (position < 0) {
        style = {
          top: containerTop,
          left: element.offsetLeft + 'px',
          right: 'auto',
        };
      } else {
        style = {
          top: containerTop,
          left: position + 'px',
          right: 'auto',
        };
      }
    }

    if (style) {
      this._renderer.setStyle(container, 'top', style.top);
      this._renderer.setStyle(container, 'left', style.left);
      this._renderer.setStyle(container, 'right', style.right);
    }
  }

  // tslint:disable-next-line:no-any
  inputChanged(event: any) {
    if (event.target.tagName.toLowerCase() !== 'input' || !event.target.value.length) {
      return;
    }

    const dateString = event.target.value.split(this.picker.locale.separator);

    let start = null;
    let end = null;

    if (dateString.length === 2) {
      start = moment(dateString[0], this.picker.locale.format);
      end = moment(dateString[1], this.picker.locale.format);
    }

    if (!this.isRangePicker || start === null || end === null) {
      start = moment(event.target.value, this.picker.locale.format);
      end = start;
    }

    if (!start.isValid() || !end.isValid()) {
      return;
    }

    this.picker.setStartDate(start);
    this.picker.setEndDate(end);
    this.picker.updateView();
  }

  /**
   * For click outside of the calendar's container
   * @param event event object
   */
  // tslint:disable-next-line:no-any
  @HostListener('document:click', ['$event']) outsideClick(event: any): void {
    if (!event.target) {
      return;
    }

    if (event.target.classList.contains('x-mat-date-picker-action')) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hide();
    }
  }

  @HostListener('keyup.esc') hideCal() {
    this.hide();
  }

  @HostListener('blur') blur() {
    this.onBlur();
  }

  @HostListener('click') onClick() {
    this.open();
  }

  @HostListener('keyup', ['$event']) onInputChanged(event) {
    this.inputChanged(event);
  }

  private setValue(val: ModelValue) {
    if (val) {
      this.value = val;

      if (val[this._startKey]) {
        this.picker.setStartDate(val[this._startKey]);
      }

      if (val[this._endKey]) {
        this.picker.setEndDate(val[this._endKey]);
      }

      this.picker.calculateChosenLabel();

      if (this.picker.chosenLabel) {
        this._el.nativeElement.value = this.picker.chosenLabel;
      }
    } else {
      this.picker.clear();
    }
  }
}
