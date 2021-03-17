import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesResolve } from './resolves/profiles.resolve';
import { HostDetailsComponent } from './host-details/host-details.component';
import { HostDetailsResolve } from './resolves/host-details.resolve';
import { ProfilesComponent } from './profiles.component';
import { ProfileResolvesModule } from './resolves/profile-resolves.module';

const routes: Routes = [
  { path: '', component: ProfilesComponent, resolve: { profiles: ProfilesResolve }, pathMatch: 'full' },
  { path: ':id', component: HostDetailsComponent, resolve: { profile: HostDetailsResolve } },
];

@NgModule({
  imports: [
    ProfileResolvesModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
