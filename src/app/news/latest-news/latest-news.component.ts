import { Component, Input } from '@angular/core';

import { News } from '../news';

@Component({
  selector: 'bp-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent {
  @Input() news: News[];
}
