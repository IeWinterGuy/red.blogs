import { Route } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AboutComponent } from './shared/about/about.component';
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
        path: 'support',
        loadChildren: async () => (await import('@pages/home/shared/preference/preference.module')).PreferenceModule,
        canActivate: [AuthGuard]
      }
    ]
  }
];
