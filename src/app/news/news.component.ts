import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class NewsComponent implements OnInit, OnDestroy {
  private news: News[];
  private latestNewsItems = 4;
  private breadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigActive
  ];

  private routeDataSubscription: Subscription;

  latestNews: News[];
  otherNews: News[];
  showMore = false;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);

    this.routeDataSubscription = this.activatedRoute.data.subscribe(({ news }) => {
      this.news = news;

      if (this.news && Array.isArray(this.news)) {
        this.latestNews = this.news.slice(0, this.latestNewsItems);
        this.otherNews = this.news.slice(this.latestNewsItems);
      }
    });
  }

  ngOnDestroy() {
    if (this.routeDataSubscription) {
      this.routeDataSubscription.unsubscribe();
    }
  }

  onShowMore() {
    this.showMore = true;
  }

  unixTimeToStampToTime(timestamp: string): Date {
    return DateTime.fromSeconds(parseInt(timestamp)).toJSDate();
  }
}
