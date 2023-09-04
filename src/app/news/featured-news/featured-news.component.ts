import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { News } from '../models/news';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedNewsComponent implements OnChanges {
  @Input({ required: true }) article?: News;

  imagePath = '';
  hover = false;

  ngOnChanges() {
    if (this.article) {
      const filename = this.getArticleImageFilename(this.article);

      this.imagePath = `url(${AppSettings.ASSET_NEWS_IMAGE}${filename})`;
    }
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
