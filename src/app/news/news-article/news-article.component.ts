import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from '../news';
import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { newsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent implements OnInit {
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigInactive
  ];

  imagePath = AppSettings.ASSET_NEWS_IMAGE;
  breadcrumbConfig: BreadcrumbConfigItem[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  article: News;

  ngOnInit() {
    this.article = this.route.snapshot.data['article'];

    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.article?.title,
      isActive: true
    });
  }

}
