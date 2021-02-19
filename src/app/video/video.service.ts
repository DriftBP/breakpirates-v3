import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from '../app-settings';
import { Video } from './video';
import { VideoResolvesModule } from './video-resolves.module';

@Injectable({
  providedIn: VideoResolvesModule
})
export class VideoService {

  constructor(
    private http: HttpClient
  ) { }

  videos(): Observable<Video[]> {
    return this.http.get<Video[]>(AppSettings.API_BASE + 'videos');
  }

  video(id: number): Observable<Video> {
    return this.http.get<Video>(AppSettings.API_BASE + `videos/${id}`);
  }
}
