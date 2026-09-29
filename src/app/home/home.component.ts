import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { BreadcrumbConfigItem } from '../shared/breadcrumb/breadcrumb-config-item';
import { BreadcrumbService } from '../shared/services/breadcrumb/breadcrumb.service';
import { NewsService } from '../news/services/news.service';
import { News } from '../news/models/news';
import { FeaturedNewsComponent } from '../news/featured-news/featured-news.component';
import { TodaysScheduleComponent } from './todays-schedule/todays-schedule.component';

@Component({
  selector: 'bp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    RouterLink,
    FeaturedNewsComponent,
    TodaysScheduleComponent,
    TranslatePipe
  ]
})
export class HomeComponent implements OnInit {
  private readonly breadcrumbService = inject(BreadcrumbService);
  private readonly newsService = inject(NewsService);

  private breadcrumbConfig: BreadcrumbConfigItem[] = [];

  latestNews?: News;

  constructor() {
    this.newsService.latestNews().subscribe(news => {
      if (news.length > 0) {
        this.latestNews = news[0];
      }
    });
  }

  ngOnInit() {
    this.breadcrumbService.setBreadcrumb(this.breadcrumbConfig);
  }
}
