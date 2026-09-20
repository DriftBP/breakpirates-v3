import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, signal, inject } from '@angular/core';
import { Subscription, Observable, filter, fromEvent, merge, of, switchMap, takeUntil, timer } from 'rxjs';

import { AppSettings } from '../../app-settings';
import { Show } from '../models/show';
import { Host } from '../../profile/host';
import { Genre } from '../../music/models/genre';
import { HttpRequestService } from '../../shared/services/http-request/http-request.service';
import { ShowService } from './show.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements OnDestroy {
  private httpRequestService = inject(HttpRequestService);
  private showService = inject(ShowService);
  private document = inject<Document>(DOCUMENT);

  private _nowPlaying = signal<Show | null>(null);
  public readonly nowPlaying = this._nowPlaying.asReadonly();

  private _showProgress = signal<number>(0)
  public readonly showProgress = this._showProgress.asReadonly();

  private nowPlayingTimerSubscription: Subscription;

  constructor() {
    const visible$ = merge(
      of(null),
      fromEvent(this.document, 'visibilitychange')
    ).pipe(filter(() => this.document.visibilityState === 'visible'));
    const hidden$ = fromEvent(this.document, 'visibilitychange').pipe(
      filter(() => this.document.visibilityState === 'hidden')
    );

    this.nowPlayingTimerSubscription = visible$.pipe(
      switchMap(() => timer(1000, AppSettings.NOW_PLAYING_INTERVAL).pipe(takeUntil(hidden$))),
      switchMap(() => this.getNowPlaying())
    ).subscribe(nowPlaying => {
        this._nowPlaying.set(nowPlaying);
        this._showProgress.set(this.showService.getShowProgress(nowPlaying));
    });
  }

  ngOnDestroy() {
    if (this.nowPlayingTimerSubscription) {
      this.nowPlayingTimerSubscription.unsubscribe();
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

  shows(dayId: number): Observable<Show[]> {
    return this.httpRequestService.get<Show[]>(AppSettings.API_BASE + `schedule/${dayId}`);
  }

  show(showId: number): Observable<Show> {
    return this.httpRequestService.get<Show>(AppSettings.API_BASE + `shows/${showId}`);
  }
}
