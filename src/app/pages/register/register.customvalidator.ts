import { ValidatorFn, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { debounceTime, take, map, catchError } from 'rxjs/operators';

export const MatchPassword: ValidatorFn = (fg: FormGroup) => {
  const password = fg.get('password').value;
  const cpassword = fg.get('cpassword').value;
  console.log();
  return password && cpassword && password !== cpassword
    ? { passwordMismatch: true }
    : null;
};

export class CustomValidator {
  static uniqueEmail(db: AngularFireDatabase) {
    return (control: AbstractControl) => {
      return db.list(`users`, ref => ref.orderByChild('email').equalTo(control.value)).valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => (arr.length ? { emailAvailable: false } : null)),
          catchError(() => null)
        );
    };
  }
}
