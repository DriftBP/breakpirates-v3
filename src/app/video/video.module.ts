import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VideoComponent } from './video.component';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [VideoComponent, VideoDetailsComponent]
})
export class VideoModule { }
