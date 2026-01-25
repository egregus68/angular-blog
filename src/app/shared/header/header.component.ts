import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { AuthService } from '../../core/authentication/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'component-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatMenuModule, MatIcon, MatIconButton, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    this.toastr.info('Brawo!', 'Udało się wylogować!');
    this.router.navigate(['login']);
  }
}
