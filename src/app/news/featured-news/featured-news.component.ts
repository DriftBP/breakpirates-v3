import { Component, Input } from '@angular/core';

import { News } from '../news';

@Component({
  selector: 'bp-featured-news',
  templateUrl: './featured-news.component.html',
  styleUrls: ['./featured-news.component.scss']
})
export class FeaturedNewsComponent {
  @Input() article: News;

}
