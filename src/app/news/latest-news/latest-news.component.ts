import { Component, OnInit } from '@angular/core';

import { NewsService } from '../news.service';
import { News } from '../news';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  constructor(
    private newsService: NewsService
  ) { }

  latestNews: News[];

  ngOnInit() {
    this.newsService.latestNews()
      .subscribe(latestNews => this.latestNews = latestNews);
  }

}
