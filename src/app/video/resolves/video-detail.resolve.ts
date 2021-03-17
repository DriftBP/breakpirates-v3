import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { VideoService } from '../services/video.service';
import { Video } from '../video';
import { VideoResolvesModule } from './video-resolves.module';

@Injectable({
  providedIn: VideoResolvesModule
})
export class VideoDetailResolve implements Resolve<Video> {

  constructor(private videoService: VideoService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.videoService.video(parseInt(route.paramMap.get('id'), 10));
  }
}
