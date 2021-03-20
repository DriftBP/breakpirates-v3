import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Genre } from '../models/genre';
import { Show } from '../../schedule/models/show';
import { MusicResolvesModule } from '../resolves/music-resolves.module';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable({
  providedIn: MusicResolvesModule
})
export class MusicService {

  constructor(
    private http: HttpRequestService
  ) { }

  genres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(AppSettings.API_BASE + 'music');
  }

  genre(id: number): Observable<Genre> {
    return this.http.get<Genre>(AppSettings.API_BASE + `music/${id}`);
  }

  shows(genreId: number): Observable<Show[]> {
    return this.http.get<Show[]>(AppSettings.API_BASE + `music/${genreId}/shows`);
  }

}
