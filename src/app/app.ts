import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthService } from '../app/core/authentication/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatIconModule,
    HeaderComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-blog');

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  logout(): void {
    this.authService.logout();
    this.toastr.info('You have been logged out.', 'Logout');
    this.router.navigate(['/login']);
  }
}
