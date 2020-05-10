import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Host } from './host';
import { AppSettings } from '../app-settings';

@Component({
  selector: 'app-profile',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  profiles: Host[];
  order = 'asc';
  imagePath = AppSettings.ASSET_PROFILE_IMAGE;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profiles = this.route.snapshot.data['profiles'];
  }

  toggleOrderBy(): void {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  }

}
