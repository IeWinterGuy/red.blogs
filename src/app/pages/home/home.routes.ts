import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutComponent } from './shared/about/about.component';
import { ArticlesComponent } from './shared/articles/articles.component';
import { PostComponent } from './shared/articles/post/post.component';
import { ViewerComponent } from './shared/articles/viewer/viewer.component';
import { GuestbookComponent } from './shared/preferences/guestbook.component';
import { RedComponent } from './shared/red/red.component';

export const ROUTES: Route[] = [
  {
    path: '',
    title: 'Red.Archives',
    loadComponent: async () => (await import('./home.page')).HomePage,
    children: [
      {
        path: '',
        component: RedComponent,
      },
      {
        path: 'home',
        component: RedComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'blog',
        component: ArticlesComponent
      },
      {
        path: 'support',
        component: GuestbookComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'post',
        component: ViewerComponent
      },
      {
        path: 'publish',
        component: PostComponent
      }
    ]
  }
];
