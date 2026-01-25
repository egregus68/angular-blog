import { Component, OnInit } from '@angular/core';
import { MatCardModule, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule, MatError } from '@angular/material/form-field';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LoginFormInterface } from '../interfaces/login-form.interface';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginInterface } from '../interfaces/login.interface';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'component-auth',
  standalone: true,
  imports: [
    MatCardModule,
    MatError,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardContent,
    MatButtonModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  loginForm = new FormGroup<LoginFormInterface>({
    login: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    // Initialization logic here
  }

  onSubmit(): void {
    const data: LoginInterface = {
      login: this.loginForm.value.login!,
      password: this.loginForm.value.password!,
    };

    this.authService.login(data).subscribe((response) => {
      localStorage.setItem('authToken', response.tokenValue);
      localStorage.setItem('authLogin', response.claims.login);
      this.toastr.success('Login successful!', 'Success');
      //console.log('zaraz cię przekieruję na /blog');
      this.router.navigate(['blog']);
    });
  }
}
