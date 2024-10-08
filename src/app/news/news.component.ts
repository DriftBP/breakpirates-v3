import { Component, computed, input, OnInit, Signal } from '@angular/core';
import { DateTime } from 'luxon';

import { News } from './models/news';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { newsConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'bp-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  imports: [
    LatestNewsComponent,
    RouterModule,
    DatePipe,
    TranslateModule
  ],
  standalone: true
})
export class NewsComponent implements OnInit {
  news = input<News[]>();

  private latestNewsItems = 4;
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigActive
  ];

  latestNews: Signal<News[]>;
  otherNews: Signal<News[]>;
  showMore = false;

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) {
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
