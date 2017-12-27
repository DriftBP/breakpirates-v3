import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { NewsService } from './news.service';
import { News } from './news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(
    private newsService: NewsService
  ) { }

  news: News[];

  ngOnInit() {
    this.newsService.news()
      .subscribe(news => this.news = news);
  }

  unixTimeToStampToTime(timestamp): Date {
    return moment(timestamp * 1000).toDate();
  }
}
