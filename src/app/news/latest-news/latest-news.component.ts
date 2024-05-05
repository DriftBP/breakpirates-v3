import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { News } from '../models/news';

@Component({
  selector: 'bp-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LatestNewsComponent {
  news = input.required<News[]>();
}
