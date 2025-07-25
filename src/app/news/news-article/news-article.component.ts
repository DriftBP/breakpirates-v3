import { Component, effect, input, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { News } from '../models/news';
import { AppSettings } from '../../app-settings';
import { BreadcrumbConfigItem } from '../../shared/breadcrumb/breadcrumb-config-item';
import { newsConfigInactive } from '../../shared/breadcrumb/breadcrumb-config';
import { BreadcrumbService } from '../../shared/services/breadcrumb/breadcrumb.service';
import { IsoDatePipe } from '../pipes/iso-date.pipe';
import { FormattedDatePipe } from '../pipes/formatted-date.pipe';
import { SafePipe } from '../../shared/pipes/safe.pipe';
import { ImageClickDirective } from '../../shared/directives/image-click.directive';

@Component({
    selector: 'bp-news-article',
    templateUrl: './news-article.component.html',
    styleUrls: ['./news-article.component.scss'],
    imports: [
      TranslatePipe,
      IsoDatePipe,
      FormattedDatePipe,
      SafePipe,
      ImageClickDirective
    ]
})
export default class NewsArticleComponent {
  private readonly breadcrumbService = inject(BreadcrumbService);

  article = input<News>();

  private readonly baseBreadcrumbConfig: BreadcrumbConfigItem[] = [
    newsConfigInactive
  ];
  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  imagePath = AppSettings.ASSET_NEWS_IMAGE;

  constructor() {
    effect(() => {
      const article = this.article();

      if (article) {
        this.setBreadcrumb(article);
      }
    });
  }

  setBreadcrumb(article: News): void {
    this.breadcrumbConfig = this.baseBreadcrumbConfig.concat({
      name: article.title,
      isActive: true
    });

    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
