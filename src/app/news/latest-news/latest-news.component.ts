import { Component, OnInit } from '@angular/core';

import { NewsService } from '../news.service';
import { News } from '../news';

@Component({
  selector: 'bp-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.css']
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
