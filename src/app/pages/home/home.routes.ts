import { Route } from '@angular/router';
import { AboutComponent } from './shared/about/about.component';
import { ArticlesComponent } from './shared/articles/articles.component';
import { GuestbookComponent } from './shared/guestbook/guestbook.component';
import { RedComponent } from './shared/red/red.component';

export const ROUTES: Route[] = [
  {
    path: '',
    title: 'Home',
    loadComponent: async () => (await import('./home.page')).HomePage,
    children: [
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
        path: 'guestbook',
        component: GuestbookComponent
      }
    ]
  }
];
