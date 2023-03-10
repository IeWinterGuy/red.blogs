import { Routes } from '@angular/router';
import { AuthGuard } from '@lib/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'archives',
    pathMatch: 'full',
  },
  {
    path: 'archives',
    loadChildren: async () => (await import('@pages/home/home.routes')).ROUTES,
  },
  {
    path: ':username',
    loadChildren: async () => (await import('@pages/profile/profile.routes')).ROUTES,
    canLoad: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: async () => (await import('@pages/settings/settings.routes')).ROUTES,
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: async () => (await import('@pages/screens/not-found/not-found.page')).NotFoundPage,
  }
];
