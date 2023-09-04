import { Component, Input, OnInit } from '@angular/core';
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
  @Input()
  get news(): News[] {
    return this._news;
  }
  set news(news: News[]) {
    this._news = news;

    if (this.news && Array.isArray(this.news)) {
      this.latestNews = this.news.slice(0, this.latestNewsItems);
      this.otherNews = this.news.slice(this.latestNewsItems);
    }
  }

  private _news: News[] = [];
  private latestNewsItems = 4;
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigActive
  ];

  latestNews: News[] = [];
  otherNews: News[] = [];
  showMore = false;

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

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
