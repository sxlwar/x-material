import { Component, Input, OnInit } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinDisabled } from '@angular/material/core';
import { MatFormFieldAppearance, MatFormFieldControl } from '@angular/material/form-field';

class XMatPasswordBase {
  constructor(
    // tslint:disable-next-line
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    // tslint:disable-next-line
    public _parentForm: NgForm,
    // tslint:disable-next-line
    public _parentFormGroup: FormGroupDirective,
    /** @docs-private */
    public ngControl: NgControl
  ) {}
}

// tslint:disable-next-line
const _XMatPasswordBase = mixinDisabled(XMatPasswordBase);

@Component({
  selector: 'x-mat-password',
  templateUrl: './password.html',
  styles: [
    `
      mat-icon:hover {
        cursor: pointer;
      }
    `,
  ],
  providers: [{ provide: MatFormFieldControl, useExisting: PasswordComponent }],
})
export class PasswordComponent extends _XMatPasswordBase implements OnInit {
  /**
   * form field label;
   * default: password;
   */
  @Input() label = 'password';

  /**
   * placeholder of input element;
   */
  @Input() placeholder = '';

  /**
   * appearance?: 'legacy' | 'standard' | 'fill' | 'outline'
   * Sets form field appearance. Uses same appearances accepted as [MatFormField] and defaults to 'standard'.
   */
  @Input() appearance: MatFormFieldAppearance = 'standard';

  isHide = true;

  ngOnInit() {}
}
