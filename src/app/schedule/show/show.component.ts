import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show } from '../show';
import { ScheduleService } from '../../shared/services/schedule.service';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { scheduleConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    scheduleConfigInactive
  ];

  show: Show;
  dayName: string;
  breadcrumbConfig: BreadcrumbConfigItem[] = [];
  imagePath = AppSettings.ASSET_SHOW_IMAGE;
  nextDate: string;
  endDate: string;

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

    // Next show start date
    this.nextDate = this.scheduleService.getNextDate(this.show).format();

    // Next show end date
    this.endDate = this.scheduleService.getEndDate(this.show).format();

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.show.title,
      isActive: true
    });
  }

}
