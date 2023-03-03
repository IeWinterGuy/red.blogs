import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutComponent } from './shared/about/about.component';
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
        loadChildren: async () => (await import('@pages/home/shared/blogs/articles.module')).ArticlesModule,
      },
      {
        path: 'publish',
        loadComponent: async () => (await import('@pages/home/shared/blogs/editor/editor.component')).EditorComponent,
        // loadChildren: async () => (await import('@pages/home/shared/articles/articles.module')).ArticlesModule,
      },
      {
        path: 'support',
        component: GuestbookComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
