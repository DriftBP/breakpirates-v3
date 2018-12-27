import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesResolve } from './profiles.resolve';
import { HostDetailsComponent } from './host-details/host-details.component';
import { HostDetailsResolve } from './host-details.resolve';
import { ProfilesComponent } from './profiles.component';

const routes: Routes = [
  { path: '', component: ProfilesComponent, resolve: { profiles: ProfilesResolve }, pathMatch: 'full' },
  { path: ':id', component: HostDetailsComponent, resolve: { profile: HostDetailsResolve } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
