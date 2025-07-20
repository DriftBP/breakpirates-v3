import { Component, computed, input, OnInit, Signal, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { DateTime } from 'luxon';

import { News } from './models/news';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { newsConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'bp-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    imports: [
      RouterModule,
      TranslatePipe,
      DatePipe,
      LatestNewsComponent
    ]
})
export default class NewsComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);

  news = input<News[]>();

  private latestNewsItems = 4;
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigActive
  ];

  latestNews: Signal<News[]>;
  otherNews: Signal<News[]>;
  showMore = false;

  constructor() {
    this.latestNews = computed(() => {
      const news = this.news();

      return Array.isArray(news) ? news.slice(0, this.latestNewsItems) : [];
    });

    this.otherNews = computed(() => {
      const news = this.news();

      return Array.isArray(news) ? news.slice(this.latestNewsItems) : [];
    });
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }

  onShowMore() {
    this.showMore = true;
  }

  unixTimeToStampToTime(timestamp: string): Date {
    return DateTime.fromSeconds(parseInt(timestamp)).toJSDate();
  }
}
