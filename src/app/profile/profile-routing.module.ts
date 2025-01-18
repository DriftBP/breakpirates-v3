import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilesResolver } from './resolvers/profiles.resolver';
import { HostDetailsComponent } from './host-details/host-details.component';
import { HostDetailsResolver } from './resolvers/host-details.resolver';
import { ProfilesComponent } from './profiles.component';


const routes: Routes = [
  { path: '', component: ProfilesComponent, resolve: { profiles: ProfilesResolver }, pathMatch: 'full' },
  { path: ':id', component: HostDetailsComponent, resolve: { profile: HostDetailsResolver } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
