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
        path: 'stories',
        loadChildren: async () => (await import('@pages/home/shared/story/stories.module')).StoryModule,
      },
      {
        path: 'publish',
        loadComponent: async () => (await import('@pages/home/shared/story/editor/editor.component')).EditorComponent
      },
      {
        path: 'support',
        component: GuestbookComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
