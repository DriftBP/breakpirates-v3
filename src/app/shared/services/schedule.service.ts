import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { find } from 'lodash';
import moment from 'moment';

import { AppSettings } from '../../app-settings';
import { Show } from '../../schedule/show';
import { Host } from '../../profile/host';
import { Day } from '../../schedule/day';
import { Genre } from '../../music/genre';
import { ServerInfo } from './server-info';

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

  serverInfo(): Observable<ServerInfo> {
    const mockData = '20,1,80,80,20,128,Breakz - Jungle Dubz n Breakz - 23.02.2020 (1)';

    const [
      currentListeners,
      streamStatus,
      peakListeners,
      maxListeners,
      uniqueListeners,
      bitrate,
      songTitle
     ] = mockData.split(',');

    const serverInfo: ServerInfo = {
      CurrentListeners: parseInt(currentListeners, 10),
      StreamStatus: parseInt(streamStatus, 10),
      PeakListeners: parseInt(peakListeners, 10),
      MaxListeners: parseInt(maxListeners, 10),
      UniqueListeners: parseInt(uniqueListeners, 10),
      Bitrate: parseInt(bitrate, 10),
      SongTitle: songTitle
    };

    return of(serverInfo);

    /*return this.http.get<string>(AppSettings.STREAM_URL_STATS).pipe(
      map(data => {
        const [
          currentListeners,
          streamStatus,
          peakListeners,
          maxListeners,
          uniqueListeners,
          bitrate,
          songTitle
         ] = data.split(',');

        const serverInfo: ServerInfo = {
          CurrentListeners: parseInt(currentListeners, 10),
          StreamStatus: parseInt(streamStatus, 10),
          PeakListeners: parseInt(peakListeners, 10),
          MaxListeners: parseInt(maxListeners, 10),
          UniqueListeners: parseInt(uniqueListeners, 10),
          Bitrate: parseInt(bitrate, 10),
          SongTitle: songTitle
        };

        return serverInfo;
      })
    );*/
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
