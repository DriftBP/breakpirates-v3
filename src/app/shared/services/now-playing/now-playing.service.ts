import { DOCUMENT } from '@angular/common';
import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { DateTime, Interval } from 'luxon';
import { Subscription, filter, fromEvent, merge, of, switchMap, takeUntil, timer } from 'rxjs';

import { AppSettings } from '../../../app-settings';
import { Show } from '../../../schedule/models/show';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService implements OnDestroy {
  private httpRequestService = inject(HttpRequestService);
  private document = inject<Document>(DOCUMENT);
  private readonly timeFormat = 'HH:mm:ss';
  private readonly showTimezone = AppSettings.SHOW_TIMEZONE;

  private _nowPlaying = signal<Show | null>(null);
  public readonly nowPlaying = this._nowPlaying.asReadonly();

  private _showProgress = signal<number>(0);
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
      this._showProgress.set(this.getShowProgress(nowPlaying));
    });
  }

  ngOnDestroy(): void {
    this.nowPlayingTimerSubscription.unsubscribe();
  }

  private getNowPlaying() {
    return this.httpRequestService.get<Show>(AppSettings.API_BASE + 'schedule/now-playing', { useCache: false });
  }

  private getShowProgress(show: Show): number {
    let progress = 0;

    if (show) {
      const startTime = DateTime.fromFormat(show.start_time, this.timeFormat, { zone: this.showTimezone });
      const endTime = DateTime.fromFormat(show.end_time, this.timeFormat, { zone: this.showTimezone });
      const now = DateTime.now().setZone(this.showTimezone);
      const showLengthMinutes = Interval.fromDateTimes(startTime, endTime).toDuration('minutes').minutes;
      const minutesCompleted = Interval.fromDateTimes(startTime, now).toDuration('minutes').minutes;

      progress = (100 / showLengthMinutes) * minutesCompleted;
      progress = Math.max(0, Math.min(100, progress));
    }

    return progress;
  }
}
