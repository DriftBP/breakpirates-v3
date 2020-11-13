import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

import { News } from './news';
import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { newsConfigActive } from '../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'bp-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private news: News[];
  private latestNewsItems = 4;

  latestNews: News[];
  otherNews: News[];
  showMore = false;
  breadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigActive
  ];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.news = this.route.snapshot.data['news'];

    if (this.news && Array.isArray(this.news)) {
      this.latestNews = this.news.slice(0, this.latestNewsItems);
      this.otherNews = this.news.slice(this.latestNewsItems);
    }
  }

  onShowMore() {
    this.showMore = true;
  }

  unixTimeToStampToTime(timestamp): Date {
    return moment(timestamp * 1000).toDate();
  }
}
