import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Show } from '../models/show';
import { Host } from '../../profile/host';
import { Genre } from '../../music/models/genre';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private httpRequestService = inject(HttpRequestService);

  showHosts(showId: number): Observable<Host[]> {
    return this.httpRequestService.get<Host[]>(AppSettings.API_BASE + `shows/${showId}/hosts`);
  }

  showGenres(showId: number): Observable<Genre[]> {
    return this.httpRequestService.get<Genre[]>(AppSettings.API_BASE + `shows/${showId}/genres`);
  }

  shows(dayId: number): Observable<Show[]> {
    return this.httpRequestService.get<Show[]>(AppSettings.API_BASE + `schedule/${dayId}`);
  }

  show(showId: number): Observable<Show> {
    return this.httpRequestService.get<Show>(AppSettings.API_BASE + `shows/${showId}`);
  }
}
