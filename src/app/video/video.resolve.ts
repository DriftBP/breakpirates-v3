import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { VideoService } from './video.service';
import { Video } from './video';

@Injectable()
export class VideoResolve implements Resolve<Video[]> {

  constructor(private videoService: VideoService) {}

  resolve() {
    return this.videoService.videos();
  }
}
