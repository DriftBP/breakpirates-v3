import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Video } from '../models/video';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable()
export class VideoService {
  private httpRequestService = inject(HttpRequestService);


  videos(): Observable<Video[]> {
    return this.httpRequestService.get<Video[]>(AppSettings.API_BASE + 'videos');
  }

  video(id: number): Observable<Video> {
    return this.httpRequestService.get<Video>(AppSettings.API_BASE + `videos/${id}`);
  }
}
