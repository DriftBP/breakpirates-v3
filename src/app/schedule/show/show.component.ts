import { Component, OnInit, Host, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show } from '../show';
import { ScheduleService } from '../../shared/services/schedule.service';
import { Genre } from '../../music/genre';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy {

  private paramsSubscription: Subscription;
  private hostsSubscription: Subscription;
  private genresSubscription: Subscription;

  show: Show;
  hosts: Host[];
  genres: Genre[];
  dayName: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.initialiseState();
    });
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }

    if (this.hostsSubscription) {
      this.hostsSubscription.unsubscribe();
    }

    if (this.genresSubscription) {
      this.genresSubscription.unsubscribe();
    }
  }

  initialiseState(): void {
    this.show = this.route.snapshot.data['show'];

    this.dayName = this.scheduleService.dayName(this.show.day_id);

    this.hostsSubscription = this.scheduleService.showHosts(this.show.id)
      .subscribe(hosts => this.hosts = hosts);

    this.genresSubscription = this.scheduleService.showGenres(this.show.id)
      .subscribe(genres => this.genres = genres);
  }

}
