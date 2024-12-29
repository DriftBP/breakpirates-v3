import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { VideoService } from '../services/video.service';


@Injectable()
export class VideoDetailResolve  {

  constructor(private videoService: VideoService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.videoService.video(parseInt(route.paramMap.get('id') ?? '', 10));
  }
}
