import { Component, Input, OnChanges } from '@angular/core';

import { News } from '../news';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.scss']
})
export class FeaturedNewsComponent implements OnChanges {
  @Input() article: News;

  imagePath = '';
  hover = false;

  ngOnChanges() {
    let imageFilename = this.article?.image;

    if (!imageFilename) {
      imageFilename = 'bp.jpg';
    }

    this.imagePath = AppSettings.ASSET_NEWS_IMAGE + imageFilename;
  }

  onMouseOver(event: any) {
    this.hover = true;
  }

  onMouseOut(event: any) {
    this.hover = false;
  }
}
