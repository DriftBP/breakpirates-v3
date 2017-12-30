import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Host } from '../host';

@Component({
  selector: 'app-host-details',
  templateUrl: './host-details.component.html',
  styleUrls: ['./host-details.component.scss']
})
export class HostDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  profile: Host;

  ngOnInit() {
    this.profile = this.route.snapshot.data['profile'];
  }

  hasMixcloud(): boolean {
    return this.profile.mixcloud !== null;
  }

  hasTwitter(): boolean {
    return this.profile.twitter !== null;
  }

}
