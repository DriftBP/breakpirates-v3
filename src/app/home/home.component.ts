import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DateTime, WeekdayNumbers } from 'luxon';
import { TranslatePipe } from '@ngx-translate/core';

import { ScheduleService } from '../schedule/services/schedule.service';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { ShowSummaryComponent } from '../schedule/show-summary/show-summary.component';
import { NewsService } from '../news/services/news.service';
import { News } from '../news/models/news';
import { FeaturedNewsComponent } from '../news/featured-news/featured-news.component';

@Component({
  selector: 'bp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterLink,
    ShowSummaryComponent,
    FeaturedNewsComponent,
    TranslatePipe,
    AsyncPipe
  ]
})
export class HomeComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly newsService = inject(NewsService);
  readonly scheduleService = inject(ScheduleService);

  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  activeDayId: WeekdayNumbers;
  latestNews?: News;

  constructor() {
    this.activeDayId = DateTime.local().weekday;
    this.newsService.latestNews().subscribe(news => {
      if (news.length > 0) {
        this.latestNews = news[0];
      }
    });
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
