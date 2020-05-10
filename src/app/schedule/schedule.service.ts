import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { find } from 'lodash';
import moment from 'moment';

import { AppSettings } from '../app-settings';
import { Show } from './show';
import { Host } from '../profile/host';
import { Day } from './day';
import { Genre } from '../music/genre';

@Injectable()
export class ScheduleService {
  private daysOfWeek: Day[];

  constructor(
    private http: HttpClient
  ) {
    this.daysOfWeek = [];

    for (let i = 1; i <= 7; i++) {
      this.daysOfWeek.push({
        id: i,
        name: moment.weekdays(i)
      });
    }
  }

  days(): Day[] {
    return this.daysOfWeek;
  }

  dayName(dayId: number): string {
    const day = find(this.daysOfWeek, (d: Day) => d.id === dayId);

    return day?.name;
  }

  nowPlaying(): Observable<Show> {
    return this.http.get<Show>(AppSettings.API_BASE + 'schedule/now-playing');
  }

  showHosts(showId: number): Observable<Host[]> {
    return this.http.get<Host[]>(AppSettings.API_BASE + `shows/${showId}/hosts`);
  }

  showGenres(showId: number): Observable<Genre[]> {
    return this.http.get<Genre[]>(AppSettings.API_BASE + `shows/${showId}/genres`);
  }

  shows(dayId: number): Observable<Show[]> {
    return this.http.get<Show[]>(AppSettings.API_BASE + `schedule/${dayId}`);
  }

  show(showId: number): Observable<Show> {
    return this.http.get<Show>(AppSettings.API_BASE + `shows/${showId}`);
  }
}
