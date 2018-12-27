import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoResolve } from './video.resolve';
import { VideoDetailResolve } from './video-detail.resolve';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoComponent } from './video.component';

const routes: Routes = [
  { path: '', component: VideoComponent, resolve: { videos: VideoResolve }, pathMatch: 'full' },
  { path: ':id', component: VideoDetailsComponent, resolve: { video: VideoDetailResolve } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
