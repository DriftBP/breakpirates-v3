import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Host } from '../host';
import { Show } from '../../schedule/show';
import { ProfileService } from '../profile.service';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss']
})
export class HostDetailsComponent implements OnInit {

  profile: Host;
  shows: Show[];
  imagePath = AppSettings.ASSET_PROFILE_IMAGE;

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.initialiseState();
    });
  }

  initialiseState(): void {
    this.profile = this.route.snapshot.data['profile'];

    this.profileService.profileShows(this.profile.id)
      .subscribe(shows => this.shows = shows);
  }

  hasMixcloud(): boolean {
    return this.profile?.mixcloud !== null;
  }

  hasTwitter(): boolean {
    return this.profile.twitter !== null;
  }

}
