import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { VideoService } from '../services/video.service';
import { Video } from '../models/video';

export const VideoDetailResolver: ResolveFn<any> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> =>
    {
      const videoService = inject(VideoService);

      return videoService.video(parseInt(route.paramMap.get('id') ?? '', 10));
    }
