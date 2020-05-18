import { Injectable, OnDestroy } from '@angular/core';
import { HttpClientJsonpModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
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
export class ScheduleService implements OnDestroy {
  private daysOfWeek: Day[];

  private _nowPlaying: BehaviorSubject<Show> = new BehaviorSubject(null);

  public readonly nowPlaying: Observable<Show> = this._nowPlaying.asObservable();

  private _serverInfo: BehaviorSubject<ServerInfo> = new BehaviorSubject(null);

  public readonly serverInfo: Observable<ServerInfo> = this._serverInfo.asObservable();

  private nowPlayingSubscription: Subscription;
  private serverInfoSubscription: Subscription;

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

    interval(AppSettings.NOW_PLAYING_INTERVAL).subscribe(() => {
      this.nowPlayingSubscription = this.getNowPlaying().subscribe(nowPlaying => this._nowPlaying.next(nowPlaying));
    });

    interval(AppSettings.SERVER_STATS_INTERVAL).subscribe(() => {
      this.serverInfoSubscription = this.getServerInfo().subscribe(serverInfo => this._serverInfo.next(serverInfo));
    });
  }

  ngOnDestroy() {
    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
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
    return this.http.jsonp(AppSettings.STREAM_URL_STATS, 'callback').pipe(
      map(data => this.toServerInfo(data.toString()))
    );
  }

  private toServerInfo(pageContent: string): ServerInfo {
    const contentRegex = /<body>(.*)<\/body>/;
    const data = pageContent.match(contentRegex)[1];

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
