import { Component, OnInit, OnDestroy } from '@angular/core';
import moment from 'moment';
import { Subscription } from 'rxjs';

import { Show } from '../schedule/show';
import { ScheduleService } from '../shared/services/schedule/schedule.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { AppSettings } from '../app-settings';

interface ISlide {
  image: string;
}

@Component({
  selector: 'bp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private showsSubscription: Subscription;
  private activeDayId = moment().isoWeekday();

  imagePath = AppSettings.ASSET_HOME_IMAGE;
  slides: ISlide[] = [];
  itemsPerSlide = 3;
  todaysSchedule: Show[];
  scheduleLoaded = false;
  breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private readonly scheduleService: ScheduleService
  ) {
    for (let i = 1; i <= 5; i++) {
      this.slides.push({
        image: 'slide' + i + '.jpg'
      });
    }
  }

  ngOnInit() {
    this.showsSubscription = this.scheduleService.shows(this.activeDayId).subscribe(shows => {
        this.todaysSchedule = shows;
        this.scheduleLoaded = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.showsSubscription) {
      this.showsSubscription.unsubscribe();
    }
  }
}
