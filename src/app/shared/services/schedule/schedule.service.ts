import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, BehaviorSubject, interval, Subscription, Observable } from 'rxjs';
import { DateTime } from 'luxon';

import { AppSettings } from '../../../app-settings';
import { Show } from '../../../schedule/show';
import { Host } from '../../../profile/host';
import { Genre } from '../../../music/genre';
import { ServerInfo } from './server-info';

@Injectable()
export class ScheduleService implements OnDestroy {
  private _nowPlaying: BehaviorSubject<Show> = new BehaviorSubject(null);

  public readonly nowPlaying: Observable<Show> = this._nowPlaying.asObservable();

  private _serverInfo: BehaviorSubject<ServerInfo> = new BehaviorSubject(null);

  public readonly serverInfo: Observable<ServerInfo> = this._serverInfo.asObservable();

  private nowPlayingIntervalSubscription: Subscription;
  private nowPlayingSubscription: Subscription;

  private serverInfoIntervalSubscription: Subscription;
  private serverInfoSubscription: Subscription;

  public timeFormat = 'HH:mm:ss';

  constructor(
    private http: HttpClient
  ) {
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

  getDates(show: Show): { startDate: DateTime, endDate: DateTime } {
    const today = DateTime.local().weekday;
    const startTime = DateTime.fromFormat(show.start_time, this.timeFormat);
    const endTime = DateTime.fromFormat(show.end_time, this.timeFormat);

    let nextDate: DateTime;
    let endDate: DateTime;

    // if we haven't yet passed the day of the week that I need:
    if (today <= show.day_id) {
      // then just give me this week's instance of that day
      nextDate = DateTime.local().set({weekday: show.day_id});
    } else {
      // otherwise, give me *next week's* instance of that same day
      nextDate = DateTime.local().plus({weeks: 1}).set({weekday: show.day_id});
    }

    // Set show time
    const startDate = DateTime.local(nextDate.year, nextDate.month, nextDate.day, startTime.hour, startTime.minute, startTime.second);

    if (endTime.hour < startTime.hour) {
      // Ends the following day
      endDate = startDate.plus({day: 1}).set({hour: endTime.hour, minute: endTime.minute});
    } else {
      endDate = startDate.set({hour: endTime.hour, minute: endTime.minute});
    }

    return { startDate: startDate, endDate: endDate };
  }
}
