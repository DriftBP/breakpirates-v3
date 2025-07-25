import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Genre } from '../models/genre';
import { Show } from '../../schedule/models/show';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable()
export class MusicService {
  private httpRequestService = inject(HttpRequestService);


  genres(): Observable<Genre[]> {
    return this.httpRequestService.get<Genre[]>(AppSettings.API_BASE + 'music');
  }

  genre(id: number): Observable<Genre> {
    return this.httpRequestService.get<Genre>(AppSettings.API_BASE + `music/${id}`);
  }

  shows(genreId: number): Observable<Show[]> {
    return this.httpRequestService.get<Show[]>(AppSettings.API_BASE + `music/${genreId}/shows`);
  }

}
