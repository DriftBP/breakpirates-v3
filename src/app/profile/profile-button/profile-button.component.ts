import { Component, Input, OnChanges } from '@angular/core';

import { Host } from '../host';
import { AppSettings } from '../../app-settings';

@Component({
  selector: 'bp-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent implements OnChanges {
  @Input() host: Host;

  imagePath: string;

  ngOnChanges() {
    this.imagePath = 'url(' + AppSettings.ASSET_PROFILE_IMAGE + this.host.image + ')';
  }
}
