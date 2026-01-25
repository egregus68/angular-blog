import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../../auth.guard';
import { BlogPageComponent } from './blog-page/blog-page.component';
import { ContactComponent } from './contact/contact.component';
import { InfoComponent } from './info/info.component';
import { OnePostComponent } from './one-post/one-post.component';

export const BLOG_ROUTES: Routes = [
  { path: 'blog-page', component: BlogPageComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'info', component: InfoComponent, canActivate: [AuthGuard] },
  { path: 'one-post/:id', component: OnePostComponent, canActivate: [AuthGuard] },
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule],
// })
// export class BlogRoutes {}
