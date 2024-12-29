import { Injectable } from '@angular/core';


import { VideoService } from '../services/video.service';


@Injectable()
export class VideoResolve  {

  constructor(private videoService: VideoService) {}

  resolve() {
    return this.videoService.videos();
  }
}
