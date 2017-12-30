import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { News } from './news';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  news: News[];

  ngOnInit() {
    this.news = this.route.snapshot.data['news'];
  }

  unixTimeToStampToTime(timestamp): Date {
    return moment(timestamp * 1000).toDate();
  }
}
