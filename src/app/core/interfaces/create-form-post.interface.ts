import { FormControl } from '@angular/forms';

export interface CreateFormPostInterface {
  text: FormControl<string | null>;
  publicationDate: FormControl<string | null>;
}
