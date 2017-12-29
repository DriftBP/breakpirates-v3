import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from '../news';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html'
})
export class NewsArticleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  article: News;

  ngOnInit() {
    this.article = this.route.snapshot.data['article'];
  }

}
