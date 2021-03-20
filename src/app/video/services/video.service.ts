import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Video } from '../models/video';
import { VideoResolvesModule } from '../resolves/video-resolves.module';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable({
  providedIn: VideoResolvesModule
})
export class VideoService {

  constructor(
    private httpRequestService: HttpRequestService
  ) { }

  videos(): Observable<Video[]> {
    return this.httpRequestService.get<Video[]>(AppSettings.API_BASE + 'videos');
  }

  video(id: number): Observable<Video> {
    return this.httpRequestService.get<Video>(AppSettings.API_BASE + `videos/${id}`);
  }
}
