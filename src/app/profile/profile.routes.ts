import { Routes } from '@angular/router';

import { profilesResolver } from './resolvers/profiles.resolver';
import { hostDetailsResolver } from './resolvers/host-details.resolver';
import { ProfileService } from './services/profile.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      ProfileService
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('./profiles.component'),
        resolve: {
          profiles: profilesResolver
        },
        pathMatch: 'full'
      },
      {
        path: ':id',
        loadComponent: () => import('./host-details/host-details.component'),
        resolve: {
          profile: hostDetailsResolver
        }
      }
    ]
  },
];
