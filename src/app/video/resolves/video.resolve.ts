import { Injectable } from '@angular/core';


import { VideoService } from '../services/video.service';
import { Video } from '../models/video';
import { VideoResolvesModule } from './video-resolves.module';

@Injectable({
  providedIn: VideoResolvesModule
})
export class VideoResolve  {

  constructor(private videoService: VideoService) {}

  resolve() {
    return this.videoService.videos();
  }
}
