import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoResolver } from './resolvers/video.resolver';
import { VideoDetailResolver } from './resolvers/video-detail.resolver';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoComponent } from './video.component';


const routes: Routes = [
  { path: '', component: VideoComponent, resolve: { videos: VideoResolver }, pathMatch: 'full' },
  { path: ':id', component: VideoDetailsComponent, resolve: { video: VideoDetailResolver } },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
