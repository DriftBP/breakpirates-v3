import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';

import { VideoService } from '../services/video.service';
import { Video } from '../models/video';

export const VideoResolver: ResolveFn<Observable<Video[]>> =
  (): Observable<Video[]> =>
    {
      const videoService = inject(VideoService);

      return videoService.videos();
    }
