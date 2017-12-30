import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { VideoService } from './video.service';
import { Video } from './video';

@Injectable()
export class VideoDetailResolve implements Resolve<Video> {

  constructor(private videoService: VideoService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.videoService.video(parseInt(route.paramMap.get('id')));
  }
}