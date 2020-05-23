import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show } from '../show';
import { ScheduleService } from '../../shared/services/schedule.service';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    {
      name: 'HOME.TITLE',
      routerLink: '/radio'
    },
    {
      name: 'SCHEDULE.TITLE',
      routerLink: '/schedule'
    }
  ];

  show: Show;
  dayName: string;
  breadcrumbConfig: BreadcrumbConfigItem[] = [];

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

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.show.title,
      isActive: true
    });
  }

}
