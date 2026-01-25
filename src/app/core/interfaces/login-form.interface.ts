import { FormControl } from '@angular/forms';

export interface LoginFormInterface {
  login: FormControl<string>;
  password: FormControl<string>;
}
