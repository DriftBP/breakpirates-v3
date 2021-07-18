import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, timer } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { AppSettings } from '../../app-settings';
import { Show } from '../models/show';
import { Host } from '../../profile/host';
import { Genre } from '../../music/models/genre';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';
import { ShowService } from './show.service';

@Injectable()
export class ScheduleService implements OnDestroy {
  private _nowPlaying: BehaviorSubject<Show> = new BehaviorSubject(null);
  private _showProgress: BehaviorSubject<number> = new BehaviorSubject(0);

  public readonly nowPlaying$: Observable<Show> = this._nowPlaying.asObservable().pipe(distinctUntilChanged());
  public readonly showProgress$: Observable<number> = this._showProgress.asObservable();

  private nowPlayingTimerSubscription: Subscription;
  private nowPlayingSubscription: Subscription;

  constructor(
    private httpRequestService: HttpRequestService,
    private showService: ShowService
  ) {
    this.nowPlayingTimerSubscription = timer(0, AppSettings.NOW_PLAYING_INTERVAL).subscribe(() => {
      this.nowPlayingSubscription = this.getNowPlaying().subscribe(nowPlaying => {
        this._nowPlaying.next(nowPlaying);
        this._showProgress.next(this.showService.getShowProgress(nowPlaying));
      });
    });
  }

  ngOnDestroy() {
    if (this.nowPlayingTimerSubscription) {
      this.nowPlayingTimerSubscription.unsubscribe();
    }

    if (this.nowPlayingSubscription) {
      this.nowPlayingSubscription.unsubscribe();
    }
  }

  private getNowPlaying(): Observable<Show> {
    return this.httpRequestService.get<Show>(AppSettings.API_BASE + 'schedule/now-playing', { useCache: false });
  }

  showHosts(showId: number): Observable<Host[]> {
    return this.httpRequestService.get<Host[]>(AppSettings.API_BASE + `shows/${showId}/hosts`);
  }

  showGenres(showId: number): Observable<Genre[]> {
    return this.httpRequestService.get<Genre[]>(AppSettings.API_BASE + `shows/${showId}/genres`);
  }

  showSimilar(showId: number): Observable<Show[]> {
    return this.httpRequestService.get<Genre[]>(AppSettings.API_BASE + `shows/${showId}/similar`);
  }

  shows(dayId: number): Observable<Show[]> {
    return this.httpRequestService.get<Show[]>(AppSettings.API_BASE + `schedule/${dayId}`);
  }

  show(showId: number): Observable<Show> {
    return this.httpRequestService.get<Show>(AppSettings.API_BASE + `shows/${showId}`);
  }
}
