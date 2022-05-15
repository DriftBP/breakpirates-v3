import { Component, OnInit } from '@angular/core';
import { DateTime } from 'luxon';

import { ScheduleService } from '../schedule/services/schedule.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { AppSettings } from '../app-settings';

interface ISlide {
  image: string;
}

@Component({
  selector: 'bp-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId = DateTime.local().weekday;
  imagePath = AppSettings.ASSET_HOME_IMAGE;
  slides: ISlide[] = [];
  itemsPerSlide = 3;

  constructor(
    private readonly breadcrumbService: BreadcrumbService,
    public readonly scheduleService: ScheduleService
  ) {
    for (let i = 1; i <= 5; i++) {
      this.slides.push({
        image: 'slide' + i + '.jpg'
      });
    }
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
