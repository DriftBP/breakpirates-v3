import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { VideoComponent } from './video.component';
import { SharedModule } from '../shared/shared.module';
import { VideoRoutingModule } from './video-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    VideoRoutingModule,
    SharedModule
  ],
  declarations: [VideoComponent]
})
export class VideoModule { }
