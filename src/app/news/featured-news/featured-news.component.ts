import { ChangeDetectionStrategy, Component, Signal, computed, input } from '@angular/core';

import { News } from '../models/news';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedNewsComponent {
  article = input.required<News>();

  imagePath: Signal<string>;
  hover = false;

  constructor() {
    this.imagePath = computed(() => {
      const filename = this.getArticleImageFilename(this.article());

      return `url(${AppSettings.ASSET_NEWS_IMAGE}${filename})`;
    });
  }

  private getArticleImageFilename(article: News): string {
    // Can't use nullish check here as could also be an empty string
    return article?.image ? article.image : 'bp.jpg';
  }

  onMouseOver(event: any) {
    this.hover = true;
  }

  onMouseOut(event: any) {
    this.hover = false;
  }
}
