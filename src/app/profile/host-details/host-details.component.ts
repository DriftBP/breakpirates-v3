import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Host } from '../host';
import { Show } from '../../schedule/show';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss']
})
export class HostDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  profile: Host;
  shows: Show[];
  mixcloudWidgetUrl: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initialiseState();
    });
  }

  initialiseState(): void {
    this.profile = this.route.snapshot.data['profile'];

    if (this.hasMixcloud) {
      this.mixcloudWidgetUrl = 'https://www.mixcloud.com/widget/follow/?u=%2F' + this.profile.mixcloud + '%2F';
    }

    this.profileService.profileShows(this.profile.id)
      .subscribe(shows => this.shows = shows);
  }

  hasMixcloud(): boolean {
    return this.profile.mixcloud !== null;
  }

  hasTwitter(): boolean {
    return this.profile.twitter !== null;
  }

}
