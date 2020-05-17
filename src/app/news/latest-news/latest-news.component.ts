import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NewsService } from '../news.service';
import { News } from '../news';

@Component({
  selector: 'app-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit, OnDestroy {

  private newsSubscription: Subscription;

  constructor(
    private newsService: NewsService
  ) { }

  latestNews: News[];

  ngOnInit() {
    this.newsSubscription = this.newsService.latestNews()
      .subscribe(latestNews => this.latestNews = latestNews);
  }

  ngOnDestroy() {
    if (this.newsSubscription) {
      this.newsSubscription.unsubscribe();
    }
  }

}
