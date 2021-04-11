import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable, timer } from 'rxjs';
import { DateTime, Interval } from 'luxon';

import { AppSettings } from '../../../app-settings';
import { Show } from '../../../schedule/models/show';
import { Host } from '../../../profile/host';
import { Genre } from '../../../music/models/genre';
import { HttpRequestService } from '../http-request/http-request.service';

@Injectable()
export class ScheduleService implements OnDestroy {
  private _nowPlaying: BehaviorSubject<Show> = new BehaviorSubject(null);

  public readonly nowPlaying: Observable<Show> = this._nowPlaying.asObservable();

  private nowPlayingTimerSubscription: Subscription;
  private nowPlayingSubscription: Subscription;

  public timeFormat = 'HH:mm:ss';

  constructor(
    private httpRequestService: HttpRequestService
  ) {
    this.nowPlayingTimerSubscription = timer(0, AppSettings.NOW_PLAYING_INTERVAL).subscribe(() => {
      this.nowPlayingSubscription = this.getNowPlaying().subscribe(nowPlaying => this._nowPlaying.next(nowPlaying));
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

  getShowProgress(show: Show): number {
    var progress = 0;

    if (show) {
      const startTime = DateTime.fromFormat(show.start_time, this.timeFormat);
      const endTime = DateTime.fromFormat(show.end_time, this.timeFormat);
      const showLengthMinutes = Interval.fromDateTimes(startTime, endTime).toDuration('minutes').minutes;
      const minutesCompleted = Interval.fromDateTimes(startTime, DateTime.now()).toDuration('minutes').minutes;

      progress = (100 / showLengthMinutes) * minutesCompleted;
    }

    return progress;
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
