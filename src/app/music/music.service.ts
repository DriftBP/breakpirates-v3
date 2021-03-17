import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppSettings } from '../app-settings';
import { Genre } from './genre';
import { Show } from '../schedule/show';
import { MusicResolvesModule } from './resolves/music-resolves.module';

@Injectable({
  providedIn: MusicResolvesModule
})
export class MusicService {

  constructor(
    private http: HttpClient
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
