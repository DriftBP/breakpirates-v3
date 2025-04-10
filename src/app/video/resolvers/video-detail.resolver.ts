import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { VideoService } from '../services/video.service';
import { Video } from '../models/video';

export const videoDetailResolver: ResolveFn<Video> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(VideoService).video(parseInt(route.paramMap.get('id') ?? '', 10));
};
