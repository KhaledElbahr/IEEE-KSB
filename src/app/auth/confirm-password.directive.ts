import { Directive, Input } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]'
})
export class ConfirmPasswordDirective implements Validator {
  @Input() appConfirmPassword: string;
  constructor() { }
  validate(control: AbstractControl): { [key: string]: any } | null {
    const controlToCompare = control.parent.get(this.appConfirmPassword);
    if (controlToCompare && controlToCompare.value !== control.value) {
      // tslint:disable-next-line: object-literal-key-quotes
      return { 'notMatch': true };
    }
    return null;
  }

}
