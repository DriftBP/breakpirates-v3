import { Component, OnInit, OnDestroy } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';

import { Show } from '../schedule/show';
import { ScheduleService } from '../shared/services/schedule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private showsSubscription: Subscription;
  private activeDayId = moment().isoWeekday();

  todaysSchedule: Show[];

  constructor(
    private readonly scheduleService: ScheduleService
  ) {}

  ngOnInit() {
    this.showsSubscription = this.scheduleService.shows(this.activeDayId).subscribe(shows => {
        this.todaysSchedule = shows;
      }
    );
  }

  ngOnDestroy() {
    if (this.showsSubscription) {
      this.showsSubscription.unsubscribe();
    }
  }
}
