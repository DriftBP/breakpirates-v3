import { Routes } from '@angular/router';

import { videoResolver } from './resolvers/video.resolver';
import { videoDetailResolver } from './resolvers/video-detail.resolver';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { VideoComponent } from './video.component';
import { VideoService } from './services/video.service';

export const routes: Routes = [
  {
    path: '',
    providers: [
      VideoService
    ],
    children: [
      {
        path: '',
        component: VideoComponent,
        resolve: {
          videos: videoResolver
        },
        pathMatch: 'full'
      },
      {
        path: ':id',
        component: VideoDetailsComponent,
        resolve: {
          video: videoDetailResolver
        }
      }
    ]
  },
];
