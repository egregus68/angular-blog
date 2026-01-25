import { Routes } from '@angular/router';
import { BlogComponent } from './core/blog/blog.component';
import { AuthComponent } from './core/authentication/auth.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './core/blog/components/contact/contact.component';
import { InfoComponent } from './core/blog/components/info/info.component';
import { BlogPageComponent } from './core/blog/components/blog-page/blog-page.component';
import { OnePostComponent } from './core/blog/components/one-post/one-post.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: AuthComponent },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },

  { path: 'blog-page', component: BlogPageComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },

  { path: 'one-post/:id', component: OnePostComponent, canActivate: [AuthGuard] },

  // {
  //   path: 'blog',
  //   loadChildren: () => import('./core/blog/components/blog.routes').then((m) => m.BLOG_ROUTES),
  //   canActivate: [AuthGuard],
  // },
];
