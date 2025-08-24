import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { VideoService } from '../services/video.service';
import { Video } from '../models/video';

export const videoResolver: ResolveFn<Video[]> = () => {
  return inject(VideoService).videos();
};
