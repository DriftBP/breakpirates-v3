import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { VideoRoutingModule } from './video-routing.module';

@NgModule({
  imports: [
    RouterModule,
    VideoRoutingModule,
    SharedModule
  ]
})
export class VideoModule { }
