import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../appSettings';
import { Show } from './show';
import { Host } from '../profile/host';
import { Day } from './day';

@Injectable()
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) { }

  days(): Observable<Day[]> {
    return this.http.get<Day[]>(AppSettings.API_BASE + `days`);
  }

  nowPlaying(): Observable<Show> {
    return this.http.get<Show>(AppSettings.API_BASE + 'schedule/now-playing');
  }

  showHosts(showId: number): Observable<Host[]> {
    return this.http.get<Host[]>(AppSettings.API_BASE + `shows/${showId}/hosts`);
  }

  shows(dayId: number): Observable<Show[]> {
    return this.http.get<Show[]>(AppSettings.API_BASE + `schedule/${dayId}`);
  }
}
