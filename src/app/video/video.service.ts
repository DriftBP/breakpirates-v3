import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../app-settings';
import { Video } from './video';

@Injectable()
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
