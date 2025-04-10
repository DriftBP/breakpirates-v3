import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { videoResolver } from './resolvers/video.resolver';
import { videoDetailResolver } from './resolvers/video-detail.resolver';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoComponent } from './video.component';
import { VideoResolversModule } from './resolvers/video-resolvers.module';

const routes: Routes = [
  {
    path: '',
    component: VideoComponent,
    resolve: {
      videos: videoResolver
    },
    pathMatch: 'full' },
  {
    path: ':id',
    component: VideoDetailsComponent,
    resolve: {
      video: videoDetailResolver
    }
  },
];

@NgModule({
  imports: [
    VideoResolversModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
