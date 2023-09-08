import { Component, Input } from '@angular/core';

import { News } from '../models/news';
import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { newsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';

@Component({
  selector: 'bp-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.scss']
})
export class NewsArticleComponent {
  @Input()
  get article(): News {
    return this._article;
  }
  set article(article: News) {
    this._article = article;
    this.setBreadcrumb();
  }

  private _article: News;
  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  imagePath = AppSettings.ASSET_NEWS_IMAGE;

  constructor(
    private readonly breadcrumbService: BreadcrumbService
  ) { }

  setBreadcrumb(): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: this.article?.title,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
