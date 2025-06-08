import { Routes } from '@angular/router';

import { profilesResolver } from './resolvers/profiles.resolver';
import { hostDetailsResolver } from './resolvers/host-details.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./profiles.component').then(mod => mod.ProfilesComponent),
    resolve: {
      profiles: profilesResolver
    },
    pathMatch: 'full'
  },
  {
    path: ':id',
    loadComponent: () => import('./host-details/host-details.component').then(mod => mod.HostDetailsComponent),
    resolve: {
      profile: hostDetailsResolver
    }
  },
];
