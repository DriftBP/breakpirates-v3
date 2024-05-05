import { Component, computed, input, OnInit, Signal } from '@angular/core';
import { DateTime } from 'luxon';

import { News } from './models/news';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { newsConfigActive } from '../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
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
      return Array.isArray(this.news()) ? this.news().slice(0, this.latestNewsItems) : [];
    });

    this.otherNews = computed(() => {
      return Array.isArray(this.news()) ? this.news().slice(this.latestNewsItems) : [];
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
