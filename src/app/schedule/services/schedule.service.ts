import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';

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
  public readonly nowPlaying = signal<Show>(null);
  public readonly showProgress = signal<number>(0)

  private nowPlayingTimerSubscription: Subscription;
  private nowPlayingSubscription: Subscription;

  constructor(
    private httpRequestService: HttpRequestService,
    private showService: ShowService
  ) {
    this.nowPlayingTimerSubscription = timer(0, AppSettings.NOW_PLAYING_INTERVAL).subscribe(() => {
      this.nowPlayingSubscription = this.getNowPlaying().subscribe(nowPlaying => {
        this.nowPlaying.set(nowPlaying);
        this.showProgress.set(this.showService.getShowProgress(nowPlaying));
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

  shows(dayId: number): Observable<Show[]> {
    return this.httpRequestService.get<Show[]>(AppSettings.API_BASE + `schedule/${dayId}`);
  }

  show(showId: number): Observable<Show> {
    return this.httpRequestService.get<Show>(AppSettings.API_BASE + `shows/${showId}`);
  }
}
