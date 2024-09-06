import { NgModule } from '@angular/core';

import { VideoDetailsComponent } from './video-details/video-details.component';
import { SharedModule } from '../shared/shared.module';
import { VideoRoutingModule } from './video-routing.module';

@NgModule({
  imports: [
    VideoRoutingModule,
    SharedModule
  ],
  declarations: [
    VideoDetailsComponent
  ]
})
export class VideoModule { }
