import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { profilesResolver } from './resolvers/profiles.resolver';
import { HostDetailsComponent } from './host-details/host-details.component';
import { hostDetailsResolver } from './resolvers/host-details.resolver';
import { ProfilesComponent } from './profiles.component';
import { ProfileResolvesModule } from './resolvers/profile-resolves.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    resolve: {
      profiles: profilesResolver
    },
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: HostDetailsComponent,
    resolve: {
      profile: hostDetailsResolver
    }
  },
];

@NgModule({
  imports: [
    ProfileResolvesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
