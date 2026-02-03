import { Component, signal, inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Field, form, required, schema, submit } from '@angular/forms/signals';
import { MatCardModule } from '@angular/material/card';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, tap } from 'rxjs';

export const loginFormSchema = schema<LoginFormInterface>((fieldPath) => {
  required(fieldPath.login, { message: 'Login is required' });
  required(fieldPath.password, { message: 'Password is required' });
});

@Component({
  selector: 'component-auth',
  standalone: true,
  imports: [Field, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  private authService = inject(AuthService);
  private route = inject(Router);
  private toastr = inject(ToastrService);

  loginModel = signal<LoginFormInterface>({
    login: '',
    password: '',
  });

  protected readonly loginForm = form<LoginFormInterface>(this.loginModel, loginFormSchema);

  submitForm(event: Event): void {
    event.preventDefault();

    submit(this.loginForm, async (form) => {
      try {
        const payload = this.loginForm().value();
        await firstValueFrom(
          this.authService.login(payload).pipe(
            tap((response) => {
              localStorage.setItem('authToken', response.tokenValue);
              localStorage.setItem('authLogin', response.claims.login);
              this.toastr.success('Login successful!', 'Success');
              this.route.navigate(['blog']);
            }),
          ),
        );
        return undefined;
      } catch (error) {
        return { message: 'Submission failed. Please try again.', kind: 'error' };
      }
    });
  }
}
