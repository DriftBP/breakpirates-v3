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
  @Input() article: News;

  imagePath = '';
  hover = false;

  ngOnChanges() {
    this.imagePath = 'url(' + AppSettings.ASSET_NEWS_IMAGE + this.getArticleImageFilename(this.article) + ')';
  }

  getArticleImageFilename(article: News): string {
    return article?.image ?? 'bp.jpg';
  }

  onMouseOver(event: any) {
    this.hover = true;
  }

  onMouseOut(event: any) {
    this.hover = false;
  }
}
