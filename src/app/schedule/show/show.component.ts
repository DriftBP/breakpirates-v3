import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show } from '../show';
import { ScheduleService } from '../../shared/services/schedule.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;

  show: Show;
  dayName: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.initialiseState();
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  initialiseState(): void {
    this.show = this.route.snapshot.data['show'];

    this.dayName = this.scheduleService.dayName(this.show.day_id);
  }

}
