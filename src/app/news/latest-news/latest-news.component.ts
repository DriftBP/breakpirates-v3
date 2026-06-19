import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { News } from '../models/news';
import { FeaturedNewsComponent } from '../featured-news/featured-news.component';

@Component({
    selector: 'bp-latest-news',
    templateUrl: './latest-news.component.html',
    styleUrls: ['./latest-news.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
      FeaturedNewsComponent
    ]
})
export class LatestNewsComponent {
  news = input.required<News[]>();
}
