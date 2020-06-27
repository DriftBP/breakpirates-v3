import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of, BehaviorSubject, interval, Subscription } from 'rxjs';
import find from 'lodash/find';
import moment from 'moment';

import { AppSettings } from '../../app-settings';
import { Show } from '../../schedule/show';
import { Host } from '../../profile/host';
import { Day } from '../../schedule/day';
import { Genre } from '../../music/genre';
import { ServerInfo } from './server-info';

@Injectable()
export class ScheduleService implements OnDestroy {
  private daysOfWeek: Day[];

  private _nowPlaying: BehaviorSubject<Show> = new BehaviorSubject(null);

  public readonly nowPlaying: Observable<Show> = this._nowPlaying.asObservable();

  private _serverInfo: BehaviorSubject<ServerInfo> = new BehaviorSubject(null);

  public readonly serverInfo: Observable<ServerInfo> = this._serverInfo.asObservable();

  private nowPlayingIntervalSubscription: Subscription;
  private nowPlayingSubscription: Subscription;

  private serverInfoIntervalSubscription: Subscription;
  private serverInfoSubscription: Subscription;

  public dateFormat = 'YYYY-MM-DD';
  public timeFormat = 'HH:mm';

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

    this.nowPlayingSubscription = this.getNowPlaying().subscribe(nowPlaying => this._nowPlaying.next(nowPlaying));

    this.nowPlayingIntervalSubscription = interval(AppSettings.NOW_PLAYING_INTERVAL).subscribe(() => {
      this.nowPlayingSubscription = this.getNowPlaying().subscribe(nowPlaying => this._nowPlaying.next(nowPlaying));
    });

    this.serverInfoIntervalSubscription = interval(AppSettings.SERVER_STATS_INTERVAL).subscribe(() => {
      this.serverInfoSubscription = this.getServerInfo().subscribe(serverInfo => this._serverInfo.next(serverInfo));
    });
  }

  ngOnDestroy() {
    if (this.nowPlayingIntervalSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }

    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }

    if (this.serverInfoIntervalSubscription) {
      this.serverInfoSubscription.unsubscribe();
    }

    if (this.serverInfoSubscription) {
      this.serverInfoSubscription.unsubscribe();
    }
  }

  days(): Day[] {
    return this.daysOfWeek;
  }

  dayName(dayId: number): string {
    const day = find(this.daysOfWeek, (d: Day) => d.id === dayId);

    return day?.name;
  }

  private getNowPlaying(): Observable<Show> {
    return this.http.get<Show>(AppSettings.API_BASE + 'schedule/now-playing');
  }

  private getServerInfo(): Observable<ServerInfo> {
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
      CurrentListeners: Math.floor(Math.random() * Math.floor(80)),
      StreamStatus: parseInt(streamStatus, 10),
      PeakListeners: parseInt(peakListeners, 10),
      MaxListeners: parseInt(maxListeners, 10),
      UniqueListeners: parseInt(uniqueListeners, 10),
      Bitrate: parseInt(bitrate, 10),
      SongTitle: songTitle
    };

    return of(serverInfo);
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

  getDates(show: Show): { startDate: moment.Moment, endDate: moment.Moment } {
    const today = moment().isoWeekday();
    const startTime = moment(show.start_time, this.timeFormat);
    const endTime = moment(show.end_time, this.timeFormat);

    let nextDate: moment.Moment;
    let endDate: moment.Moment;

    // if we haven't yet passed the day of the week that I need:
    if (today <= show.day_id) {
      // then just give me this week's instance of that day
      nextDate = moment().isoWeekday(show.day_id);
    } else {
      // otherwise, give me *next week's* instance of that same day
      nextDate = moment().add(1, 'weeks').isoWeekday(show.day_id);
    }

    // Set show time
    const startDate = moment(nextDate.format(this.dateFormat) + ' ' + startTime.format(this.timeFormat));

    if (endTime.hours() < startTime.hours()) {
      // Ends the following day
      endDate = moment(startDate).add(1, 'days').set({hour: endTime.hours(), minute: endTime.minutes()});
    } else {
      endDate = moment(startDate).set({hour: endTime.hours(), minute: endTime.minutes()});
    }

    return { startDate: startDate, endDate: endDate };
  }
}
