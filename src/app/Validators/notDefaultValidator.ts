import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notDefaultValidator(value: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === value ? { defaultSelected: true } : null;
  };
}
