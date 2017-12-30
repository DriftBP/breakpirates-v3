import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Host } from './host';

@Component({
  selector: 'app-profile',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  profiles: Host[];

  ngOnInit() {
    this.profiles = this.route.snapshot.data['profiles'];
  }

}
