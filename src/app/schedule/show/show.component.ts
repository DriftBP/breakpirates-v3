import { Component, OnInit, Host } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Show } from '../show';
import { ScheduleService } from '../schedule.service';
import { Genre } from '../../music/genre';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  show: Show;
  hosts: Host[];
  genres: Genre[];
  dayName: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initialiseState();
    });
  }

  initialiseState(): void {
    this.show = this.route.snapshot.data['show'];

    this.dayName = this.scheduleService.dayName(this.show.day_id);

    this.scheduleService.showHosts(this.show.id)
      .subscribe(hosts => this.hosts = hosts);

    this.scheduleService.showGenres(this.show.id)
      .subscribe(genres => this.genres = genres);
  }

}
