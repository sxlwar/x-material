import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mixinDisabled } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldAppearance } from '@angular/material/form-field';

class XMatPasswordBase {
  constructor(
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    /** @docs-private */
    public ngControl: NgControl
  ) {}
}

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
  @Input() label: string = 'password';

  /**
   * placeholder of input element;
   */
  @Input() placeholder: string = '';

  /**
   * appearance?: 'legacy' | 'standard' | 'fill' | 'outline'
   * Sets form field appearance. Uses same appearances accepted as [MatFormField] and defaults to 'standard'.
   */
  @Input() appearance: MatFormFieldAppearance = 'standard';

  isHide = true;

  ngOnInit() {}
}
