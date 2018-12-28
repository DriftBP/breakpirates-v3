import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VideoComponent } from './video.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { SharedModule } from '../shared/shared.module';
import { VideoRoutingModule } from './video-routing.module';
import { VideoResolve } from './video.resolve';
import { VideoDetailResolve } from './video-detail.resolve';
import { VideoService } from './video.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VideoRoutingModule,
    SharedModule
  ],
  declarations: [VideoComponent, VideoDetailsComponent],
  providers: [
    VideoResolve,
    VideoDetailResolve,
    VideoService
  ]
})
export class VideoModule { }
