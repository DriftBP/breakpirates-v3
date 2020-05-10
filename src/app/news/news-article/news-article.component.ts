import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from '../news';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  imagePath = AppSettings.ASSET_NEWS_IMAGE;

  constructor(
    private route: ActivatedRoute
  ) { }

  article: News;

  ngOnInit() {
    this.article = this.route.snapshot.data['article'];
  }

}
