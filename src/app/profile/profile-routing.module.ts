import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { profilesResolver } from './resolvers/profiles.resolver';
import { HostDetailsComponent } from './host-details/host-details.component';
import { hostDetailsResolver } from './resolvers/host-details.resolver';
import { ProfilesComponent } from './profiles.component';
import { ProfileResolversModule } from './resolvers/profile-resolvers.module';

const routes: Routes = [
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

@NgModule({
  imports: [
    ProfileResolversModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
